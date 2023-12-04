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
            <div id="project3" className='project relative' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <Image className='img' fill src="/assets/img/aebele-interiors-hero.webp" alt="Project 3" />
                <video ref={videoRef} playsInline loop muted disablePictureInPicture className='video'>
                        <source src='/assets/video/featured-work-aebele.mp4' type='video/mp4'/>
                </video>
                <p className='title relative'>
                    <span>
                        <strong>Aebele Interiors</strong>
                        Luxurious design experience
                    </span>
                </p>
            </div>
        </>
    )
}
