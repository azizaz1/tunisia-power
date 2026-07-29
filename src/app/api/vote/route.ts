import { NextRequest, NextResponse } from "next/server"
import { createHash } from "crypto"
import { prisma } from "@/lib/prisma"
import { getLocation } from "@/lib/locations"

// One vote per person per location per 10 minutes
const WINDOW_MS = 10 * 60 * 1000

function getIpHash(req: NextRequest, locationId: string): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  const window = Math.floor(Date.now() / WINDOW_MS)
  return createHash("sha256").update(`${ip}:${locationId}:${window}`).digest("hex")
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })

  const { locationId, status } = body as { locationId: string; status: string }

  if (!locationId || !["ON", "OFF"].includes(status)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  if (!getLocation(locationId)) {
    return NextResponse.json({ error: "Unknown location" }, { status: 404 })
  }

  const ipHash = getIpHash(req, locationId)

  // Check if already voted in this window
  const since = new Date(Date.now() - WINDOW_MS)
  const existing = await prisma.vote.findFirst({
    where: { locationId, ipHash, createdAt: { gte: since } },
  })

  if (existing) {
    return NextResponse.json({ error: "cooldown", retryAfter: WINDOW_MS / 1000 }, { status: 429 })
  }

  await prisma.vote.create({
    data: { locationId, status: status as "ON" | "OFF", ipHash },
  })

  return NextResponse.json({ ok: true })
}
