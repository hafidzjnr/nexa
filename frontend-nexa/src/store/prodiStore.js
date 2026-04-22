// src/store/prodiStore.js
// Zustand store to manage the list of study programs (prodi). Keeping
// prodi data in a store allows multiple components to access and update
// the same dataset without prop drilling. This store is simple and could
// be extended in the future with filtering or selection state.

import { create } from 'zustand'

const useProdiStore = create((set) => ({
  prodiList: [],
  setProdiList: (data) => set({ prodiList: data }),
}))

export default useProdiStore