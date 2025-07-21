'use client'
import React, { useRef } from 'react'
import Project1 from './Project1'
import Project2 from './Project2'
import Project3 from './Project3'
import Project4 from './Project4'
import HoverButton from '@/components/HoverButton'
import AnimatedOnScroll from '@/components/AnimatedComponentWrapper/AnimatedOnScroll'

import { SparklesIcon } from '@heroicons/react/24/solid'

export default function Work() {
    let titleRef = useRef(null)

    return (
        <div id="home_work">
            <div className='wrapper'>
                <div className='flex flex-col'>
                    <div className='flex lg:hidden flex-row items-center space-x-3'>
                        <SparklesIcon className='h-4 w-4' />
                        <p className={`text-base font-nunito`}>Featured Projects</p>
                    </div>
                    <AnimatedOnScroll target={titleRef} direction='up' className='mb-10'>
                        <div ref={titleRef} className={`title title-main text-8xl md:text-[10rem] xl2:text-[18rem] font-poppins font-medium leading-none`}>
                            Work
                        </div>
                    </AnimatedOnScroll>
                    <p className='lg:hidden text-sm font-nunito'>Highlights of cases that we passionately built with forward-thinking clients and friends over the year</p>
                </div>

                <div className='projects lg:gap-10 mt-10 lg:mt-20'>
                    <Project1 />
                    <Project2 />
                    <Project3 />
                    <Project4 />
                </div>
                <div className='text-center font-poppins lg:text-right mt-24 lg:pr-24'>
                    <HoverButton label='Browse all works' href='#' />
                </div>
            </div>
        </div>
    )
}
