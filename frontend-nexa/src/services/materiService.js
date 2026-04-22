// src/services/materiService.js
// Service functions for retrieving study materials. These wrap the axios
// calls and return the data from the response for easier consumption by
// components and hooks.

import api from './api'

export const getAllMateri = () =>
  api.get('/materi').then((res) => res.data)

export const getMateriById = (id) =>
  api.get(`/materi/${id}`).then((res) => res.data)

export default {
  getAllMateri,
  getMateriById,
}