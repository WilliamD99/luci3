import React, { useRef } from 'react'
import headingFont from '@/utils/fonts/heading'
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from '@/utils/gsap'
import { getCookie } from 'cookies-next'

export default function WorkObjective() {
    let galleryRef = useRef<HTMLDivElement>(null)

    let typeCookie = getCookie('type') ?? 'desktop';

    // Animation for image gallery
    useGSAP(() => {
        if (typeCookie === "desktop") {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: galleryRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    pin: true,
                    pinSpacing: false
                }
            })
    
            tl.to(
                ".media-1", {
                    scale: 5
                }, 0
            )
            tl.to(
                ".media-2", {
                    scale: 6
                }, 0
            )
            tl.to(
                ".media-3", {
                    scale: 4
                }, 0
            )
            tl.to(
                ".media-4", {
                    scale: 5
                }, 0
            )
            tl.to(
                ".media-5", {
                    scale: 8
                }, 0
            )
            tl.to(
                ".media-6", {
                    scale: 6
                }, 0
            )
            tl.to(
                ".media-7", {
                    scale: 9
                }, 0
            )
        }
    }, { scope: galleryRef, dependencies: [typeCookie] })


    return (
        <>
            <div id="work_objective" className='overflow-hidden'>
                <div className='wrapper overflow-hidden'>
                    <div className='title'>
                        <p className={`${headingFont.className}`}>Architechtual</p>
                        <p className={`${headingFont.className}`}>Marketing</p>
                        <p className={`${headingFont.className}`}>Agency</p>
                    </div>
                    <div className='sub flex flex-row items-start'>
                        <div className='flex flex-row items-center space-x-2'>
                            <SparklesIcon className='h-4 w-4'/>
                            <p className='font-semibold'>Objective</p>
                        </div>
                    </div>
                    <div className='content'>
                        <p>Pixelflakes strives to establish itself as an innovator in a saturated online world, separating its brand from the repetitive competition by curating a top-tier digital journey. This journey not only presents their one-of-a-kind sketch studies process and inspiring culture but also aims to attract talent for their team.</p>
                    </div>
                </div>
            </div>
            <div id="work_objective_images" ref={galleryRef}>            
                <div className='wrapper'>
                    <div className='media-wrapper'>
                        <div className='media media-1'>
                            <div className='image-wrapper'>
                                <Image alt="objective image 1" fill src="/assets/img/work-1/pixel-flakes-collage-01.webp" />
                            </div>
                        </div>
                        <div className='media media-2'>
                            <div className='image-wrapper'>
                                <Image alt="objective image 2" fill src="/assets/img/work-1/pixel-flakes-collage-02.webp" />
                            </div>
                        </div>
                        <div className='media media-3'>
                            <div className='image-wrapper'>
                                <Image alt="objective image 3" fill src="/assets/img/work-1/pixel-flakes-collage-03.webp" />
                            </div>
                        </div>
                        <div className='media media-4'>
                            <div className='image-wrapper'>
                                <Image alt="objective image 4" fill src="/assets/img/work-1/pixel-flakes-collage-04.webp" />
                            </div>
                        </div>
                        <div className='media media-5'>
                            <div className='image-wrapper'>
                                <Image alt="objective image 5" fill src="/assets/img/work-1/pixel-flakes-collage-05.webp" />
                            </div>
                        </div>
                        <div className='media media-6'>
                            <div className='image-wrapper'>
                                <Image alt="objective image 6" fill src="/assets/img/work-1/pixel-flakes-collage-06.webp" />
                            </div>
                        </div>
                        <div className='media media-7'>
                            <div className='image-wrapper'>
                                <Image alt="objective image 7" fill src="/assets/img/work-1/pixel-flakes-collage-07.webp" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
