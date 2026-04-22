// src/services/tryoutService.js
// Provides functions to fetch try out packages, retrieve questions,
// submit answers and get results from the backend. All functions return
// the data payload of the response.

import api from './api'

export const getPaketTryOut = () =>
  api.get('/tryout/paket').then((res) => res.data)

export const getSoalByPaket = (paketId) =>
  api.get(`/tryout/paket/${paketId}/soal`).then((res) => res.data)

export const submitJawaban = (paketId, data) =>
  api.post(`/tryout/paket/${paketId}/submit`, data).then((res) => res.data)

export const getHasilTryOut = (paketId) =>
  api.get(`/tryout/paket/${paketId}/hasil`).then((res) => res.data)

export default {
  getPaketTryOut,
  getSoalByPaket,
  submitJawaban,
  getHasilTryOut,
}