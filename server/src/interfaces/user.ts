import { User } from '@prisma/client'
import { Request, Response } from 'express'

export type LoginData = {
    login: string
}

export type RegistrationData = {
    login: string
    count: string
    restricted: boolean
}

export type BlockData = {
    count: string
    login: string
}

export type RestrictData = {
    restricted: boolean
    login: string
}

export type GetManyData = {
    page: string
    perPage: string
}

export type AuthData = {
    login: string
    password: string
}

export type UserData = { user: Omit<User, 'password'> }

export type ChangePassData = {
    password: string
    newPassword: string
    repeat: string
}

export type ActivateData = {
    login: string
    newPassword: string
    repeat: string
}

export interface UserRequestCookie<
    P = Record<string, string>,
    ResBody = any,
    ReqBody = any,
    ReqQuery = qs.ParsedQs,
    Locals extends Record<string, any> = Record<string, any>,
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
    cookies: {
        token?: string
    }
}

export type UserIdentifyRequest = Request<{}, {}, {}, LoginData>

export type UserActivateRequest = Request<{}, {}, ActivateData>

export type UserChangePassRequest = UserRequestCookie<{}, {}, ChangePassData>

export type UserAuthRequest = Request<{}, {}, AuthData>
export type UserAuthResponse = Response<{}, AuthData & UserData>

export type UserRegistrationRequest = Request<{}, {}, RegistrationData>

export type UserBlockRequest = Request<{}, {}, BlockData>

export type UserRestrictRequest = Request<{}, {}, RestrictData>

export type UsersGetRequest = Request<{}, {}, {}, GetManyData>

export type UserAccessResponse = Response<{}, UserData>
