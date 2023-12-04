import React, { useLayoutEffect, useRef } from 'react'
import { SparklesIcon } from '@heroicons/react/24/solid'
import gsap from 'gsap-trial'
import headingFont from '@/utils/fonts/heading'

export default function WorkInMotion() {
    let containerRef = useRef<HTMLDivElement>(null)
    let videoRef = useRef<HTMLDivElement>(null)
    let text1Ref = useRef<HTMLParagraphElement>(null)
    let text2Ref = useRef<HTMLParagraphElement>(null)

    useLayoutEffect(() => {
        let animationContext = gsap.context(() => {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom+=800px",
                    scrub: 1,
                    pin: true,
                }
            })
            tl.fromTo(videoRef.current, {
                width: "30%",
                height: "30%"
            }, {
                width: "100%",
                height: "100%"
            })
            tl.fromTo(text1Ref.current, {
                x: "-600px"
            }, {
                x: 0
            }, "<")
            tl.fromTo(text2Ref.current, {
                x: "600px"
            }, {
                x: 0
            }, "<")
        }, [containerRef, videoRef, text1Ref, text2Ref])

        return () => {
            animationContext.revert()
        }
    }, [])

    return (
        <>
            <div ref={containerRef} id="home_workInMotion" className='flex flex-col items-center justify-between'>
                <div className='top flex flex-row items-center space-x-3 z-10'>
                    <SparklesIcon className='h-5 w-5 '/>
                    <p className=''>Work in motion</p>
                </div>
                <div className='center z-10 flex flex-row justify-between items-center space-x-5'>
                    <p className={`${headingFont.className}`} ref={text1Ref}>Play</p>
                    <p className={`${headingFont.className}`} ref={text2Ref}>Reel</p>
                </div>
                <div className='bottom z-10'>
                    <p className=' max-w-sm text-center'>Our work is best experienced in motion. Don't forget to put on your headphones</p>
                </div>
                <div ref={videoRef} className='videoWrapper'>
                    <video playsInline loop muted disablePictureInPicture autoPlay={true}>
                        <source src='/assets/video/preview.mp4' type='video/mp4'/>
                    </video>
                </div>
            </div>
        </>
    )
}
