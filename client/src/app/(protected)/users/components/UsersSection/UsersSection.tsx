'use client'
import React from 'react'
import UsersTable from '../UsersView/UsersTable'
import { Role } from '@/interfaces'
import { useGetUsersQuery } from '@/services/user'

const UsersSection = () => {
    const { users, isLoading, isError } = useGetUsersQuery(undefined, {
        selectFromResult: ({ data, ...other }) => ({
            users: data?.data,
            ...other,
        }),
    })
    return (
        <section className="flex flex-col gap-2">
            <h2 className="text-2xl text-center font-semibold">Зареєстровані користувачі</h2>
            <p className="text-center">
                Примітка: для блокування користувача, встановіть кількість спроб входу – 0, для розблокування 1 або
                більше
            </p>
            {isError ? (
                <span className="text-xl text-center text-red-500 font-semibold">Помилка завантаження!</span>
            ) : null}
            {isLoading ? <span className="text-xl text-center font-semibold">Завантаження...</span> : null}
            {users ? <UsersTable users={users} /> : null}
        </section>
    )
}

export default UsersSection
