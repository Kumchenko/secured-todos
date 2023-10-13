import hashCode from './hashCode'

export const cryptPassword = (login: string, password: string) => (hashCode(login) / hashCode(password)).toString()
