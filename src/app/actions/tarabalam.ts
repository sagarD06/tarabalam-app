"use server";

import computeTarabalam from "@/lib/tarabalam";
import type { TaraDetail } from "@/lib/types";

export async function getTarabalam(
  birthNakshatraId: number,
  todayNakshatraId: number
): Promise<TaraDetail | null> {
  try {
    if (
      birthNakshatraId < 1 || birthNakshatraId > 27 ||
      todayNakshatraId < 1 || todayNakshatraId > 27
    ) {
      throw new Error("Nakshatra ID must be between 1 and 27");
    }

    return computeTarabalam(birthNakshatraId, todayNakshatraId);

  } catch (error) {
    console.error("getTarabalam error →", error);
    return null;
  }
}