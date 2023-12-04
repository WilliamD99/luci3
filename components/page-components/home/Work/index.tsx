import React from 'react'
import Image from 'next/image'
import Project1 from './Project1'
import Project2 from './Project2'
import Project3 from './Project3'
import Project4 from './Project4'
import HoverButton from '@/components/HoverButton'

import headingFont from '@/utils/fonts/heading'

export default function Work() {
    return (
        <>
            <div id="home_work">
                <div className='wrapper'>
                    <p className={`title ${headingFont.className}`}>Work</p>
                    <div className='projects gap-10 mt-20'>
                        <Project1 />
                        <Project2 />
                        <Project3 />
                        <Project4 />
                    </div>
                    <div className='text-right mt-24 pr-24'>
                        <HoverButton label='Browse all work' href='#'/>
                    </div>
                </div>
            </div>
        </>
    )
}
