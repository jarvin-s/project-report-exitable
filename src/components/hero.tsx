'use client'

import Image from 'next/image'
import { Gradient } from'@/lib/Gradient'
import { useEffect } from 'react'

export default function Hero() {
    useEffect(() => {
        const gradient = new Gradient()
        // @ts-ignore
        gradient.initGradient('#gradient-canvas')
    }, [])
    return (
        <section className='relative isolate flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 py-16 sm:min-h-[75vh] sm:px-10 sm:py-20 md:px-16 md:py-32 lg:px-40 lg:py-40'>
            <canvas id='gradient-canvas' data-transition-in className='absolute inset-0 -z-10'/>
            <div className='relative z-10 flex w-full max-w-4xl flex-col items-center justify-center'>
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
                <h2 className='mt-6 text-center text-4xl font-bold text-[#fcfcfc] md:mt-10 md:text-6xl'>
                    Project Report{' '}
                </h2>
                <Image
                    src='/exitable.svg'
                    alt='Exitable'
                    width={500}
                    height={500}
                    sizes='(max-width: 640px) 55vw, (max-width: 1024px) 30vw, 250px'
                    className='mt-6 h-auto w-48 sm:mt-8 lg:w-72'
                    loading='eager'
                />
            </div>
            </section>
    )
}