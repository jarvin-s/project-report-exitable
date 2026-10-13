import type { Metadata, Viewport } from 'next'
import { DM_Sans, Anton } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'

const dmSans = DM_Sans({
    subsets: ['latin'],
    variable: '--font-dm-sans',
})

const anton = Anton({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-anton',
})

export const metadata: Metadata = {
    title: 'Project Report Exitable - Jarvin Siegers',
    description: "Jarvin's Project Report for the internship at Exitable",
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html
            lang='en'
            className={`${dmSans.className} ${anton.variable} scroll-smooth`}
        >
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    )
}
