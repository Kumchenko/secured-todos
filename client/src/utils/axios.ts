import axios, { AxiosError } from 'axios'
import { clearEmptyParams } from './clearEmptyParams'
import { showErrorModal } from './showModal'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API}/api`,
    timeout: 1000 * 60,
    withCredentials: true,
})

axiosInstance.interceptors.request.use(({ params, ...config }) => ({
    params: params ? clearEmptyParams(params) : undefined,
    ...config,
}))

axiosInstance.interceptors.response.use(
    res => res,
    async (error: AxiosError<Error>) => {
        const message = error.response?.data.message
        // Catch 401 Error
        if (error.response?.status === 401 && !error.config?.retry) {
            // Saving initial request config
            const config = error.config
            if (!mutex.isLocked()) {
                const release = await mutex.acquire()

                // Try to refresh tokens
                try {
                    await axiosInstance('/user/refresh')
                } catch (e) {
                    showErrorModal(message)
                    return Promise.reject(e)
                } finally {
                    release()
                }
            } else {
                // If locked when reauth - error, else - wait for unlock
                if (config?.url === '/user/refresh') {
                    return Promise.reject(error)
                } else {
                    await mutex.waitForUnlock()
                }
            }

            // Try to retry request
            try {
                // Retry request
                if (config) {
                    config.retry = true
                    return await axiosInstance(config)
                } else return Promise.reject(error)
            } catch (e) {
                return Promise.reject(e)
            }
        }
        showErrorModal(message)
        return Promise.reject(error)
    },
)

export { axiosInstance }
