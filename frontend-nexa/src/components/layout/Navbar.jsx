// src/components/layout/Navbar.jsx
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { User, ChevronDown } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import useAuthStore from '@store/authStore'

const navLinks = [
  { label: 'Beranda',            to: ROUTES.BERANDA },
  { label: 'Kesesuaian Jurusan', to: ROUTES.KESESUAIAN_JURUSAN },
  { label: 'Ulasan Prodi',       to: ROUTES.ULASAN_PRODI },
  { 
    label: 'Belajar',            
    to: ROUTES.BELAJAR, 
    hasDropdown: true,
    submenu: [
      { label: 'Semua Materi', to: '/belajar' },
      { label: 'Matematika', to: '/belajar?kategori=matematika' },
      { label: 'Fisika', to: '/belajar?kategori=fisika' },
      { label: 'Kimia', to: '/belajar?kategori=kimia' },
      { label: 'Biologi', to: '/belajar?kategori=biologi' },
    ]
  },
  { label: 'Try Out',            to: ROUTES.TRY_OUT },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const { user }     = useAuthStore()
  const [openDropdown, setOpenDropdown] = useState(null)

  return (
    <nav className="sticky top-0 z-50 bg-[#1a0e3a]/90 backdrop-blur-md border-b border-nexa-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to={ROUTES.BERANDA} className="font-display font-bold text-2xl text-nexa-secondary tracking-wide">
          NEXA
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.to} className="relative group">
              <Link
                to={link.to}
                onMouseEnter={() => link.hasDropdown && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200
                  ${pathname === link.to ? 'text-white font-semibold' : 'text-white/60 hover:text-white'}`}
              >
                {link.label}
                {link.hasDropdown && <ChevronDown size={14} className={`transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`} />}
              </Link>

              {/* Dropdown Menu */}
              {link.hasDropdown && link.submenu && (
                <div 
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  className={`absolute left-0 mt-0 w-48 bg-nexa-card border border-nexa-border rounded-lg shadow-xl transition-all duration-200 origin-top ${
                    openDropdown === link.label 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-2'
                  }`}
                >
                  <div className="py-2">
                    {link.submenu.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.to}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-nexa-primary/20 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Auth Icon */}
        <button className="w-9 h-9 rounded-full border border-nexa-border flex items-center justify-center text-white/70 hover:text-white hover:border-nexa-primary transition-all">
          <User size={18} />
        </button>
      </div>
    </nav>
  )
}