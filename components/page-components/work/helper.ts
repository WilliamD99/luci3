function findIndexOfActiveElement(elements: HTMLDivElement[]) {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains('slider__item--current')) {
            return i;
        }
    }
    // If no element with the "active" class is found, return -1 or any other appropriate value
    return -1;
}

function formatNumber(number: number) {
    return number < 10 ? `0${number}` : `${number}`;
}

export {
    findIndexOfActiveElement,
    formatNumber
}