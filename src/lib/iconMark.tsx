// Shared visual for every generated app icon (favicon, apple touch icon, PWA
// manifest icons): a plain gradient square with a glowing white dot, echoing
// the status-dot glow used throughout the app. Deliberately avoids text/emoji
// since next/og's renderer (Satori) doesn't reliably render Arabic script or
// emoji without a custom font bundle — plain shapes always render correctly.
export function IconMark() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #E70013, #7f0009)",
      }}
    >
      <div
        style={{
          width: "42%",
          height: "42%",
          borderRadius: "9999px",
          background: "white",
          boxShadow: "0 0 60px 20px rgba(255,255,255,0.55)",
        }}
      />
    </div>
  )
}
