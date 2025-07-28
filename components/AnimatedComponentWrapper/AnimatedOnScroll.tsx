import React, { useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { isElementInDOM, safeBatch } from '@/utils/domSafeGSAP'

type Props = {
    children: React.ReactNode,
    direction?: "left" | "right" | "up" | "down",
    stagger?: number,
    target: React.RefObject<HTMLElement> | null,
    className?: string
}

const AnimatedOnScroll = ({
    children,
    direction,
    stagger,
    target,
    className
}: Props) => {
    const ele = useRef<HTMLDivElement>(null);
    const batchRef = useRef<any>(null);

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
            rotate: 6
        };

        const targetElement: any = target?.current ? gsap.utils.toArray(target.current) : [ele.current];

        // Check if elements exist before proceeding
        if (!targetElement || targetElement.length === 0) {
            return;
        }

        gsap.set(targetElement, { autoAlpha: 0, ...startLocation });

        batchRef.current = safeBatch(targetElement, {
            interval: 0.1,
            onEnter: (validBatch: any) => {
                startLocation[animDirectionFunc()] = 0;

                if (ele.current && isElementInDOM(ele.current)) {
                    ele.current.classList.remove("invisible");
                }

                gsap.to(validBatch, {
                    autoAlpha: 1,
                    ...startLocation,
                    rotate: 0,
                    ease: "Sine.easeInOut",
                    duration: 0.75,
                    stagger: animStagger,
                });
            },
        });

        // Cleanup function
        return () => {
            if (batchRef.current) {
                // Kill the batch ScrollTrigger
                batchRef.current.forEach((st: any) => st && st.kill && st.kill());
                batchRef.current = null;
            }
        };
    }, [direction, target]);

    return (
        <div className={`invisible overflow-hidden leading-none w-fit h-fit ${className}`} ref={ele}>
            {children}
        </div>
    )
}

export default AnimatedOnScroll