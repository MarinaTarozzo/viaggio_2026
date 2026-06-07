import { useState } from 'react'

export default function Photo({ label, h = 130, tone = "ocean", src }) {
  const [imgErr, setImgErr] = useState(false)

  if (src && !imgErr) {
    return (
      <div style={{ height: h, position: "relative", overflow: "hidden", borderBottom: "1.5px solid var(--line)", flexShrink: 0 }}>
        <img
          src={src}
          alt={label}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={() => setImgErr(true)}
          loading="lazy"
        />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "55%",
          background: "linear-gradient(transparent, rgba(26,75,110,.45))",
          pointerEvents: "none",
        }} />
      </div>
    )
  }

  /* Striped placeholder */
  const bg     = tone === "ocean" ? "rgba(26,75,110,.10)" : "rgba(70,85,42,.12)"
  const stripe = tone === "ocean" ? "rgba(26,75,110,.16)" : "rgba(70,85,42,.18)"
  return (
    <div style={{
      height: h, borderBottom: "1.5px solid var(--line)", position: "relative", overflow: "hidden",
      background: `repeating-linear-gradient(135deg, ${stripe} 0 1.5px, ${bg} 1.5px 13px)`,
      display: "flex", alignItems: "flex-end", padding: "10px 12px", flexShrink: 0,
    }}>
      <span className="mono" style={{
        fontSize: ".66rem", letterSpacing: ".08em", textTransform: "uppercase",
        color: "var(--ocean)", background: "var(--sand)", border: "1.4px solid var(--line)",
        padding: "3px 8px", borderRadius: 4,
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        maxWidth: "calc(100% - 4px)",
      }}>
        foto · {label}
      </span>
    </div>
  )
}
