import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "فاما ضوء؟ — حالة الكهرباء في تونس",
  description: "تقارير مباشرة من المواطنين عن حالة الكهرباء في جميع ولايات تونس",
  openGraph: {
    title: "فاما ضوء؟",
    description: "هل في ضوء عندك؟ — تقارير مباشرة من تونس",
    locale: "ar_TN",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
            <span className="text-3xl">💡</span>
            <div>
              <h1 className="text-xl font-bold text-gray-900">فاما ضوء؟</h1>
              <p className="text-xs text-gray-500">حالة الكهرباء في تونس — تقارير المواطنين</p>
            </div>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
        <footer className="text-center text-xs text-gray-400 py-6">
          كل تقرير صالح لمدة 30 دقيقة · يمكنك التصويت كل 10 دقائق
        </footer>
      </body>
    </html>
  )
}
