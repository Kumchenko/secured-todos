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
        dispatch(api.util.resetApiState())
        logoutUser()
        router.push('/login')
    }, [])
    return null
}

export default LogoutLogic
