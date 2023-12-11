'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Observer } from 'gsap-trial/Observer'
import SliderItem from '@/components/page-components/work/SliderItem'
import gsap from '@/utils/gsap'
import { debounce } from 'lodash'

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

function findIndexOfActiveElement(elements: HTMLDivElement[]) {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].classList.contains('slider__item--current')) {
        return i;
      }
    }
    // If no element with the "active" class is found, return -1 or any other appropriate value
    return -1;
}

const Work = (props: Props) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const itemsRef = useRef<HTMLDivElement[]>([])

    const [index, setIndex] = useState<number>(0)
    const [isAnimating, setAnimating] = useState<boolean>(false)

    const updateIndex = (direction: number) => {
        setIndex((prevIndex) => {
          let newIndex = prevIndex + direction;
    
          // Wrap around logic for increasing index
          if (direction === 1) {
            newIndex = newIndex > 3 ? 0 : newIndex;
          }
    
          // Wrap around logic for decreasing index
          if (direction === -1) {
            newIndex = newIndex < 0 ? 3 : newIndex;
          }
    
          return newIndex;
        });
      };

    let animate = debounce((direction: number) => {
        // Next: 1
        // Prev : -1
        if (containerRef.current) {
            // Current Item
            let currentIndex = findIndexOfActiveElement(itemsRef.current)
            let currentItem = itemsRef.current[currentIndex]
            let currentItemInner = currentItem.querySelector('.slider__item-inner')

            // Next Item based on the direction
            let nextItem = itemsRef.current[currentIndex + direction]
            let nextItemInner = nextItem.querySelector(".slider__item-inner")

            let tl = gsap.timeline({
                defaults: { duration: 1.1, ease: "power3.inOut" },
                onComplete: () => {
                    updateIndex(direction)
                    setAnimating(false)
                }
            })
            tl.to(
                currentItem, 
                {
                    yPercent: -direction * 100,
                    onComplete: () => gsap.set(itemsRef.current[index], { opacity: 0 })
                },
            )
            tl.to(
                currentItemInner, 
                {
                    yPercent: direction * 30,
                    startAt: {
                        rotation: 0
                    },
                    rotation: -direction * 15,
                    scaleY: 2.8
                },
                0
            )

            tl.to(
                nextItem, {
                    startAt: {
                        yPercent: direction * 80,
                        autoAlpha: 1
                    },
                    yPercent: 0,
                },
                0
            )

            tl.to(
                nextItemInner,
                {
                    startAt: {
                        yPercent: -direction * 30,
                        scaleY: 2.8,
                        rotation: 15 * direction
                    },
                    yPercent: 0,
                    scaleY: 1,
                    rotation: 0
                },
                0
            )
        }
    }, 500)

    const navigate = (direction: string) => {
        if (containerRef.current) {
            // Don't run the animation if it's still playing
            if (isAnimating) return
    
            setAnimating(true)

            if (direction === "next") animate(1)
            else animate(-1)

        }
    }

    useEffect(() => {
        Observer.create({
            target: window,
            type: "wheel,touch,scroll,pointer",
            onUp: () => navigate('next'), // Mouse down
            onDown: () => navigate('prev'), // Mouse up
            wheelSpeed: -1
        })
    }, [])


    // useEffect(() => {
    //     console.log(itemsRef.current)
    // }, [index])
    

    return (
        <div id="work" className='min-h-screen'>
            <div ref={containerRef} className={`slider slider--bg ${index}`}>
                {
                    WorkArr.map((work, workIndex) => (
                        <SliderItem key={workIndex} ref={itemsRef} currentIndex={index} image={work.image} index={workIndex}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Work