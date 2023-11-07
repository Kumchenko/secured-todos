import ReCaptcha from 'react-google-recaptcha'
import { siteKey } from '@/constants'
import { useEffect, useRef } from 'react'

type GoogleCaptchaProps = { isShown?: boolean | null; setResult: () => void; error?: string }

const GoogleCaptcha = ({ isShown, setResult, error }: GoogleCaptchaProps) => {
    const captchaRef = useRef<ReCaptcha>(null)

    useEffect(() => {
        if (!isShown) {
            captchaRef.current?.reset()
        }
    }, [isShown])
    if (!isShown) return null

    return (
        <>
            {error && <span className="text-center text-red-500">{error}</span>}
            <ReCaptcha ref={captchaRef} theme="dark" onChange={setResult} sitekey={siteKey} />
        </>
    )
}

export default GoogleCaptcha
