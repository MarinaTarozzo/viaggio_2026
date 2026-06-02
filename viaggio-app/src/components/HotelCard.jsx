import Icon from './Icon'
import Stars from './Stars'
import StatusBadge from './StatusBadge'
import Photo from './Photo'

export default function HotelCard({ stay, cidade, variant = "editorial", onMaps, rating, onRate }) {
  const Buttons = (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginTop: 13 }}>
      <a className="btn btn--solid btn--sm" href={stay.link} target="_blank" rel="noopener noreferrer" style={{ width: "auto" }}>
        <Icon name="external" size={17} /> Abrir reserva
      </a>
      <button className="btn btn--sm" style={{ width: "auto" }} onClick={onMaps}>
        <Icon name="pin" size={17} /> Mapa
      </button>
    </div>
  )
  const Meta = (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
        <Icon name="calendar" size={17} style={{ color: "var(--ocean-soft)", flex: "none" }} />
        <span className="muted" style={{ fontSize: ".9rem", whiteSpace: "nowrap" }}>{stay.periodo}</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginTop: 7 }}>
        <Icon name="pin" size={17} style={{ color: "var(--ocean-soft)", flex: "none", marginTop: 2 }} />
        <span className="muted" style={{ fontSize: ".9rem", lineHeight: 1.35 }}>{stay.endereco}</span>
      </div>
      {stay.obs && <p className="muted" style={{ fontSize: ".84rem", margin: "8px 0 0", fontStyle: "italic", lineHeight: 1.4 }}>{stay.obs}</p>}
    </>
  )

  if (variant === "linhas") {
    return (
      <div className="card" style={{ padding: "15px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
          <div style={{ minWidth: 0 }}>
            <div className="eyebrow" style={{ marginBottom: 3 }}>Hotel{cidade ? ` · ${cidade}` : ""}</div>
            <h3 className="title" style={{ fontSize: "1.3rem", lineHeight: 1.1 }}>{stay.hotel}</h3>
          </div>
          <StatusBadge status={stay.status} />
        </div>
        {Meta}
        {onRate != null && <div style={{ marginTop: 10 }}><Stars value={rating || 0} onRate={onRate} size={24} /></div>}
        {Buttons}
      </div>
    )
  }

  if (variant === "postal") {
    return (
      <div className="card" style={{ overflow: "hidden", position: "relative", borderWidth: 1.5 }}>
        <div style={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}><StatusBadge status={stay.status} /></div>
        <div style={{ display: "flex" }}>
          <div style={{ width: 108, flex: "none", borderRight: "1.5px dashed var(--line)" }}>
            <Photo label={cidade || "hotel"} h="100%" tone="olive" />
          </div>
          <div style={{ padding: "14px 15px", minWidth: 0 }}>
            <div className="eyebrow" style={{ marginBottom: 3 }}>Hotel reservado</div>
            <h3 className="title" style={{ fontSize: "1.25rem", lineHeight: 1.1 }}>{stay.hotel}</h3>
            {Meta}
          </div>
        </div>
        <div style={{ padding: "0 15px 15px" }}>
          {onRate != null && <div style={{ margin: "12px 0 2px" }}><Stars value={rating || 0} onRate={onRate} size={24} /></div>}
          {Buttons}
        </div>
      </div>
    )
  }

  /* editorial (padrão) */
  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <Photo label={stay.hotel} h={120} tone="olive" />
      <div style={{ padding: "15px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 2 }}>
          <div className="eyebrow">Hotel{cidade ? ` · ${cidade}` : ""}</div>
          <StatusBadge status={stay.status} />
        </div>
        <h3 className="title" style={{ fontSize: "1.4rem", lineHeight: 1.1 }}>{stay.hotel}</h3>
        {Meta}
        {onRate != null && <div style={{ marginTop: 12 }}><Stars value={rating || 0} onRate={onRate} size={26} /></div>}
        {Buttons}
      </div>
    </div>
  )
}
