// src/pages/TryOut/Soal.jsx
// The question page for a Try Out package. It fetches the questions from
// the backend, shuffles them according to the defined configuration and
// displays one question at a time. A countdown timer runs in the header
// and automatically submits answers when it reaches zero.

import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useTimer from '@hooks/useTimer'
import useTryOutStore from '@store/tryoutStore'
import { getSoalByPaket, submitJawaban } from '@services/tryoutService'
import { generateSoalRNG } from '@utils/rngSoal'
import Button from '@components/ui/Button'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'

const DURASI_DETIK = 105 * 60 // 105 minutes for full try out

export default function SoalTryOut() {
  const { paketId } = useParams()
  const navigate = useNavigate()
  const store = useTryOutStore()

  // Fetch all questions for this package
  const { data: soalBank = [], isLoading } = useQuery({
    queryKey: ['soal', paketId],
    queryFn: () => getSoalByPaket(paketId),
  })

  // Generate random questions when data arrives
  useEffect(() => {
    if (soalBank.length > 0 && store.soalList.length === 0) {
      const acak = generateSoalRNG(soalBank, {
        subtes: { PU: 30, PPU: 20, PBM: 20, PM: 20, LBInd: 25, LBIng: 20 },
      })
      store.setSoalList(acak)
    }
  }, [soalBank, store])

  // Timer that calls handleSubmit when finished
  const { menit, detik } = useTimer(DURASI_DETIK, handleSubmit)

  async function handleSubmit() {
    try {
      const hasil = await submitJawaban(paketId, { jawaban: store.jawaban })
      store.selesaikan(hasil.skor)
    } finally {
      navigate(`/try-out/${paketId}/hasil`)
    }
  }

  const soalAktif = store.soalList[store.soalIndex]

  if (isLoading || !soalAktif) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Memuat soal...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-nexa-dark flex flex-col">
      {/* Header */}
      <div className="bg-nexa-card border-b border-nexa-border px-6 py-4 flex items-center justify-between">
        <div className="font-display font-semibold text-white">
          Soal {store.soalIndex + 1} / {store.soalList.length}
        </div>
        <div
          className={`flex items-center gap-2 font-mono font-bold text-xl ${parseInt(menit) < 5 ? 'text-red-400' : 'text-nexa-accent'}`}
        >
          <Clock size={20} /> {menit}:{detik}
        </div>
        <Button size="sm" variant="danger" onClick={handleSubmit}>
          Selesai
        </Button>
      </div>

      {/* Question */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-10">
        <div className="mb-2 text-nexa-accent text-sm font-medium uppercase tracking-wider">
          {soalAktif.subtes}
        </div>
        <p className="text-white text-lg font-body leading-relaxed mb-8 whitespace-pre-wrap">
          {soalAktif.pertanyaan}
        </p>
        {/* Options */}
        <div className="flex flex-col gap-3">
          {soalAktif.opsi.map((opsi) => {
            const dipilih = store.jawaban[soalAktif.id] === opsi.id
            return (
              <button
                key={opsi.id}
                onClick={() => store.setJawaban(soalAktif.id, opsi.id)}
                className={`w-full text-left px-6 py-4 rounded-xl border transition-all duration-200 font-body ${
                  dipilih
                    ? 'bg-nexa-primary border-nexa-primary text-white shadow-lg shadow-nexa-primary/30'
                    : 'bg-nexa-card border-nexa-border text-white/70 hover:border-nexa-primary/50 hover:text-white'
                }`}
              >
                <span className="font-semibold mr-3">{opsi.id}.</span>
                {opsi.teks}
              </button>
            )
          })}
        </div>
        {/* Navigation */}
        <div className="flex justify-between mt-10">
          <Button
            variant="ghost"
            onClick={store.prevSoal}
            disabled={store.soalIndex === 0}
          >
            <ChevronLeft size={18} /> Sebelumnya
          </Button>
          <Button
            onClick={store.nextSoal}
            disabled={store.soalIndex === store.soalList.length - 1}
          >
            Berikutnya <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  )
}