import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import HoverButton from '@/components/HoverButton'
import headingFont from '@/utils/fonts/heading'
import gsap from '@/utils/gsap'

export default function WorkHero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const bgRef = useRef<HTMLDivElement>(null)

    const titleRef = useRef<HTMLParagraphElement>(null)
    const subTitleRef = useRef<HTMLParagraphElement>(null)
    const btnRef = useRef<any>(null)

    useGSAP(() => {
        let tl = gsap.timeline({
          defaults: { duration: 1.1, ease: "power4.inOut" }
        })
    
        tl.to(titleRef.current, {
          y: 0
        })
        tl.to(subTitleRef.current, {
          autoAlpha: 1
        }, "<0.5")
        tl.to(btnRef.current, {
          autoAlpha: 1
        })
    }, { scope: containerRef })

    return (
        <>
            <div ref={containerRef} id="work_hero" className='relative'>
                {/* Background */}
                <div className='absolute project-hero w-full h-screen -z-10'>
                    <div className='background-wrapper' ref={bgRef}>
                        <Image priority className='background-item' src="/assets/img/home-news-4.webp" fill alt="project-1" />                     
                    </div>
                </div>
                {/* Content */}
                <div className='project-content'>
                    <div className='content-title'>
                    <div className='overflow-hidden'>
                        <p ref={titleRef} className={`title text-white ${headingFont.className}`}>Pixelflakes</p>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <p ref={subTitleRef} className='text-white text-lg sub-title'>Architectural marketing agency</p>
                        <HoverButton ref={btnRef} label='Visit Website' href='#'/>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}
