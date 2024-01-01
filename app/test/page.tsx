'use client'

import React, { useEffect, useRef } from 'react'
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

import gsap from '@/utils/gsap'
import { useGSAP } from '@gsap/react';

export default function TestPage() {
    const testRef = useRef<HTMLDivElement>(null)
    const container = useRef<HTMLDivElement>(null)

    // useGSAP(() => {
    //     let getRatio = (el: any) => window.innerHeight / (window.innerHeight + el.offsetHeight);
        
    //     gsap.fromTo(".background", {
    //         backgroundPosition: () =>`50% ${-window.innerHeight * getRatio(testRef.current)}px`
    //     }, {
    //         backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(testRef.current))}px`,
    //         ease: "none",
    //         scrollTrigger: {
    //           trigger: testRef.current,
    //           start: () => "top bottom", 
    //           end: "bottom top",
    //           scrub: true,
    //           invalidateOnRefresh: true, // to make it responsive,
    //           markers: true
    //         }
    //     })
    // }, { scope: container })

    return (
        <>
            <div ref={container} id="test" className='relative'>
                <div ref={testRef} className='test overflow-hidden relative'>
                    <div className='background'></div>
                </div>
                <div className='h-screen'></div>
                <div className='h-screen'></div>
            </div>
        </>
    )
}
