import { prisma } from "@/lib/prisma"
import { deriveStatus, type Status } from "@/lib/status"

export const HISTORY_HOURS = 24
const HOUR_MS = 60 * 60 * 1000

export interface HistoryBucket {
  bucketStart: string
  status: Status
  onCount: number
  offCount: number
  total: number
}

// Buckets votes for one location into hourly slices over the last
// HISTORY_HOURS, so the UI can render a simple status-over-time strip.
export async function computeLocationHistory(locationId: string): Promise<HistoryBucket[]> {
  const since = Date.now() - HISTORY_HOURS * HOUR_MS

  const votes = await prisma.vote.findMany({
    where: { locationId, createdAt: { gte: new Date(since) } },
    select: { status: true, createdAt: true },
  })

  const buckets: { on: number; off: number }[] = Array.from({ length: HISTORY_HOURS }, () => ({
    on: 0,
    off: 0,
  }))

  for (const vote of votes) {
    const index = Math.min(
      HISTORY_HOURS - 1,
      Math.floor((vote.createdAt.getTime() - since) / HOUR_MS)
    )
    if (vote.status === "ON") buckets[index].on++
    else buckets[index].off++
  }

  return buckets.map(({ on, off }, index) => ({
    bucketStart: new Date(since + index * HOUR_MS).toISOString(),
    status: deriveStatus(on, off),
    onCount: on,
    offCount: off,
    total: on + off,
  }))
}
