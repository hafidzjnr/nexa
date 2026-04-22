import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import ProdiCard from '@components/shared/ProdiCard'
import { getSemuaProdi } from '@services/prodiService'

const KATEGORI = ['Semua', 'Teknologi', 'Kesehatan', 'Bisnis', 'Sosial', 'Teknik', 'Seni', 'Sains']

/**
 * Page for browsing and filtering list of programs.
 */
export default function UlasanProdi() {
  const [search, setSearch] = useState('')
  const [kategori, setKategori] = useState('Semua')
  const { data: prodiList = [], isLoading } = useQuery({
    queryKey: ['prodi'],
    queryFn: getSemuaProdi,
  })
  const filtered = useMemo(
    () =>
      prodiList.filter((p) => {
        const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase())
        const matchKategori = kategori === 'Semua' || p.kategori === kategori
        return matchSearch && matchKategori
      }),
    [prodiList, search, kategori]
  )
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="font-display font-bold text-3xl text-white mb-2">Ulasan Program Studi</h1>
      <p className="text-white/50 mb-8">Jelajahi program studi di berbagai perguruan tinggi Indonesia.</p>
      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari Program Studi..."
          className="w-full max-w-md pl-11 pr-4 py-3 rounded-xl bg-nexa-card border border-nexa-border text-white placeholder-white/30 focus:outline-none focus:border-nexa-primary transition-colors"
        />
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {KATEGORI.map((k) => (
          <button
            key={k}
            onClick={() => setKategori(k)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              k === kategori
                ? 'bg-white text-nexa-dark'
                : 'bg-nexa-card border border-nexa-border text-white/60 hover:text-white hover:border-nexa-primary/50'
            }`}
          >
            {k}
          </button>
        ))}
      </div>
      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(9)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-32 rounded-2xl bg-nexa-card border border-nexa-border animate-pulse" />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((prodi) => (
            <ProdiCard key={prodi.id} prodi={prodi} />
          ))}
        </div>
      )}
    </div>
  )
}