"use client"

import { useEffect, useState, useCallback, Suspense } from "react"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { GOVERNORATES, getCitiesForGov, findNearestLocation } from "@/lib/locations"
import { StatusDot, statusLabel, VoteButtons, ReportMeta, type Status } from "@/components/StatusUI"
import FollowButton from "@/components/FollowButton"
import HistoryStrip from "@/components/HistoryStrip"
import type { FocusRequest } from "@/components/PowerMap"
import type { LocationStatus } from "@/app/api/status/route"

const PowerMap = dynamic(() => import("@/components/PowerMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-2xl bg-slate-900 animate-pulse flex items-center justify-center text-sm text-slate-500">
      جاري تحميل الخريطة...
    </div>
  ),
})

type StatusMap = Record<string, LocationStatus>

function GovCard({
  slug,
  name,
  nameAr,
  statusMap,
  onVoted,
  onFocus,
}: {
  slug: string
  name: string
  nameAr: string
  statusMap: StatusMap
  onVoted: () => void
  onFocus: (slug: string) => void
}) {
  const [open, setOpen] = useState(false)
  const govStatus: Status = statusMap[slug]?.status ?? "UNKNOWN"
  const label = statusLabel(govStatus)
  const cities = getCitiesForGov(slug)

  return (
    <div className="bg-slate-900/70 rounded-2xl border border-white/10 shadow-lg shadow-black/20 hover:border-white/20 transition-colors overflow-hidden">
      <div className="p-4">
        <button
          onClick={() => onFocus(slug)}
          className="w-full flex items-center justify-between mb-1 text-right"
        >
          <div className="flex items-center gap-2">
            <StatusDot status={govStatus} />
            <span className="font-bold text-base text-slate-100">{nameAr}</span>
            <span className="text-xs text-slate-500">{name}</span>
          </div>
          <span className={`text-sm ${label.cls}`}>{label.text}</span>
        </button>
        <ReportMeta status={statusMap[slug]} />
        <VoteButtons locationId={slug} onVoted={onVoted} />
        <FollowButton locationId={slug} />
      </div>

      {cities.length > 0 && (
        <>
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-full text-xs text-slate-500 hover:text-slate-300 py-2 border-t border-white/10 transition-colors"
          >
            {open ? "▲ إخفاء المدن" : `▼ ${cities.length} مدينة`}
          </button>
          {open && (
            <div className="border-t border-white/10 divide-y divide-white/5">
              <div className="px-4 pt-3">
                <HistoryStrip locationId={slug} />
              </div>
              {cities.map((city) => {
                const cs: Status = statusMap[city.slug]?.status ?? "UNKNOWN"
                const cl = statusLabel(cs)
                return (
                  <div key={city.slug} className="px-4 py-3">
                    <button
                      onClick={() => onFocus(city.slug)}
                      className="w-full flex items-center justify-between mb-1 text-right"
                    >
                      <div className="flex items-center gap-2">
                        <StatusDot status={cs} />
                        <span className="text-sm font-medium text-slate-200">{city.nameAr}</span>
                        <span className="text-xs text-slate-500">{city.name}</span>
                      </div>
                      <span className={`text-xs ${cl.cls}`}>{cl.text}</span>
                    </button>
                    <ReportMeta status={statusMap[city.slug]} />
                    <HistoryStrip locationId={city.slug} />
                    <VoteButtons locationId={city.slug} onVoted={onVoted} />
                    <FollowButton locationId={city.slug} />
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

export default function Page() {
  return (
    <Suspense fallback={null}>
      <HomePage />
    </Suspense>
  )
}

function HomePage() {
  const searchParams = useSearchParams()
  const [statusMap, setStatusMap] = useState<StatusMap>({})
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<"map" | "list">("map")
  const [focusRequest, setFocusRequest] = useState<FocusRequest | null>(null)
  const [locating, setLocating] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/status")
      if (!res.ok) return
      const data: LocationStatus[] = await res.json()
      const map: StatusMap = {}
      for (const item of data) map[item.locationId] = item
      setStatusMap(map)
    } catch {
      // network/parse failure: leave existing statusMap as-is
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

  function focusOn(slug: string) {
    setFocusRequest({ slug, nonce: Date.now() })
    setTab("map")
  }

  function useMyLocation() {
    if (!("geolocation" in navigator)) {
      setLocationError("المتصفح ما يدعمش تحديد الموقع")
      return
    }
    setLocating(true)
    setLocationError(null)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const nearest = findNearestLocation(pos.coords.latitude, pos.coords.longitude)
        focusOn(nearest.slug)
        setLocating(false)
      },
      (err) => {
        setLocating(false)
        setLocationError(
          err.code === err.PERMISSION_DENIED
            ? "لازم توافق على تحديد الموقع باش تخدم هذه الخاصية"
            : "ما قدرناش نلقاو موقعك، حاول مرة أخرى"
        )
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  // Deep-link from a push notification click (sw.js opens /?focus=<slug>).
  useEffect(() => {
    const focus = searchParams.get("focus")
    if (focus) focusOn(focus)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {/* Hero */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">وين عندك ضوء، وين لا؟</h2>
        <p className="text-sm text-slate-400">
          دوّر على ولايتك أو مدينتك فوق الخريطة وقول لينا واش الكهرباء موجودة وّلا مقطوعة.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div className="rounded-2xl bg-emerald-400/10 backdrop-blur border border-emerald-400/20 px-3 py-3 sm:px-4 sm:py-4 text-center">
          <div className="text-xl sm:text-2xl font-bold text-emerald-400">{onCount}</div>
          <div className="text-[11px] sm:text-xs text-emerald-300/80">منطقة في ضوء</div>
        </div>
        <div className="rounded-2xl bg-red-400/10 backdrop-blur border border-red-400/20 px-3 py-3 sm:px-4 sm:py-4 text-center">
          <div className="text-xl sm:text-2xl font-bold text-red-400">{offCount}</div>
          <div className="text-[11px] sm:text-xs text-red-300/80">منطقة ما في ضوء</div>
        </div>
        <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 px-3 py-3 sm:px-4 sm:py-4 text-center">
          <div className="text-xl sm:text-2xl font-bold text-slate-400">{GOVERNORATES.length - onCount - offCount}</div>
          <div className="text-[11px] sm:text-xs text-slate-500">بدون معلومات</div>
        </div>
      </div>

      {/* Search + locate */}
      <div className="flex gap-2 mb-4">
        <input
          type="search"
          placeholder="ابحث عن ولاية أو مدينة..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-100 shadow-sm text-right placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-tunisia/40 focus:border-tunisia/40"
        />
        <button
          onClick={useMyLocation}
          disabled={locating}
          title="استخدم موقعي"
          className="shrink-0 px-4 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-white/20 transition-colors disabled:opacity-50"
        >
          {locating ? "..." : "📍"}
        </button>
      </div>
      {locationError && <p className="text-xs text-amber-400 -mt-3 mb-4">{locationError}</p>}

      {/* Mobile tabs */}
      <div className="flex lg:hidden gap-1 mb-4 bg-white/5 border border-white/10 rounded-xl p-1">
        <button
          onClick={() => setTab("map")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            tab === "map" ? "bg-white/10 text-white shadow-sm" : "text-slate-400"
          }`}
        >
          🗺️ الخريطة
        </button>
        <button
          onClick={() => setTab("list")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            tab === "list" ? "bg-white/10 text-white shadow-sm" : "text-slate-400"
          }`}
        >
          📋 القائمة
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* Map */}
        <div
          className={`${
            tab === "map" ? "block" : "hidden"
          } lg:block h-[65vh] lg:h-[calc(100vh-13rem)] lg:sticky lg:top-20 rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-black/30`}
        >
          <PowerMap statusMap={statusMap} search={search} onVoted={fetchStatus} focusRequest={focusRequest} />
        </div>

        {/* List */}
        <div className={`${tab === "list" ? "block" : "hidden"} lg:block`}>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-28 bg-white/5 rounded-2xl border border-white/10 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {filtered.map((gov) => (
                <GovCard
                  key={gov.slug}
                  slug={gov.slug}
                  name={gov.name}
                  nameAr={gov.nameAr}
                  statusMap={statusMap}
                  onVoted={fetchStatus}
                  onFocus={focusOn}
                />
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <p className="text-center text-slate-500 mt-12">ما لقيناش نتيجة</p>
          )}
        </div>
      </div>
    </div>
  )
}
