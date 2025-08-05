import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { serialize } from 'cookie'
import { AUTH_COOKIE } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, password } = body

  const validEmail = process.env.AUTH_EMAIL
  const validPassword = process.env.AUTH_PASSWORD

  // Empty field check (should be prevented client-side but safe here too)
  if (!email || !password) {
    return NextResponse.json(
      { success: false, error: 'Fields can’t be blank' },
      { status: 400 }
    )
  }

  // Account check
  if (email !== validEmail) {
    return NextResponse.json(
      { success: false, error: 'Account doesn’t exist' },
      { status: 401 }
    )
  }

  // Password check
  if (password !== validPassword) {
    return NextResponse.json(
      { success: false, error: 'Password is invalid' },
      { status: 401 }
    )
  }

  // Set secure auth cookie
  const cookie = serialize(AUTH_COOKIE, 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })

  const response = NextResponse.json({ success: true })
  response.headers.set('Set-Cookie', cookie)
  return response
}
