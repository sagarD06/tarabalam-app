import { NextRequest, NextResponse } from "next/server";
import computeTarabalam from "@/lib/tarabalam";
import type { TarabalamAPIResponse } from "@/lib/types";

// ────────────────────────────────
// POST /api/tarabalam
// Body: { birthNakshatraId: number, todayNakshatraId: number }
// Returns: TaraDetail
// ────────────────────────────────
export async function POST(req: NextRequest): Promise<NextResponse<TarabalamAPIResponse>> {
  try {
    const body = await req.json();
    const { birthNakshatraId, todayNakshatraId } = body;

    // ────────────────────────────────
    // Validate inputs
    // ────────────────────────────────
    if (!birthNakshatraId || !todayNakshatraId) {
      return NextResponse.json(
        {
          success: false,
          data: null!,
          error: "birthNakshatraId and todayNakshatraId are required",
        },
        { status: 400 }
      );
    }

    if (
      birthNakshatraId < 1 || birthNakshatraId > 27 ||
      todayNakshatraId < 1 || todayNakshatraId > 27
    ) {
      return NextResponse.json(
        {
          success: false,
          data: null!,
          error: "Nakshatra ID must be between 1 and 27",
        },
        { status: 400 }
      );
    }

    // ────────────────────────────────
    // Compute Tarabalam
    // ────────────────────────────────
    const result = computeTarabalam(birthNakshatraId, todayNakshatraId);

    return NextResponse.json({
      success: true,
      data: result,
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: null!,
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}