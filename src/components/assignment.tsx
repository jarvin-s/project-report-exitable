'use client'

import { useEffect, useRef } from 'react'
import { createTimeline, stagger } from 'animejs'
import { onScroll } from 'animejs/events'

export default function Assignment() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        let timeline: ReturnType<typeof createTimeline> | undefined
        let frame = 0

        frame = requestAnimationFrame(() => {
            const section = sectionRef.current
            if (!section) return

            const title = section.querySelector('h1')
            const blocks = section.querySelectorAll('.assignment-block')

            if (!title || !blocks.length) return

            title.style.opacity = '0'
            blocks.forEach((block) => {
                ;(block as HTMLElement).style.opacity = '0'
            })

            const scrollObserver = onScroll({
                target: section,
                enter: 'bottom 50%',
                repeat: false,
            })

            timeline = createTimeline({
                defaults: { ease: 'outExpo' },
                autoplay: scrollObserver,
            })
                .add(title, {
                    opacity: [0, 1],
                    y: [24, 0],
                    duration: 800,
                })
                .add(
                    blocks,
                    {
                        opacity: [0, 1],
                        y: [24, 0],
                        duration: 800,
                        delay: stagger(150),
                    },
                    '-=500'
                )
        })

        return () => {
            cancelAnimationFrame(frame)
            timeline?.cancel()
        }
    }, [])

    return (
        <section id='assignment' ref={sectionRef} className='scroll-mt-8'>
            <div className='flex flex-col items-center p-4'>
                <h1 className='header-text text-6xl font-bold'>
                    The Assignment
                </h1>
                <div className='flex max-w-2xl flex-col gap-4'>
                    <div className='assignment-block'>
                        <h2 className='mt-4 px-2 text-2xl font-bold md:px-0'>
                            Description
                        </h2>
                        <p className='px-2 text-lg md:px-0 md:text-left'>
                            For my internship at Exitable, I will research and
                            build a modern, headless frontend solution that
                            communicates with Craft CMS via GraphQL. I will
                            also explore a frontend solution that fits
                            Exitable&apos;s requirements, using CMS Starter as
                            the API layer.
                        </p>
                    </div>

                    <div className='assignment-block'>
                        <h2 className='mt-2 px-2 text-2xl font-bold md:px-0'>
                            Problem & opportunity
                        </h2>
                        <p className='px-2 text-lg mb-4 md:px-0 md:text-left'>
                            Exitable currently builds websites in two ways:
                            Content-driven sites use Craft CMS as a monolith
                            with TypeScript and Twig, focused on design, SEO and
                            content management. Headless webapps use Laravel
                            with Vue or Nuxt: separate frontend and backend apps
                            connected through a REST API, suited for complex
                            workflows like advanced calculators.
                        </p>
                        <p className='px-2 text-lg mb-4 md:px-0 md:text-left'>
                            More and more Exitable gets clients that want a
                            hybrid approach. Clients want a visual website with
                            strong branding and content managed in Craft CMS,
                            combined with interactive components like dynamic
                            product filters, dealer maps and calculation tools.
                        </p>
                        <p className='px-2 text-lg mb-4 md:px-0 md:text-left'>
                            In Exitable&apos;s monolithic Craft CMS setup, the
                            frontend often hits limits on interactivity.
                            Interactive components can be added, but integration
                            is difficult, hard to align with UI and branding,
                            and difficult to maintain. The Laravel webapp stack
                            offers more room for interactivity, but weaker
                            content management than Craft CMS, and using a REST
                            API for content is time intensive.
                        </p>
                        <p className='px-2 text-lg md:px-0 md:text-left'>
                            That&apos;s why Exitable is looking for a solution:
                            a hybrid stack. My assignment is to research and
                            validate that approach as a reusable blueprint for
                            future projects.
                        </p>
                    </div>

                    <div className='assignment-block'>
                        <h2 className='mt-2 px-2 text-2xl font-bold md:px-0'>
                            Goals
                        </h2>
                        <p className='px-2 text-lg md:px-0 md:text-left'>
                            My goal is to deliver a reusable Proof of Concept
                            that Exitable can use as a blueprint for new hybrid
                            projects. I will meet the essential baseline
                            criteria for the frontend solution. If I have enough
                            time, I will also work toward optional bonus goals.
                        </p>
                    </div>

                    <div className='assignment-block'>
                        <h2 className='mt-2 px-2 text-2xl font-bold md:px-0'>
                            Context
                        </h2>
                        <p className='px-2 text-lg md:px-0 md:text-left'>
                            Craft CMS is well suited for headless setups, and
                            GraphQL is a standard feature. Exitable&apos;s
                            projects use CMS Starter, a base Craft CMS
                            installation with the company&apos;s best practices.
                            Craft version 6 releases later this year, however
                            for this assignment I will use version 5.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
