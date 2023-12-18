import React, { useContext } from 'react';
import { SwitchTransition, Transition } from 'react-transition-group';

import { usePathname } from 'next/navigation';
import TransitionContext from '@/utils/context/TransitionContext';
import gsap from "@/utils/gsap"

type Props = {
    children: React.ReactNode
}

const PageTransitionComponent = ({ children }: Props) => {
    const pathName = usePathname()
    const { toggleCompleted } = useContext<any>(TransitionContext);
    
    
    return (
        <>
            <SwitchTransition>
                <Transition
                    key={pathName}
                    timeout={500}
                    onEnter={(node: any) => {
                        toggleCompleted(false);
                        // gsap.set(document.documentElement, { autoAlpha: 0, scale: 0.8, xPercent: -100 });
                        // gsap
                        //     .timeline({
                        //     paused: true,
                        //     onComplete: () => toggleCompleted(true),
                        //     })
                        //     .to(document.documentElement
                        //         , { autoAlpha: 1, xPercent: 0, duration: 0.25 })
                        //     .to(document.documentElement, { scale: 1, duration: 0.25 })
                        //     .play();
                    }}
                    onExit={(node) => {
                            // gsap
                            //     .timeline({ paused: true })
                            //     .to(document.documentElement, { scale: 0.8, duration: 0.2 })
                            //     .to(document.documentElement, { xPercent: 100, autoAlpha: 0, duration: 0.2 })
                            //     .play();
                        }
                    }
                    >
                    {children}
                </Transition>
            </SwitchTransition>        
        </>
    )
}

export default PageTransitionComponent