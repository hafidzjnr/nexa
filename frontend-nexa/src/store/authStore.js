// src/store/authStore.js
// Zustand store for authentication data. Persist middleware stores the
// auth state in localStorage so that the user remains logged in across
// browser sessions.

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'nexa-auth' }
  )
)

export default useAuthStore