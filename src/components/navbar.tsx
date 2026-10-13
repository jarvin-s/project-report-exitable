'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { reportNav } from '@/lib/report-nav'

export default function Navbar() {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const pinned = pathname !== '/' || scrolled

    useEffect(() => {
        const update = () => setScrolled(window.scrollY > 48)

        update()
        window.addEventListener('scroll', update, { passive: true })

        return () => window.removeEventListener('scroll', update)
    }, [])

    return (
        <header
            className={[
                'fixed z-50 flex top-10 left-1/2 -translate-x-1/2 flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-3 transition-all duration-300',
                pinned
                    ? 'top-5 translate-y-0 rounded-full border border-[#ff631c] bg-[#fefefe]/95'
                    : 'top-1/2 -translate-y-1/2',
            ].join(' ')}
        >
            <nav aria-label='Report'>
                <ul className='flex flex-wrap justify-center gap-x-6 gap-y-2'>
                    {reportNav.map((item) => {
                        const isActive = pathname === item.href

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={[
                                        'text-lg transition-colors',
                                        pinned
                                            ? isActive
                                                ? 'text-[#ff631c]'
                                                : 'text-[#0b0b0b] hover:text-[#ff631c]'
                                            : isActive
                                              ? 'text-white underline decoration-[#ff631c] underline-offset-4'
                                              : 'text-white/90 hover:text-white',
                                    ].join(' ')}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </header>
    )
}
