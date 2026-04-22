// src/pages/NotFound.jsx
// Fallback page rendered for unmatched routes. Encourages the user to
// return to the homepage or explore other sections.

import { Link } from 'react-router-dom'
import Button from '@components/ui/Button'
import { ROUTES } from '@/constants/routes'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6 bg-nexa-dark">
      <div className="max-w-lg">
        <h1 className="font-display font-bold text-5xl text-nexa-accent mb-4">404</h1>
        <h2 className="font-display font-semibold text-2xl text-white mb-4">Halaman tidak ditemukan</h2>
        <p className="text-white/60 mb-8">
          Maaf, halaman yang kamu cari tidak tersedia. Coba kembali ke beranda atau
          gunakan navigasi di atas untuk menemukan informasi lain.
        </p>
        <Button as={Link} to={ROUTES.BERANDA} size="lg">
          Kembali ke Beranda
        </Button>
      </div>
    </div>
  )
}