import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllMateri } from '@services/materiService'
import { Link } from 'react-router-dom'
import SearchBar from '@components/shared/SearchBar'
import CategoryFilter from '@components/shared/CategoryFilter'
import Card from '@components/ui/Card'

const KATEGORI_MATERI = [
  'Semua',
  'Matematika',
  'Fisika',
  'Kimia',
  'Biologi',
  'Bahasa Indonesia',
  'Bahasa Inggris',
]

/**
 * Page for listing study materials.
 * Supports searching and filtering by category.
 */
export default function Belajar() {
  const [search, setSearch] = useState('')
  const [kategori, setKategori] = useState('Semua')
  const { data: materiList = [], isLoading } = useQuery({
    queryKey: ['materi'],
    queryFn: getAllMateri,
  })
  const filtered = useMemo(() => {
    return materiList.filter((materi) => {
      const matchSearch = materi.judul.toLowerCase().includes(search.toLowerCase())
      const matchKategori = kategori === 'Semua' || materi.kategori === kategori
      return matchSearch && matchKategori
    })
  }, [materiList, search, kategori])
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="font-display font-bold text-3xl text-white mb-2">Belajar</h1>
      <p className="text-white/50 mb-6">
        Akses materi lengkap UTBK-SNBT dalam format PDF yang terstruktur.
      </p>
      <SearchBar value={search} onChange={setSearch} placeholder="Cari materi..." />
      <CategoryFilter categories={KATEGORI_MATERI} selected={kategori} onSelect={setKategori} />
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-24 rounded-2xl bg-nexa-card border border-nexa-border animate-pulse" />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((materi) => (
            <Link key={materi.id} to={`/belajar/${materi.id}`}>
              <Card>
                <h3 className="font-display font-semibold text-white text-lg mb-2">
                  {materi.judul}
                </h3>
                <p className="text-white/50 text-sm">{materi.kategori}</p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}