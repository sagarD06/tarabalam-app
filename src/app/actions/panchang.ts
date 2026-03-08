"use server";

import { getPanchangam, Observer } from "@ishubhamx/panchangam-js";
import type { Panchang } from "@/lib/types";
import { NAKSHATRAS } from "@/lib/constants";

// Module level cache
let cache: { panchang: Panchang; expiresAt: number } | null = null;

export async function getPanchang(): Promise<Panchang | null> {
  try {
    if (cache && Date.now() < cache.expiresAt) {
      return cache.panchang;
    }

    const now = new Date();

    const observer = new Observer(12.9716, 77.5946, 920);

    const result = getPanchangam(now, observer, {
      timezoneOffset: 330, 
    });

    const nakshatraId = result.nakshatra + 1;
    const nakshatraName = NAKSHATRAS[nakshatraId - 1];
    const endsAt = result.nakshatraEndTime ?? new Date(Date.now() + 3600000);
    const msUntilEnd = Math.max(endsAt.getTime() - Date.now(), 300000);

    const panchang: Panchang = {
      nakshatra: {
        id: nakshatraId,
        name: nakshatraName,
        starts_at: new Date().toISOString(),
        ends_at: endsAt.toISOString(),
      },
    };

    // Store in cache until nakshatra ends
    cache = {
      panchang,
      expiresAt: Date.now() + msUntilEnd,
    };

    return panchang;

  } catch (error) {
    console.error("getPanchang error →", error);
    return null;
  }
}