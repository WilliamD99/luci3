import React, { useRef } from 'react'
import Image from 'next/image'


export default function Project3() {
    const videoRef = useRef<HTMLVideoElement>(null)


    const onMouseEnter = () => {
        videoRef.current?.play()
    }

    const onMouseLeave = () => {
        videoRef.current?.pause()
        videoRef.current!.currentTime = 0

    }

    return (
        <>
            <div id="project3" className='project relative hidden lg:block' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <Image className='img' fill src="/assets/img/aebele-interiors-hero.webp" alt="Project 3" />
                <video ref={videoRef} playsInline loop muted disablePictureInPicture className='video'>
                    <source src='/assets/video/featured-work-aebele.mp4' type='video/mp4' media="(min-width: 768px)" />
                </video>
                <div className='title relative'>
                    <p className='relative overflow-hidden font-poppins'>
                        <strong>Aebele Interiors</strong>
                        Luxurious design experience
                    </p>
                </div>
            </div>
        </>
    )
}
