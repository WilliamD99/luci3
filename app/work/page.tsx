'use client'

import React, { useRef, useState } from 'react'
import Slider from '@/components/page-components/work/Slider'
import gsap from '@/utils/gsap'
import { useRouter } from 'next/navigation'
import { debounce } from 'lodash'

type Props = {}

const WorkArr = [
    {
        image: "/assets/img/home-news-4.webp",
        title: "Pixelflakes",
        subTitle: "Architectural marketing agency",
        link: "/work/test"
    },
    {
        image: "/assets/img/pixel-flakes-hero.webp",
        title: "Plugged Live Shows",
        subTitle: "Custom Made Live Shows",
        link: "/work/test1"
    },
    {
        image: "/assets/img/the-st-regis-venice-hero.webp",
        title: "Ali Ali",
        subTitle: "Unique director's portfolio",
        link: "/work/test2"
    },
    {
        image: "/assets/img/rino-pelle-hero.webp",
        title: "Stock Dutch Design",
        subTitle: "Daring colours & patterns",
        link: "/work/test3",
    },
]

const Work = (props: Props) => {
    const router = useRouter()
    // Page transition state
    const [isTransitioning, setTransitioning] = useState<boolean>(false)

    const bgRef = useRef<HTMLDivElement>(null)
    const fgRef = useRef<HTMLDivElement>(null)

    const navigatePage = debounce(() => {
        setTransitioning(!isTransitioning)

        if (fgRef.current && bgRef.current) {
            let items = Array.from(bgRef.current?.querySelectorAll(".slider__item"))      
            // Find the current index
            let index = items.findIndex(item => item.classList.contains("slider__item--current"))

            let tl = gsap.timeline({
                defaults: { duration: 0.75, ease: "power4.inOut" },
                onComplete: () => {
                    setTransitioning(false)
                    router.push(WorkArr[index].link)
                }
            })
            tl.to(
                fgRef.current.querySelectorAll('.slider__item')[index], {
                    y: "-100%"
                }
            )
            tl.to(
                bgRef.current.querySelector('.slider-content'), {
                    autoAlpha: 0
                },
                0
            )
            tl.to(
                bgRef.current.querySelectorAll('.slider__item-inner')[index], {
                    scale: 1,
                }
            )
            tl.to(
                bgRef.current.querySelector(".index"), {
                    autoAlpha: 0
                },
                "<"
            )
        }
    }, 500)

    return (
        <div id="work" className='min-h-screen relative' onClick={navigatePage}>
            {/* Background */}
            <Slider disabled={isTransitioning} ref={bgRef} className='slider--bg' items={WorkArr} showIndex={true} showContent={true} />
            {/* Foreground */}
            <Slider disabled={isTransitioning} ref={fgRef} className='slider--fg' items={WorkArr} reversed={true} />
        </div>
    )
}

export default Work