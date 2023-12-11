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

// Helper function to wrap elements
const wrapElements = (elems: any, wrapType: any, wrapClass: any) => {
    elems.forEach((char: any) => {
      const wrapEl = document.createElement(wrapType);
      wrapEl.classList = wrapClass;
      char.parentNode.appendChild(wrapEl);
      wrapEl.appendChild(char);
    });
};

const Work = (props: Props) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const itemsRef = useRef<HTMLDivElement[]>([])

    const [index, setIndex] = useState<number>(0)
    const [nextIndex, setNextIndex] = useState<number>(1)
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

    let animate = useCallback(debounce((direction: number) => {
        // Next: 1
        // Prev : -1
        if (containerRef.current) {
            // Current Item
            let currentItem = itemsRef.current[index]
            let currentItemInner = currentItem.querySelector('.slider__item-inner')


            let nextItem = itemsRef.current[index + direction]
            let nextItemInner = nextItem.querySelector(".slider__item-inner")

            // console.log(nextItemIndex, index)

            let tl = gsap.timeline({
                defaults: { duration: 2.1, ease: "power3.inOut" },
                onComplete: () => {
                    updateIndex(direction)
                    setAnimating(false)
                }
            })
            tl.to(
                currentItem, 
                {
                    yPercent: direction === 1 ? 100 : -100,
                    onComplete: () => gsap.set(containerRef.current.querySelector(".slider__item--current"), { opacity: 0 })
                },
            )
            tl.to(
                currentItemInner, 
                {
                    yPercent: direction === 1 ? -30 : 30,
                    startAt: {
                        rotation: 0
                    },
                    rotation: direction * 15,
                    scaleY: 2.8
                },
                0
            )

            tl.to(
                nextItem, {
                    startAt: {
                        yPercent: direction === 1 ? -80 : 80,
                        opacity: 1
                    },
                    yPercent: 0,
                },
                0
            )

            tl.to(
                nextItemInner,
                {
                    startAt: {
                        yPercent: direction === 1 ? 30 : -30,
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
    }, 500), [index, isAnimating, containerRef, itemsRef])

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

    useEffect(() => {
    }, [index])
    

    return (
        <div id="work" className='min-h-screen'>
            <div ref={containerRef} className='slider slider--bg'>
                {
                    WorkArr.map((work, workIndex) => (
                        <SliderItem ref={itemsRef} currentIndex={index} image={work.image} index={workIndex}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Work