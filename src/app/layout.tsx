import type { Metadata, Viewport } from "next"
import { Tajawal } from "next/font/google"
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister"
import "./globals.css"

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
})

export const viewport: Viewport = {
  themeColor: "#020617",
}

export const metadata: Metadata = {
  title: "فاما ضوء؟ — حالة الكهرباء في تونس",
  description: "تقارير مباشرة من المواطنين عن حالة الكهرباء في جميع ولايات تونس",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "فاما ضوء؟",
  },
  openGraph: {
    title: "فاما ضوء؟",
    description: "هل في ضوء عندك؟ — تقارير مباشرة من تونس",
    locale: "ar_TN",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
        <ServiceWorkerRegister />
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-tunisia/20 blur-[120px]" />
          <div className="absolute top-1/3 -left-40 w-[26rem] h-[26rem] rounded-full bg-emerald-600/10 blur-[120px]" />
        </div>

        <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-tunisia to-red-800 flex items-center justify-center text-xl shadow-lg shadow-red-950/50">
              💡
            </span>
            <div>
              <h1 className="text-lg font-extrabold text-white leading-tight">فاما ضوء؟</h1>
              <p className="text-[11px] text-slate-400">حالة الكهرباء في تونس، لحظة بلحظة</p>
            </div>
          </div>
        </header>

        <main className="relative max-w-6xl mx-auto px-4 py-6">{children}</main>

        <footer className="relative max-w-6xl mx-auto px-4 py-8">
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-center mb-4">
            <p className="text-xs text-amber-300">
              ⚠️ هذا الموقع <span className="font-bold">غير رسمي</span> وغير تابع للشركة التونسية للكهرباء والغاز
              (STEG) — البيانات مبنية بالكامل على تقارير المواطنين، وما تعتبرش مصدر رسمي.
            </p>
          </div>
          <p className="text-center text-xs text-slate-500">
            كل تقرير صالح لمدة 30 دقيقة · يمكنك التصويت كل 10 دقائق لكل منطقة
          </p>
        </footer>
      </body>
    </html>
  )
}
