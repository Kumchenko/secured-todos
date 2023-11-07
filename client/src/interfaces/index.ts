import { ModalType } from '@/constants'

export type Endpoint = {
    title: string
    href: string
    roles?: Role[]
}

export enum Role {
    User = 'User',
    Moderator = 'Moderator',
    Admin = 'Admin',
}

export enum IdentifyStatus {
    Ok = 'ok',
    New = 'new',
}

export type User = {
    login: string
    role: Role
    count: number
    restricted: boolean
}

export type Post = {
    id: number
    login: string
    text: string
    created: string
    updated?: string
}

export type PostUpdateArgs = {
    id: number
    text: string
}

export type LoginUserArgs = {
    login: string
    password: string
}

export type ActivateUserArgs = {
    login: string
    newPassword: string
    repeat: string
}

export type ChangeUserPasswordArgs = {
    password: string
    newPassword: string
    repeat: string
}

export type RestrictUserArgs = {
    login: string
    restricted: boolean
}

export type EmployeeData = {
    id: number
    login: string
}

export type AxiosBaseQuery = {
    baseURL?: string
}

export type AxiosBaseQueryError = {
    status: number
    data: {
        name: string
        message: string
    }
}

export type PaginationType = {
    pages: number
    page: number
    perPage: number
    total: number
}

export type ListResponse<T> = {
    pagination: PaginationType
    data: T[]
}

export type ApiError = {
    name: string
    message: string
}

export type ModalArgs = Partial<Omit<Modal, 'key'>>

export type Modal = {
    key: number
    type: ModalType
    title?: string
    description?: string
    timeout: number
}
