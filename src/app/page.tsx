import Assignment from '@/components/assignment'
import Spacer from '@/components/common/spacer'
import ConclusionRecommendation from '@/components/conclusion-recommendation'
import Content from '@/components/content'
import Description from '@/components/description'
import Hero from '@/components/hero'
import Reflection from '@/components/reflection'

export default function Home() {
    return (
        <>
            <Hero />
            <Spacer />
            <Content/>
            <Spacer />
            <Assignment />
            <Spacer />
            <Description/>
            <Spacer />
            <ConclusionRecommendation/>
            <Spacer />
            <Reflection/>
        </>
    )
}
