import React, { useEffect, useRef } from 'react'
import { formatNumber } from './helper';
import gsap from '@/utils/gsap'
import { useGSAP } from '@gsap/react';

interface IndexIndicatorProps {
    index: number;
    total: number;
    isAnimating: boolean
}

export default function IndexIndicator({
    index,
    total,
    isAnimating
} : IndexIndicatorProps) {
    const indexIndicatorRef = useRef<HTMLDivElement>(null)
    let animationRef = useRef<any>(null)
    
    useGSAP(() => {
        let tl = gsap.timeline({ paused: true })
        gsap.set(indexIndicatorRef.current, { autoAlpha: 1, y: 0 })

        tl.to(indexIndicatorRef.current, {
            y: -30,
            autoAlpha: 0,
            duration: 0.7,
            ease: "expo.in",
            onComplete: () => {
                gsap.set(indexIndicatorRef.current, { y: 30 })
            }
        })
        animationRef.current = tl
    })

    useEffect(() => {
        if (animationRef.current) {
            if (isAnimating) {
                animationRef.current.time(0)
                animationRef.current.play()
            } else {
                animationRef.current.reverse()
            }
        }
    }, [index, isAnimating])

    return (
        <>
            <div className='index hidden absolute bottom-20 right-20 z-50 space-x-2 lg:flex flex-row'>
                <div className='overflow-hidden block'>
                    <div ref={indexIndicatorRef} className='text-white text-lg block'>{formatNumber(index + 1)}</div>
                </div>
                <span className='text-white text-lg block'>/</span>
                <span className='text-white text-lg block'>{formatNumber(total)}</span>
            </div>
        </>
    )
}
