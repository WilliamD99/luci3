import React, { useRef } from 'react'
import Image from 'next/image'


export default function Project3() {

    return (
        <>
            <div id="project3" className='project relative hidden lg:block'>
                <Image className='img object-cover' fill src="/projects/district_noodle_house.jpg" alt="Project 3" />
                <div className='title relative'>
                    <p className='relative overflow-hidden font-poppins'>
                        <strong>Content Crew</strong>
                        Simple and elegant
                    </p>
                </div>
            </div>
        </>
    )
}
