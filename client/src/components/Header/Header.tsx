'use client'
import { Endpoint } from '@/interfaces'
import Link from 'next/link'
import { memo } from 'react'
import { usePathname } from 'next/navigation'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useGetUserQuery } from '@/services/user'
import { pollingInterval } from '@/constants'

const Header = ({ endpoints }: { endpoints?: Endpoint[] }) => {
    const path = usePathname()
    const { data: user } = useGetUserQuery(undefined, { pollingInterval })

    return (
        <header className="bg-cyan-800 p-4 flex justify-between items-center">
            <span className="text-xl font-semibold flex gap-1 items-center">
                <LockClosedIcon className="w-6 h-6 text-cyan-50" />
                Todos
                <span className="text-cyan-500">/</span>
                {user?.login}
            </span>
            <ul className="flex gap-6">
                {endpoints
                    ?.filter(endpoint => !endpoint.roles || endpoint.roles.find(role => role === user?.role))
                    ?.map(({ title, href }) => (
                        <li className={href === path ? 'font-bold' : 'text-cyan-50'} key={href}>
                            <Link href={href}>{title}</Link>
                        </li>
                    ))}
            </ul>
        </header>
    )
}

export default memo(Header)
