import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTimer } from '@hooks/useTime'
import useTryOutStore from '@store/tryOutStore'
import { generateSoalRNG } from '@utils/rngsoal'
import { ROUTES } from '@/constants/routes'
import Button from '@components/ui/Button'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'

const DURASI_DETIK = 105 * 60 // 105 menit

// Mock soal untuk testing
const MOCK_SOAL_BANK = [
  {
    id: 1,
    subtes: 'PU',
    pertanyaan: 'Jika 2x + 3 = 11, maka nilai x adalah...',
    opsi: [
      { id: 'A', teks: '2' },
      { id: 'B', teks: '3' },
      { id: 'C', teks: '4' },
      { id: 'D', teks: '5' },
      { id: 'E', teks: '6' },
    ],
    jawaban: 'C',
  },
  {
    id: 2,
    subtes: 'PU',
    pertanyaan: 'Lanjutkan deret: 2, 4, 8, 16, ...',
    opsi: [
      { id: 'A', teks: '24' },
      { id: 'B', teks: '28' },
      { id: 'C', teks: '30' },
      { id: 'D', teks: '32' },
      { id: 'E', teks: '36' },
    ],
    jawaban: 'D',
  },
  {
    id: 3,
    subtes: 'PU',
    pertanyaan: 'Pembacaan grafik menunjukkan peningkatan sebesar berapa persen?',
    opsi: [
      { id: 'A', teks: '25%' },
      { id: 'B', teks: '50%' },
      { id: 'C', teks: '75%' },
      { id: 'D', teks: '100%' },
      { id: 'E', teks: '150%' },
    ],
    jawaban: 'B',
  },
]

export default function SoalTryOut() {
  const { paketId } = useParams()
  const navigate = useNavigate()
  const store = useTryOutStore()

  // Inisialisasi soal dari mock data
  useEffect(() => {
    if (store.soalList.length === 0) {
      store.setSoalList(MOCK_SOAL_BANK)
    }
  }, [])

  const { menit, detik } = useTimer(DURASI_DETIK, handleSubmit)

  async function handleSubmit() {
    // Hitung skor
    let benar = 0
    MOCK_SOAL_BANK.forEach(soal => {
      if (store.jawaban[soal.id] === soal.jawaban) {
        benar++
      }
    })
    const skor = Math.round((benar / MOCK_SOAL_BANK.length) * 100)
    
    store.selesaikan(skor)
    navigate(`/try-out/${paketId}/hasil`)
  }

  if (store.soalList.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-nexa-dark">
        <div>Memuat soal...</div>
      </div>
    )
  }

  const soalAktif = store.soalList[store.soalIndex]

  return (
    <div className="min-h-screen bg-nexa-dark flex flex-col">
      {/* Header */}
      <div className="bg-nexa-card border-b border-nexa-border px-6 py-4 flex items-center justify-between">
        <div className="font-display font-semibold text-white">
          Soal {store.soalIndex + 1} / {store.soalList.length}
        </div>
        <div className={`flex items-center gap-2 font-mono font-bold text-xl ${
          parseInt(menit) < 5 ? 'text-red-400' : 'text-nexa-accent'
        }`}>
          <Clock size={20} />
          {menit}:{detik}
        </div>
        <Button size="sm" variant="danger" onClick={handleSubmit}>Selesai</Button>
      </div>

      {/* Soal */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-10">
        <div className="mb-2 text-nexa-accent text-sm font-medium uppercase tracking-wider">{soalAktif.subtes}</div>
        <p className="text-white text-lg leading-relaxed mb-8">{soalAktif.pertanyaan}</p>

        {/* Opsi Jawaban */}
        <div className="flex flex-col gap-3">
          {soalAktif.opsi.map((opsi) => {
            const dipilih = store.jawaban[soalAktif.id] === opsi.id
            return (
              <button
                key={opsi.id}
                onClick={() => store.setJawaban(soalAktif.id, opsi.id)}
                className={`w-full text-left px-6 py-4 rounded-xl border transition-all duration-200
                  ${
                    dipilih
                      ? 'bg-nexa-primary border-nexa-primary text-white shadow-lg shadow-nexa-primary/30'
                      : 'bg-nexa-card border-nexa-border text-white/70 hover:border-nexa-primary/50 hover:text-white'
                  }`}
              >
                <span className="font-semibold mr-3">{opsi.id}.</span>{opsi.teks}
              </button>
            )
          })}
        </div>

        {/* Navigasi */}
        <div className="flex justify-between mt-10">
          <Button variant="ghost" onClick={store.prevSoal} disabled={store.soalIndex === 0}>
            <ChevronLeft size={18} /> Sebelumnya
          </Button>
          <Button onClick={store.nextSoal} disabled={store.soalIndex === store.soalList.length - 1}>
            Berikutnya <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  )
}