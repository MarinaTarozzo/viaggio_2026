import Icon from './Icon'
import { links } from '../data/data'

export default function UsefulLinks() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
      {links.map(l => (
        <a key={l.titulo} className="card" href={l.url} target="_blank" rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 16px", textDecoration: "none", color: "var(--ocean)" }}>
          <span style={{
            width: 46, height: 46, flex: "none", borderRadius: 8, border: "1.5px solid var(--line)",
            display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)",
          }}>
            <Icon name={l.icone} size={24} />
          </span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <b style={{ display: "block", fontSize: "1.05rem" }}>{l.titulo}</b>
            <span className="muted" style={{ fontSize: ".86rem" }}>{l.desc}</span>
          </span>
          <Icon name="external" size={20} style={{ color: "var(--ocean-soft)" }} />
        </a>
      ))}
    </div>
  )
}
