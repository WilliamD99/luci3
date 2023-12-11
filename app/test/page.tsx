'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Observer } from 'gsap-trial/Observer'
import gsap from '@/utils/gsap'

type Props = {}

const TestPage = (props: Props) => {
  const [test, setTest] = useState<number>(0)

  const testFunc = () => {
    let tl = gsap.timeline({
      defaults: { duration: 2.1, ease: "power3.inOut" },
      onComplete: () => {
      } 
    })
    setTest(prev => prev + 1)
  }


  useEffect(() => {
    Observer.create({
      target: window,
      type: "wheel,touch,scroll,pointer",
      onUp: () => {
        console.log(test)
        testFunc()
      }, // Mouse down
      onDown: () => testFunc(), // Mouse up
      wheelSpeed: -1
    })
  }, [])

  useEffect(() => {
    console.log(test)
  }, [test])

  return (
    <div className='h-screen bg-black' >TestPage</div>
  )
}

export default TestPage