import { ApiErrorConstructor } from '../interfaces/apiError'

class ApiError extends Error {
    status: number

    constructor({ status, message }: ApiErrorConstructor) {
        super(message)
        this.status = status
    }

    static badRequest(message: string) {
        return new ApiError({ status: 400, message })
    }

    static forbidden(message: string) {
        return new ApiError({ status: 403, message })
    }

    static internal(message: string) {
        return new ApiError({ status: 500, message })
    }

    static notSupported() {
        return this.badRequest('Цей шлях не підтримується!')
    }

    static notAuthorized() {
        return new ApiError({
            status: 401,
            message: 'Ви не авторизовані для виконання запиту!',
        })
    }
}

export default ApiError
