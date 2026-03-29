// src/store/tryoutStore.js
import { create } from 'zustand'

const useTryOutStore = create((set, get) => ({
  soalList:       [],      // daftar soal yang sudah diacak
  jawaban:        {},      // { soalId: opsi }
  soalIndex:      0,       // soal aktif saat ini
  sisaWaktu:      null,    // detik tersisa
  selesai:        false,
  skor:           null,

  setSoalList:  (list)            => set({ soalList: list }),
  setJawaban:   (soalId, opsi)    => set(state => ({ jawaban: { ...state.jawaban, [soalId]: opsi } })),
  nextSoal:     ()                => set(state => ({ soalIndex: Math.min(state.soalIndex + 1, state.soalList.length - 1) })),
  prevSoal:     ()                => set(state => ({ soalIndex: Math.max(state.soalIndex - 1, 0) })),
  goToSoal:     (index)           => set({ soalIndex: index }),
  setSisaWaktu: (detik)           => set({ sisaWaktu: detik }),
  selesaikan:   (skor)            => set({ selesai: true, skor }),
  reset:        ()                => set({ soalList: [], jawaban: {}, soalIndex: 0, sisaWaktu: null, selesai: false, skor: null }),
}))

export default useTryOutStore