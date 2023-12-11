import React, { forwardRef } from 'react'

interface SliderItemProps {
    image: string;
    index: number;
    currentIndex: number
}

function SliderItem({
    image,
    index,
    currentIndex
} : SliderItemProps, ref: any) {
    return (
        <>
            <div ref={(ele) => ref.current[index] = ele} id={`item-${index}`} className={`slider__item ${index === currentIndex ? "slider__item--current" : ""}`}>
                <div className='slider__item-inner' style={{
                    backgroundImage: `url(${image})`
                }}></div>
            </div>
        </>
    )
}

export default forwardRef(SliderItem)


// 0