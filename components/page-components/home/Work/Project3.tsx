import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap-trial'

export default function Project3() {
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
            <div id="project3" className='project relative' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <Image className='img' fill src="/assets/img/aebele-interiors-hero.webp" alt="Project 3" />
                <video ref={videoRef} playsInline loop muted disablePictureInPicture className='video'>
                        <source src='/assets/video/featured-work-aebele.mp4' type='video/mp4'/>
                </video>
                <div className='title relative'>
                    <p ref={titleRef} className='relative overflow-hidden'>
                        <strong>Aebele Interiors</strong>
                        Luxurious design experience
                    </p>
                </div>
            </div>
        </>
    )
}
