import LoginSection from './components/LoginSection/LoginSection'
import CaptchaForm from '@/components/Captcha/CaptchaForm'

const LoginPage = () => {
    return (
        <main className="min-h-[100vh] flex flex-col justify-center items-center gap-2">
            <LoginSection />
        </main>
    )
}

export default LoginPage
