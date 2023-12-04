import React, { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap-trial'

export default function Project1() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const titleRef = useRef<HTMLParagraphElement>(null)

    // const titleAnimationRef = useRef(() => {
    //     // if (titleRef.current) {
    //         let tl = gsap.timeline({paused: true})
            
    //         tl.fromTo(
    //             titleRef.current?.querySelector("p"),
    //             {
    //                 autoAlpha: 0,
    //                 y: 50
    //             }, {
    //                 autoAlpha: 1,
    //                 y: 0
    //             }
    //         )
    //         return tl
    //     // }
    // })

    const onMouseEnter = () => {
        videoRef.current?.play()

        if (titleRef.current) {
            // titleAnimationRef.current.play()
            // console.log(titleAnimationRef.current.play)
        }
    }

    const onMouseLeave = () => {
        videoRef.current?.pause()
        videoRef.current!.currentTime = 0

        // gsap.fromTo(titleRef.current?.querySelectorAll("p"), {
        //     // autoAlpha: 1,
        //     y: 0
        // }, {
        //     // autoAlpha: 0,
        //     y: 50,
        //     duration: 2
        // })
    }


    return (
            <>
                <div id="project1" className='project relative' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    <Image className='img' fill src="/assets/img/pixel-flakes-hero.webp" alt='Project 1'/>
                    <video ref={videoRef} playsInline loop muted disablePictureInPicture className='video'>
                        <source src='/assets/video/pixel-flakes-hover.mp4' type='video/mp4'/>
                    </video>
                    <div ref={titleRef} className='title relative'>
                        <p className='relative overflow-hidden'>
                            <span><strong>Pixelflakes</strong></span>
                            <span>Architectural marketing agency</span>
                        </p>
                    </div>
                </div>        
            </>
        )
}
