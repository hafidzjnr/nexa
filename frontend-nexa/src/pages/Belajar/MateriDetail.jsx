import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getMateriById } from '@services/materiService'
import { Document, Page, pdfjs } from 'react-pdf'
import { useState } from 'react'
import Button from '@components/ui/Button'
import { ROUTES } from '@/constants/routes'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

/**
 * Page for viewing a single study material PDF.
 * Provides simple pagination controls for multi-page documents.
 */
export default function MateriDetail() {
  const { materiId } = useParams()
  const { data: materi, isLoading } = useQuery({
    queryKey: ['materi', materiId],
    queryFn: () => getMateriById(materiId),
  })
  const [pageNum, setPageNum] = useState(1)
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Memuat PDF...</div>
  }
  if (!materi) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-white">
        Materi tidak ditemukan.
      </div>
    )
  }
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-display font-bold text-2xl text-white mb-4">{materi.judul}</h1>
      <div className="mb-6">
        <Button as={Link} to={ROUTES.BELAJAR}>
          Kembali
        </Button>
      </div>
      <div className="border border-nexa-border rounded-xl overflow-hidden">
        <Document file={materi.url} onLoadSuccess={({ numPages }) => setPageNum(Math.min(pageNum, numPages))}>
          <Page pageNumber={pageNum} width={800} />
        </Document>
      </div>
      <div className="flex justify-between mt-4">
        <Button
          variant="ghost"
          onClick={() => setPageNum((p) => Math.max(1, p - 1))}
          disabled={pageNum <= 1}
        >
          Prev
        </Button>
        <Button
          variant="ghost"
          onClick={() => setPageNum((p) => p + 1)}
          disabled={false /* cannot know total pages until PDF loads */}
        >
          Next
        </Button>
      </div>
    </div>
  )
}