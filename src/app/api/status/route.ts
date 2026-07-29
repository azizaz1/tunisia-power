import { NextResponse } from "next/server"
import { computeLocationStatuses } from "@/lib/status"

export type { LocationStatus } from "@/lib/status"

export const dynamic = "force-dynamic"

export async function GET() {
  const result = await computeLocationStatuses()

  return NextResponse.json(result, {
    headers: { "Cache-Control": "s-maxage=30, stale-while-revalidate=60" },
  })
}
