import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { clearEmptyParams } from './clearEmptyParams'
import { AxiosBaseQuery, AxiosBaseQueryError } from '@/interfaces'
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import { Mutex } from 'async-mutex'
import { showErrorModal } from './showErrorModal'

declare module 'axios' {
    export interface AxiosRequestConfig {
        retry?: boolean
    }
}

const mutex = new Mutex()

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API}/api`,
    timeout: 1000 * 60,
    withCredentials: true,
})

axiosInstance.interceptors.request.use(
    ({ params, ...config }) => ({
        params: params ? clearEmptyParams(params) : undefined,
        ...config,
    }),
    error => error,
)

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
                    return Promise.reject(e)
                } finally {
                    release()
                }
            } else {
                // If locked when reauth - error, else - wait for unlock
                if (config?.url === '/user/refresh') {
                    showErrorModal(message)
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
                showErrorModal(message)
                return Promise.reject(e)
            }
        }
        showErrorModal(message)
        return Promise.reject(error)
    },
)

export const axiosBaseQuery =
    (
        options?: AxiosBaseQuery,
    ): BaseQueryFn<
        {
            url: string
            method?: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
        },
        unknown,
        AxiosBaseQueryError
    > =>
    async ({ url, method, data, params }) => {
        try {
            const result = await axiosInstance({
                url,
                method,
                params,
                data,
                ...options,
            })
            return {
                data: result.data,
            }
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return {
                    error: {
                        status: e.response?.status || 400,
                        data: e.response?.data || e.message,
                    },
                }
            } else {
                return {
                    error: {
                        status: 400,
                        data: 'Unknown Fetch error',
                    },
                }
            }
        }
    }

export { axiosInstance }
