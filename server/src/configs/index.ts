import { Role, User } from '@prisma/client'
import { CorsOptions } from 'cors'

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
