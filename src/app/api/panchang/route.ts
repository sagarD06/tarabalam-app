import { NextRequest, NextResponse } from "next/server";

// ────────────────────────────────
// GET /api/panchang
// Accepts: ?lat=13.08&lon=80.27&tzone=5.5
// Returns: today's nakshatra + sunrise + sunset
// ────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get("lat") ?? "13.08");
    const lon = parseFloat(searchParams.get("lon") ?? "80.27");
    const tzone = parseFloat(searchParams.get("tzone") ?? "5.5");

    const now = new Date();

    const res = await fetch("https://json.freeastrologyapi.com/nakshatra-durations", {
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
        latitude: lat,
        longitude: lon,
        timezone: tzone,
        config: {
          observation_point: "topocentric",
          ayanamsha: "lahiri",
        },
      }),
    });

    const raw = await res.json();
    const nakshatra = JSON.parse(raw.output);

    const endsAt = new Date(nakshatra.ends_at);
    const secondsUntilEnd = Math.max(
      Math.floor((endsAt.getTime() - now.getTime()) / 1000),
      300
    );

    return NextResponse.json(
      {
        success: true,
        data: {
          nakshatra: {
            id: nakshatra.number,
            name: nakshatra.name,
            starts_at: nakshatra.starts_at,
            ends_at: nakshatra.ends_at,
          },
        },
      },
      {
        headers: {
          "Cache-Control": `s-maxage=${secondsUntilEnd}, stale-while-revalidate=60`,
        },
      }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, data: null!, error: error instanceof Error ? error.message : "Something went wrong" },
      { status: 500 }
    );
  }
}