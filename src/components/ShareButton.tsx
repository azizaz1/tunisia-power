"use client"

import { useState } from "react"
import { getLocation } from "@/lib/locations"
import { statusLabel, type Status } from "@/components/StatusUI"

const SITE_URL = "https://tunisia-power.vercel.app"

function buildShareText(locationId: string, status: Status, total: number): string {
  const name = getLocation(locationId)?.nameAr ?? locationId
  const label = statusLabel(status).text
  const confidence = total > 0 ? ` (حسب ${total} ${total === 1 ? "تقرير" : "تقارير"})` : ""
  return `⚡ فاما ضوء؟\n${name}: ${label}${confidence}\n\nشوف حالة الكهرباء المباشرة في كل تونس:`
}

interface ShareButtonProps {
  locationId: string
  status: Status
  total: number
}

export default function ShareButton({ locationId, status, total }: ShareButtonProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = `${SITE_URL}/?focus=${locationId}`
  const text = buildShareText(locationId, status, total)

  function shareTo(platform: "whatsapp" | "facebook" | "twitter") {
    const urls: Record<typeof platform, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text}\n${shareUrl}`)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
    }
    window.open(urls[platform], "_blank", "noopener,noreferrer")
    setOpen(false)
  }

  // Instagram has no web URL that accepts prefilled share text, so prefer the
  // native share sheet (covers Instagram DMs/Stories on mobile) and fall back
  // to copying the text for the user to paste in manually.
  async function shareInstagram() {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: "فاما ضوء؟", text, url: shareUrl })
        setOpen(false)
        return
      } catch {
        // cancelled or unsupported — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(`${text}\n${shareUrl}`)
      setCopied(true)
      setOpen(false)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // clipboard unavailable — nothing more we can do
    }
  }

  if (copied) {
    return <p className="flex-1 text-[11px] text-emerald-400 self-center text-center">تم النسخ، الصقه في إنستغرام 📋</p>
  }

  if (open) {
    return (
      <div className="flex-1 flex gap-1.5">
        <button
          onClick={() => shareTo("whatsapp")}
          title="واتساب"
          className="flex-1 py-1.5 rounded-lg text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
        >
          💬
        </button>
        <button
          onClick={() => shareTo("facebook")}
          title="فيسبوك"
          className="flex-1 py-1.5 rounded-lg text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
        >
          📘
        </button>
        <button
          onClick={() => shareTo("twitter")}
          title="تويتر"
          className="flex-1 py-1.5 rounded-lg text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
        >
          🐦
        </button>
        <button
          onClick={shareInstagram}
          title="انستغرام"
          className="flex-1 py-1.5 rounded-lg text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
        >
          📷
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setOpen(true)}
      className="flex-1 py-1.5 rounded-lg text-xs font-medium border border-white/10 bg-transparent text-slate-400 hover:text-slate-200 hover:border-white/20 transition-colors"
    >
      📤 شارك
    </button>
  )
}
