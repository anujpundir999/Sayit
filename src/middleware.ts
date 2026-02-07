import { NextResponse,NextRequest } from 'next/server'
export {default} from "next-auth/middleware"
import { getToken } from 'next-auth/jwt'



export async function middleware(request: NextRequest) {
    const token = await getToken({req:request});
    const url = request.nextUrl
    const path = url.pathname;

    //if someone have token and he went to these routes then middleware will redirect them to the dashboard..
    //else they will be redirected to the home route

    const publicPaths = ['/sign-in', '/sign-up', '/verify', '/'];
    if (token && publicPaths.includes(path)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if(!token && url.pathname.startsWith('/dashboard')){
        return NextResponse.redirect(new URL('/sign-in',request.url));
    }
    return NextResponse.next();

}
//the config decides where will the middleware runs...
export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/',
    '/dashboard/:path*',
    '/verify/:path*'
]
}