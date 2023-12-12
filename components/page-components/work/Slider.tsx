'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'


// Helper + Library
import dynamic from 'next/dynamic'
import gsap from '@/utils/gsap'
import { throttle } from 'lodash'
import { findIndexOfActiveElement } from './helper'

// Component
import { Observer } from 'gsap-trial/Observer'
import SliderItem from '@/components/page-components/work/SliderItem'
const IndexIndicator = dynamic(() => import('./IndexIndicator'), { ssr: false })

interface SliderItemProps {
    image: string;
}

interface SliderProps {
    items: SliderItemProps[];
    reversed?: boolean;
    className?: string;
    action?: boolean; // Use this props to trigger the animation from the parent component (toggle between true and false)
    actionDirection?: 1 | -1;
    showIndex?: boolean 
}

export default function Slider({
    items,
    reversed = false,
    className,
    action,
    actionDirection = 1,
    showIndex
} : SliderProps ) {
    const containerRef = useRef<HTMLDivElement>(null)
    const itemsRef = useRef<HTMLDivElement[]>([])
    
    const [index, setIndex] = useState<number>(0)
    const [isAnimating, setAnimating] = useState<boolean>(false)

    const updateIndex = (direction: number) => {
        setIndex((prevIndex) => {
          let newIndex = prevIndex + direction;
    
          // Wrap around logic for increasing index
          if (direction === 1) {
            newIndex = newIndex >= itemsRef.current.length ? 0 : newIndex;
          }
    
          // Wrap around logic for decreasing index
          if (direction === -1) {
            newIndex = newIndex <= 0 ? itemsRef.current.length - 1 : newIndex;
          }
    
          return newIndex;
        });
    };

    let animate = (direction: number) => {
        // Next: 1
        // Prev : -1
        if (containerRef.current) {
            // Current Item
            let currentIndex = findIndexOfActiveElement(itemsRef.current)
            // Determine the next item index base on the direction going
            let nextIndex = currentIndex + direction
            const length = itemsRef.current.length;
            nextIndex = (direction === 1) ? (nextIndex >= length ? 0 : nextIndex) : (nextIndex <= 0 ? length - 1 : nextIndex);
            
            let currentItem = itemsRef.current[currentIndex]
            let currentItemInner = currentItem.querySelector('.slider__item-inner')

            // Next Item based on the direction
            let nextItem = itemsRef.current[nextIndex]
            let nextItemInner = nextItem.querySelector(".slider__item-inner")


            let tl = gsap.timeline({
                defaults: { duration: 1.1, ease: "power4.inOut" },
                onComplete: () => {
                    updateIndex(direction)
                    setAnimating(false)
                }
            })
            tl.to(
                currentItem, 
                {
                    yPercent: reversed ? direction * 100 : -direction * 100,
                    autoAlpha: 1,
                    // onComplete: () => gsap.set(itemsRef.current[index], { opacity: 0 })
                },
            )
            tl.to(
                currentItemInner, 
                {
                    yPercent: reversed ? -direction * 30 : direction * 30,
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
                        yPercent: reversed ? -direction * 80 : direction * 80,
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
                        yPercent: reversed ? direction * 30 : -direction * 30,
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
    }

    const navigate = useCallback(throttle((direction: string) => {
        if (containerRef.current) {
            // Don't run the animation if it's still playing
            if (isAnimating) return
    
            setAnimating(true)
            if (direction === "next") animate(1)
            else animate(-1)

        }
    }, 1500), [index, setIndex])

    
    useEffect(() => {
        Observer.create({
            target: window,
            type: "wheel,touch,scroll,pointer",
            onUp: () => navigate('next'), // Mouse down
            onDown: () => navigate('prev'), // Mouse up
            wheelSpeed: -1,
            debounce: true
        })
    }, [])

    useEffect(() => {
        if (!action) return
        else {
            if (actionDirection === 1) navigate('next')
            else if (actionDirection === -1) navigate('prev')
        }
    }, [action])

    return (
        <>
            <div ref={containerRef} className={`slider ${className}`}>
                {
                    items.map((work, workIndex) => (
                        <SliderItem key={workIndex} ref={itemsRef} currentIndex={index} image={work.image} index={workIndex}/>
                    ))
                }
            </div>
            {
                showIndex ?
                <IndexIndicator index={index} total={items.length} />
                :
                <></>
            }
        </>
    )
}
