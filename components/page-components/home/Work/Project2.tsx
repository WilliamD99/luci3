import React from 'react'
import Image from 'next/image'
import { SparklesIcon } from '@heroicons/react/24/solid'


export default function Project2() {
    return (
        <div className='project'>
            <div className='hidden lg:flex flex-row space-x-2 items-center'>
                <SparklesIcon className='h-4 w-4' />
                <p className={`text-lg xl2:text-3xl font-bold font-nunito`}>Featured Projects</p>
            </div>
            <p className='mt-20 text-sm xl2:text-xl hidden lg:block font-nunito'>Highlights of cases that we passionately built with forward-thinking clients and friends over the year</p>

            <div id="project2" className='mt-36 lg:mt-72 w-full relative project-container'>
                <Image className='img object-cover' src="/projects/content_crew.jpg" alt="Project 2" fill />
                <div className='title hidden lg:block relative'>
                    <p className='relative overflow-hidden font-poppins'>
                        <strong>Content Crew</strong>
                        Streamlined logistics solutions and operations management
                    </p>
                </div>
                <div className='title relative lg:hidden'>
                    <p className='relative overflow-hidden flex flex-col lg:block font-nunito'>
                        <strong>Content Crew</strong>
                        Streamlined logistics solutions and operations management
                    </p>
                </div>
            </div>
        </div>
    )
}
