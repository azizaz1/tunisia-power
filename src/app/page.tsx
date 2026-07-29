"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { GOVERNORATES, getCitiesForGov } from "@/lib/locations"
import type { LocationStatus } from "@/app/api/status/route"

type StatusMap = Record<string, LocationStatus>

function StatusDot({ status }: { status: "ON" | "OFF" | "UNKNOWN" }) {
  if (status === "ON") return <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
  if (status === "OFF") return <span className="w-3 h-3 rounded-full bg-red-500 inline-block animate-pulse" />
  return <span className="w-3 h-3 rounded-full bg-gray-300 inline-block" />
}

function statusLabel(status: "ON" | "OFF" | "UNKNOWN") {
  if (status === "ON") return { text: "في ضوء ✓", cls: "text-green-600 font-semibold" }
  if (status === "OFF") return { text: "ما في ضوء ✗", cls: "text-red-600 font-semibold" }
  return { text: "ما عنداش معلومات", cls: "text-gray-400" }
}

function VoteButtons({ locationId, onVoted }: { locationId: string; onVoted: () => void }) {
  const [loading, setLoading] = useState<"ON" | "OFF" | null>(null)
  const [done, setDone] = useState(false)
  const [cooldown, setCooldown] = useState(false)

  async function vote(status: "ON" | "OFF") {
    setLoading(status)
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locationId, status }),
      })
      if (res.status === 429) {
        setCooldown(true)
      } else {
        setDone(true)
        onVoted()
      }
    } finally {
      setLoading(null)
    }
  }

  if (cooldown) return <p className="text-xs text-orange-500 mt-1">صوّتت مؤخراً، حاول بعد 10 دقائق</p>
  if (done) return <p className="text-xs text-green-600 mt-1">شكراً على التقرير!</p>

  return (
    <div className="flex gap-2 mt-2">
      <button
        onClick={() => vote("ON")}
        disabled={loading !== null}
        className="flex-1 py-1.5 rounded-lg bg-green-100 text-green-700 text-sm font-medium hover:bg-green-200 disabled:opacity-50 transition-colors"
      >
        {loading === "ON" ? "..." : "في ضوء ✓"}
      </button>
      <button
        onClick={() => vote("OFF")}
        disabled={loading !== null}
        className="flex-1 py-1.5 rounded-lg bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 disabled:opacity-50 transition-colors"
      >
        {loading === "OFF" ? "..." : "ما في ضوء ✗"}
      </button>
    </div>
  )
}

function GovCard({
  slug,
  name,
  nameAr,
  statusMap,
  onVoted,
}: {
  slug: string
  name: string
  nameAr: string
  statusMap: StatusMap
  onVoted: () => void
}) {
  const [open, setOpen] = useState(false)
  const govStatus = statusMap[slug]?.status ?? "UNKNOWN"
  const label = statusLabel(govStatus)
  const cities = getCitiesForGov(slug)

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <StatusDot status={govStatus} />
            <span className="font-bold text-base">{nameAr}</span>
            <span className="text-xs text-gray-400">{name}</span>
          </div>
          <span className={`text-sm ${label.cls}`}>{label.text}</span>
        </div>
        {statusMap[slug] && (
          <p className="text-xs text-gray-400 mb-2">
            {statusMap[slug].total} تقرير · {statusMap[slug].onCount} في ضوء / {statusMap[slug].offCount} ما في ضوء
          </p>
        )}
        <VoteButtons locationId={slug} onVoted={onVoted} />
      </div>

      {cities.length > 0 && (
        <>
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-full text-xs text-gray-400 hover:text-gray-600 py-2 border-t border-gray-100 transition-colors"
          >
            {open ? "▲ إخفاء المدن" : `▼ ${cities.length} مدينة`}
          </button>
          {open && (
            <div className="border-t border-gray-100 divide-y divide-gray-50">
              {cities.map((city) => {
                const cs = statusMap[city.slug]?.status ?? "UNKNOWN"
                const cl = statusLabel(cs)
                return (
                  <div key={city.slug} className="px-4 py-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <StatusDot status={cs} />
                        <span className="text-sm font-medium">{city.nameAr}</span>
                        <span className="text-xs text-gray-400">{city.name}</span>
                      </div>
                      <span className={`text-xs ${cl.cls}`}>{cl.text}</span>
                    </div>
                    {statusMap[city.slug] && (
                      <p className="text-xs text-gray-400 mb-1">
                        {statusMap[city.slug].total} تقرير
                      </p>
                    )}
                    <VoteButtons locationId={city.slug} onVoted={onVoted} />
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function HomePage() {
  const [statusMap, setStatusMap] = useState<StatusMap>({})
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/status")
      const data: LocationStatus[] = await res.json()
      const map: StatusMap = {}
      for (const item of data) map[item.locationId] = item
      setStatusMap(map)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStatus()
    const interval = setInterval(fetchStatus, 60_000)
    return () => clearInterval(interval)
  }, [fetchStatus])

  const filtered = GOVERNORATES.filter(
    (g) =>
      !search ||
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.nameAr.includes(search)
  )

  const onCount = Object.values(statusMap).filter((s) => s.status === "ON").length
  const offCount = Object.values(statusMap).filter((s) => s.status === "OFF").length

  return (
    <div>
      {/* Stats bar */}
      <div className="flex gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex-1 text-center">
          <div className="text-2xl font-bold text-green-600">{onCount}</div>
          <div className="text-xs text-green-700">منطقة في ضوء</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex-1 text-center">
          <div className="text-2xl font-bold text-red-600">{offCount}</div>
          <div className="text-xs text-red-700">منطقة ما في ضوء</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex-1 text-center">
          <div className="text-2xl font-bold text-gray-500">{GOVERNORATES.length - onCount - offCount}</div>
          <div className="text-xs text-gray-500">بدون معلومات</div>
        </div>
      </div>

      {/* Search */}
      <input
        type="search"
        placeholder="ابحث عن ولاية أو مدينة..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm text-right placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-tunisia/30"
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 bg-white rounded-xl border border-gray-200 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((gov) => (
            <GovCard
              key={gov.slug}
              slug={gov.slug}
              name={gov.name}
              nameAr={gov.nameAr}
              statusMap={statusMap}
              onVoted={fetchStatus}
            />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-12">ما لقيناش نتيجة</p>
      )}
    </div>
  )
}
