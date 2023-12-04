import localFont from 'next/font/local'

const headingFont = localFont({
    src: [
        {
            path: "../../public/assets/fonts/heading-300.woff2",
            weight: '300',
            style: "normal"
        },
        {
            path: "../../public/assets/fonts/heading-400.woff2",
            weight: '400',
            style: "normal"
        },
        {
            path: "../../public/assets/fonts/heading-500.woff2",
            weight: '500',
            style: "normal"
        },
    ]
})

export default headingFont