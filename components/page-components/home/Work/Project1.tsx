import React from 'react'
import Image from 'next/image'


export default function Project1() {


    return (
        <div id="project1" className='project relative'>
            <Image className='img' fill src="/projects/district_noodle_house.jpg" alt='Project 1' />
            <div className='title relative'>
                <p className='relative overflow-hidden flex flex-col lg:block font-poppins lg:font-poppins'>
                    <span><strong>District Noodle House</strong></span>
                    <span>A modern and stylish noodle house</span>
                </p>
            </div>
        </div>
    )
}
