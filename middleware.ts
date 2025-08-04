import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value

  // Allow access to login page or static files
  const isLoginPage = request.nextUrl.pathname === '/login'
  const isPublicFile = /\.(.*)$/.test(request.nextUrl.pathname)

  if (token || isLoginPage || isPublicFile) {
    return NextResponse.next()
  }

  // Redirect to /login if not authenticated
  return NextResponse.redirect(new URL('/login', request.url))
}

// Match all routes under / except static files
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
