import Icon from './Icon'

export default function RoadBlock({ e, variant = "linha" }) {
  return (
    <div className="perf" style={{
      border: "1.5px dashed var(--solar-deep)", borderRadius: 8,
      background: "rgba(217,90,43,.06)", padding: "13px 16px",
      margin: variant === "bilhete" ? "0" : "10px 0 0",
    }}>
      <div className="flag-line" style={{ color: "var(--solar-deep)", marginBottom: 9 }}>
        <Icon name="car" size={18} stroke={1.8} />
        <span className="mono" style={{ fontSize: ".7rem", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 500, whiteSpace: "nowrap" }}>
          Hoje tem estrada
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: "1.05rem", marginBottom: 10 }}>
        <span>{e.origem}</span>
        <Icon name="arrow" size={18} stroke={2} style={{ color: "var(--solar-deep)" }} />
        <span>{e.destino}</span>
      </div>
      <div style={{ display: "flex", gap: 0, borderTop: "1.4px solid rgba(217,90,43,.4)" }}>
        <div style={{ flex: 1, paddingTop: 8 }}>
          <div className="mono" style={{ fontSize: "1.4rem", color: "var(--solar-deep)", fontWeight: 500 }}>
            {e.km}<span style={{ fontSize: ".8rem" }}> km</span>
          </div>
          <div className="eyebrow">distância</div>
        </div>
        <div style={{ width: 1.4, background: "rgba(217,90,43,.4)" }}></div>
        <div style={{ flex: 1, paddingTop: 8, paddingLeft: 14 }}>
          <div className="mono" style={{ fontSize: "1.4rem", color: "var(--solar-deep)", fontWeight: 500 }}>{e.tempo}</div>
          <div className="eyebrow">tempo previsto</div>
        </div>
      </div>
    </div>
  )
}
