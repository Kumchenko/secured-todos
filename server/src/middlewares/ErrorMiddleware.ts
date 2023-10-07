import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import { isDev } from '../constants'

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
    const isApiError = err instanceof ApiError

    isDev ? console.error(`${err.message} ${new Date().toLocaleString()}`) : null

    return res.status(isApiError ? err.status : 500).json({
        name: err.name,
        message: err.message,
    })
}
