/**
 * Purpose: Guards admin routes using authentication cookie checks.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  ADMIN_TOKEN_COOKIE_NAME,
  ADMIN_TOKEN_COOKIE_VALUE,
} from '@/lib/adminAuth';

/**
 * Protects admin routes except the login page.
 * @param request Incoming request.
 * @returns Next response to continue or redirect.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const adminToken = request.cookies.get(ADMIN_TOKEN_COOKIE_NAME);

    if (!adminToken || adminToken.value !== ADMIN_TOKEN_COOKIE_VALUE) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
