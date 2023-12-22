'use client'

import React, { useRef} from 'react'
import gsap from 'gsap-trial'
import Link from 'next/link'
import headingFont from '@/utils/fonts/heading'
import { useGSAP } from '@gsap/react'

export default function Footer() {
    let containerRef = useRef<HTMLDivElement>(null)
    let wrapperRef = useRef<HTMLDivElement>(null)
    let videoRef = useRef<HTMLVideoElement>(null)

    useGSAP(() => {
        gsap.set(videoRef.current, {
            y: -400
        })
        gsap.set(wrapperRef.current, {
            y: -400
        })

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "center center",
                scrub: true,
            }
        })
        tl.to(videoRef.current, {
            y: 0
        })
        tl.to(wrapperRef.current, {
            y: 0
        }, "<")
    }, [])

    return (
        <>
            <div ref={containerRef} id="footer" className='relative overflow-hidden'>
                <div ref={wrapperRef} className='wrapper relative flex flex-col space-y-2'>
                    <div className='title-wrapper flex flex-col'>
                        <p className={`title ${headingFont.className}`}>Our</p>
                        <p className={`title -mt-6 xl:-mt-20 ${headingFont.className}`}>Story</p>
                    </div>
                    <p className='sub-title'>The story behind Luci is one of exploration, creativity and curiosity.</p>
                    <div className='divider'></div>
                    <ul className='address space-y-2 hidden xl:block'>
                        <li className='item'>
                            <Link className='text-lg' href="#" target='_blank'>
                                Willem II Singel 8 <br />
                                6041 HS, Roermond <br />
                                The Netherlands
                            </Link>
                        </li>
                        <li className='item'>
                            <Link href="mailto:dnam310199@gmail.com" className='underline-effect text-lg'>
                                dnam310199@gmail.com
                            </Link>
                        </li>
                    </ul>
                    <ul className='nav space-y-2'>
                        <li className='item'>
                            <Link href="" className='underline-effect text-sm lg:text-lg'>Work</Link>
                        </li>
                        <li className='item'>
                            <Link href="" className='underline-effect text-sm lg:text-lg'>Studio</Link>
                        </li>
                        <li className='item'>
                            <Link href="" className='underline-effect text-sm lg:text-lg'>News</Link>
                        </li>
                        <li className='item'>
                            <Link href="" className='underline-effect text-sm lg:text-lg'>Contact</Link>
                        </li>
                    </ul>
                    <ul className='social space-y-2'>
                        <li className='item'>
                            <Link href="" className='underline-effect text-sm lg:text-lg'>Behance</Link>
                        </li>
                        <li className='item'>
                            <Link href="" className='underline-effect text-sm lg:text-lg'>Dribble</Link>
                        </li>
                        <li className='item'>
                            <Link href="" className='underline-effect text-sm lg:text-lg'>Twitter</Link>
                        </li>
                        <li className='item'>
                            <Link href="" className='underline-effect text-sm lg:text-lg'>Instagram</Link>
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
