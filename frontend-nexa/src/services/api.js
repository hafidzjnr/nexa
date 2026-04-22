// src/services/api.js
// Axios instance preconfigured with base URL and interceptors. The
// interceptors automatically attach an Authorization header if a token is
// present in the auth store and handle 401 errors globally by logging
// out the user and redirecting to the login page.

import axios from 'axios'
import useAuthStore from '@store/authStore'

// Create axios instance with base URL from environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor: attach token if available
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor: handle auth errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalid or expired; log the user out and redirect to login
      useAuthStore.getState().logout()
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api