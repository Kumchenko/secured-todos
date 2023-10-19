import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import { Jwt } from '../utils/Jwt'
import { Role, User } from '@prisma/client'
import { UserAccessResponse, UserRequestCookie } from '../interfaces/user'
import Logger from '../utils/Logger'
import { prisma } from '../lib/prisma'
import { cryptPassword } from '../utils/cryptPassword'

export const AccessMiddleware =
    (roles?: Role[]) => async (req: UserRequestCookie, res: UserAccessResponse, next: NextFunction) => {
        try {
            if (req.method === 'OPTIONS') {
                next()
            }

            // Getting token from cookie
            let token = req.cookies.access_token

            // If not decoded or token undefined throw error
            const decoded = Jwt.verify<User>(token)
            if (!decoded) {
                throw ApiError.notAuthorized()
            }

            const user = await prisma.user.findUnique({
                where: { login: decoded.login },
            })

            if (!user || user.count <= 0 || cryptPassword(user.login, user.password) !== decoded.password) {
                throw ApiError.badRequest('Авторизаційна інформація застаріла!')
            }

            // If there are some roles for performing Action and User role doesn't fit requirements
            if (roles && !roles.includes(user.role)) {
                throw ApiError.forbidden('Недостатньо прав доступу!') // Throw forbidden Error
            }

            // Setting User for response (for determining operation issuer)
            res.locals.user = user

            // Adding note to ActionLogs
            Logger.logAction(user.login, req)

            // Success - Go to next middleware
            next()
        } catch (e) {
            next(e)
        }
    }
