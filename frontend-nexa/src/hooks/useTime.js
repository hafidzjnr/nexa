// src/hooks/useTimer.js
import { useState, useEffect, useRef } from 'react'

export function useTimer(durasiDetik, onSelesai) {
  const [sisa, setSisa]    = useState(durasiDetik)
  const intervalRef        = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSisa(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          onSelesai?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [])

  const menit = Math.floor(sisa / 60).toString().padStart(2, '0')
  const detik = (sisa % 60).toString().padStart(2, '0')

  return { sisa, menit, detik, isHabis: sisa === 0 }
}