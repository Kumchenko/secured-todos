import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import { Jwt } from '../utils/Jwt'
import { Role, User } from '@prisma/client'
import { UserRequestCookie } from '../interfaces/user'

export const AccessMiddleware =
    (roles?: Role[]) =>
    (req: UserRequestCookie, res: Response<{}, { user: Omit<User, 'password'> }>, next: NextFunction) => {
        try {
            if (req.method === 'OPTIONS') {
                next()
            }

            // Getting token from cookie
            let token = req.cookies.token

            // If not decoded or token undefined throw error
            const decoded = Jwt.verify<Omit<User, 'password'>>(token)
            if (!decoded) {
                throw ApiError.notAuthorized()
            }

            // If there are some roles for performing Action and User role doesn't fit requirements
            if (roles && !roles.includes(decoded.role)) {
                throw ApiError.forbidden('Недостатньо прав доступу!') // Throw forbidden Error
            }

            // Setting User for response (for determining operation issuer)
            const { iat, ...user } = decoded
            res.locals.user = user

            // Success - Go to next middleware
            next()
        } catch (e) {
            next(e)
        }
    }
