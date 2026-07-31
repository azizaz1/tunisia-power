"use client"

import { useEffect, useState } from "react"
import { STATUS_COLOR, statusLabel } from "@/components/StatusUI"
import type { HistoryBucket } from "@/app/api/history/route"

function hourLabel(iso: string): string {
  const d = new Date(iso)
  return `${String(d.getHours()).padStart(2, "0")}:00`
}

export default function HistoryStrip({ locationId }: { locationId: string }) {
  const [buckets, setBuckets] = useState<HistoryBucket[] | null>(null)

  useEffect(() => {
    let cancelled = false
    setBuckets(null)
    fetch(`/api/history?locationId=${encodeURIComponent(locationId)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: HistoryBucket[] | null) => {
        if (!cancelled) setBuckets(data)
      })
      .catch(() => {
        if (!cancelled) setBuckets(null)
      })
    return () => {
      cancelled = true
    }
  }, [locationId])

  if (!buckets) {
    return <div className="h-4 rounded bg-white/5 animate-pulse mt-2" />
  }

  return (
    <div className="mt-2">
      <p className="text-[10px] text-slate-500 mb-1">آخر 24 ساعة</p>
      <div className="flex gap-[2px]" dir="ltr">
        {buckets.map((b) => (
          <div
            key={b.bucketStart}
            tabIndex={0}
            title={`${hourLabel(b.bucketStart)} · ${statusLabel(b.status).text}${b.total > 0 ? ` (${b.onCount} في ضوء / ${b.offCount} ما في ضوء)` : ""}`}
            aria-label={`${hourLabel(b.bucketStart)} ${statusLabel(b.status).text}`}
            className="flex-1 h-3.5 rounded-[3px] cursor-default focus:outline focus:outline-1 focus:outline-white/40"
            style={{ backgroundColor: STATUS_COLOR[b.status] }}
          />
        ))}
      </div>
      <div className="flex items-center gap-3 mt-1">
        {(["ON", "OFF", "UNKNOWN"] as const).map((s) => (
          <span key={s} className="flex items-center gap-1 text-[10px] text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: STATUS_COLOR[s] }} />
            {statusLabel(s).text}
          </span>
        ))}
      </div>
    </div>
  )
}
