import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { clearEmptyParams } from './clearEmptyParams'
import { ApiError, AxiosBaseQuery, AxiosBaseQueryError } from '@/interfaces'
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import { openModal } from '@/services/modal'
import store from '@/store'
import { ModalType } from '@/constants'

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
    (error: AxiosError<ApiError>) => {
        store.dispatch(
            openModal({
                type: ModalType.Error,
                description: error.response?.data.message,
            }),
        )
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
