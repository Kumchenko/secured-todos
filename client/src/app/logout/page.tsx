import { Metadata } from 'next'
import LogoutLogic from './components/LogoutLogic/LogoutLogic'

export const metadata: Metadata = {
    title: 'Logging out',
}

export default function Logout() {
    return (
        <main className="min-h-[100vh] flex flex-col justify-center items-center gap-2">
            <LogoutLogic />
            Вихід з програми...
        </main>
    )
}
