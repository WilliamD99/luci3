import React, { useEffect, useRef } from 'react'
import { formatNumber } from './helper';
import gsap from '@/utils/gsap'

interface IndexIndicatorProps {
    index: number;
    total: number
}

export default function IndexIndicator({
    index,
    total
} : IndexIndicatorProps) {
    const indexIndicatorRef = useRef<HTMLDivElement>(null)
    let animationRef = useRef<any>(null)
    
    useEffect(() => {
        let tl = gsap.timeline({ paused: true })

        gsap.set(indexIndicatorRef.current, { autoAlpha: 1, y: 0 })

        tl.to(indexIndicatorRef.current, {
            y: -50,
            autoAlpha: 0,
            duration: 0.5,
            ease: "power4.inOut",
            onComplete: () => {
                gsap.set(indexIndicatorRef.current, { y: 50 })
                gsap.to(indexIndicatorRef.current, { y: 0, autoAlpha: 1 })
            }
        })

        animationRef.current = tl
    }, [])

    useEffect(() => {
        if (animationRef.current) {
            animationRef.current.time(0)
            animationRef.current.play()
        }
    }, [index])

    return (
        <>
            <div className='index absolute bottom-20 right-20 z-50 space-x-2 flex flex-row'>
                <div className='overflow-hidden block'>
                    <div ref={indexIndicatorRef} className='text-white text-lg block'>{formatNumber(index + 1)}</div>
                </div>
                <span className='text-white text-lg block'>/</span>
                <span className='text-white text-lg block'>{formatNumber(total)}</span>
            </div>
        </>
    )
}
