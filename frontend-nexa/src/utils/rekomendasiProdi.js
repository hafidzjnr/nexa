// src/utils/rekomendasiProdi.js

/**
 * Menghitung skor UTBK dari jawaban pengguna
 */
export function hitungSkorUTBK(soalList, jawaban) {
  let benar = 0, salah = 0, kosong = 0

  soalList.forEach(soal => {
    const jawabanUser = jawaban[soal.id]
    if (!jawabanUser)                      kosong++
    else if (jawabanUser === soal.kunciJawaban) benar++
    else                                   salah++
  })

  // Sistem penilaian: benar +4, salah -1, kosong 0
  const nilai = (benar * 4) - (salah * 1)
  const total = soalList.length * 4

  return {
    benar, salah, kosong,
    nilai,
    persentase: Math.round((nilai / total) * 100),
    skorTPA:    null, // isi dari subtes masing-masing
  }
}

/**
 * Rekomendasikan prodi berdasarkan skor
 * @param {number} skor        - skor akhir pengguna
 * @param {Array}  prodiList   - daftar prodi beserta skor rata-rata masuk
 */
export function rekomendasiProdi(skor, prodiList) {
  return prodiList
    .map(prodi => ({
      ...prodi,
      peluang: hitungPeluang(skor, prodi.skorMinMasuk, prodi.skorRataRataMasuk),
    }))
    .filter(p => p.peluang > 0)
    .sort((a, b) => b.peluang - a.peluang)
}

function hitungPeluang(skorUser, skorMin, skorRata) {
  if (skorUser < skorMin) return 0
  if (skorUser >= skorRata) return Math.min(100, Math.round(((skorUser - skorRata) / skorRata) * 50 + 70))
  return Math.round(((skorUser - skorMin) / (skorRata - skorMin)) * 60 + 10)
}