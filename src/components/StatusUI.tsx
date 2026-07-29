"use client"

import { useState } from "react"
import type { LocationStatus } from "@/app/api/status/route"

export type Status = "ON" | "OFF" | "UNKNOWN"

export const STATUS_COLOR: Record<Status, string> = {
  ON: "#4ade80",
  OFF: "#f87171",
  UNKNOWN: "#64748b",
}

export function StatusDot({ status }: { status: Status }) {
  if (status === "ON") return <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block shadow-[0_0_10px_2px_rgba(52,211,153,0.5)]" />
  if (status === "OFF") return <span className="w-3 h-3 rounded-full bg-red-400 inline-block animate-pulse shadow-[0_0_10px_2px_rgba(248,113,113,0.5)]" />
  return <span className="w-3 h-3 rounded-full bg-slate-600 inline-block" />
}

export function statusLabel(status: Status) {
  if (status === "ON") return { text: "في ضوء ✓", cls: "text-emerald-400 font-semibold" }
  if (status === "OFF") return { text: "ما في ضوء ✗", cls: "text-red-400 font-semibold" }
  return { text: "ما عنداش معلومات", cls: "text-slate-500" }
}

export function timeAgo(iso: string): string {
  const mins = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 60000))
  if (mins < 1) return "الآن"
  if (mins < 60) return `قبل ${mins} د`
  return `قبل ${Math.floor(mins / 60)} س`
}

// Report metadata line shown under a location's status: report count, breakdown,
// recency, and a low-confidence flag for single-report locations (the status
// threshold flips on just 1 vote, so this keeps that visible to the user).
export function ReportMeta({ status }: { status: LocationStatus | undefined }) {
  if (!status) return null
  return (
    <p className="text-xs text-slate-500 mb-1">
      {status.total} {status.total === 1 ? "تقرير" : "تقارير"} · {status.onCount} في ضوء / {status.offCount} ما في
      ضوء · {timeAgo(status.lastReportAt)}
      {status.total === 1 && <span className="text-amber-400"> · تقرير واحد فقط</span>}
    </p>
  )
}

export function VoteButtons({ locationId, onVoted }: { locationId: string; onVoted: () => void }) {
  const [loading, setLoading] = useState<"ON" | "OFF" | null>(null)
  const [done, setDone] = useState(false)
  const [cooldown, setCooldown] = useState(false)
  const [error, setError] = useState(false)

  async function vote(status: "ON" | "OFF") {
    setLoading(status)
    setError(false)
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locationId, status }),
      })
      if (res.status === 429) {
        setCooldown(true)
      } else if (res.ok) {
        setDone(true)
        onVoted()
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(null)
    }
  }

  if (cooldown) return <p className="text-xs text-amber-400 mt-1">صوّتت مؤخراً، حاول بعد 10 دقائق</p>
  if (done) return <p className="text-xs text-emerald-400 mt-1">شكراً على التقرير!</p>
  if (error) return <p className="text-xs text-red-400 mt-1">صار خطأ، حاول مرة أخرى</p>

  return (
    <div className="flex gap-2 mt-2">
      <button
        onClick={() => vote("ON")}
        disabled={loading !== null}
        className="flex-1 py-2.5 rounded-lg bg-emerald-400/10 text-emerald-400 text-sm font-medium border border-emerald-400/20 hover:bg-emerald-400/20 hover:border-emerald-400/40 disabled:opacity-50 transition-colors"
      >
        {loading === "ON" ? "..." : "في ضوء ✓"}
      </button>
      <button
        onClick={() => vote("OFF")}
        disabled={loading !== null}
        className="flex-1 py-2.5 rounded-lg bg-red-400/10 text-red-400 text-sm font-medium border border-red-400/20 hover:bg-red-400/20 hover:border-red-400/40 disabled:opacity-50 transition-colors"
      >
        {loading === "OFF" ? "..." : "ما في ضوء ✗"}
      </button>
    </div>
  )
}
