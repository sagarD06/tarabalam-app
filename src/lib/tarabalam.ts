import { TARA_DESCRIPTIONS, TARA_GROUPS, TARA_RESULTS } from "./constants";

// ────────────────────────────────
// Core logic for tarabalam calculation
// ────────────────────────────────
const computeTarabalam = (todayStarId: number, birthStarId: number) => {
  const distanceFromBirthStar = ((todayStarId - birthStarId + 27) % 27) + 1

  const taraNumber = ((distanceFromBirthStar - 1) % 9) + 1;

  const tara = TARA_GROUPS[taraNumber - 1];

  return {
    taraNumber,
    tara,
    result: TARA_RESULTS[tara],
    description: TARA_DESCRIPTIONS[tara],
  };
};

export default computeTarabalam;