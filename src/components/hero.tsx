import Image from 'next/image'
// import AnimatedGradient from '@/components/animated-gradient'

export default function Hero() {
    return (
        <>
            {/* <AnimatedGradient /> */}
            <div className='relative z-10 flex flex-col items-center justify-center p-10 md:p-40'>
                <Image
                    src='/exitable-logo.jpeg'
                    alt='Exitable Logo'
                    width={200}
                    height={200}
                    sizes='20vw'
                    className='h-auto'
                    loading='eager'
                    priority
                />
                <h2 className='mt-10 text-4xl font-bold text-[#fcfcfc] md:text-6xl'>
                    Project Report{' '}
                </h2>
                <Image
                    className='mt-4 h-auto'
                    src='/exitable.svg'
                    alt='Exitable'
                    width={250}
                    height={250}
                />
            </div>
            <div className='absolute top-0 left-0 z-[-1]'>
                <video
                    loop
                    playsInline
                    preload='auto'
                    className='size-full object-cover object-center'
                >
                    <source
                        src='/videos/hero-gradient.webm'
                        type='video/webm'
                    />
                    <source src='/videos/hero-gradient.mp4' type='video/mp4' />
            </video>
            </div>
        </>
    )
}
