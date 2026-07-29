import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getLocation } from "@/lib/locations"

interface SubscribeBody {
  subscription?: {
    endpoint?: string
    keys?: { p256dh?: string; auth?: string }
  }
  locationId?: string
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as SubscribeBody | null
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })

  const { subscription, locationId } = body
  const endpoint = subscription?.endpoint
  const p256dh = subscription?.keys?.p256dh
  const auth = subscription?.keys?.auth

  if (!endpoint || !p256dh || !auth || !locationId) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  if (!getLocation(locationId)) {
    return NextResponse.json({ error: "Unknown location" }, { status: 404 })
  }

  await prisma.pushSubscription.upsert({
    where: { endpoint_locationId: { endpoint, locationId } },
    create: { endpoint, p256dh, auth, locationId },
    update: { p256dh, auth },
  })

  return NextResponse.json({ ok: true })
}
