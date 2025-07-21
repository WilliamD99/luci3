import gsap from './gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Safely checks if an element exists and is in the DOM
 */
export const isElementInDOM = (element: any): boolean => {
    if (!element) return false;
    if (typeof element.nodeType !== 'undefined') {
        return document.body.contains(element);
    }
    return false;
};

/**
 * Filters an array of elements to only include those still in DOM
 */
export const filterValidElements = (elements: any[]): any[] => {
    return elements.filter(el => isElementInDOM(el));
};

/**
 * Safe GSAP animation that checks element validity
 */
export const safeGSAP = {
    to: (targets: any, vars: any) => {
        const targetArray = gsap.utils.toArray(targets);
        const validTargets = filterValidElements(targetArray);
        if (validTargets.length > 0) {
            return gsap.to(validTargets, vars);
        }
        return null;
    },

    set: (targets: any, vars: any) => {
        const targetArray = gsap.utils.toArray(targets);
        const validTargets = filterValidElements(targetArray);
        if (validTargets.length > 0) {
            return gsap.set(validTargets, vars);
        }
        return null;
    },

    fromTo: (targets: any, fromVars: any, toVars: any) => {
        const targetArray = gsap.utils.toArray(targets);
        const validTargets = filterValidElements(targetArray);
        if (validTargets.length > 0) {
            return gsap.fromTo(validTargets, fromVars, toVars);
        }
        return null;
    }
};

/**
 * Safe ScrollTrigger.batch that validates elements
 */
export const safeBatch = (targets: any, config: any) => {
    const targetArray = gsap.utils.toArray(targets);
    const validTargets = filterValidElements(targetArray);

    if (validTargets.length === 0) {
        console.warn('No valid targets for ScrollTrigger.batch');
        return [];
    }

    return ScrollTrigger.batch(validTargets, {
        ...config,
        onEnter: (batch: any) => {
            const validBatch = filterValidElements(batch);
            if (validBatch.length > 0 && config.onEnter) {
                config.onEnter(validBatch);
            }
        },
        onLeave: config.onLeave ? (batch: any) => {
            const validBatch = filterValidElements(batch);
            if (validBatch.length > 0) {
                config.onLeave(validBatch);
            }
        } : undefined,
        onEnterBack: config.onEnterBack ? (batch: any) => {
            const validBatch = filterValidElements(batch);
            if (validBatch.length > 0) {
                config.onEnterBack(validBatch);
            }
        } : undefined,
        onLeaveBack: config.onLeaveBack ? (batch: any) => {
            const validBatch = filterValidElements(batch);
            if (validBatch.length > 0) {
                config.onLeaveBack(validBatch);
            }
        } : undefined,
    });
}; 