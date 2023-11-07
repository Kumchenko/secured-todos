'use client'
import { memo, useState } from 'react'
import CaptchaView from './CaptchaView'
import { PaperAirplaneIcon, ArrowPathIcon } from '@heroicons/react/20/solid'

const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*'

const generateCaptcha = (length = 4) => {
    return new Array(length)
        .fill('')
        .map(v => chars[Math.round(Math.random() * chars.length)])
        .join('')
}

type CaptchaFormProps = {
    className?: string
    setResult: (isSuccess: boolean) => void
    setTouched: () => void
    error?: string
}

const CaptchaForm = ({ className, setResult, setTouched, error }: CaptchaFormProps) => {
    const [value, setValue] = useState('')
    const [captcha, setCaptcha] = useState(generateCaptcha())
    const [disableField, setDisableField] = useState(false)
    const handleReset = () => {
        setValue('')
        setDisableField(false)
        setCaptcha(generateCaptcha())
    }
    const handleSubmit = () => {
        setResult(value === captcha)
        setDisableField(value === captcha)
        if (value !== captcha) {
            alert('Неправильно розгадана Капча!')
            handleReset()
        }
    }

    return (
        <div className={`flex flex-col ${className}`}>
            <label htmlFor="captcha">Капча</label>
            <div className={`flex flex-col`}>
                <div className="flex">
                    <CaptchaView className="flex-grow" captcha={captcha} />
                    <div className="flex flex-col">
                        <button onClick={handleReset} type="button" className="bg-orange-400 p-1">
                            <ArrowPathIcon className="w-4 h-4" />
                        </button>
                        <button
                            disabled={disableField}
                            onClick={handleSubmit}
                            type="button"
                            className="bg-emerald-400 p-1"
                        >
                            <PaperAirplaneIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <input
                    onBlur={() => setTouched()}
                    disabled={disableField}
                    className="max-w-full min-w-full w-5"
                    id="captcha"
                    type="text"
                    name="captcha"
                    value={value}
                    onChange={e => setValue(e.currentTarget.value)}
                />
            </div>
            <span className="text-red-500">{error}</span>
        </div>
    )
}

export default memo(CaptchaForm)
