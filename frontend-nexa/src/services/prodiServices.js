// src/services/prodiService.js
import api from './api'

export const getSemuaProdi     = ()          => api.get('/prodi').then(r => r.data)
export const getProdiBySlug    = (slug)      => api.get(`/prodi/${slug}`).then(r => r.data)
export const getProdiByKategori = (kategori) => api.get(`/prodi?kategori=${kategori}`).then(r => r.data)