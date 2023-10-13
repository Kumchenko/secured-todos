import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { endpoints, securedPages } from '@/constants'
import { Role, User } from '@/interfaces'
import { Jwt } from '@/utils/Jwt'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies()
    const token = cookieStore.get('refresh_token')
    const decoded = Jwt.verify<User>(token?.value)
    const headersList = headers()

    if (!decoded) {
        redirect('/logout')
    }

    securedPages.forEach(page => {
        if (headersList.get('x-url')?.endsWith(page.href)) {
            if (!page.roles.includes(decoded.role)) {
                redirect('/')
            }
        }
    })

    return (
        <>
            <Header endpoints={endpoints} />
            <main className="p-4">{children}</main>
            <Footer />
        </>
    )
}
