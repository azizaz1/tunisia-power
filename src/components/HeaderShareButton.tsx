"use client"

import { useState } from "react"

const SITE_URL = "https://tunisia-power.vercel.app"
const SHARE_TEXT = "⚡ فاما ضوء؟ — تابع حالة الكهرباء في تونس مباشرة"

export default function HeaderShareButton() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Prefer the native share sheet on mobile (covers Instagram/WhatsApp/etc.
  // in one tap); fall back to a small platform menu where it's unsupported
  // (desktop browsers mostly).
  async function share() {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: "فاما ضوء؟", text: SHARE_TEXT, url: SITE_URL })
      } catch {
        // user cancelled — nothing to do
      }
      return
    }
    setOpen((v) => !v)
  }

  async function shareTo(platform: "whatsapp" | "facebook" | "twitter" | "instagram") {
    if (platform === "instagram") {
      try {
        await navigator.clipboard.writeText(`${SHARE_TEXT}\n${SITE_URL}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      } catch {
        // clipboard unavailable — nothing more we can do
      }
      setOpen(false)
      return
    }
    const urls: Record<typeof platform, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT}\n${SITE_URL}`)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}&quote=${encodeURIComponent(SHARE_TEXT)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SITE_URL)}`,
    }
    window.open(urls[platform], "_blank", "noopener,noreferrer")
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={share}
        title="شارك الموقع"
        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg text-slate-300 border border-white/10 bg-white/5 hover:text-white hover:border-white/20 transition-colors"
      >
        📤
      </button>

      {open && (
        <div
          className="absolute end-0 mt-2 flex gap-1.5 bg-slate-900 border border-white/10 rounded-xl p-2 shadow-lg z-30"
          onMouseLeave={() => setOpen(false)}
        >
          <button
            onClick={() => shareTo("whatsapp")}
            title="واتساب"
            className="w-9 h-9 rounded-lg text-lg hover:bg-white/10 transition-colors"
          >
            💬
          </button>
          <button
            onClick={() => shareTo("facebook")}
            title="فيسبوك"
            className="w-9 h-9 rounded-lg text-lg hover:bg-white/10 transition-colors"
          >
            📘
          </button>
          <button
            onClick={() => shareTo("twitter")}
            title="تويتر"
            className="w-9 h-9 rounded-lg text-lg hover:bg-white/10 transition-colors"
          >
            🐦
          </button>
          <button
            onClick={() => shareTo("instagram")}
            title="انستغرام (نسخ الرابط)"
            className="w-9 h-9 rounded-lg text-lg hover:bg-white/10 transition-colors"
          >
            📷
          </button>
        </div>
      )}

      {copied && (
        <p className="absolute end-0 mt-2 whitespace-nowrap text-[11px] text-emerald-400 bg-slate-900 border border-white/10 rounded-lg px-2 py-1 shadow-lg z-30">
          تم النسخ 📋
        </p>
      )}
    </div>
  )
}
