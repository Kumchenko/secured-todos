import { Endpoint, Role } from '@/interfaces'

export const pollingInterval = 30000 // 30s
export const logoutTimeout = 2700 // 2.7s
export const modalTimeout = 2500 // 2.5s
export const licenseInterval = 1000 * 60 * 5 // 5min
export const activationKey = process.env.NEXT_PUBLIC_KEY
export const siteKey = process.env.NEXT_PUBLIC_SITE_KEY || ''

export const endpoints: Endpoint[] = [
    {
        title: 'Пости',
        href: '/posts',
        roles: [Role.Admin, Role.Moderator, Role.User],
    },
    {
        title: 'Користувачі',
        href: '/users',
        roles: [Role.Admin],
    },
    {
        title: 'Налаштування',
        href: '/setup',
    },
    {
        title: 'Довідка',
        href: '/',
    },
    {
        title: 'Активація',
        href: '/activate',
    },
    {
        title: 'Вихід',
        href: '/logout',
    },
]

export const securedPages = [
    {
        href: '/users',
        roles: [Role.Admin],
    },
]

export enum ModalType {
    Info = 'info',
    Error = 'error',
}
