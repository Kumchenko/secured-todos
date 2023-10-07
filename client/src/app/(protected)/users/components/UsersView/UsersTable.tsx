'use client'
import { memo } from 'react'
import UserRow from './UserRow'
import { User } from '@/interfaces'

const UsersTable = ({ users }: { users: User[] }) => {
    return (
        <table cellPadding={6} className="w-full bg-cyan-800 border border-collapse table-auto border-white">
            <thead>
                <tr className="p-1 [&>*]:border">
                    <th>Логін</th>
                    <th>Роль</th>
                    <th>Залишилось спроб входу</th>
                    <th>Обмеження паролю</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <UserRow key={user.login} user={user} />
                ))}
            </tbody>
        </table>
    )
}

export default memo(UsersTable)
