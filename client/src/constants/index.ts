import { Endpoint, Role } from '@/interfaces'

export const pollingInterval = 30000 // 30s
export const logoutTimeout = 2700 // 2.7s
export const modalTimeout = 2500 // 2.5s

export const endpoints: Endpoint[] = [
    {
        title: 'Користувачі',
        href: '/users',
        roles: [Role.Admin],
    },
    {
        title: 'Налаштування',
        href: '/setup',
        roles: [Role.Admin, Role.User],
    },
    {
        title: 'Довідка',
        href: '/',
        roles: [Role.Admin, Role.User],
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
