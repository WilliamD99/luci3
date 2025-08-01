'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'

// Constants for better maintainability
const FOOTER_LINKS = {
    navigation: [
        { label: 'Work', href: '/work' },
        { label: 'Studio', href: '/studio' },
        { label: 'News', href: '/news' },
        { label: 'Contact', href: '/contact' },
    ],
    social: [
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/williamd99/', external: true },
        { label: 'Github', href: 'https://github.com/WilliamD99', external: true },
        { label: 'Email', href: 'mailto:dnam310199@gmail.com', external: true },
    ],
    contact: {
        address: {
            street: 'Vancouver, BC',
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
    const textSectionRef = useRef<HTMLDivElement>(null)
    const videoSectionRef = useRef<HTMLDivElement>(null)

    // Simple reveal animation using GSAP matchMedia
    useGSAP(() => {
        let mm = gsap.matchMedia()

        // Desktop reveal effect (1024px and above)
        mm.add("(min-width: 1024px)", () => {
            if (textSectionRef.current && videoSectionRef.current && containerRef.current) {

                // Set initial position - content starts above the viewport
                gsap.set([textSectionRef.current, videoSectionRef.current], {
                    y: -600, // Start 600px above
                })

                // Animate content sliding down as user scrolls through footer
                gsap.to([textSectionRef.current, videoSectionRef.current], {
                    y: 0, // End at normal position
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom", // When footer top hits viewport bottom
                        end: "bottom bottom", // When footer bottom hits viewport bottom
                        scrub: true
                    }
                })
            }
        })

        // Mobile/tablet: no animation (static content)
        mm.add("(max-width: 1023px)", () => {
            // Reset any transforms for mobile
            if (textSectionRef.current && videoSectionRef.current) {
                gsap.set([textSectionRef.current, videoSectionRef.current], {
                    clearProps: "all"
                })
            }
        })

        return () => mm.kill()
    }, { scope: containerRef })

    return (
        <footer
            ref={containerRef}
            id="footer"
            className={`relative overflow-hidden h-screen my-auto mx-auto grid grid-rows-3 ${className}`}
            role="contentinfo"
            aria-label="Site footer"
        >
            <div className='wrapper row-span-2 relative grid grid-cols-1 lg:grid-cols-3 xl2:grid-cols-4 gap-8 lg:gap-20 '>
                <div ref={textSectionRef} className='flex flex-col justify-center space-y-6 lg:col-span-1'>
                    <div className='title-wrapper flex flex-col'>
                        <p className='text-4xl sm:text-6xl xl2:text-[12rem] font-poppins font-semibold leading-none'>
                            Our Story
                        </p>
                    </div>
                    <p className='text-base xl2:text-2xl xl2:pt-12 font-nunito'>
                        The story behind Luci is one of exploration, creativity and curiosity.
                    </p>
                </div>
                <div ref={videoSectionRef} className='lg:col-span-2 xl2:col-span-3 relative flex justify-center items-center'>
                    <video
                        className='w-full h-auto block'
                        playsInline
                        loop
                        muted
                        disablePictureInPicture
                        autoPlay
                        preload="metadata"
                        aria-label="Background video showcasing our story"
                    >
                        <source src="/assets/video/video-6.mp4" type='video/mp4' />
                        <p>Your browser does not support the video tag.</p>
                    </video>
                </div>
            </div>

            <div className='row-span-1'>
                <div className='wrapper py-4 lg:py-10'>
                    <div className='border-b border-white/20' aria-hidden="true"></div>
                </div>
                <div className='wrapper row-span-1 flex flex-col items-center h-full'>
                    <div className='grid grid-cols-2 lg:flex lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-0'>
                        {/* Contact Information */}
                        <div className='address hidden lg:block space-y-2 order-3 lg:order-1'>
                            <address className='not-italic'>
                                <Link
                                    className='text-sm lg:text-lg hover:opacity-70 transition-opacity duration-200 font-nunito'
                                    href="#"
                                    target='_blank'
                                    rel="noopener noreferrer"
                                    aria-label="Visit our office location"
                                >
                                    {FOOTER_LINKS.contact.address.street}<br />
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
                        <nav className='mr-20 lg:mr-0 order-1 lg:order-2' aria-label="Footer navigation">
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
                        </nav>

                        {/* Social Links */}
                        <nav className='order-2 lg:order-3' aria-label="Social media links">
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
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    )
}

