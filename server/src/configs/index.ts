import { Role, User } from '@prisma/client'
import { CorsOptions } from 'cors'
import { CookieOptions } from 'express'
import { isDev } from '../constants'

export const corsOptions: CorsOptions = {
    origin: true,
    credentials: true,
}

export const loginAttempts = 3

export const defaultAdminParams: User = {
    login: 'ADMIN',
    count: 3,
    password: '',
    restricted: false,
    role: Role.Admin,
}

export const defaultModerParams: User = {
    login: 'MODERATOR',
    count: 3,
    password: '',
    restricted: false,
    role: Role.Moderator,
}

const defaultCookieOptions: CookieOptions = {
    sameSite: isDev ? 'lax' : 'none',
    secure: isDev ? undefined : true,
}

export const accessTokenMaxAge = 1000 * 60 * 6 // 6 Minutes
export const refreshTokenMaxAge = 1000 * 60 * 11 // 11 Minutes

export const accessTokenCookieOptions: CookieOptions = {
    maxAge: accessTokenMaxAge,
    httpOnly: true,
    sameSite: 'lax',
}

export const refreshTokenCookieOptions: CookieOptions = {
    maxAge: refreshTokenMaxAge,
    httpOnly: true,
    sameSite: 'lax',
}
