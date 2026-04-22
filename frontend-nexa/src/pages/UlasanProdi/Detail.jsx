import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProdiBySlug } from '@services/prodiService'
import Button from '@components/ui/Button'
import { ROUTES } from '@/constants/routes'

/**
 * Detail page for a specific program.
 * Fetches data by slug and displays description and metadata.
 */
export default function UlasanProdiDetail() {
  const { slug } = useParams()
  const { data: prodi, isLoading } = useQuery({
    queryKey: ['prodi', slug],
    queryFn: () => getProdiBySlug(slug),
  })
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Memuat...</div>
  }
  if (!prodi) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-white">
        Program studi tidak ditemukan.
      </div>
    )
  }
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="font-display font-bold text-3xl text-white mb-2">{prodi.nama}</h1>
      <p className="text-white/50 mb-6">
        {prodi.universitas} &bull; {prodi.kategori}
      </p>
      <p className="text-white/70 mb-8 whitespace-pre-wrap">
        {prodi.deskripsi || 'Deskripsi belum tersedia.'}
      </p>
      <Button as={Link} to={ROUTES.ULASAN_PRODI}>
        Kembali
      </Button>
    </div>
  )
}