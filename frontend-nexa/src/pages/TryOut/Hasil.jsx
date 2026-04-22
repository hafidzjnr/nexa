// src/pages/TryOut/Hasil.jsx
// Displays the result of a Try Out attempt. Shows overall score and a
// breakdown per subtest using a bar chart. It also lists recommended
// programs of study based on the user’s performance. If the user lands
// on this page without finishing the test, a friendly message is shown.

import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import useTryOutStore from '@store/tryoutStore'
import { hitungSkor } from '@utils/hitungSkor'
import { getSemuaProdi } from '@services/prodiService'
import { rekomendasiProdi } from '@utils/rekomendasiProdi'
import ScoreChart from '@components/shared/ScoreChart'
import Button from '@components/ui/Button'
import { ROUTES } from '@/constants/routes'

export default function HasilTryOut() {
  const { paketId } = useParams()
  const store = useTryOutStore()
  const { soalList, jawaban, selesai, skor } = store

  // Compute stats locally if available
  const stats = soalList.length > 0 ? hitungSkor(soalList, jawaban) : null
  const skorAkhir = skor ?? stats?.nilai ?? 0

  // Fetch list of programs for recommendation
  const { data: prodiList = [] } = useQuery({
    queryKey: ['prodi'],
    queryFn: getSemuaProdi,
  })

  // Compute top 5 recommended majors
  const rekom = useMemo(() => {
    if (!prodiList.length) return []
    return rekomendasiProdi(skorAkhir, prodiList).slice(0, 5)
  }, [skorAkhir, prodiList])

  if (!selesai) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-white px-6">
        <div>
          <h1 className="font-display font-bold text-3xl mb-4">Belum ada hasil</h1>
          <p className="text-white/60 mb-6">
            Kamu belum menyelesaikan try out. Silakan pilih paket dan kerjakan
            terlebih dahulu.
          </p>
          <Button as={Link} to={ROUTES.TRY_OUT} variant="primary">
            Kembali ke Try Out
          </Button>
        </div>
      </div>
    )
  }

  // Prepare data for the chart
  const chartData = stats?.perSubtes?.map((sub) => ({
    name: sub.kode,
    score: sub.persentase,
  }))

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="font-display font-bold text-3xl text-white mb-2">
        Hasil Try Out
      </h1>
      <p className="text-white/60 mb-8">
        Berikut rangkuman performa try out kamu.
      </p>
      {/* Overall score */}
      <div className="bg-nexa-card border border-nexa-border rounded-2xl p-6 mb-10">
        <h2 className="font-display font-semibold text-xl text-white mb-2">
          Skor Total
        </h2>
        <p className="text-4xl font-bold text-nexa-accent">
          {skorAkhir}
        </p>
        {stats && (
          <p className="text-white/50 mt-2">
            Benar: {stats.benar}, Salah: {stats.salah}, Kosong: {stats.kosong}
          </p>
        )}
      </div>
      {/* Chart */}
      {chartData && chartData.length > 0 && (
        <div className="mb-10">
          <h2 className="font-display font-semibold text-xl text-white mb-4">
            Skor per Subtes (persentase)
          </h2>
          <ScoreChart data={chartData} />
        </div>
      )}
      {/* Recommendations */}
      <div>
        <h2 className="font-display font-semibold text-xl text-white mb-4">
          Rekomendasi Program Studi
        </h2>
        {rekom.length === 0 ? (
          <p className="text-white/60">Tidak ada program studi yang direkomendasikan.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rekom.map((prodi) => (
              <div
                key={prodi.id}
                className="border border-nexa-border rounded-2xl p-4 bg-card-gradient"
              >
                <h3 className="font-display font-semibold text-white text-lg mb-1">
                  {prodi.nama}
                </h3>
                <p className="text-white/50 text-sm mb-2">
                  {prodi.universitas} — {prodi.kategori}
                </p>
                <p className="text-nexa-accent font-bold text-sm">
                  Peluang: {prodi.peluang}%
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Navigation Buttons */}
      <div className="mt-10 flex gap-4">
        <Button as={Link} to={ROUTES.TRY_OUT} variant="primary">
          Coba Lagi
        </Button>
        <Button as={Link} to={ROUTES.ULASAN_PRODI} variant="outline">
          Jelajahi Prodi
        </Button>
      </div>
    </div>
  )
}