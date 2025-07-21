import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import HoverButton from '@/components/HoverButton'
import gsap from '@/utils/gsap'

type ProjectData = {
    image: string;
    title: string;
    slug: string;
    subTitle: string;
    link: string;
}

type Props = {
    project: ProjectData;
}

export default function WorkHero({ project }: Props) {
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
                        <Image priority className='background-item' src={project.image} fill alt={project.title} />
                    </div>
                </div>
                {/* Content */}
                <div className='project-content'>
                    <div className='content-title'>
                        <div className='overflow-hidden'>
                            <p ref={titleRef} className={`title text-white font-poppins`}>{project.title}</p>
                        </div>
                        <div className='flex flex-row justify-between items-center'>
                            <p ref={subTitleRef} className='text-white text-lg sub-title'>{project.subTitle}</p>
                            <HoverButton ref={btnRef} label='Visit Website' href='#' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
