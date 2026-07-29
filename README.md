# فاما ضوء؟ (Famma Dhaou?) — Tunisia Power Outage Tracker

A crowd-sourced, real-time map of power outages across Tunisia. People report whether their governorate/city has electricity or not; the app aggregates recent reports into a live status per location.

**Live:** https://tunisia-power.vercel.app

This is unofficial and not affiliated with STEG (the Tunisian electricity/gas company) — it's entirely built from citizen reports.

## Features

- **Interactive map** of all 24 governorates and ~90 cities (MapLibre GL + free CARTO dark basemap, no API key needed), with click-to-vote popups
- **Vote to report** "في ضوء" (has power) or "ما في ضوء" (no power) per location, rate-limited to one vote per person per location every 10 minutes
- **Live status aggregation**: the last 30 minutes of votes decide each location's ON/OFF/UNKNOWN status, with a confidence indicator (report count, recency, low-confidence flag on single reports)
- **Follow a location** and get a real browser push notification the instant its status flips — no polling, triggered directly from the vote that causes the flip
- **Installable PWA** with offline support (last-known status still shows with no network)
- **Dark UI**, RTL Tunisian Arabic, mobile-first with a map/list tab toggle on small screens

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript + Tailwind CSS
- [Prisma](https://www.prisma.io/) + PostgreSQL (hosted on [Neon](https://neon.tech), free tier)
- [MapLibre GL](https://maplibre.org/) via `react-map-gl`, CARTO free basemap tiles
- [web-push](https://github.com/web-push-libs/web-push) for browser push notifications (VAPID)
- Deployed on [Vercel](https://vercel.com/)

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` — a PostgreSQL connection string (a free [Neon](https://neon.tech) database works well)
   - `NEXT_PUBLIC_VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY` — generate with `npx web-push generate-vapid-keys`
   - `VAPID_SUBJECT` — a `mailto:` contact address
3. Push the schema to your database:
   ```bash
   npx prisma db push
   ```
4. Run the dev server:
   ```bash
   npm run dev
   ```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Generate the Prisma client and build for production |
| `npm run start` | Start the production server |
| `npm run db:push` | Push the Prisma schema to the database |
| `npm run db:studio` | Open Prisma Studio to browse the database |

## Project structure

- `src/app/` — pages and API routes (`/api/status`, `/api/vote`, `/api/push/*`)
- `src/components/` — `PowerMap` (the map), `StatusUI` (shared status/vote UI), `FollowButton`, `ServiceWorkerRegister`
- `src/lib/` — `locations.ts` (governorate/city data with coordinates), `status.ts` (vote aggregation), `push.ts` (web-push + notify-on-flip)
- `public/sw.js` — service worker (offline caching + push handling)
- `prisma/schema.prisma` — `Vote` and `PushSubscription` models

## Deployment

Deployed on Vercel, connected to this GitHub repo for auto-deploy on push to `master`. Required environment variables (`DATABASE_URL`, `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`) are set in the Vercel project settings for both Production and Preview.
