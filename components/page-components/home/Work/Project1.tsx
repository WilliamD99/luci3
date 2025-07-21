import React, { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { isElementInDOM } from '@/utils/domSafeGSAP'

export default function Project1() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const titleRef = useRef<HTMLParagraphElement>(null)

    let animationRef = useRef<any>(null)

    let { contextSafe } = useGSAP(() => {
        if (!titleRef.current || !isElementInDOM(titleRef.current)) return;

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

        // Cleanup function
        return () => {
            if (animationRef.current) {
                animationRef.current.kill();
                animationRef.current = null;
            }
        };
    }, [])

    const onMouseEnter: any = contextSafe(() => {
        if (videoRef.current && isElementInDOM(videoRef.current)) {
            videoRef.current.play();
        }

        if (titleRef.current && animationRef.current && isElementInDOM(titleRef.current)) {
            animationRef.current.reversed() ? animationRef.current.play() : animationRef.current.reverse();
        }
    })

    const onMouseLeave: any = contextSafe(() => {
        if (videoRef.current && isElementInDOM(videoRef.current)) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }

        if (titleRef.current && animationRef.current && isElementInDOM(titleRef.current)) {
            animationRef.current.reversed() ? animationRef.current.play() : animationRef.current.reverse();
        }
    })


    return (
        <>
            <div id="project1" className='project relative' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <Image className='img' fill src="/assets/img/pixel-flakes-hero.webp" alt='Project 1' />
                <video ref={videoRef} playsInline loop muted disablePictureInPicture className='video'>
                    <source src='/assets/video/pixel-flakes-hover.mp4' type='video/mp4' />
                </video>
                <div className='title hidden lg:block relative'>
                    <p ref={titleRef} className='relative overflow-hidden flex flex-col lg:block font-poppins'>
                        <span><strong>Pixelflakes</strong></span>
                        <span>Architectural marketing agency</span>
                    </p>
                </div>
                <div className='title lg:hidden relative'>
                    <p className='relative overflow-hidden flex flex-col lg:block font-nunito'>
                        <span><strong>Pixelflakes</strong></span>
                        <span>Architectural marketing agency</span>
                    </p>
                </div>
            </div>
        </>
    )
}
