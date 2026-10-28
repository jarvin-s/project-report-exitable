import type { Metadata } from 'next'
import Reflection from '@/components/reflection'

export const metadata: Metadata = {
    title: 'Personal Reflection - Project Report Exitable',
}

export default function ReflectionPage() {
    return (
        <main className='px-4 pt-28 pb-10'>
            <Reflection />
        </main>
    )
}
