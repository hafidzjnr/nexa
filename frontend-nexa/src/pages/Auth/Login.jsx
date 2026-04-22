// src/pages/Auth/Login.jsx
// Login page for users to authenticate. Uses the useAuth hook to call
// the login service and update global auth state. Displays a form with
// fields for email and password, a submit button, and a link to the
// registration page.

import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@components/ui/Button'
import { useAuth } from '@hooks/useAuth'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await login({ email, password })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-nexa-dark">
      <div className="w-full max-w-md bg-nexa-card border border-nexa-border rounded-2xl p-8">
        <h1 className="font-display font-bold text-2xl text-white mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-nexa-dark border border-nexa-border text-white placeholder-white/40 focus:outline-none focus:border-nexa-primary"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-nexa-dark border border-nexa-border text-white placeholder-white/40 focus:outline-none focus:border-nexa-primary"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full" loading={loading}>
            {loading ? 'Memproses...' : 'Masuk'}
          </Button>
        </form>
        <p className="text-white/60 text-sm mt-4 text-center">
          Belum punya akun?{' '}
          <Link to="/register" className="text-nexa-accent hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  )
}