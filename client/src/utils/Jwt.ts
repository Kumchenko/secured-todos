import * as jwt from 'jsonwebtoken'

class Jwt {
    static sign = (data: object, options?: jwt.SignOptions) => jwt.sign(data, process.env.SECRET_KEY || '', options)

    static verify = <T extends object>(
        token?: string | null,
        options?: jwt.VerifyOptions,
    ): (T & jwt.JwtPayload) | null => {
        try {
            const decoded = jwt.verify(token || '', process.env.SECRET_KEY || '', options) as T
            return decoded
        } catch (e) {
            return null
        }
    }
}

export { Jwt }
