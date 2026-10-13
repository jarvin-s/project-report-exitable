import type { Metadata } from 'next'
import ConclusionRecommendation from '@/components/conclusion-recommendation'

export const metadata: Metadata = {
    title: 'Conclusion - Project Report Exitable',
}

export default function ConclusionPage() {
    return (
        <main className='px-4 pt-28 pb-10'>
            <ConclusionRecommendation />
        </main>
    )
}
