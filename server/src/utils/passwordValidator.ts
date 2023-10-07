import { numPattern, latinPattern, mathOpsPattern } from '../constants'
import ApiError from '../errors/ApiError'

export const passwordValidator = (password: string, repeat: string, extendedCheck = false) => {
    if (password !== repeat) {
        throw ApiError.badRequest('Паролі не ідентичні!')
    }

    if (!password) {
        throw ApiError.badRequest('Пароль нульової довжини!')
    }

    if (extendedCheck) {
        if (!password.match(latinPattern)) {
            throw ApiError.badRequest('Пароль не містить латинські букви!')
        }
        if (!password.match(numPattern)) {
            console.log(password)
            throw ApiError.badRequest('Пароль не містить цифр!')
        }
        if (!password.match(mathOpsPattern)) {
            throw ApiError.badRequest('Пароль не містить знаки арифметичних операцій!')
        }
    }
}
