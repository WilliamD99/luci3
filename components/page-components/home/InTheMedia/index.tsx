import React, { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap-trial';
import { SparklesIcon } from '@heroicons/react/24/solid'
import HoverButton from '@/components/HoverButton';
import headingFont from '@/utils/fonts/heading';

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

    useLayoutEffect(() => {
        let animationCtx = gsap.context(() => {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom",
                    scrub: 1
                }
            })
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
        }, [mediaRef])

        return () => {
            animationCtx.revert()
        }
    }, [])

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
                <div className='pt-20'>
                    <div className='flex flex-row items-center justify-center space-x-2'>
                        <SparklesIcon className='h-5 w-5'/>
                        <p>In the media</p>
                    </div>
                    <div className='mt-10 flex flex-col justify-center w-full'>
                        <p className={`text-center title ${headingFont.className}`}>Spread</p>
                        <p className={`text-center title -mt-20 ${headingFont.className}`}>the News</p>
                    </div>
                    <div className='flex justify-center mt-10'>
                        <p className='text-center sub-title'>Find out more about our work on these leading design and technology platforms.</p>
                    </div>
                    <div className='flex justify-center mt-20'>
                        <HoverButton label='Browse all news' href='#'/>
                    </div>
                </div>
            </div>
        </>
    )
}
