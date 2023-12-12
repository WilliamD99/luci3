'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Observer } from 'gsap-trial/Observer'
import SliderItem from '@/components/page-components/work/SliderItem'
import gsap from '@/utils/gsap'
import { debounce } from 'lodash'
import Slider from '@/components/page-components/work/Slider'

type Props = {}

const WorkArr = [
    {
        image: "/assets/img/home-news-4.webp"
    },
    {
        image: "/assets/img/pixel-flakes-hero.webp"
    },
    {
        image: "/assets/img/the-st-regis-venice-hero.webp"
    },
    {
        image: "/assets/img/rino-pelle-hero.webp"
    },
]

const Work = (props: Props) => {
    const [togglePlaying, setPlaying] = useState<boolean>(false)
    const [direction, setDirection] = useState<1 | -1>(1)

    const triggerSlideShow = (direction: 1 | -1) => {
        setPlaying(!togglePlaying)
        setDirection(direction)
    }

    return (
        <div id="work" className='min-h-screen relative'>
            {/* Background */}
            <Slider action={togglePlaying} actionDirection={direction} className='slider--bg' items={WorkArr} showIndex={true} />
            {/* Foreground */}
            <Slider action={togglePlaying} actionDirection={direction} className='slider--fg' items={WorkArr} reversed={true} />


            <div className='absolute z-50 left-20 bottom-20 space-x-20'>
                <button onClick={() => triggerSlideShow(1)}>Next</button>
                <button onClick={() => triggerSlideShow(-1)}>Prev</button>
            </div>
        </div>
    )
}

export default Work