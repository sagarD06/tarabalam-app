import { TaraGroup, TaraResult } from "@/lib/types"

// ────────────────────────────────
// 27 Nakshatras in order (index 0 = id 1)
// ────────────────────────────────
export const NAKSHATRAS = [
  "Ashwini",      // 1
  "Bharani",      // 2
  "Krittika",     // 3
  "Rohini",       // 4
  "Mrigashira",   // 5
  "Ardra",        // 6
  "Punarvasu",    // 7
  "Pushya",       // 8
  "Ashlesha",     // 9
  "Magha",        // 10
  "Purva Phalguni", // 11
  "Uttara Phalguni", // 12
  "Hasta",        // 13
  "Chitra",       // 14
  "Swati",        // 15
  "Vishakha",     // 16
  "Anuradha",     // 17
  "Jyeshtha",     // 18
  "Mula",         // 19
  "Purva Ashadha", // 20
  "Uttara Ashadha", // 21
  "Shravana",     // 22
  "Dhanishta",    // 23
  "Shatabhisha",  // 24
  "Purva Bhadrapada", // 25
  "Uttara Bhadrapada", // 26
  "Revati",       // 27
]

// ────────────────────────────────
// 9 Taras in cycle order
// ────────────────────────────────
export const TARA_GROUPS: TaraGroup[] = [
  "Janma",        // 1 — inauspicious
  "Sampat",       // 2 — auspicious
  "Vipat",        // 3 — inauspicious
  "Kshema",       // 4 — auspicious
  "Pratyak",      // 5 — inauspicious
  "Sadhana",      // 6 — auspicious
  "Naidhana",     // 7 — inauspicious
  "Mitra",        // 8 — auspicious
  "Paramamitra",  // 9 — auspicious
];

// ────────────────────────────────
// Tara result mapping
// ────────────────────────────────
export const TARA_RESULTS: Record<TaraGroup, TaraResult> = {
  Janma:        "neutral",      // sensitive, not strictly bad
  Sampat:       "auspicious",
  Vipat:        "inauspicious",
  Kshema:       "auspicious",
  Pratyak:      "inauspicious",
  Sadhana:      "auspicious",
  Naidhana:     "inauspicious",
  Mitra:        "auspicious",
  Paramamitra:  "auspicious",
};

// ────────────────────────────────
// Tara descriptions
// ────────────────────────────────
export const TARA_DESCRIPTIONS: Record<TaraGroup, string> = {
  Janma:        "Birth star day. Sensitive period — avoid major decisions.",
  Sampat:       "Wealth & prosperity. Excellent for new ventures and investments.",
  Vipat:        "Danger tara. Avoid travel and important tasks today.",
  Kshema:       "Well-being & comfort. Good for health related activities.",
  Pratyak:      "Obstacles ahead. Proceed with caution in all matters.",
  Sadhana:      "Achievement tara. Great day to pursue goals and ambitions.",
  Naidhana:     "Death tara. Most inauspicious — avoid all major activities.",
  Mitra:        "Friendly tara. Good for relationships and collaborations.",
  Paramamitra:  "Best friend tara. Most auspicious day for all activities.",
};