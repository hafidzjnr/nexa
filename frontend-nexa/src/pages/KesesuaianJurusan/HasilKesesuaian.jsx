import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getSemuaProdi } from '@services/prodiService'
import ProdiCard from '@components/shared/ProdiCard'
import Button from '@components/ui/Button'
import { rekomendasiProdi } from '@utils/rekomendasiProdi'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

/**
 * Page displaying recommended programs after completing the suitability survey.
 */
export default function HasilKesesuaian() {
  const { data: prodiList = [] } = useQuery({
    queryKey: ['prodi'],
    queryFn: getSemuaProdi,
  })
  // Example score; in real usage this would come from survey answers.
  const skor = 500
  const rekom = useMemo(() => rekomendasiProdi(skor, prodiList).slice(0, 5), [prodiList])
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="font-display font-bold text-3xl text-white mb-2">Hasil Kesesuaian Jurusan</h1>
      <p className="text-white/60 mb-8">
        Berdasarkan jawaban survei kamu, berikut rekomendasi jurusan:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rekom.map((prodi) => (
          <ProdiCard key={prodi.id} prodi={prodi} />
        ))}
      </div>
      <div className="mt-8">
        <Button as={Link} to={ROUTES.KESESUAIAN_JURUSAN}>
          Ulang Survei
        </Button>
      </div>
    </div>
  )
}