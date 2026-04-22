import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@components/ui/Button'
import Modal from '@components/ui/Modal'
import { ROUTES } from '@/constants/routes'

/**
 * Page for Kesesuaian Jurusan (major suitability survey).
 * Currently renders a description and placeholder modal to start survey.
 */
export default function KesesuaianJurusan() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  function startSurvey() {
    setOpen(false)
    // In a real app, user would answer questions and we would compute a result.
    navigate(ROUTES.KESESUAIAN_HASIL)
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="font-display font-bold text-3xl text-white mb-4">Kesesuaian Jurusan</h1>
      <p className="text-white/60 mb-8">
        Temukan jurusan yang paling sesuai dengan minat dan bakatmu melalui survei interaktif.
      </p>
      <Button onClick={() => setOpen(true)}>Mulai Survei</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Survei Minat">
        <p className="text-white/70 mb-4">
          Fitur survei belum tersedia. Klik selesai untuk melihat contoh hasil.
        </p>
        <Button onClick={startSurvey}>Selesai</Button>
      </Modal>
    </div>
  )
}