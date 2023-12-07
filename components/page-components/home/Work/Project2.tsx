import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { SparklesIcon } from '@heroicons/react/24/solid'
import headingFont from '@/utils/fonts/heading'
import gsap from 'gsap-trial'

export default function Project2() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const titleRef = useRef<HTMLParagraphElement>(null)
    let animationRef = useRef<any>(null)

    useEffect(() => {
        if (titleRef.current) {
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
        }
    }, [titleRef.current])

    const onMouseEnter = () => {
        videoRef.current?.play()
        if (titleRef.current && animationRef.current) {
            animationRef.current.reversed() ? animationRef.current.play() : animationRef.current.reverse();
        }
    }

    const onMouseLeave = () => {
        videoRef.current?.pause()
        videoRef.current!.currentTime = 0

        if (titleRef.current && animationRef.current) {
            animationRef.current.reversed() ? animationRef.current.play() : animationRef.current.reverse();
        }
    }

    return (
        <>
            <div className='project'>
                <div className='flex flex-row space-x-2 items-center'>
                    <SparklesIcon className='h-4 w-4'/>
                    <p className={`text-lg ${headingFont.className}`}>Featured Projects</p>
                </div>
                <p className='mt-20 text-2xl'>Highlights of cases that we passionately built with forward-thinking clients and friends over the year</p>

                <div id="project2" className='mt-72 w-full relative project-container' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    <Image className='img' src="/assets/img/rino-pelle-hero.webp" alt="Project 2" fill/>
                    <video ref={videoRef} playsInline loop muted disablePictureInPicture className='video'>
                        <source src='/assets/video/hover-rino.mp4' type='video/mp4'/>
                    </video>
                    <div className='title relative'>
                        <p ref={titleRef} className='relative overflow-hidden'>
                            <strong>Rino & Pelle</strong>
                            Effortless chic lifestyle
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
