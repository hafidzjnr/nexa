// src/utils/rngSoal.js
// Utilities for randomizing questions. Implements the Fisher–Yates
// shuffle algorithm to ensure an unbiased distribution when shuffling
// arrays. Also provides a helper to generate a randomized question list
// based on a configuration object specifying how many questions to pick
// from each subtest.

/**
 * Perform an in‑place Fisher–Yates shuffle on a copy of the given array.
 * @param {Array} array The array to shuffle
 * @returns {Array} A new shuffled array
 */
function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Generate a randomized set of questions according to a configuration.
 * Each subtest in the config defines how many questions should be drawn.
 * @param {Array} soalBank All available questions for a package
 * @param {Object} config  Shape: { subtes: { [code]: jumlah } }
 * @returns {Array} The randomized list of questions with shuffled options
 */
export function generateSoalRNG(soalBank, config) {
  const grouped = {}
  soalBank.forEach((soal) => {
    if (!grouped[soal.subtes]) grouped[soal.subtes] = []
    grouped[soal.subtes].push(soal)
  })
  const result = []
  Object.entries(config.subtes).forEach(([subtes, jumlah]) => {
    const pool = grouped[subtes] || []
    const shuffled = shuffle(pool)
    const selected = shuffled.slice(0, jumlah)
    selected.forEach((soal) => {
      result.push({
        ...soal,
        opsi: shuffle(soal.opsi),
      })
    })
  })
  return result
}

export default {
  shuffle,
  generateSoalRNG,
}