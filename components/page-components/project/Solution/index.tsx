import React from 'react'
import { SparklesIcon } from "@heroicons/react/24/solid";

type ProjectData = {
    image: string;
    title: string;
    slug: string;
    subTitle: string;
    link: string;
}

type Props = {
    project: ProjectData;
}

// Project-specific solutions
const getProjectSolution = (slug: string) => {
    switch (slug) {
        case 'pixelflakes':
            return 'By subtly weaving pixel-inspired design components into their online platform, we cultivate a premium and standout style, while custom motion design elements bring their unique sketch studies process to life. Through skillful copywriting, mixed media integration, and in-depth team profiles, the platform holistically underscores their cultural values, playing a vital role in inspiring and motivating prospective talent.'
        case 'plug-live':
            return 'We developed a comprehensive digital platform that showcases Plug Live\'s innovative approach to live entertainment. The solution features interactive elements, real-time show integration, and immersive storytelling techniques that reflect their commitment to creating unforgettable live experiences.'
        case 'ali-ali':
            return 'Our solution creates a visually stunning portfolio platform that highlights Ali Ali\'s directorial expertise. We implemented a dynamic showcase system featuring immersive video presentations, interactive project galleries, and seamless navigation that reflects the director\'s creative vision and technical prowess.'
        case 'stock-duca':
            return 'We crafted a bold and vibrant digital presence that mirrors Stock Duca\'s fearless approach to fashion. The platform features dynamic color transitions, pattern-based interactions, and an innovative product showcase that celebrates their daring aesthetic while maintaining sophisticated user experience.'
        default:
            return 'Our solution addresses the unique challenges and opportunities of this project through innovative design and technical implementation.'
    }
}

export default function WorkSolution({ project }: Props) {
    const solution = getProjectSolution(project.slug)

    return (
        <>
            <div id="work_solution" className='relative'>
                <div className='wrapper'>
                    <div className='sub'>
                        <div className='flex flex-row items-center space-x-2'>
                            <SparklesIcon className='h-4 w-4' />
                            <p className='font-semibold'>Solution</p>
                        </div>
                    </div>
                    <div className='content'>
                        <p>{solution}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
