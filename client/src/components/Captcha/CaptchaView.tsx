'use client'
import { memo, useEffect, useRef } from 'react'

const _captchaColors = ['blue', 'black', 'red']

const CaptchaView = ({
    width = 80,
    height = 40,
    captcha,
    className,
}: {
    width?: number
    height?: number
    captcha: string
    className?: string
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d', { willReadFrequently: true })
        if (ctx) {
            const captchaColor = _captchaColors[Math.round(Math.random() * _captchaColors.length)]
            const fontSize = Math.round(Math.random() * 4) + 23
            const bgR = Math.round(Math.random() * 35) + 180
            const bgG = Math.round(Math.random() * 35) + 180
            const bgB = Math.round(Math.random() * 35) + 180

            ctx.fillStyle = `rgba(${bgR},${bgG},${bgB},0.4)`
            ctx.fillRect(0, 0, width, height)

            ctx.font = `${fontSize}px Georgia`
            ctx.fillStyle = captchaColor
            ctx.fillText(captcha, 0, 30)

            const data = ctx.getImageData(0, 0, width, height)
            let buffer = new Uint32Array(data.data.buffer)

            for (let i = 0; i < buffer.length; i++) {
                buffer[i] = Math.random() < 0.35 ? buffer[i] << 1 : buffer[i]
            }
            ctx.putImageData(data, 0, 0)
        }
    }, [captcha, width, height])

    return (
        <canvas className={className} ref={canvasRef} width={width} height={height}>
            It's captcha
        </canvas>
    )
}

export default memo(CaptchaView)
