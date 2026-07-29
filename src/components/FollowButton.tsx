"use client"

import { useEffect, useState } from "react"

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
const STORAGE_KEY = "followedLocations"

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")
  const rawData = atob(base64)
  return Uint8Array.from(rawData, (c) => c.charCodeAt(0))
}

function getFollowed(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

function setFollowed(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)))
}

export default function FollowButton({ locationId }: { locationId: string }) {
  const [following, setFollowing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [unsupported, setUnsupported] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    setFollowing(getFollowed().has(locationId))
    if (!("serviceWorker" in navigator) || !("PushManager" in window) || !VAPID_PUBLIC_KEY) {
      setUnsupported(true)
    }
  }, [locationId])

  async function follow() {
    if (unsupported) {
      setShowHint(true)
      return
    }
    setLoading(true)
    try {
      const permission = await Notification.requestPermission()
      if (permission !== "granted") return

      const registration = await navigator.serviceWorker.ready
      let subscription = await registration.pushManager.getSubscription()
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY!) as BufferSource,
        })
      }

      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription: subscription.toJSON(), locationId }),
      })
      if (res.ok) {
        const ids = getFollowed()
        ids.add(locationId)
        setFollowed(ids)
        setFollowing(true)
      }
    } catch {
      // permission dismissed, subscribe failed, etc. — leave state unchanged
    } finally {
      setLoading(false)
    }
  }

  async function unfollow() {
    setLoading(true)
    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()
      if (subscription) {
        await fetch("/api/push/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: subscription.endpoint, locationId }),
        })
      }
      const ids = getFollowed()
      ids.delete(locationId)
      setFollowed(ids)
      setFollowing(false)
    } finally {
      setLoading(false)
    }
  }

  if (showHint) {
    return <p className="flex-1 text-[11px] text-amber-400 self-center">🔔 زيد الموقع للشاشة الرئيسية باش تفعل التنبيهات</p>
  }

  return (
    <button
      onClick={following ? unfollow : follow}
      disabled={loading}
      className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-colors disabled:opacity-50 ${
        following
          ? "bg-white/10 text-slate-200 border-white/20 hover:bg-white/15"
          : "bg-transparent text-slate-400 border-white/10 hover:border-white/20 hover:text-slate-200"
      }`}
    >
      {loading ? "..." : following ? "🔔 متابع" : "🔔 تابعني"}
    </button>
  )
}
