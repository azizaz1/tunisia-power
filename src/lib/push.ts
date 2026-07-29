import webpush from "web-push"
import { prisma } from "@/lib/prisma"
import { getLocation } from "@/lib/locations"
import { computeStatusForLocation } from "@/lib/status"

const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
const privateKey = process.env.VAPID_PRIVATE_KEY
const subject = process.env.VAPID_SUBJECT

export const pushConfigured = Boolean(publicKey && privateKey && subject)

if (pushConfigured) {
  webpush.setVapidDetails(subject!, publicKey!, privateKey!)
}

// Notifies everyone following `locationId` if the vote that was just cast
// changed its aggregate status. Called from POST /api/vote right after a
// vote is recorded — no cron/polling needed, this is what makes alerts real-time.
export async function notifyFollowers(locationId: string) {
  if (!pushConfigured) return

  const newStatus = await computeStatusForLocation(locationId)
  if (newStatus === "UNKNOWN") return // nothing actionable to tell anyone

  const subs = await prisma.pushSubscription.findMany({
    where: {
      locationId,
      OR: [{ lastNotifiedStatus: null }, { lastNotifiedStatus: { not: newStatus } }],
    },
  })
  if (subs.length === 0) return

  const name = getLocation(locationId)?.nameAr ?? locationId
  const title = newStatus === "OFF" ? `⚠️ ${name}` : `✅ ${name}`
  const body = newStatus === "OFF" ? `تقطعت الكهرباء في ${name}` : `رجع الضوء في ${name}`
  const payload = JSON.stringify({ title, body, locationId })

  await Promise.allSettled(
    subs.map(async (sub) => {
      try {
        await webpush.sendNotification({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, payload)
        await prisma.pushSubscription.update({ where: { id: sub.id }, data: { lastNotifiedStatus: newStatus } })
      } catch (err) {
        const statusCode = (err as { statusCode?: number }).statusCode
        if (statusCode === 404 || statusCode === 410) {
          await prisma.pushSubscription.delete({ where: { id: sub.id } }).catch(() => null)
        }
      }
    })
  )
}
