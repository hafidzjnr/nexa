// src/constants/routes.js
// Define route paths for the application. These constants are used throughout
// the app to ensure consistency when referring to specific pages. Having a
// centralized map of routes makes it easier to update or refactor paths in
// the future without hunting down hard‑coded strings.

export const ROUTES = {
  BERANDA:             '/',
  LOGIN:               '/login',
  REGISTER:            '/register',
  KESESUAIAN_JURUSAN:  '/kesesuaian-jurusan',
  KESESUAIAN_HASIL:    '/kesesuaian-jurusan/hasil',
  ULASAN_PRODI:        '/ulasan-prodi',
  ULASAN_PRODI_DETAIL: '/ulasan-prodi/:slug',
  BELAJAR:             '/belajar',
  BELAJAR_MATERI:      '/belajar/:materiId',
  TRY_OUT:             '/try-out',
  TRY_OUT_SOAL:        '/try-out/:paketId/soal',
  TRY_OUT_HASIL:       '/try-out/:paketId/hasil',
}

export default ROUTES