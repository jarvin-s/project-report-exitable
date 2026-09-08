'use client'

import { useEffect, useRef } from 'react'

const COLOR_VARS = [
    '--gradient-color-1',
    '--gradient-color-2',
    '--gradient-color-3',
    '--gradient-color-4',
] as const

type Wave = {
    colorIndex: number
    fill: 'down' | 'up'
    baseline: number
    amplitude: number
    wavelength: number
    speed: number
    harmonic: number
    alpha: number
}

const WAVES: Wave[] = [
    {
        colorIndex: 1,
        fill: 'down',
        baseline: 0.3,
        amplitude: 0.18,
        wavelength: 380,
        speed: 0.62,
        harmonic: 1.1,
        alpha: 1,
    },
    {
        colorIndex: 0,
        fill: 'up',
        baseline: 0.36,
        amplitude: 0.16,
        wavelength: 420,
        speed: -0.48,
        harmonic: 0.75,
        alpha: 0.92,
    },
    {
        colorIndex: 2,
        fill: 'down',
        baseline: 0.66,
        amplitude: 0.09,
        wavelength: 260,
        speed: 0.95,
        harmonic: 1.35,
        alpha: 0.58,
    },
    {
        colorIndex: 3,
        fill: 'down',
        baseline: 0.8,
        amplitude: 0.07,
        wavelength: 300,
        speed: -0.7,
        harmonic: 0.85,
        alpha: 0.5,
    },
]

export default function AnimatedGradient() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d', { alpha: false })
        if (!ctx) return

        const styles = getComputedStyle(canvas)
        const colors = COLOR_VARS.map((variable) =>
            styles.getPropertyValue(variable).trim()
        )

        let frame = 0
        let time = 0
        let last = performance.now()
        const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches

        const resize = () => {
            const parent = canvas.parentElement
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            const width = parent?.clientWidth ?? window.innerWidth
            const height = parent?.clientHeight ?? 600

            canvas.width = Math.max(1, Math.floor(width * dpr))
            canvas.height = Math.max(1, Math.floor(height * dpr))
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }

        const paintWave = (wave: Wave, width: number, height: number) => {
            const color = colors[wave.colorIndex]
            const baseline = height * wave.baseline
            const amplitude = height * wave.amplitude
            const step = 3

            ctx.beginPath()
            if (wave.fill === 'down') {
                ctx.moveTo(0, height)
            } else {
                ctx.moveTo(0, 0)
            }

            for (let x = 0; x <= width + step; x += step) {
                const n = x / wave.wavelength
                const y =
                    baseline +
                    Math.sin(n + time * wave.speed) * amplitude +
                    Math.sin(n * 2.2 + time * wave.speed * wave.harmonic) *
                        amplitude *
                        0.32
                ctx.lineTo(x, y)
            }

            if (wave.fill === 'down') {
                ctx.lineTo(width, height)
            } else {
                ctx.lineTo(width, 0)
            }

            ctx.closePath()
            ctx.globalAlpha = wave.alpha
            ctx.fillStyle = color
            ctx.fill()
            ctx.globalAlpha = 1
        }

        const render = (now: number) => {
            const width = canvas.clientWidth
            const height = canvas.clientHeight
            const delta = Math.min((now - last) / 1000, 0.05)
            last = now

            if (!reduceMotion) {
                time += delta
            }

            ctx.filter = 'none'
            ctx.fillStyle = colors[0] || '#ff631c'
            ctx.fillRect(0, 0, width, height)

            ctx.filter = 'blur(30px)'
            for (const wave of WAVES) {
                paintWave(wave, width, height)
            }
            ctx.filter = 'none'

            frame = requestAnimationFrame(render)
        }

        resize()
        render(last)

        const observer = new ResizeObserver(resize)
        if (canvas.parentElement) {
            observer.observe(canvas.parentElement)
        }

        window.addEventListener('resize', resize)

        return () => {
            cancelAnimationFrame(frame)
            observer.disconnect()
            window.removeEventListener('resize', resize)
        }
    }, [])

    return <canvas ref={canvasRef} className='hero-gradient' aria-hidden />
}
