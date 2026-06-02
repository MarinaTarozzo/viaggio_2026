import Icon from './Icon'
import StatusBadge from './StatusBadge'
import Photo from './Photo'
import { cidadePorId, diasAte } from '../data/data'

export default function NextStop({ onOpen, onMap }) {
  const cid = cidadePorId["milao"]
  const falta = diasAte("2026-06-29")
  const stay = cid.stays[0]
  return (
    <div className="card" style={{ overflow: "hidden", borderWidth: 2 }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 16px", borderBottom: "1.5px solid var(--line)",
        background: "var(--ocean)", color: "var(--sand)",
      }}>
        <span className="eyebrow" style={{ color: "var(--sand)", opacity: .85, letterSpacing: ".12em", whiteSpace: "nowrap" }}>
          Próxima parada
        </span>
        <span className="mono" style={{ fontSize: ".72rem", letterSpacing: ".04em", whiteSpace: "nowrap" }}>
          {falta > 0 ? `faltam ${falta} dias` : "em viagem"}
        </span>
      </div>
      <Photo label="Milão" h={120} />
      <div style={{ padding: "18px 16px 16px" }}>
        <div className="flag-line" style={{ marginBottom: 6 }}>
          <Icon name="pin" size={16} />
          <span className="mono" style={{ fontSize: ".68rem", letterSpacing: ".06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            Itália · 1ª cidade
          </span>
        </div>
        <h2 className="title" style={{ fontSize: "2.5rem", marginBottom: 4 }}>Milão</h2>
        <p className="muted" style={{ margin: "0 0 16px", fontSize: ".96rem" }}>
          Chegada em <b className="mono">30 jun</b> por voo de São Paulo. Sem estrada no primeiro dia.
        </p>
        <div className="card" style={{ background: "var(--sand)", padding: "12px 14px", marginBottom: 14, borderRadius: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <Icon name="bed" size={20} />
            <b style={{ flex: 1 }}>{stay.hotel}</b>
            <StatusBadge status={stay.status} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="calendar" size={20} />
            <span className="muted" style={{ fontSize: ".92rem" }}>{stay.periodo} · 2 noites</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 10 }}>
          <button className="btn btn--solid" onClick={onOpen}>
            Ver detalhes <Icon name="arrow" size={20} stroke={2} />
          </button>
          <button className="btn" style={{ width: "auto", paddingInline: 18 }} onClick={onMap} aria-label="Abrir mapa">
            <Icon name="map" size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
