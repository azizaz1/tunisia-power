import { NextRequest, NextResponse } from "next/server"
import { computeLocationHistory } from "@/lib/history"
import { getLocation } from "@/lib/locations"

export type { HistoryBucket } from "@/lib/history"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const locationId = req.nextUrl.searchParams.get("locationId")
  if (!locationId || !getLocation(locationId)) {
    return NextResponse.json({ error: "Unknown location" }, { status: 404 })
  }

  const buckets = await computeLocationHistory(locationId)

  return NextResponse.json(buckets, {
    headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=120" },
  })
}
