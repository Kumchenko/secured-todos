import axios, { AxiosRequestConfig } from 'axios'
import { AxiosBaseQuery, AxiosBaseQueryError } from '@/interfaces'
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import { axiosInstance } from './axios'
declare module 'axios' {
    export interface AxiosRequestConfig {
        retry?: boolean
    }
}
const axiosBaseQuery =
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

export { axiosBaseQuery }
