import Image from 'next/image';
import React, { forwardRef } from 'react'

export interface SliderItemProps {
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
                <Image priority className='slider__item-inner' src={image} fill alt={`image-${index}`} />
            </div>
        </>
    )
}

export default forwardRef(SliderItem)


// 0