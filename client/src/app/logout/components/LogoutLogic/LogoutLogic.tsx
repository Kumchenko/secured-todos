'use client'
import api from '@/services'
import { logoutUser } from '@/services/user'
import { useAppDispatch } from '@/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const LogoutLogic = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    useEffect(() => {
        logoutUser()
            .catch(() => console.error('Error occured while logging out'))
            .finally(() => {
                dispatch(api.util.resetApiState())
                router.push('/login')
            })
    }, [dispatch, router])
    return null
}

export default LogoutLogic
