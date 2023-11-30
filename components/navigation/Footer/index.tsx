'use client'

import React, { useRef, useLayoutEffect} from 'react'
import gsap from 'gsap-trial'
import Link from 'next/link'

export default function Footer() {
    let containerRef = useRef<HTMLDivElement>(null)
    let wrapperRef = useRef<HTMLDivElement>(null)
    let videoRef = useRef<HTMLVideoElement>(null)

    useLayoutEffect(() => {
        let animationCtx = gsap.context(() => {
            gsap.set(videoRef.current, {
                y: -500
            })
            gsap.set(wrapperRef.current, {
                y: -500
            })

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "100%",
                    scrub: true,
                }
            })
            tl.to(videoRef.current, {
                y: 0
            })
            tl.to(wrapperRef.current, {
                y: 0
            }, "<")
        }, [videoRef, containerRef, wrapperRef])

        return () => {
            animationCtx.revert()
        }
    }, [])

    return (
        <>
            <div ref={containerRef} id="footer" className='relative overflow-hidden'>
                <div ref={wrapperRef} className='wrapper relative flex flex-col'>
                    <div className='title-wrapper flex flex-col'>
                        <p className='title'>Our</p>
                        <p className='title -mt-20'>Story</p>
                    </div>
                    <p className='sub-title'>The story behind Exo Ape is one of exploration, creativity and curiosity.</p>
                    <div className='divider'></div>
                    <ul className='address space-y-2'>
                        <li className='item'>
                            <Link href="#" target='_blank'>
                                Willem II Singel 8 <br />
                                6041 HS, Roermond <br />
                                The Netherlands
                            </Link>
                        </li>
                        <li className='item'>
                            <Link href="mailto:dnam310199@gmail.com" className='underline-effect'>
                                dnam310199@gmail.com
                            </Link>
                        </li>
                    </ul>
                    <ul className='nav'>
                        <li className='item'>
                            <Link href="" className='underline-effect'>Work</Link>
                        </li>
                    </ul>
                </div>
                <div className='background'>
                    <video ref={videoRef} className='w-full h-full block' playsInline loop muted disablePictureInPicture autoPlay={true}>
                        <source src="/assets/video/video-6.mp4" type='video/mp4'/>
                    </video>    
                </div>
            </div>
        </>
    )
}
