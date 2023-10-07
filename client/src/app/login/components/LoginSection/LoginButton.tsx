import { IdentifyStatus } from '@/interfaces'
import { MouseEventHandler, useMemo } from 'react'

const LoginButton = ({ isIdentified, isError }: { isIdentified: IdentifyStatus | null; isError: boolean }) => {
    const buttonText = useMemo(() => {
        if (isError) {
            return 'Виникла помилка'
        }
        switch (isIdentified) {
            case null: {
                return 'Ідентифікувати'
            }
            case IdentifyStatus.Ok: {
                return 'Увійти'
            }
            case IdentifyStatus.New: {
                return 'Активувати акаунт'
            }
            default: {
                const _exhaustiveCheck: never = isIdentified
                return 'Необроблене виключення'
            }
        }
    }, [isError, isIdentified])

    return (
        <button disabled={isError} className={`${isError ? 'bg-red-400' : 'bg-emerald-400'} p-1`} type="submit">
            {buttonText}
        </button>
    )
}

export default LoginButton
