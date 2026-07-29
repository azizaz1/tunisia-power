"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Map, { Marker, Popup, NavigationControl, type MapRef } from "react-map-gl/maplibre"
import { GOVERNORATES, getCitiesForGov, getLocation, type Location } from "@/lib/locations"
import { STATUS_COLOR, statusLabel, VoteButtons, ReportMeta, type Status } from "@/components/StatusUI"
import type { LocationStatus } from "@/app/api/status/route"

type StatusMap = Record<string, LocationStatus>

const MAP_STYLE = {
  version: 8 as const,
  sources: {
    carto: {
      type: "raster" as const,
      tiles: [
        "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        "https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      ],
      tileSize: 256,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> © <a href="https://carto.com/attributions" target="_blank" rel="noreferrer">CARTO</a>',
    },
  },
  layers: [{ id: "carto-layer", type: "raster" as const, source: "carto", minzoom: 0, maxzoom: 20 }],
}

function Pin({ color, pulse }: { color: string; pulse: boolean }) {
  return (
    <div className="relative -translate-y-1/2 cursor-pointer group">
      {pulse && (
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-60"
          style={{ backgroundColor: color }}
        />
      )}
      <svg width="26" height="26" viewBox="0 0 26 26" className="relative drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] transition-transform group-hover:scale-110">
        <circle cx="13" cy="13" r="10" fill={color} stroke="#0f172a" strokeWidth="3" />
      </svg>
    </div>
  )
}

export interface FocusRequest {
  slug: string
  nonce: number
}

interface PowerMapProps {
  statusMap: StatusMap
  search: string
  onVoted: () => void
  focusRequest: FocusRequest | null
}

export default function PowerMap({ statusMap, search, onVoted, focusRequest }: PowerMapProps) {
  const mapRef = useRef<MapRef>(null)
  const [expandedGov, setExpandedGov] = useState<string | null>(null)
  const [popupSlug, setPopupSlug] = useState<string | null>(null)

  useEffect(() => {
    if (!focusRequest) return
    const loc = getLocation(focusRequest.slug)
    if (!loc) return
    const gov = loc.type === "GOVERNORATE" ? loc.slug : loc.governorate
    setExpandedGov(gov)
    setPopupSlug(loc.slug)
    mapRef.current?.getMap()?.flyTo({ center: [loc.lng, loc.lat], zoom: loc.type === "GOVERNORATE" ? 9 : 11, duration: 1200 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusRequest])

  function handleMarkerClick(loc: Location) {
    setPopupSlug(loc.slug)
    if (loc.type === "GOVERNORATE") {
      setExpandedGov(loc.slug)
      mapRef.current?.getMap()?.flyTo({ center: [loc.lng, loc.lat], zoom: 9, duration: 1000 })
    }
  }

  const cityMarkers = useMemo(() => (expandedGov ? getCitiesForGov(expandedGov) : []), [expandedGov])
  const popupLocation = popupSlug ? getLocation(popupSlug) : null
  const q = search.trim().toLowerCase()

  function matches(loc: Location) {
    if (!q) return true
    return loc.name.toLowerCase().includes(q) || loc.nameAr.includes(search.trim())
  }

  function statusFor(slug: string): Status {
    return statusMap[slug]?.status ?? "UNKNOWN"
  }

  return (
    <Map
      ref={mapRef}
      initialViewState={{ longitude: 9.4, latitude: 34.3, zoom: 5.7 }}
      minZoom={5}
      maxZoom={14}
      mapStyle={MAP_STYLE as any}
      style={{ width: "100%", height: "100%" }}
      onClick={() => setPopupSlug(null)}
    >
      <NavigationControl position="bottom-left" showCompass={false} />

      {GOVERNORATES.map((gov) => {
        const s = statusFor(gov.slug)
        return (
          <Marker
            key={gov.slug}
            longitude={gov.lng}
            latitude={gov.lat}
            anchor="center"
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              handleMarkerClick(gov)
            }}
          >
            <div style={{ opacity: matches(gov) ? 1 : 0.3 }}>
              <Pin color={STATUS_COLOR[s]} pulse={s === "OFF"} />
            </div>
          </Marker>
        )
      })}

      {cityMarkers.map((city) => {
        const s = statusFor(city.slug)
        return (
          <Marker
            key={city.slug}
            longitude={city.lng}
            latitude={city.lat}
            anchor="center"
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              handleMarkerClick(city)
            }}
          >
            <div style={{ opacity: matches(city) ? 1 : 0.3 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] cursor-pointer">
                <circle cx="8" cy="8" r="6" fill={STATUS_COLOR[s]} stroke="#0f172a" strokeWidth="2" />
              </svg>
            </div>
          </Marker>
        )
      })}

      {popupLocation && (
        <Popup
          longitude={popupLocation.lng}
          latitude={popupLocation.lat}
          anchor="bottom"
          offset={16}
          closeOnClick={false}
          onClose={() => setPopupSlug(null)}
          className="power-popup"
        >
          <div className="p-1 min-w-[180px]" dir="rtl">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-bold text-sm text-slate-100">{popupLocation.nameAr}</span>
              <span className={`text-xs ${statusLabel(statusFor(popupLocation.slug)).cls}`}>
                {statusLabel(statusFor(popupLocation.slug)).text}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mb-1">{popupLocation.name}</p>
            <ReportMeta status={statusMap[popupLocation.slug]} />
            <VoteButtons locationId={popupLocation.slug} onVoted={onVoted} />
          </div>
        </Popup>
      )}
    </Map>
  )
}
