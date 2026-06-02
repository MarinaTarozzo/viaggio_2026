import Icon from './Icon'
import { MAPA_URL } from '../data/data'

export default function MapSection() {
  const src = "https://www.google.com/maps?q=Liubliana%2C%20Eslov%C3%AAnia&z=6&output=embed"
  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <div style={{ position: "relative" }}>
        <iframe
          title="Mapa da viagem"
          src={src}
          loading="lazy"
          style={{ width: "100%", height: 220, border: "none", display: "block", filter: "saturate(.92)" }}
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="mono" style={{
          position: "absolute", top: 10, left: 10, background: "var(--sand)",
          border: "1.4px solid var(--line)", borderRadius: 4, padding: "4px 9px",
          fontSize: ".66rem", letterSpacing: ".1em", textTransform: "uppercase", whiteSpace: "nowrap",
        }}>
          7 cidades · 4 países
        </div>
      </div>
      <div style={{ padding: 14, borderTop: "1.5px solid var(--line)" }}>
        <a className="btn btn--solid" href={MAPA_URL} target="_blank" rel="noopener noreferrer">
          <Icon name="map" size={20} /> Abrir no Google Maps <Icon name="external" size={18} />
        </a>
      </div>
    </div>
  )
}
