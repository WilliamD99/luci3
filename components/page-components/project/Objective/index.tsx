'use client'
import React, { useRef } from 'react'
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from '@/utils/gsap'
import { getCookie } from 'cookies-next'

type ProjectData = {
    image: string;
    title: string;
    slug: string;
    subTitle: string;
    link: string;
}

type Props = {
    project: ProjectData;
}

// Project-specific content
const getProjectContent = (slug: string) => {
    switch (slug) {
        case 'pixelflakes':
            return {
                titleWords: ['Architechtual', 'Marketing', 'Agency'],
                objective: 'Pixelflakes strives to establish itself as an innovator in a saturated online world, separating its brand from the repetitive competition by curating a top-tier digital journey. This journey not only presents their one-of-a-kind sketch studies process and inspiring culture but also aims to attract talent for their team.',
                images: [
                    '/assets/img/work-1/pixel-flakes-collage-01.webp',
                    '/assets/img/work-1/pixel-flakes-collage-02.webp',
                    '/assets/img/work-1/pixel-flakes-collage-03.webp',
                    '/assets/img/work-1/pixel-flakes-collage-04.webp',
                    '/assets/img/work-1/pixel-flakes-collage-05.webp',
                    '/assets/img/work-1/pixel-flakes-collage-06.webp',
                    '/assets/img/work-1/pixel-flakes-collage-07.webp'
                ]
            }
        case 'plug-live':
            return {
                titleWords: ['Custom', 'Live', 'Shows'],
                objective: 'Plug Live aims to revolutionize the live entertainment industry by creating bespoke show experiences that captivate audiences and create lasting memories through innovative technology and creative storytelling.',
                images: [
                    '/assets/img/work-1/pixel-flakes-collage-01.webp', // Using placeholder images
                    '/assets/img/work-1/pixel-flakes-collage-02.webp',
                    '/assets/img/work-1/pixel-flakes-collage-03.webp',
                    '/assets/img/work-1/pixel-flakes-collage-04.webp',
                    '/assets/img/work-1/pixel-flakes-collage-05.webp',
                    '/assets/img/work-1/pixel-flakes-collage-06.webp',
                    '/assets/img/work-1/pixel-flakes-collage-07.webp'
                ]
            }
        case 'ali-ali':
            return {
                titleWords: ['Unique', 'Directors', 'Portfolio'],
                objective: 'Ali Ali seeks to showcase exceptional directorial work through a carefully curated portfolio that highlights creative vision, technical expertise, and storytelling prowess in the film industry.',
                images: [
                    '/assets/img/work-1/pixel-flakes-collage-01.webp', // Using placeholder images
                    '/assets/img/work-1/pixel-flakes-collage-02.webp',
                    '/assets/img/work-1/pixel-flakes-collage-03.webp',
                    '/assets/img/work-1/pixel-flakes-collage-04.webp',
                    '/assets/img/work-1/pixel-flakes-collage-05.webp',
                    '/assets/img/work-1/pixel-flakes-collage-06.webp',
                    '/assets/img/work-1/pixel-flakes-collage-07.webp'
                ]
            }
        case 'stock-duca':
            return {
                titleWords: ['Daring', 'Colours', 'Patterns'],
                objective: 'Stock Duca embraces bold fashion statements through vibrant colors and innovative patterns, challenging conventional design norms while maintaining elegance and sophistication.',
                images: [
                    '/assets/img/work-1/pixel-flakes-collage-01.webp', // Using placeholder images
                    '/assets/img/work-1/pixel-flakes-collage-02.webp',
                    '/assets/img/work-1/pixel-flakes-collage-03.webp',
                    '/assets/img/work-1/pixel-flakes-collage-04.webp',
                    '/assets/img/work-1/pixel-flakes-collage-05.webp',
                    '/assets/img/work-1/pixel-flakes-collage-06.webp',
                    '/assets/img/work-1/pixel-flakes-collage-07.webp'
                ]
            }
        default:
            return {
                titleWords: ['Project', 'Content', 'Here'],
                objective: 'Project description goes here.',
                images: [
                    '/assets/img/work-1/pixel-flakes-collage-01.webp', // Fallback images
                    '/assets/img/work-1/pixel-flakes-collage-02.webp',
                    '/assets/img/work-1/pixel-flakes-collage-03.webp',
                    '/assets/img/work-1/pixel-flakes-collage-04.webp',
                    '/assets/img/work-1/pixel-flakes-collage-05.webp',
                    '/assets/img/work-1/pixel-flakes-collage-06.webp',
                    '/assets/img/work-1/pixel-flakes-collage-07.webp'
                ]
            }
    }
}

export default function WorkObjective({ project }: Props) {
    let galleryRef = useRef<HTMLDivElement>(null)

    let typeCookie = getCookie('type') ?? 'desktop';
    const content = getProjectContent(project.slug)

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
                        {content.titleWords.map((word, index) => (
                            <p key={index} className={`font-poppins`}>{word}</p>
                        ))}
                    </div>
                    <div className='sub flex flex-row items-start'>
                        <div className='flex flex-row items-center space-x-2'>
                            <SparklesIcon className='h-4 w-4' />
                            <p className='font-semibold'>Objective</p>
                        </div>
                    </div>
                    <div className='content'>
                        <p>{content.objective}</p>
                    </div>
                </div>
            </div>
            <div id="work_objective_images" ref={galleryRef}>
                <div className='wrapper'>
                    <div className='media-wrapper'>
                        {content.images.map((image, index) => (
                            <div key={index} className={`media media-${index + 1}`}>
                                <div className='image-wrapper'>
                                    <Image alt={`objective image ${index + 1}`} fill src={image} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
