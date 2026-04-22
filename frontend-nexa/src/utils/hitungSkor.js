// src/utils/hitungSkor.js
// Functions to compute UTBK scores from a list of questions and user
// answers. Calculates the number of correct, incorrect, and blank
// responses. Also computes the total score, percentage and breakdown per
// subtest so that charts and analytics can be generated.

/**
 * Calculate score statistics for an entire try out.
 * @param {Array} soalList List of question objects (each must have id, subtes and kunciJawaban)
 * @param {Object} jawaban Mapping of soalId to chosen option id
 * @returns {Object} Summary of results
 */
export function hitungSkor(soalList, jawaban) {
  let benar = 0
  let salah = 0
  let kosong = 0
  const perSubtes = {}
  soalList.forEach((soal) => {
    const userAns = jawaban[soal.id]
    const subtes = soal.subtes
    if (!perSubtes[subtes]) {
      perSubtes[subtes] = { benar: 0, salah: 0, kosong: 0, total: 0 }
    }
    perSubtes[subtes].total += 1
    if (!userAns) {
      kosong++
      perSubtes[subtes].kosong += 1
    } else if (userAns === soal.kunciJawaban) {
      benar++
      perSubtes[subtes].benar += 1
    } else {
      salah++
      perSubtes[subtes].salah += 1
    }
  })
  const nilai = benar * 4 - salah * 1
  const totalPossible = soalList.length * 4
  const persentase = totalPossible > 0 ? Math.round((nilai / totalPossible) * 100) : 0
  // compute subtest scores relative to each subtest
  const subtestScores = Object.keys(perSubtes).map((kode) => {
    const info = perSubtes[kode]
    const skor = info.benar * 4 - info.salah * 1
    const totalSub = info.total * 4
    const persentaseSub = totalSub > 0 ? Math.round((skor / totalSub) * 100) : 0
    return {
      kode,
      benar: info.benar,
      salah: info.salah,
      kosong: info.kosong,
      skor,
      persentase: persentaseSub,
    }
  })
  return {
    benar,
    salah,
    kosong,
    nilai,
    persentase,
    perSubtes: subtestScores,
  }
}

export default { hitungSkor }