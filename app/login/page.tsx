'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])

    const newErrors: string[] = []

    // Validate presence
    if (!email) newErrors.push('Email can’t be blank')
    if (!password) newErrors.push('Password can’t be blank')

    // Validate format
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email && !emailFormat.test(email)) newErrors.push('Invalid email address')

    // Stop here if basic errors
    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    // Passed basic validation; ask server to verify credentials
    setLoading(true)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrors([data.error || 'Invalid credentials'])
        setLoading(false)
        return
      }

      router.push('/')
    } catch (err) {
      setErrors(['Something went wrong'])
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center">Log in</h1>

        {errors.length > 0 && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {errors.map((err, idx) => (
                <p key={idx}>{err}</p>
              ))}
            </AlertDescription>
          </Alert>
        )}

        <div>
          <Input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Logging in…' : 'Login'}
        </Button>
      </form>
    </div>
  )
}