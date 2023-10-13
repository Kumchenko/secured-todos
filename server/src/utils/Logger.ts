import { RegAction } from '@prisma/client'
import { prisma } from '../lib/prisma'
import { getActionString } from './getActionString'
import { Request } from 'express'
import ApiError from '../errors/ApiError'

class Logger {
    static trier = (func: () => Promise<void>) => {
        try {
            func()
        } catch (e) {
            throw ApiError.internal('Error occured when tried to log!')
        }
    }
    logLogin = async (login: string) => {
        Logger.trier(async () => {
            await prisma.regLog.create({
                data: {
                    login,
                    action: RegAction.Login,
                },
            })
        })
    }
    logLogout = async (login: string) => {
        Logger.trier(async () => {
            await prisma.regLog.create({
                data: {
                    login,
                    action: RegAction.Logout,
                },
            })
        })
    }
    logAction = async (login: string, req: Request) => {
        Logger.trier(async () => {
            if (!req.originalUrl.endsWith('/logout')) {
                await prisma.actionLog.create({
                    data: {
                        login,
                        action: getActionString(req),
                    },
                })
            }
        })
    }
}

export default new Logger()
