import {
    ActivateUserArgs,
    ChangeUserPasswordArgs,
    IdentifyStatus,
    ListResponse,
    LoginUserArgs,
    RestrictUserArgs,
    User,
} from '@/interfaces'
import { axiosInstance } from '@/utils/axios'
import api from './'

const userApi = api.injectEndpoints({
    endpoints: build => ({
        getUser: build.query<User, void>({
            query: () => ({
                url: '/user/me',
            }),
            providesTags: res => (res ? [{ type: 'User', id: res.login }] : [{ type: 'User' }]),
        }),
        getUsers: build.query<ListResponse<User>, void>({
            query: () => ({
                url: '/user/all',
            }),
            providesTags: (res, error, arg) =>
                res
                    ? [
                          ...res.data.map(({ login }) => ({ type: 'User' as const, id: login })),
                          { type: 'User', id: 'LIST' },
                      ]
                    : [{ type: 'User', id: 'LIST' }],
        }),
        addUser: build.mutation<User, string>({
            query: login => ({
                url: '/user/registration',
                method: 'POST',
                data: { login },
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),
        changeUserPassword: build.mutation<User, ChangeUserPasswordArgs>({
            query: ({ password, newPassword, repeat }) => ({
                url: '/user/change',
                method: 'PATCH',
                data: { password, newPassword, repeat },
            }),
            invalidatesTags: (res, error, arg) => (res ? [{ type: 'User', id: res.login }] : [{ type: 'User' }]),
        }),
        restrictUser: build.mutation<User, RestrictUserArgs>({
            query: ({ login, restricted }) => ({
                url: '/user/restrict',
                method: 'PATCH',
                data: { login, restricted },
            }),
            invalidatesTags: (res, error, arg) =>
                res ? [{ type: 'User', id: res.login }] : [{ type: 'User', id: 'LIST' }],
        }),
        blockUser: build.mutation<User, string>({
            query: login => ({
                url: '/user/block',
                method: 'PATCH',
                data: { login },
            }),
            invalidatesTags: (res, error, arg) => [{ type: 'User', id: arg }],
        }),
        unblockUser: build.mutation<User, string>({
            query: login => ({
                url: '/user/unblock',
                method: 'PATCH',
                data: { login },
            }),
            invalidatesTags: (res, error, arg) => [{ type: 'User', id: arg }],
        }),
    }),
})

export const {
    useGetUserQuery,
    useGetUsersQuery,
    useAddUserMutation,
    useBlockUserMutation,
    useChangeUserPasswordMutation,
    useRestrictUserMutation,
    useUnblockUserMutation,
} = userApi

export const identifyUser = (login: string) => axiosInstance<IdentifyStatus>('/user/identify', { params: { login } })

export const loginUser = ({ login, password }: LoginUserArgs) =>
    axiosInstance.post<User>('/user/login', { login, password })

export const activateUser = ({ login, newPassword, repeat }: ActivateUserArgs) =>
    axiosInstance.patch<User>('/user/activate', { login, newPassword, repeat })

export const logoutUser = () => axiosInstance('/user/logout')
