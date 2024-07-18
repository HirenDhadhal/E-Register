import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function middleware(request: { url: string | URL }) {
  const { isAuthenticated } = getKindeServerSession();

  if (!isAuthenticated) {
    const requestUrl = new URL(request.url);
    const loginUrl = new URL('/api/auth/login', requestUrl.origin);
    loginUrl.searchParams.set('post_login_redirect_url', '/dashboard');
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
