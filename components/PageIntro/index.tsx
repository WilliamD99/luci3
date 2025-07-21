import React from 'react'

export default function PageIntro({ onComplete }: { onComplete: () => void }) {
    return (
        <div className="page-intro-wrapper fixed top-0 left-0 h-screen w-screen bg-black z-[9999]">
            <div className="page-intro-content">
                <div className="page-intro-content-inner">
                    <h1>Page Intro</h1>
                </div>
                <div className="page-intro-content-inner">
                    <h1>Page Intro</h1>
                </div>
                <div className="page-intro-content-inner">
                    <h1>Page Intro</h1>
                </div>
            </div>
        </div>
    )
}
