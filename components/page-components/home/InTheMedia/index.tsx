'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap';
import { SparklesIcon } from '@heroicons/react/24/solid'
import HoverButton from '@/components/HoverButton';
import { useGSAP } from '@gsap/react';
import { getCookie } from 'cookies-next'

interface MediaRef {
    media1: HTMLDivElement | null;
    media2: HTMLDivElement | null;
    media3: HTMLDivElement | null;
    media4: HTMLDivElement | null;
    media5: HTMLDivElement | null;
}

export default function InTheMedia() {
    const containerRef = useRef<HTMLDivElement>(null)
    const mediaRef = useRef<MediaRef>({
        media1: null,
        media2: null,
        media3: null,
        media4: null,
        media5: null
    })
    let typeCookie = getCookie('type') ?? 'desktop';

    useGSAP(() => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom",
                scrub: 1
            }
        })
        if (typeCookie === "desktop") {
            tl.to(mediaRef.current.media2, {
                x: "+=250px"
            }, "<")
            tl.to(mediaRef.current.media3, {
                x: "-=250px"
            }, "<")
            tl.to(mediaRef.current.media4, {
                x: "-=250px"
            }, "<")
            tl.to(mediaRef.current.media5, {
                x: "+=250px"
            }, "<")
        } else {
            tl.to(mediaRef.current.media2, {
                x: "+=75px"
            }, "<")
            tl.to(mediaRef.current.media3, {
                x: "-=75px"
            }, "<")
            tl.to(mediaRef.current.media4, {
                x: "-=75px"
            }, "<")
            tl.to(mediaRef.current.media5, {
                x: "+=75px"
            }, "<")
        }
    }, { scope: containerRef, dependencies: [typeCookie], revertOnUpdate: true })

    return (
        <>
            <div ref={containerRef} id="home_inTheMedia">
                <div id="mediaWrapper" className='relative'>
                    <div ref={(el) => (mediaRef.current.media1 = el)} className='relative media-1 border-none'>
                        <Image fill alt="Media 1" src="/assets/img/home-news-1.webp" />
                    </div>
                    <div ref={(el) => (mediaRef.current.media2 = el)} className='relative media-2 border-none'>
                        <Image fill alt="Media 1" src="/assets/img/home-news-3.webp" />
                    </div>
                    <div ref={(el) => (mediaRef.current.media3 = el)} className='relative media-3 border-none'>
                        <video playsInline loop muted disablePictureInPicture autoPlay={true}>
                            <source src="/assets/video/home-news-diesel-be-a-follower.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div ref={(el) => (mediaRef.current.media4 = el)} className='relative media-4 border-none'>
                        <Image fill alt="Media 1" src="/assets/img/home-news-4.webp" />
                    </div>
                    <div ref={(el) => (mediaRef.current.media5 = el)} className='relative media-5 border-none'>
                        <video playsInline loop muted disablePictureInPicture autoPlay={true}>
                            <source src="/assets/video/news-rino-pelle.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
                <div className='pt-20 px-6 lg:pt-44'>
                    <div className='flex flex-row items-center justify-center space-x-2'>
                        <SparklesIcon className='h-4 w-4' />
                        <p className='font-nunito text-lg'>In the media</p>
                    </div>
                    <div className='mt-1 flex flex-col justify-center w-full space-y-2 lg:space-y-6'>
                        <p className={`text-center leading-none text-6xl lg:text-[10rem] 2xl:text-[15rem] font-poppins`}>Spread</p>
                        <p className={`text-center leading-none text-6xl lg:text-[10rem] 2xl:text-[15rem] font-poppins`}>the News</p>
                    </div>
                    <div className='flex justify-center mt-10'>
                        <p className='text-center text-lg lg:text-2xl max-w-xl font-nunito'>Find out more about our work on these leading design and technology platforms.</p>
                    </div>
                    <div className='flex justify-center mt-10 lg:mt-20'>
                        <HoverButton label='Browse all news' href='#' />
                    </div>
                </div>
            </div>
        </>
    )
}
