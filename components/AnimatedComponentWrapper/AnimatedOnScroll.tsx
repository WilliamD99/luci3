import React, { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap-trial'
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger'
import { useGSAP } from '@gsap/react'

type Props = {
    children: React.ReactNode,
    direction?: "left" | "right" | "up" | "down",
    stagger?: number,
    target: React.RefObject<HTMLElement> | null
}

const AnimatedOnScroll = ({
    children,
    direction,
    stagger,
    target
}: Props) => {
    const ele = useRef<HTMLDivElement>(null);

    let animStagger = stagger ? stagger : 0.2;

    let animDirectionFunc = useCallback(() => {
      let animDirection;
      switch (direction) {
        case "left":
          animDirection = "x";
          break;
        case "right":
          animDirection = "x";
          break;
        case "up":
          animDirection = "y";
          break;
        case "down":
          animDirection = "y";
          break;
        default:
          animDirection = "y";
      }
      return animDirection;
    }, [direction]);

    useGSAP(() => {
        const startLocation: { [key: string]: number } = {
            [animDirectionFunc()]: direction === "down" || direction === "right" ? -200 : 200,
        };
    
        const targetElement : any = target?.current ? gsap.utils.toArray(target.current) : [ele.current];
    
        gsap.set(targetElement, { autoAlpha: 0, ...startLocation });
    
        ScrollTrigger.batch(targetElement, {
            interval: 0.1,
            onEnter: (batch) => {
                startLocation[animDirectionFunc()] = 0;
    
                if (ele.current) {
                    ele.current.classList.remove("invisible");
                }
    
                gsap.to(batch, {
                    autoAlpha: 1,
                    ...startLocation,
                    ease: "Sine.easeInOut",
                    stagger: animStagger,
                });
            },
        });
    }, [direction, target]);

    return (
        <>
            <div className="invisible overflow-hidden" ref={ele}>
                {children}
            </div>        
        </>
    )
}

export default AnimatedOnScroll