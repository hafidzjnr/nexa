// src/utils/rekomendasiProdi.js
// Provides logic to recommend study programs (prodi) based on a user score.
// The main exported function computes the admission probability for each
// prodi based on the user’s UTBK score and known thresholds. Programs with
// zero probability are filtered out and the remaining sorted descending.

/**
 * Compute UTBK score summary from question list and answers. This is a
 * wrapper around hitungSkor but exposed here for convenience. If you
 * already have the score you can call rekomendasiProdi directly.
 */
export function hitungSkorUTBK(soalList, jawaban) {
  let benar = 0,
    salah = 0,
    kosong = 0
  soalList.forEach((soal) => {
    const ans = jawaban[soal.id]
    if (!ans) kosong++
    else if (ans === soal.kunciJawaban) benar++
    else salah++
  })
  const nilai = benar * 4 - salah
  const total = soalList.length * 4
  return {
    benar,
    salah,
    kosong,
    nilai,
    persentase: total > 0 ? Math.round((nilai / total) * 100) : 0,
  }
}

/**
 * Recommend programs based on user score and program thresholds.
 * @param {number} skor       User’s UTBK score
 * @param {Array}  prodiList  List of programs with skorMinMasuk & skorRataRataMasuk
 * @returns {Array} The list with added property peluang (0–100)
 */
export function rekomendasiProdi(skor, prodiList) {
  return prodiList
    .map((prodi) => ({
      ...prodi,
      peluang: hitungPeluang(skor, prodi.skorMinMasuk, prodi.skorRataRataMasuk),
    }))
    .filter((p) => p.peluang > 0)
    .sort((a, b) => b.peluang - a.peluang)
}

function hitungPeluang(skorUser, skorMin, skorRata) {
  if (skorUser < skorMin) return 0
  if (skorUser >= skorRata) {
    // When user score is above average, cap the probability at 100 and
    // scale between 70 and 100
    return Math.min(100, Math.round(((skorUser - skorRata) / skorRata) * 50 + 70))
  }
  // Otherwise scale between 10 and 70 relative to min and avg
  return Math.round(((skorUser - skorMin) / (skorRata - skorMin)) * 60 + 10)
}

export default {
  hitungSkorUTBK,
  rekomendasiProdi,
}