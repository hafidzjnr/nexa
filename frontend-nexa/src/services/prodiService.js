// src/services/prodiService.js
// Service functions for retrieving program of study (prodi) data from the
// backend. These functions return the data portion of the axios response.

import api from './api'

export const getSemuaProdi = () => api.get('/prodi').then((res) => res.data)

export const getProdiBySlug = (slug) =>
  api.get(`/prodi/${slug}`).then((res) => res.data)

export const getProdiByKategori = (kategori) =>
  api.get(`/prodi?kategori=${encodeURIComponent(kategori)}`).then((res) => res.data)

export default {
  getSemuaProdi,
  getProdiBySlug,
  getProdiByKategori,
}