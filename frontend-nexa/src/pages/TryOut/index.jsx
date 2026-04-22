// src/pages/TryOut/index.jsx
// Display available try out packages for selection. Users can select a package
// to start answering its questions. When clicking the start button, they
// will be navigated to the question page for the chosen package.

import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getPaketTryOut } from '@services/tryoutService'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import { ROUTES } from '@/constants/routes'

export default function TryOut() {
  const { data: paketList = [], isLoading } = useQuery({
    queryKey: ['paket-tryout'],
    queryFn: getPaketTryOut,
  })

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="font-display font-bold text-3xl text-white mb-2">Try Out</h1>
      <p className="text-white/50 mb-8">
        Pilih paket simulasi UTBK yang tersedia dan mulai uji kemampuanmu.
      </p>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-32 rounded-2xl bg-nexa-card border border-nexa-border animate-pulse"
              />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paketList.map((paket) => (
            <Card key={paket.id} className="flex flex-col justify-between h-full">
              <div>
                <h3 className="font-display font-semibold text-white text-lg mb-2">
                  {paket.nama || paket.judul}
                </h3>
                <p className="text-white/50 text-sm mb-4">
                  {paket.deskripsi || 'Paket try out UTBK'}
                </p>
                {paket.jumlahSoal && (
                  <p className="text-white/40 text-xs mb-1">
                    Jumlah Soal: {paket.jumlahSoal}
                  </p>
                )}
                {paket.durasi && (
                  <p className="text-white/40 text-xs mb-1">
                    Durasi: {paket.durasi} menit
                  </p>
                )}
              </div>
              <div className="mt-4">
                <Button
                  as={Link}
                  to={`/try-out/${paket.id}/soal`}
                  size="sm"
                  className="w-full"
                >
                  Mulai Paket
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}