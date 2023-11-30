import React, { useRef } from 'react'
import Image from 'next/image'

export default function Project4() {
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
            <div className='project relative' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <Image className='img' fill src="/assets/img/the-st-regis-venice-hero.webp" alt='Project 1'/>
                <video ref={videoRef} playsInline loop muted disablePictureInPicture className='video'>
                        <source src='/assets/video/hover-st-regis.mp4' type='video/mp4'/>
                </video>
                <p className='title relative'>
                    <span>
                        <strong>The St. Regis Venice</strong>
                        Elegant one-page solution
                    </span>
                </p>
            </div>
        </>
    )
}
