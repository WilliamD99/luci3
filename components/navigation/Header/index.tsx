'use client'

import Link from 'next/link'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { debounce} from 'lodash'
import HeaderScrolled from './HeaderScrolled'

function Header({}, ref: any) {
    let headerRef = useRef<HTMLDivElement>(null)

    let [isHeaderActive, setHeaderActive] = useState<boolean>(true)
    let [isHeaderScrolledActive, setHeaderScrolledActive] = useState<boolean>(false)

    // Switch between menu
    let handleScroll = debounce((e: any) => {
        let yPosition = window.scrollY
        // First Menu Animation
        if (yPosition === 0) setHeaderActive(true)
        else {
            if (isHeaderActive) setHeaderActive(false)
        }
        // Second Menu Animation
        if (yPosition > 200) {
            if (!isHeaderScrolledActive) setHeaderScrolledActive(true)
        }
        else {
            setHeaderScrolledActive(false)
        }

    }, 100)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <>
            <div ref={headerRef} id="navigation_header" className={`fixed z-50 flex flex-row justify-between items-center w-full px-16 py-8 ${isHeaderActive ? "active" : ""}`}>
                <Link href="/" className='text-white text-2xl'>Luci3</Link>
                <div className='flex flex-row space-x-10'>
                    <Link className='text-white text-sm nav_link underline-effect' href="/work">Work</Link>
                    <Link className='text-white text-sm nav_link underline-effect' href="/">Studio</Link>
                    <Link className='text-white text-sm nav_link underline-effect' href="#">News</Link>
                    <Link className='text-white text-sm nav_link underline-effect' href="#">Contact</Link>
                </div>
            </div>
            <HeaderScrolled ref={ref} isActive={isHeaderScrolledActive}/>
        </>
    )
}

export default forwardRef(Header)