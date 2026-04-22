// src/hooks/useAuth.js
// Provides helper functions for authentication actions such as login,
// registration and logout. Hooks into the auth store to update user and
// token state. Uses react-hot-toast for feedback.

import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useAuthStore from '@store/authStore'
import { login as loginService, register as registerService } from '@services/authService'

export function useAuth() {
  const navigate = useNavigate()
  const setUser = useAuthStore((state) => state.setUser)
  const setToken = useAuthStore((state) => state.setToken)
  const logoutStore = useAuthStore((state) => state.logout)

  const login = useCallback(async (credentials) => {
    try {
      const { user, token } = await loginService(credentials)
      setUser(user)
      setToken(token)
      toast.success('Login berhasil')
      navigate('/')
    } catch (err) {
      const message = err.response?.data?.message || 'Gagal login. Periksa kredensial Anda.'
      toast.error(message)
      throw err
    }
  }, [setUser, setToken, navigate])

  const register = useCallback(async (data) => {
    try {
      const { user, token } = await registerService(data)
      setUser(user)
      setToken(token)
      toast.success('Registrasi berhasil')
      navigate('/')
    } catch (err) {
      const message = err.response?.data?.message || 'Registrasi gagal. Coba lagi.'
      toast.error(message)
      throw err
    }
  }, [setUser, setToken, navigate])

  const logout = useCallback(() => {
    logoutStore()
    navigate('/')
  }, [logoutStore, navigate])

  return { login, register, logout }
}

export default useAuth