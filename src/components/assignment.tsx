import Link from 'next/link'

export default function Assignment() {
    return (
        <section id='assignment' className='mt-10 scroll-mt-8'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='header-text text-6xl font-bold'>
                    The Assignment
                </h1>
                <div className='flex max-w-2xl flex-col gap-4'>
                    <p className='mt-4 px-2 text-center text-lg md:px-0 md:text-left'>
                        The assignment is to build a headless frontend what
                        works with Craft CMS and integrates with GraphQL,
                        preferably with a familiar stack.
                    </p>
                    <p className='px-2 text-center text-lg md:px-0 md:text-left'>
                        I was looking for a middle ground between
                        content-driven websites and fully headless web
                        applications: a hybrid stack that combines the
                        flexibility of{' '}
                        <Link
                            href='https://craftcms.com/'
                            target='_blank'
                            rel='noreferrer'
                            className='text-blue-500 hover:text-blue-600 hover:underline'
                        >
                            Craft CMS
                        </Link>{' '}
                        with the interactivity of a modern frontend.
                    </p>

                    <p className='px-2 text-center text-lg md:px-0 md:text-left'>
                        The solution was a hybrid architecture using Craft CMS
                        for content management and a modern frontend connected
                        through{' '}
                        <Link
                            href='https://graphql.org/'
                            target='_blank'
                            rel='noreferrer'
                            className='text-blue-500 hover:text-blue-600 hover:underline'
                        >
                            GraphQL
                        </Link>
                        . This allowed me to keep the strengths of Craft while
                        giving the frontend the freedom and flexibility needed
                        for richer interactive experiences.
                    </p>
                </div>
            </div>
        </section>
    )
}
