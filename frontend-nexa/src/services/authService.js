// src/services/authService.js
// Service functions to handle authentication API calls. They use the
// configured axios instance to communicate with backend endpoints. On
// success, they return the parsed response data.

import api from './api'

/**
 * Log in a user with the provided credentials.
 * @param {Object} credentials { email, password }
 * @returns {Promise<{ user: Object, token: string }>}
 */
export async function login(credentials) {
  const response = await api.post('/auth/login', credentials)
  return response.data
}

/**
 * Register a new user.
 * @param {Object} data { name, email, password }
 * @returns {Promise<{ user: Object, token: string }>}
 */
export async function register(data) {
  const response = await api.post('/auth/register', data)
  return response.data
}

export default {
  login,
  register,
}