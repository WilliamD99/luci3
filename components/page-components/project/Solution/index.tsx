import React from 'react'
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function WorkSolution() {
  return (
    <>
        <div id="work_solution" className='relative'>
            <div className='wrapper'>
                <div className='sub'>
                    <div className='flex flex-row items-center space-x-2'>
                            <SparklesIcon className='h-4 w-4'/>
                            <p className='font-semibold'>Objective</p>
                    </div>
                </div>
                <div className='content'>
                    <p>By subtly weaving pixel-inspired design components into their online platform, we cultivate a premium and standout style, while custom motion design elements bring their unique sketch studies process to life. Through skillful copywriting, mixed media integration, and in-depth team profiles, the platform holistically underscores their cultural values, playing a vital role in inspiring and motivating prospective talent.</p>
                </div>
            </div>
        </div>
    </>
  )
}
