'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Fields can’t be blank')
      return
    }

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (data.success) {
      router.push('/')
    } else {
      setError(data.error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-4">
      <div className="w-full max-w-sm bg-white p-6 shadow rounded">
        <div className="text-center mb-6">
          <p className="text-xs font-medium text-neutral-700 mb-1">💀 Grim Lister</p>
          <h1 className="text-lg font-semibold text-neutral-900 leading-tight">It’s awful to see you again.</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm text-neutral-700 block mb-1">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={error && !email ? 'border-red-500' : ''}
              placeholder="Enter email"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm text-neutral-700 block mb-1">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={error && !password ? 'border-red-500' : ''}
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 text-sm p-3 rounded">
              <p className="font-medium">Please check the marked fields</p>
              <p className="text-xs">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full mt-2">Log in</Button>
        </form>
      </div>
    </div>
  )
}
