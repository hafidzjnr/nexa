// src/pages/Auth/Register.jsx
// Registration page for new users. Leverages the useAuth hook to create
// an account and log the user in on success. Presents a form with name,
// email and password fields.

import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@components/ui/Button'
import { useAuth } from '@hooks/useAuth'

export default function Register() {
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await register({ name, email, password })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-nexa-dark">
      <div className="w-full max-w-md bg-nexa-card border border-nexa-border rounded-2xl p-8">
        <h1 className="font-display font-bold text-2xl text-white mb-6">Daftar</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Nama Lengkap</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-nexa-dark border border-nexa-border text-white placeholder-white/40 focus:outline-none focus:border-nexa-primary"
              placeholder="Nama lengkap"
            />
          </div>
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
            {loading ? 'Memproses...' : 'Daftar'}
          </Button>
        </form>
        <p className="text-white/60 text-sm mt-4 text-center">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-nexa-accent hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  )
}