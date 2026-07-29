import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

const WINDOW_MINUTES = 30

export interface LocationStatus {
  locationId: string
  status: "ON" | "OFF" | "UNKNOWN"
  onCount: number
  offCount: number
  total: number
  lastReportAt: string
}

export async function GET() {
  const since = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000)

  const votes = await prisma.vote.findMany({
    where: { createdAt: { gte: since } },
    select: { locationId: true, status: true, createdAt: true },
  })

  // Group by locationId
  const map = new Map<string, { on: number; off: number; lastReportAt: Date }>()
  for (const vote of votes) {
    const entry = map.get(vote.locationId) ?? { on: 0, off: 0, lastReportAt: vote.createdAt }
    if (vote.status === "ON") entry.on++
    else entry.off++
    if (vote.createdAt > entry.lastReportAt) entry.lastReportAt = vote.createdAt
    map.set(vote.locationId, entry)
  }

  const result: LocationStatus[] = []
  for (const [locationId, { on, off, lastReportAt }] of Array.from(map.entries())) {
    const total = on + off
    let status: "ON" | "OFF" | "UNKNOWN" = "UNKNOWN"
    if (total >= 1) {
      const offRatio = off / total
      if (offRatio >= 0.6) status = "OFF"
      else if (offRatio <= 0.4) status = "ON"
    }
    result.push({ locationId, status, onCount: on, offCount: off, total, lastReportAt: lastReportAt.toISOString() })
  }

  return NextResponse.json(result, {
    headers: { "Cache-Control": "s-maxage=30, stale-while-revalidate=60" },
  })
}
