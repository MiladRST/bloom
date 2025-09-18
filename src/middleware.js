import { NextResponse } from "next/server";

const protectedRoutes = ["/p-admin", "/p-user"];
const publicRoutes = ["/login-register"];

export const config = {
    matcher: [
        '/p-user/:path*',
        '/p-admin/:path*',
        '/login-register',
        

    /*
     * Apply middleware to all pages except:
     * 1. /api/* (exclude all API routes)
     * 2. /login (exclude the login page)
     * 3. /_next/* (exclude Next.js assets, e.g., /_next/static/*)
     */
    // '/((?!/auth).*)',
  ],
}

export async function middleware(request) {
    
    const path = request.nextUrl.pathname
    
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    const token = request.cookies.get('token')?.value
    const refreshToken = request.cookies.get('refresh-token')?.value
    
    if (!token && refreshToken) {
        return NextResponse.redirect(new URL(`/auth?redirect=${path}` , request.nextUrl))
    }
    
    if(isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login-register' , request.nextUrl))
    }

    if(isPublicRoute && token) {
        return NextResponse.redirect(new URL('/p-user' , request.nextUrl))
    }

    return NextResponse.next()
}

