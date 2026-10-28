import type { Metadata } from 'next'
import Description from '@/components/description'

export const metadata: Metadata = {
    title: 'Description - Project Report Exitable',
}

export default function DescriptionPage() {
    return (
        <main className='px-4 pt-28 pb-10'>
            <Description />
        </main>
    )
}
