"use client"

import { useState } from "react"

const SITE_URL = "https://tunisia-power.vercel.app"
const SHARE_TEXT = "⚡ فاما ضوء؟ — تابع حالة الكهرباء في تونس مباشرة"

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.27 4.9L2 22l5.25-1.38A9.96 9.96 0 0012.04 22c5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18.2c-1.57 0-3.03-.43-4.29-1.19l-.31-.18-3.12.82.83-3.04-.2-.32A8.18 8.18 0 013.85 12c0-4.52 3.68-8.2 8.19-8.2 4.52 0 8.2 3.68 8.2 8.2s-3.68 8.2-8.2 8.2z" />
      <path d="M16.57 14.15c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.13-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.12.16 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28z" />
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.23 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.91h-2.33V22C18.34 21.23 22 17.08 22 12.06z" />
    </svg>
  )
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24H16.17l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function HeaderShareButton() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Prefer the native share sheet on mobile (covers Instagram/WhatsApp/etc.
  // in one tap); fall back to a small platform menu where it's unsupported
  // (desktop browsers mostly, and some mobile browsers without Web Share).
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
          className="absolute end-0 mt-2 flex gap-2 bg-slate-900 border border-white/10 rounded-xl p-2 shadow-lg z-30"
          onMouseLeave={() => setOpen(false)}
        >
          <button
            onClick={() => shareTo("whatsapp")}
            title="واتساب"
            className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <IconWhatsApp />
          </button>
          <button
            onClick={() => shareTo("facebook")}
            title="فيسبوك"
            className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <IconFacebook />
          </button>
          <button
            onClick={() => shareTo("twitter")}
            title="تويتر"
            className="w-9 h-9 rounded-full bg-black text-white border border-white/10 flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <IconX />
          </button>
          <button
            onClick={() => shareTo("instagram")}
            title="انستغرام (نسخ الرابط)"
            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <IconInstagram />
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
