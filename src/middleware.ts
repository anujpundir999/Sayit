import { NextResponse,NextRequest } from 'next/server'
export {default} from "next-auth/middleware"
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    const token = await getToken({req:request});
    const url = request.nextUrl
    const path = url.pathname;

    const publicPaths = ['/sign-in', '/sign-up', '/verify'];
    if (token && publicPaths.includes(path)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if(!token && url.pathname.startsWith('/dashboard')){
        return NextResponse.redirect(new URL('/sign-in',request.url));
    }
    return NextResponse.next();

}

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/',
    '/dashboard/:path*',
    '/verify/:path*'
]
}