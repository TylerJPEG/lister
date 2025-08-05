import { NextRequest, NextResponse } from 'next/server'
import { AUTH_COOKIE } from '@/lib/auth'

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value

  // Allow access to login page, login API, or static files
  const isLoginPage = request.nextUrl.pathname === '/login'
  const isLoginApi = request.nextUrl.pathname === '/api/login'
  const isPublicFile = /\.(.*)$/.test(request.nextUrl.pathname)

  if (token || isLoginPage || isLoginApi || isPublicFile) {
    return NextResponse.next()
  }

  // Redirect to /login if not authenticated
  return NextResponse.redirect(new URL('/login', request.url))
}

// Match all routes under / except static files
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
