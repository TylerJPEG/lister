'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [touched, setTouched] = useState({ email: false, password: false })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setTouched({ email: true, password: true })
      setError("Field can't be blank")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setTouched({ ...touched, email: true })
      setError('Invalid email address')
      return
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        router.push('/')
      } else {
        const result = await res.json()
        setError(result.message || 'Invalid login')
        setTouched({ email: true, password: true })
      }
    } catch (err) {
      setError('Something went wrong.')
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-muted">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 bg-white p-8 rounded shadow"
      >
        <h1 className="text-xl font-semibold text-center">It’s awful to see you again.</h1>

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={touched.email && !email ? 'border-destructive' : ''}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={touched.password && !password ? 'border-destructive' : ''}
          />
        </div>

        <Button type="submit" className="w-full">
          Log in
        </Button>
      </form>
    </main>
  )
}
