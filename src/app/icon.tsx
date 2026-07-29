import { ImageResponse } from "next/og"
import { IconMark } from "@/lib/iconMark"

export const runtime = "edge"
export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(<IconMark />, size)
}
