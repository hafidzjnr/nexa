// src/hooks/useTimer.js
// A countdown timer hook. Accepts a duration in seconds and an optional
// callback which will be executed when the timer reaches zero. Returns
// the remaining seconds as well as formatted minute and second strings.

import { useState, useEffect, useRef } from 'react'

export function useTimer(durationSeconds, onFinish) {
  const [remaining, setRemaining] = useState(durationSeconds)
  const intervalRef = useRef(null)

  useEffect(() => {
    // start the interval
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          if (onFinish) onFinish()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const minutes = Math.floor(remaining / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (remaining % 60)
    .toString()
    .padStart(2, '0')

  return {
    remaining,
    menit: minutes,
    detik: seconds,
    isHabis: remaining === 0,
  }
}

export default useTimer