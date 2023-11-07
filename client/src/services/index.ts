import { axiosBaseQuery } from '@/utils/axiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

const api = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery(),
    endpoints: () => ({}),
    tagTypes: ['User', 'Post'],
})

export default api
