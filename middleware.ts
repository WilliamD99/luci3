import { NextRequest, NextResponse, userAgent } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { device } = userAgent(request)

    // Check the viewport
    const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'

    const response = NextResponse.next()
    response.cookies.set('type', viewport)

    let test = response.cookies.get('type')
    // return NextResponse.redirect(new URL('/', request.url))
    // return NextResponse.rewrite(new URL(`${request.url}/type=${viewport}`), request.url)
    // return NextResponse.rewrite(new URL(`${request.url}/type=${viewport}`, request.url))
    return response

}

// // See "Matching Paths" below to learn more
// export const config = {
//     matcher: '/*',
// }