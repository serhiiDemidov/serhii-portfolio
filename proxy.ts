import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
    const session = await auth();
    const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
    const isLoginPage = request.nextUrl.pathname === '/admin/login';

    if (isAdminPage && !isLoginPage && !session) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
