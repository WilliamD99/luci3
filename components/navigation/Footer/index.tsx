'use client'

import React, { useRef, useCallback } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'

// Constants for better maintainability
const ANIMATION_CONFIG = {
    initialVideoY: -200,
    initialWrapperY: -600,
    scrollTrigger: {
        start: "top bottom+=200px",
        end: "bottom bottom",
        scrub: true,
    }
} as const

const FOOTER_LINKS = {
    navigation: [
        { label: 'Work', href: '/work' },
        { label: 'Studio', href: '/studio' },
        { label: 'News', href: '/news' },
        { label: 'Contact', href: '/contact' },
    ],
    social: [
        { label: 'Behance', href: 'https://behance.net', external: true },
        { label: 'Dribbble', href: 'https://dribbble.com', external: true },
        { label: 'Twitter', href: 'https://twitter.com', external: true },
        { label: 'Instagram', href: 'https://instagram.com', external: true },
    ],
    contact: {
        address: {
            street: '2346 E 27th Ave',
            city: 'Vancouver, BC',
            country: 'Canada',
        },
        email: 'dnam310199@gmail.com',
    }
} as const

interface FooterProps {
    className?: string
}

export default function Footer({ className = '' }: FooterProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)

    // Optimize GSAP animation setup
    useGSAP(() => {
        const video = videoRef.current
        const wrapper = wrapperRef.current
        const container = containerRef.current

        if (!video || !wrapper || !container) return

        // Set initial states
        gsap.set([video, wrapper], {
            y: ANIMATION_CONFIG.initialVideoY,
            willChange: 'transform', // Optimize for animations
        })

        gsap.set(wrapper, {
            y: ANIMATION_CONFIG.initialWrapperY,
        })

        // Create timeline with improved performance
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                ...ANIMATION_CONFIG.scrollTrigger,
                invalidateOnRefresh: true, // Better responsive behavior
            }
        })

        tl.to(video, {
            y: 0,
            ease: 'power2.out',
        })
            .to(wrapper, {
                y: 0,
                ease: 'power2.out',
            }, "<")

        // Cleanup function
        return () => {
            tl.scrollTrigger?.kill()
            tl.kill()
        }
    }, { scope: containerRef })

    // Memoized video error handler
    const handleVideoError = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
        console.warn('Footer video failed to load:', e)
    }, [])

    // Memoized link renderer for better performance
    const renderNavLinks = useCallback(() => (
        <ul className='nav space-y-2' role="list">
            {FOOTER_LINKS.navigation.map((link) => (
                <li key={link.label} className='item'>
                    <Link
                        href={link.href}
                        className='underline-effect font-nunito text-sm lg:text-lg hover:opacity-70 transition-opacity duration-200'
                        aria-label={`Navigate to ${link.label}`}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    ), [])

    const renderSocialLinks = useCallback(() => (
        <ul className='social space-y-2' role="list">
            {FOOTER_LINKS.social.map((link) => (
                <li key={link.label} className='item'>
                    <Link
                        href={link.href}
                        className='underline-effect font-nunito text-sm lg:text-lg hover:opacity-70 transition-opacity duration-200'
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        aria-label={`Visit our ${link.label} page${link.external ? ' (opens in new tab)' : ''}`}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    ), [])

    return (
        <footer
            ref={containerRef}
            id="footer"
            className={`relative overflow-hidden ${className}`}
            role="contentinfo"
            aria-label="Site footer"
        >
            <div ref={wrapperRef} className='wrapper relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10'>
                <div className='flex flex-col justify-center space-y-6 lg:col-span-1'>
                    <div className='title-wrapper flex flex-col'>
                        <p className='text-4xl sm:text-6xl 2xl:text-[12rem] font-poppins font-semibold leading-none'>
                            Our Story
                        </p>
                    </div>
                    <p className='text-base 2xl:text-2xl font-nunito '>
                        The story behind Luci is one of exploration, creativity and curiosity.
                    </p>
                </div>

                <div className='lg:col-span-2 relative'>
                    <video
                        ref={videoRef}
                        className='w-full h-auto block'
                        playsInline
                        loop
                        muted
                        disablePictureInPicture
                        autoPlay
                        preload="metadata"
                        onError={handleVideoError}
                        aria-label="Background video showcasing our story"
                    >
                        <source src="/assets/video/video-6.mp4" type='video/mp4' />
                        <p>Your browser does not support the video tag.</p>
                    </video>
                </div>
            </div>

            <div className='wrapper py-6 lg:py-10'>
                <div className='border-b border-white/20' aria-hidden="true"></div>
            </div>

            <div className='wrapper'>
                <div className='flex flex-col lg:flex-row justify-between gap-8 lg:gap-0'>
                    {/* Contact Information */}
                    <div className='address space-y-2 order-3 lg:order-1'>
                        <address className='not-italic'>
                            <Link
                                className='text-sm lg:text-lg hover:opacity-70 transition-opacity duration-200 font-nunito'
                                href="#"
                                target='_blank'
                                rel="noopener noreferrer"
                                aria-label="Visit our office location"
                            >
                                {FOOTER_LINKS.contact.address.street}<br />
                                {FOOTER_LINKS.contact.address.city}<br />
                                {FOOTER_LINKS.contact.address.country}
                            </Link>
                        </address>
                        <div>
                            <Link
                                href={`mailto:${FOOTER_LINKS.contact.email}`}
                                className='underline-effect font-nunito text-sm lg:text-lg hover:opacity-70 transition-opacity duration-200'
                                aria-label="Send us an email"
                            >
                                {FOOTER_LINKS.contact.email}
                            </Link>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className='order-1 lg:order-2' aria-label="Footer navigation">
                        {renderNavLinks()}
                    </nav>

                    {/* Social Links */}
                    <nav className='order-2 lg:order-3' aria-label="Social media links">
                        {renderSocialLinks()}
                    </nav>
                </div>
            </div>
        </footer>
    )
}

