'use client'

import Image from 'next/image'
import { Gradient } from '@/lib/Gradient'
import { createTimeline } from 'animejs'
import { useEffect, useRef } from 'react'

export default function Hero() {
    const logoRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const wordmarkRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const gradient = new Gradient()
        // @ts-expect-error - Gradient is not typed
        gradient.initGradient('#gradient-canvas')
    }, [])

    useEffect(() => {
        const logo = logoRef.current
        const title = titleRef.current
        const wordmark = wordmarkRef.current

        if (!logo || !title || !wordmark) return

        const timeline = createTimeline({ defaults: { ease: 'outExpo' } })
            .add(logo, {
                delay: 500,
                opacity: [0, 1],
                y: [32, 0],
                duration: 900,
            })
            .add(
                title,
                {
                    opacity: [0, 1],
                    y: [24, 0],
                    duration: 800,
                },
                '-=550'
            )
            .add(
                wordmark,
                {
                    opacity: [0, 1],
                    y: [24, 0],
                    duration: 800,
                },
                '-=500'
            )

        return () => {
            timeline.revert()
        }
    }, [])

    return (
        <section className='relative isolate flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 py-16 sm:min-h-[75vh] sm:px-10 sm:py-20 md:px-16 md:py-32 lg:px-40 lg:py-40'>
            <canvas
                id='gradient-canvas'
                data-transition-in
                className='absolute inset-0 -z-10 pointer-events-none'
            />
            <div className='relative z-10 flex w-full max-w-4xl flex-col items-center justify-center'>
                <div ref={logoRef} className='opacity-0'>
                    <Image
                        src='/exitable-logo.jpeg'
                        alt='Exitable Logo'
                        width={800}
                        height={800}
                        sizes='(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 208px'
                        className='h-auto w-32 sm:w-40 md:w-48 lg:w-52'
                        loading='eager'
                        priority
                    />
                </div>
                <h2
                    ref={titleRef}
                    className='mt-6 text-center text-4xl font-bold text-[#fcfcfc] opacity-0 md:mt-10 md:text-6xl'
                >
                    Project Report
                </h2>
                <div ref={wordmarkRef} className='mt-6 opacity-0 sm:mt-8'>
                    <Image
                        src='/exitable.svg'
                        alt='Exitable'
                        width={500}
                        height={500}
                        sizes='(max-width: 640px) 55vw, (max-width: 1024px) 30vw, 250px'
                        className='h-auto w-48 lg:w-72'
                        loading='eager'
                    />
                </div>
            </div>
        </section>
    )
}
