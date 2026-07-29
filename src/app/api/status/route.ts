import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const WINDOW_MINUTES = 30

export interface LocationStatus {
  locationId: string
  status: "ON" | "OFF" | "UNKNOWN"
  onCount: number
  offCount: number
  total: number
}

export async function GET() {
  const since = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000)

  const votes = await prisma.vote.findMany({
    where: { createdAt: { gte: since } },
    select: { locationId: true, status: true },
  })

  // Group by locationId
  const map = new Map<string, { on: number; off: number }>()
  for (const vote of votes) {
    const entry = map.get(vote.locationId) ?? { on: 0, off: 0 }
    if (vote.status === "ON") entry.on++
    else entry.off++
    map.set(vote.locationId, entry)
  }

  const result: LocationStatus[] = []
  for (const [locationId, { on, off }] of Array.from(map.entries())) {
    const total = on + off
    let status: "ON" | "OFF" | "UNKNOWN" = "UNKNOWN"
    if (total >= 2) {
      const offRatio = off / total
      if (offRatio >= 0.6) status = "OFF"
      else if (offRatio <= 0.4) status = "ON"
    }
    result.push({ locationId, status, onCount: on, offCount: off, total })
  }

  return NextResponse.json(result, {
    headers: { "Cache-Control": "s-maxage=30, stale-while-revalidate=60" },
  })
}
