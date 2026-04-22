// src/hooks/useSoalRNG.js
// A convenience hook to generate randomized questions for the Try Out. It
// accepts a list of available questions and a configuration describing how
// many questions to pick per subtest. Once the random list is generated,
// it stores the result in the tryout store.

import { useEffect } from 'react'
import useTryOutStore from '@store/tryoutStore'
import { generateSoalRNG } from '@utils/rngSoal'

/**
 * useSoalRNG
 *
 * @param {Array} soalBank  The complete set of questions for a package
 * @param {Object} config   Shape: { subtes: { code: count, ... } }
 */
export function useSoalRNG(soalBank, config) {
  const soalList = useTryOutStore((state) => state.soalList)
  const setSoalList = useTryOutStore((state) => state.setSoalList)
  useEffect(() => {
    if (soalBank?.length && soalList.length === 0) {
      const acak = generateSoalRNG(soalBank, config)
      setSoalList(acak)
    }
  }, [soalBank, config, soalList.length, setSoalList])
}

export default useSoalRNG