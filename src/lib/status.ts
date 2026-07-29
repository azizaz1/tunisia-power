import { prisma } from "@/lib/prisma"

export const STATUS_WINDOW_MINUTES = 30

export type Status = "ON" | "OFF" | "UNKNOWN"

export interface LocationStatus {
  locationId: string
  status: Status
  onCount: number
  offCount: number
  total: number
  lastReportAt: string
}

function deriveStatus(on: number, off: number): Status {
  const total = on + off
  if (total < 1) return "UNKNOWN"
  const offRatio = off / total
  if (offRatio >= 0.6) return "OFF"
  if (offRatio <= 0.4) return "ON"
  return "UNKNOWN"
}

// Aggregates votes from the last STATUS_WINDOW_MINUTES into a per-location status.
// Pass a locationId to scope the query to just that location (used by the vote
// route to check whether a single vote just flipped the status).
export async function computeLocationStatuses(locationId?: string): Promise<LocationStatus[]> {
  const since = new Date(Date.now() - STATUS_WINDOW_MINUTES * 60 * 1000)

  const votes = await prisma.vote.findMany({
    where: { createdAt: { gte: since }, ...(locationId ? { locationId } : {}) },
    select: { locationId: true, status: true, createdAt: true },
  })

  const map = new Map<string, { on: number; off: number; lastReportAt: Date }>()
  for (const vote of votes) {
    const entry = map.get(vote.locationId) ?? { on: 0, off: 0, lastReportAt: vote.createdAt }
    if (vote.status === "ON") entry.on++
    else entry.off++
    if (vote.createdAt > entry.lastReportAt) entry.lastReportAt = vote.createdAt
    map.set(vote.locationId, entry)
  }

  const result: LocationStatus[] = []
  for (const [id, { on, off, lastReportAt }] of Array.from(map.entries())) {
    result.push({
      locationId: id,
      status: deriveStatus(on, off),
      onCount: on,
      offCount: off,
      total: on + off,
      lastReportAt: lastReportAt.toISOString(),
    })
  }
  return result
}

export async function computeStatusForLocation(locationId: string): Promise<Status> {
  const [row] = await computeLocationStatuses(locationId)
  return row?.status ?? "UNKNOWN"
}
