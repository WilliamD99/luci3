'use client'

import React, { useEffect, useRef } from 'react'
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

import gsap from '@/utils/gsap'

export default function TestPage() {
    const testRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (testRef.current) {
            Splitting({
                target: testRef.current,
                by: "words",
                
            })

            
            gsap.to(testRef.current.querySelectorAll('.word'), {
                scale: 1.2,
                stagger: 0.2,
                ease: "expo.inOut"
            })
        }
    }, [testRef.current])


    return (
        <>
            <div className='h-screen flex justify-center items-center'>
                <div className='test overflow-hidden' ref={testRef}>This is good</div>
            </div>
        </>
    )
}
