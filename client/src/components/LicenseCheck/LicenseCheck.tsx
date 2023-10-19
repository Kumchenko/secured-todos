'use client'
import { showLicenseModal } from '@/utils/showModal'
import { useEffect } from 'react'
import { licenseInterval } from '@/constants'
import { isKeyValid } from '@/utils/isKeyValid'

const LicenseCheck = () => {
    useEffect(() => {
        const interval = setInterval(() => {
            if (typeof window !== 'undefined' && !isKeyValid(window.localStorage.getItem('key'))) {
                showLicenseModal()
            }
        }, licenseInterval)
        return () => clearInterval(interval)
    }, [])
    return null
}

export default LicenseCheck
