// actions/panchang.ts
"use server";

import type { Panchang } from "@/lib/types";

let cache: { panchang: Panchang; expiresAt: number } | null = null;

export async function getPanchang(): Promise<Panchang | null> {
  try {
    // ← Check cache first!
    if (cache && Date.now() < cache.expiresAt) {
      console.log("panchang → cache hit ✅");
      return cache.panchang;
    }

    console.log("panchang → cache miss, fetching API 🌐");

    const now = new Date();

    const res = await fetch(
      "https://json.freeastrologyapi.com/nakshatra-durations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ASTRO_API_KEY ?? "",
        },
        body: JSON.stringify({
          year: now.getFullYear(),
          month: now.getMonth() + 1,
          date: now.getDate(),
          hours: now.getHours(),
          minutes: now.getMinutes(),
          seconds: 0,
          latitude: 12.9716,
          longitude: 77.5946,
          timezone: 5.5,
          config: {
            observation_point: "topocentric",
            ayanamsha: "lahiri",
          },
        }),
      }
    );

    if (!res.ok) throw new Error(`API failed: ${res.status}`);

    const raw = await res.json();
    const nakshatra = JSON.parse(raw.output);

    const panchang: Panchang = {
      nakshatra: {
        id: nakshatra.number,
        name: nakshatra.name,
        starts_at: nakshatra.starts_at,
        ends_at: nakshatra.ends_at,
      },
    };

    // ← Store in cache until nakshatra ends
    const endsAt = new Date(nakshatra.ends_at);
    const msUntilEnd = Math.max(endsAt.getTime() - Date.now(), 300000); // min 5 mins

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