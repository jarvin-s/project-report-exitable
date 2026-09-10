const sections = [
    { href: '#assignment', label: 'The Assignment' },
    { href: '#description', label: 'Description' },
    {
        href: '#conclusion',
        label: 'Conclusion and Recommendation',
    },
    { href: '#reflection', label: 'Personal Reflection' },
] as const

export default function Content() {
    return (
        <section className='h-[80vh] bg-linear-to-br from-[#ff631c] via-[#a19c9a] to-[#db6c39]'>
            <div className='flex flex-col items-center justify-center text-white'>
                <h1 className='header-text mt-10 text-6xl font-bold'>
                    Contents
                </h1>
                <nav
                    aria-label='Table of contents'
                    className='mt-12 w-full max-w-xl px-6'
                >
                    <ol className='flex flex-col gap-4'>
                        {sections.map((section, index) => (
                            <li key={section.href}>
                                <a
                                    href={section.href}
                                    className='group flex items-baseline gap-2 text-2xl text-white transition-colors hover:text-[#ff631c] focus-visible:text-[#ff631c] focus-visible:outline-none'
                                >
                                    <span className='header-text w-8 shrink-0 text-lg text-[#ff631c]'>
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span className='border-b border-transparent group-hover:border-[#ff631c]'>
                                        {section.label}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
        </section>
    )
}
