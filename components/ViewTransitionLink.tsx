'use client';

import { useRouter } from 'next/navigation';

export default function TransitionLink({ href, children, className }: { href: string; children: React.ReactNode, className?: string }) {
    const router = useRouter();

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();

        // Check if View Transitions are supported
        if (document.startViewTransition) {
            // Prepare transition by fixing height and preserving scroll position
            const prepareTransition = () => {
                const mainElement = document.querySelector('main');
                const mainContent = document.querySelector('.main-content');
                const scrollPosition = window.scrollY;
                const viewportHeight = window.innerHeight;

                if (mainElement && mainContent) {
                    // Store original styles for restoration
                    const originalMainHeight = mainElement.style.height;
                    const originalMainOverflow = mainElement.style.overflow;
                    const originalContentMargin = (mainContent as HTMLElement).style.marginTop;

                    // Fix main height to viewport and preserve scroll position visually
                    mainElement.style.height = `${viewportHeight}px`;
                    mainElement.style.overflow = 'hidden';
                    (mainContent as HTMLElement).style.marginTop = `-${scrollPosition}px`;

                    // Add transition class for styling control
                    mainElement.classList.add('transition-prepared');

                    // Store restoration function
                    (mainElement as any).__restoreStyles = () => {
                        mainElement.style.height = originalMainHeight;
                        mainElement.style.overflow = originalMainOverflow;
                        (mainContent as HTMLElement).style.marginTop = originalContentMargin;
                        mainElement.classList.remove('transition-prepared');
                    };
                }
            };

            // Restore normal styles after transition
            let isRestored = false;
            const restoreTransition = () => {
                if (isRestored) return; // Already restored, exit early

                const mainElement = document.querySelector('main');
                if (mainElement && typeof (mainElement as any).__restoreStyles === 'function') {
                    isRestored = true; // Mark as being restored

                    // Delay matches your CSS animation duration (2s) + small buffer
                    setTimeout(() => {
                        try {
                            // Restore normal page structure and scrolling
                            console.log('About to call __restoreStyles...');
                            if (typeof (mainElement as any).__restoreStyles === 'function') {
                                (mainElement as any).__restoreStyles();
                                console.log('__restoreStyles called successfully');
                                delete (mainElement as any).__restoreStyles;
                            } else {
                                console.error('__restoreStyles is not a function:', typeof (mainElement as any).__restoreStyles);
                                // Manual restoration if function is missing
                                const mainEl = document.querySelector('main') as HTMLElement;
                                const contentEl = document.querySelector('.main-content') as HTMLElement;
                                if (mainEl && contentEl) {
                                    mainEl.style.height = '';
                                    mainEl.style.overflow = '';
                                    contentEl.style.marginTop = '';
                                    mainEl.classList.remove('transition-prepared');
                                    console.log('Manual restoration completed');
                                }
                            }

                            // Reset scroll position to top of new page
                            window.scrollTo(0, 0);

                            // Body should stay overflow:hidden for ScrollSmoother
                            // ScrollSmoother handles the actual scrolling

                            // Improved ScrollSmoother management
                            setTimeout(() => {
                                console.log('Managing ScrollSmoother after page transition...');
                                const scrollSmoother = (window as any).ScrollSmoother?.get();
                                console.log('ScrollSmoother found:', !!scrollSmoother);

                                if (scrollSmoother) {
                                    // Instead of killing, try to refresh first
                                    console.log('Refreshing existing ScrollSmoother...');
                                    scrollSmoother.refresh();
                                    scrollSmoother.scrollTo(0, false);

                                    // Refresh all ScrollTrigger instances after ScrollSmoother refresh
                                    if ((window as any).ScrollTrigger) {
                                        (window as any).ScrollTrigger.refresh();
                                        console.log('ScrollTrigger refreshed after ScrollSmoother update');
                                    }
                                } else {
                                    // Only create new ScrollSmoother if none exists
                                    console.log('Creating new ScrollSmoother...');
                                    const newScrollSmoother = (window as any).ScrollSmoother?.create({
                                        smooth: 0.75,
                                        effects: true,
                                        smoothTouch: 0.1
                                    });

                                    if (newScrollSmoother) {
                                        newScrollSmoother.scrollTo(0, false);
                                        console.log('New ScrollSmoother created and scrolled to top');

                                        // Refresh ScrollTrigger after new ScrollSmoother creation
                                        setTimeout(() => {
                                            if ((window as any).ScrollTrigger) {
                                                (window as any).ScrollTrigger.refresh();
                                                console.log('ScrollTrigger refreshed after new ScrollSmoother');
                                            }
                                        }, 100);
                                    } else {
                                        console.error('Failed to create ScrollSmoother');
                                        // Fallback: enable manual scrolling
                                        document.body.style.overflow = 'auto';
                                        console.log('Fallback: enabled manual scrolling');
                                    }
                                }

                                // Dispatch custom event for additional ScrollTrigger refreshes
                                setTimeout(() => {
                                    window.dispatchEvent(new CustomEvent('scrolltrigger-refresh'));
                                    console.log('ViewTransitionLink: Dispatched scrolltrigger-refresh event');
                                }, 300);
                            }, 100); // Reduced delay for faster response
                        } catch (error) {
                            console.error('Error during transition cleanup:', error);
                            // Basic cleanup even if restore function fails
                            window.scrollTo(0, 0);

                            // Try to ensure ScrollSmoother works even if other restoration failed
                            setTimeout(() => {
                                const scrollSmoother = (window as any).ScrollSmoother?.get();
                                if (scrollSmoother) {
                                    scrollSmoother.refresh();
                                    scrollSmoother.scrollTo(0, false);

                                    // Always refresh ScrollTrigger in fallback
                                    if ((window as any).ScrollTrigger) {
                                        (window as any).ScrollTrigger.refresh();
                                    }
                                    console.log('Fallback: ScrollSmoother and ScrollTrigger restored');
                                }

                                // Dispatch custom event even in fallback
                                window.dispatchEvent(new CustomEvent('scrolltrigger-refresh'));
                            }, 200);
                        }
                    }, 0);
                }
            };

            // Prepare the transition
            prepareTransition();

            // Use View Transition API for smooth transitions
            const transition = document.startViewTransition(async () => {
                // Navigate to the new page
                router.push(href);
            });

            // Restore styles after transition completes
            transition.finished.then(restoreTransition).catch(restoreTransition);

            // Fallback: Force restoration if transition takes too long (safety net)
            // setTimeout(() => {
            //     if (!isRestored) {
            //         console.warn('Forcing transition cleanup due to timeout');
            //         restoreTransition();
            //     }
            // }, 3000);
        } else {
            // Fallback for browsers without View Transition support
            router.push(href);
        }
    };

    return <a href={href} onClick={handleClick} className={className}>{children}</a>;
}
