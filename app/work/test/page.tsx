'use client'

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from '@/utils/gsap'
import Image from 'next/image'
import HoverButton from '@/components/HoverButton'
import headingFont from '@/utils/fonts/heading'
import { getCookie } from 'cookies-next'

import { useGSAP } from '@gsap/react'
import WorkHero from '@/components/page-components/project/Hero'
import WorkObjective from '@/components/page-components/project/Objective'
import WorkSolution from '@/components/page-components/project/Solution'

type Props = {}

const TestPage = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div id="work-1" ref={containerRef} className='min-h-screen project-page' >
        <WorkHero />
        <WorkObjective />
        <WorkSolution />
        <div className='h-screen'></div>
    </div>
  )
}

export default TestPage