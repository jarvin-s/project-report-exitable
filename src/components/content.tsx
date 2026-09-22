'use client'

import { useEffect, useRef } from 'react'
import { createTimeline, stagger } from 'animejs'
import { onScroll } from 'animejs/events'
import Link from 'next/link'

const sections = [
    { href: '#assignment', label: 'The Assignment' },
    { href: '#description', label: 'Description' },
    {
        href: '#conclusion',
        label: 'Conclusion',
    },
    { href: '#reflection', label: 'Personal Reflection' },
] as const

export default function Content() {
    const contentRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const content = contentRef.current

        if (!content) return

        const timeline = createTimeline({
            defaults: { ease: 'outExpo' },
            autoplay: onScroll({
                target: content,
                enter: 'bottom 50%',
                repeat: false,
            }),
        }).add(content, {
            opacity: [0, 1],
            y: [24, 0],
            duration: 900,
            delay: stagger(100, {
                from: 'first',
            }),
        })

        return () => {
            timeline.revert()
        }
    }, [])
    return (
        <>
            <section
                ref={contentRef}
                className='relative flex h-[70vh] flex-col items-center justify-center text-[#0b0b0b] opacity-0'
            >
                <h1 className='header-text text-5xl md:text-6xl font-bold'>
                    Table of Contents
                </h1>
                <nav aria-label='Table of contents' className='mt-12 px-6'>
                    <ol className='flex flex-col items-start justify-center gap-4'>
                        {sections.map((section, index) => (
                            <li key={section.href}>
                                <Link
                                    href={section.href}
                                    className='group flex items-baseline gap-2 text-2xl transition-colors hover:text-[#ff631c] focus-visible:text-[#ff631c] focus-visible:outline-none'
                                >
                                    <span className='header-text w-6 shrink-0 text-xl text-[#ff631c]'>
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span className='border-b border-transparent group-hover:border-[#ff631c]'>
                                        {section.label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ol>
                </nav>
                {/* <div
                    className='pointer-events-none absolute inset-0 z-[-999]'
                    aria-hidden='true'
                >
                    <Image
                        src='/content-bg.jpeg'
                        alt='Table of Contents background'
                        fill
                        draggable={false}
                        loading='eager'
                    />
                </div> */}
            </section>
        </>
    )
}
