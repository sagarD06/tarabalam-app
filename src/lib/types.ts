// ────────────────────────────────
// Nakshatra
// ────────────────────────────────
export type Nakshatra = {
  id: number;          // 1–27
  name: string;        // "Ashwini", "Rohini" etc.
  starts_at: string;   // ISO datetime string
  ends_at: string;     // ISO datetime string
};

// ────────────────────────────────
// Panchang (what FreeAstrologyAPI returns)
// ────────────────────────────────
export type Panchang = {
  nakshatra: Nakshatra;
};

// ────────────────────────────────
// Tara (9 groups in Tarabalam cycle)
// ────────────────────────────────
export type TaraGroup =
  | "Janma"
  | "Sampat"
  | "Vipat"
  | "Kshema"
  | "Pratyak"
  | "Sadhana"
  | "Naidhana"
  | "Mitra"
  | "Paramamitra";

export type TaraResult = "auspicious" | "inauspicious" | "neutral";

export type TaraDetail = {
  taraNumber: number;      // 1–9
  tara: TaraGroup;    // "Sampat"
  result: TaraResult;      // "auspicious"
  description: string;     // "Wealth & prosperity..."
};

// ────────────────────────────────
// Family Profile
// ────────────────────────────────
export type Profile = {
  id: string;              // uuid
  name: string;            // "Amma"
  birthNakshatraId: number // 1–27
};

// ────────────────────────────────
// API Response shapes
// ────────────────────────────────
export type PanchangAPIResponse = {
  success: boolean;
  data: Panchang;
  error?: string;
};

export type TarabalamAPIResponse = {
  success: boolean;
  data: TaraDetail;
  error?: string;
};