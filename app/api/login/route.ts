import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const validEmail = process.env.AUTH_EMAIL
  const validPassword = process.env.AUTH_PASSWORD

  if (!email || !password) {
    return NextResponse.json({ error: 'Field can\'t be blank' }, { status: 400 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  if (email !== validEmail) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 401 })
  }

  if (password !== validPassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  // Set cookie (basic string flag for now)
  cookies().set('auth', 'true', {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  })

  return NextResponse.json({ success: true })
}
