import { NextFunction, Request, Response } from 'express'
import {
    UserActivateRequest,
    UserAuthRequest,
    UserAuthResponse,
    UserBlockRequest,
    UserChangePassRequest,
    UserIdentifyRequest,
    UserRegistrationRequest,
    UserRestrictRequest,
    UsersGetRequest,
} from '../interfaces/user'
import { prisma } from '../lib/prisma'
import { Prisma, User } from '@prisma/client'
import ApiError from '../errors/ApiError'
import { loginAttempts } from '../configs'
import { Jwt } from '../utils/Jwt'
import { passwordValidator } from '../utils/passwordValidator'

class UserController {
    async identify(req: UserIdentifyRequest, res: UserAuthResponse, next: NextFunction) {
        try {
            const { login } = req.query

            const user = await prisma.user.findUnique({ where: { login } })

            if (!user) {
                throw ApiError.badRequest('Не знайдено користувача!')
            }

            res.json(user.password ? 'ok' : 'new')
        } catch (e) {
            next(e)
        }
    }
    async activate(req: UserActivateRequest, res: UserAuthResponse, next: NextFunction) {
        try {
            const { login, newPassword, repeat } = req.body

            const actionUser = await prisma.user.findUnique({ where: { login } })

            if (!actionUser) {
                throw ApiError.badRequest('Не знайдено користувача!')
            }

            // Error if user is already activated
            if (actionUser.password !== '') {
                throw ApiError.badRequest('Користувач вже активований!')
            }

            // Check new password for eligibility for requirements if user restricted
            passwordValidator(newPassword, repeat, actionUser.restricted)

            const { password: pass, ...user } = await prisma.user.update({
                where: { login },
                data: { password: newPassword },
            })
            res.locals.user = user
            next()
        } catch (e) {
            next(e)
        }
    }
    async changePass(req: UserChangePassRequest, res: UserAuthResponse, next: NextFunction) {
        try {
            const { password, newPassword, repeat } = req.body

            const decoded = Jwt.verify<User>(req.cookies.token)

            if (!decoded) {
                throw ApiError.notAuthorized()
            }

            const actionUser = await prisma.user.findUnique({ where: { login: decoded.login } })

            if (!actionUser) {
                throw ApiError.badRequest('Не знайдено користувача!')
            }

            if (actionUser.password !== password) {
                throw ApiError.badRequest('Неправильний пароль!')
            }

            if (password === newPassword) {
                throw ApiError.badRequest('Старий та новий пароль ідентичні!')
            }

            passwordValidator(newPassword, repeat, actionUser.restricted)

            const { password: pass, ...user } = await prisma.user.update({
                where: { login: decoded.login },
                data: { password: newPassword },
            })
            res.locals.user = user
            next()
        } catch (e) {
            next(e)
        }
    }
    async authenticate(req: UserAuthRequest, res: UserAuthResponse, next: NextFunction) {
        try {
            const { login, password } = req.body
            const user = await prisma.user.findUnique({ where: { login } })

            const lockedMessage = 'Користувач заблокований, звʼяжіться з адміністратором!'

            if (!user) {
                throw ApiError.badRequest('Не знайдено користувача!')
            }

            if (user.password === '') {
                throw ApiError.badRequest('Пройдіть активацію облікового запису!')
            }

            if (user.count <= 0) {
                throw ApiError.forbidden(lockedMessage)
            }

            if (user.password !== password) {
                const count = --user.count
                await prisma.user.update({ where: { login }, data: { count } })
                throw ApiError.badRequest(
                    `Невірний пароль! ${count <= 0 ? lockedMessage : `Залишилось ${count} спроб`}`,
                )
            }

            res.locals.user = user
            next()
        } catch (e) {
            next(e)
        }
    }
    async authorize(req: Request, res: UserAuthResponse, next: NextFunction) {
        try {
            const { login } = res.locals.user
            const { password, ...user } = await prisma.user.update({ where: { login }, data: { count: loginAttempts } })

            res.cookie('token', Jwt.sign(user), { httpOnly: true })
            res.json(user)
        } catch (e) {
            next(e)
        }
    }
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.cookie('token', '', { maxAge: 0 })
            res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }
    async registration(req: UserRegistrationRequest, res: Response, next: NextFunction) {
        try {
            const { login, count, restricted } = req.body
            const foundUser = await prisma.user.findUnique({
                where: {
                    login,
                },
            })

            if (foundUser) {
                throw ApiError.badRequest('Користувача вже зареєстровано!')
            }

            const { password, ...user } = await prisma.user.create({
                data: {
                    login,
                    count: count ? parseInt(count) : loginAttempts,
                    restricted,
                },
            })

            res.json(user)
        } catch (e) {
            next(e)
        }
    }
    async block(req: UserBlockRequest, res: Response, next: NextFunction) {
        try {
            const { login } = req.body
            const { password, ...user } = await prisma.user.update({ data: { count: 0 }, where: { login } })

            res.json(user)
        } catch (e) {
            next(e)
        }
    }
    async unblock(req: UserBlockRequest, res: Response, next: NextFunction) {
        try {
            const { login } = req.body
            const { password, ...user } = await prisma.user.update({ data: { count: loginAttempts }, where: { login } })

            res.json(user)
        } catch (e) {
            next(e)
        }
    }
    async restrict(req: UserRestrictRequest, res: Response, next: NextFunction) {
        try {
            const { login, restricted } = req.body
            const { password, ...user } = await prisma.user.update({
                data: { restricted: !!restricted },
                where: { login },
            })

            res.json(user)
        } catch (e) {
            next(e)
        }
    }
    async getMe(req: Request, res: UserAuthResponse, next: NextFunction) {
        try {
            res.json(res.locals.user)
        } catch (e) {
            next(e)
        }
    }
    async getMany(req: UsersGetRequest, res: Response, next: NextFunction) {
        try {
            const { page: pageString = '-1', perPage: perPageString = '-1' } = req.query

            const page = parseInt(pageString)
            const perPage = parseInt(perPageString)
            const isPagination = page > 0 && perPage > 0

            const query: Prisma.UserFindManyArgs = {
                skip: isPagination ? (page - 1) * perPage : undefined,
                take: isPagination ? perPage : undefined,
                select: {
                    login: true,
                    role: true,
                    count: true,
                    restricted: true,
                },
                orderBy: {
                    login: 'asc',
                },
            }

            const [users, count] = await prisma.$transaction([prisma.user.findMany(query), prisma.user.count()])

            res.json({
                pagination: {
                    pages: isPagination ? Math.ceil(count / perPage) : 1,
                    page: isPagination ? page : 1,
                    total: count,
                    perPage: isPagination ? perPage : count,
                },
                data: users,
            })
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController()
