import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = request.nextUrl;

    if (!token && pathname !== '/signin') {
        const url = request.nextUrl.clone();
        url.pathname = '/signin';
        return NextResponse.redirect(url);
    }

    if (token && pathname === '/signin') {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    // Attach admin info to the request
    if (token && token.email === 'sakthimuruganakash@gmail.com') {
        request.headers.set('X-Is-Admin', 'true');
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/protected/**', '/signin'],
};
