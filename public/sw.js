const CACHE_NAME = "power-cache-v1"

self.addEventListener("install", () => {
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim())
})

// Network-first with cache fallback: always prefer live data, but if the
// network is unavailable, serve the last successful response instead of
// failing outright. Used for the status API and the app shell document.
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME)
  try {
    const response = await fetch(request)
    if (response.ok) cache.put(request, response.clone())
    return response
  } catch (err) {
    const cached = await cache.match(request)
    if (cached) return cached
    throw err
  }
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return

  const url = new URL(event.request.url)
  if (url.pathname === "/api/status" || url.pathname === "/") {
    event.respondWith(networkFirst(event.request))
  }
})

self.addEventListener("push", (event) => {
  if (!event.data) return

  let payload
  try {
    payload = event.data.json()
  } catch {
    payload = { title: "فاما ضوء؟", body: event.data.text() }
  }

  const { title, body, locationId } = payload
  event.waitUntil(
    self.registration.showNotification(title || "فاما ضوء؟", {
      body,
      icon: "/pwa-icon-192",
      badge: "/pwa-icon-192",
      dir: "rtl",
      lang: "ar",
      data: { locationId },
    })
  )
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  const locationId = event.notification.data && event.notification.data.locationId
  const url = locationId ? `/?focus=${locationId}` : "/"

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientsArr) => {
      const existing = clientsArr.find((c) => "focus" in c)
      if (existing) {
        existing.navigate(url)
        return existing.focus()
      }
      return self.clients.openWindow(url)
    })
  )
})
