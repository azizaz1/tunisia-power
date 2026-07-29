import { ImageResponse } from "next/og"
import { IconMark } from "@/lib/iconMark"

export const runtime = "edge"

export async function GET() {
  return new ImageResponse(<IconMark />, { width: 192, height: 192 })
}
