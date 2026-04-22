// src/hooks/useProdiFilter.js
// Provides a simple abstraction over filtering a list of programs of study
// based on search term and selected category. Returns the filtered list
// along with handlers to change the search term and category.

import { useState, useMemo } from 'react'

export function useProdiFilter(prodiList, initialKategori = 'Semua') {
  const [search, setSearch] = useState('')
  const [kategori, setKategori] = useState(initialKategori)
  const filtered = useMemo(() => {
    return prodiList.filter((p) => {
      const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase())
      const matchKategori = kategori === 'Semua' || p.kategori === kategori
      return matchSearch && matchKategori
    })
  }, [prodiList, search, kategori])
  return { search, setSearch, kategori, setKategori, filtered }
}

export default useProdiFilter