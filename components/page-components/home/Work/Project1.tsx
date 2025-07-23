import React, { useRef } from 'react'
import Image from 'next/image'


export default function Project1() {
    const videoRef = useRef<HTMLVideoElement>(null)

    const onMouseEnter = () => {
        videoRef.current?.play()
    }

    const onMouseLeave = () => {
        videoRef.current?.pause()
        videoRef.current!.currentTime = 0
    }

    return (
        <div id="project1" className='project relative'
            onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Image className='img' fill src="/assets/img/pixel-flakes-hero.webp" alt='Project 1' />
            <video ref={videoRef} playsInline loop muted disablePictureInPicture className='video'>
                <source src='/assets/video/pixel-flakes-hover.mp4' type='video/mp4' />
            </video>
            <div className='title relative'>
                <p className='relative overflow-hidden flex flex-col lg:block font-poppins lg:font-poppins'>
                    <span><strong>Pixelflakes</strong></span>
                    <span>Architectural marketing agency</span>
                </p>
            </div>
        </div>
    )
}
