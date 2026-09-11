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
    return (
        <section className='flex h-[60vh] flex-col items-center justify-center text-black'>
            <h1 className='header-text text-6xl font-bold'>Contents</h1>
            <nav aria-label='Table of contents' className='mt-12 px-6'>
                <ol className='flex flex-col items-start justify-center gap-4'>
                    {sections.map((section, index) => (
                        <li key={section.href}>
                            <a
                                href={section.href}
                                className='group flex items-baseline gap-2 text-2xl transition-colors hover:text-[#ff631c] focus-visible:text-[#ff631c] focus-visible:outline-none'
                            >
                                <span className='header-text w-6 shrink-0 text-xl text-[#ff631c]'>
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
        </section>
    )
}
