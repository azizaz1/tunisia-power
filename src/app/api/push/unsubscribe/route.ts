import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })

  const { endpoint, locationId } = body as { endpoint?: string; locationId?: string }
  if (!endpoint || !locationId) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  await prisma.pushSubscription
    .delete({ where: { endpoint_locationId: { endpoint, locationId } } })
    .catch(() => null) // already gone: treat as success

  return NextResponse.json({ ok: true })
}
