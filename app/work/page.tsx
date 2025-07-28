'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import Slider from '@/components/page-components/work/Slider'
import gsap from '@/utils/gsap'
import { useRouter } from 'next/navigation'
import { debounce } from 'lodash'
import { ArrowDown } from 'lucide-react'
import { WorkArr } from '@/utils/data/work'
type Props = {}

const Work = (props: Props) => {
    const router = useRouter()
    // Page transition state
    const [isTransitioning, setTransitioning] = useState<boolean>(false)
    // Slider animation state
    const [isSliderAnimating, setIsSliderAnimating] = useState<boolean>(false)

    const bgRef = useRef<HTMLDivElement>(null)
    const fgRef = useRef<HTMLDivElement>(null)

    // Prevent scrolling during any animation (slider or transition)
    useEffect(() => {
        const shouldPreventScroll = isTransitioning || isSliderAnimating
        document.body.style.overflow = shouldPreventScroll ? 'hidden' : ''

        // Cleanup function to restore scrolling on component unmount
        return () => {
            document.body.style.overflow = ''
        }
    }, [isTransitioning, isSliderAnimating])

    // Memoize the navigation function to prevent recreation on every render
    const navigatePage = useCallback(
        debounce(() => {
            setTransitioning(true)

            if (fgRef.current && bgRef.current) {
                const items = Array.from(bgRef.current.querySelectorAll(".slider__item"))
                // Find the current index
                const index = items.findIndex(item => item.classList.contains("slider__item--current"))

                const tl = gsap.timeline({
                    defaults: { duration: 0.5, ease: "power1.out" },
                    onComplete: () => {
                        setTransitioning(false)
                        router.push(`/work/${WorkArr[index].slug}`)
                    }
                })

                tl.to(
                    fgRef.current!.querySelectorAll('.slider__item')[index], {
                    y: "-110%"
                }
                )
                tl.to(
                    bgRef.current!.querySelector('.slider-content'), {
                    autoAlpha: 0
                },
                    0
                )
                tl.to(
                    bgRef.current!.querySelectorAll('.slider__item-inner')[index], {
                    scale: 1,
                }
                )
                tl.to(
                    bgRef.current!.querySelector(".index"), {
                    autoAlpha: 0
                },
                    "<"
                )
            }
        }, 500),
        [router] // Dependencies for useCallback
    )

    // Memoize the slider animation change handler
    const handleSliderAnimationChange = useCallback((isAnimating: boolean) => {
        setIsSliderAnimating(isAnimating)
    }, [])


    return (
        <div id="work" className='relative cursor-pointer' onClick={navigatePage}>
            {/* Background */}
            <Slider
                disabled={isTransitioning}
                ref={bgRef}
                className='slider--bg'
                items={WorkArr}
                showIndex={true}
                showContent={true}
                onAnimationChange={handleSliderAnimationChange}
            />
            {/* Foreground */}
            <Slider
                disabled={isTransitioning}
                ref={fgRef}
                className='slider--fg'
                items={WorkArr}
                reversed={true}
            />
            <div className='absolute hidden bottom-20 left-20 w-fit z-50 lg:flex flex-row items-center space-x-2 overflow-hidden h-6'>
                <p className='text-white font-nunito text-sm xl2:text-lg'>Scroll</p>
                <div className='relative h-4 w-4'>
                    <ArrowDown
                        className='w-full h-full text-white absolute arrow-bounce-down'
                    />
                </div>
            </div>
        </div>
    )
}

export default Work