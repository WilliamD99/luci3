import React, { useRef } from 'react'
import Image from 'next/image'
import { SparklesIcon } from '@heroicons/react/24/solid'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Project2() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const titleRef = useRef<HTMLParagraphElement>(null)
    let animationRef = useRef<any>(null)

    let { contextSafe } = useGSAP(() => {
        let animation = gsap.timeline({ paused: true })
        animation.reversed(true)

        gsap.set(titleRef.current, { autoAlpha: 1 })

        animation.fromTo(
            titleRef.current, {
            y: 50,
        }, {
            y: 0
        }
        )

        animationRef.current = animation
    }, [])

    const onMouseEnter: any = contextSafe(() => {
        videoRef.current?.play()

        if (titleRef.current && animationRef.current) {
            animationRef.current.reversed() ? animationRef.current.play() : animationRef.current.reverse();
        }
    })

    const onMouseLeave: any = contextSafe(() => {
        videoRef.current?.pause()
        videoRef.current!.currentTime = 0

        if (titleRef.current && animationRef.current) {
            animationRef.current.reversed() ? animationRef.current.play() : animationRef.current.reverse();
        }
    })

    return (
        <>
            <div className='project'>
                <div className='hidden lg:flex flex-row space-x-2 items-center'>
                    <SparklesIcon className='h-4 w-4' />
                    <p className={`text-lg xl2:text-3xl font-bold font-nunito`}>Featured Projects</p>
                </div>
                <p className='mt-20 text-sm hidden lg:block font-nunito'>Highlights of cases that we passionately built with forward-thinking clients and friends over the year</p>

                <div id="project2" className='mt-36 lg:mt-72 w-full relative project-container' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    <Image className='img' src="/assets/img/rino-pelle-hero.webp" alt="Project 2" fill />
                    <video ref={videoRef} playsInline loop muted disablePictureInPicture className='video'>
                        <source src='/assets/video/hover-rino.mp4' type='video/mp4' media="(min-width: 768px)" />
                    </video>
                    <div className='title hidden lg:block relative'>
                        <p ref={titleRef} className='relative overflow-hidden font-poppins'>
                            <strong>Rino & Pelle</strong>
                            Effortless chic lifestyle
                        </p>
                    </div>
                    <div className='title relative lg:hidden'>
                        <p className='relative overflow-hidden flex flex-col lg:block font-nunito'>
                            <strong>Rino & Pelle</strong>
                            Effortless chic lifestyle
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
