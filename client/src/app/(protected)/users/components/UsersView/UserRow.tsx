import { User } from '@/interfaces'
import {
    useBlockUserMutation,
    useGetUsersQuery,
    useRestrictUserMutation,
    useUnblockUserMutation,
} from '@/services/user'
import { memo, useCallback } from 'react'

const UserRow = ({ user }: { user: User }) => {
    const { login, count, restricted, role } = user

    const [blockUser] = useBlockUserMutation()
    const [unblockUser] = useUnblockUserMutation()
    const [restrictUser] = useRestrictUserMutation()

    const isLocked = count <= 0

    const handleBlockClick = useCallback(() => {
        isLocked ? unblockUser(login) : blockUser(login)
    }, [blockUser, isLocked, login, unblockUser])

    const handleRestrictClick = useCallback(() => {
        restrictUser({ login, restricted: !restricted })
    }, [login, restrictUser, restricted])

    return (
        <tr className="p-1 [&>*]:border" key={login}>
            <td>{login}</td>
            <td>{role}</td>
            <td className="flex gap-2 justify-center items-center">
                <span className="font-semibold text-lg">{count}</span>
                <button onClick={handleBlockClick} className={`${isLocked ? 'bg-emerald-400' : 'bg-red-500'} p-1`}>
                    {isLocked ? 'Розблокувати' : 'Заблокувати'}
                </button>
            </td>
            <td className="text-center">
                <button onClick={handleRestrictClick} className={`${restricted ? 'bg-emerald-400' : 'bg-red-500'} p-1`}>
                    {restricted ? 'Зняти обмеження' : 'Обмежити'}
                </button>
            </td>
        </tr>
    )
}

export default memo(UserRow)
