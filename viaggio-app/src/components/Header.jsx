import Icon from './Icon'
import { diasAte } from '../data/data'

const INITIALS = { "Fernando":"FE", "Ana Paula":"AP", "Mariana":"MA", "Pedro":"PE", "Marina":"MI" }

const NAV = [
  { id: "sec-roteiro", label: "Roteiro", icon: "route" },
  { id: "sec-mapa",    label: "Mapa",    icon: "map" },
  { id: "sec-hoteis",  label: "Hotéis",  icon: "bed" },
  { id: "sec-sugestoes", label: "Sugestões", icon: "thumb" },
  { id: "sec-links",   label: "Links",   icon: "sheet" },
]

export default function Header({ query, setQuery, onNav, user, onSwitchUser }) {
  const falta = diasAte("2026-06-29")
  return (
    <header className="hdr">
      <div className="hdr-top">
        <div>
          <div className="brand">VIAGGIO<span className="dot">.</span></div>
          <div className="brand-sub">Roteiro da viagem</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
          <div className="hdr-stamp">
            <Icon name="plane" size={13} />
            {falta > 0 ? <>faltam <b>{falta}d</b></> : <b>em viagem</b>}
          </div>
          {user && (
            <button className="user-badge" onClick={onSwitchUser} title="Trocar usuário">
              <span className="user-badge-avatar">{INITIALS[user] || user.slice(0,2).toUpperCase()}</span>
              {user}
            </button>
          )}
        </div>
      </div>
      <div className="search" role="search">
        <Icon name="search" size={22} style={{ color: "var(--ocean-soft)", flex: "none" }} />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar cidade, hotel ou passeio"
          aria-label="Buscar"
        />
        {query && (
          <button onClick={() => setQuery("")} aria-label="Limpar busca"
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ocean)", padding: 6 }}>
            <Icon name="close" size={18} />
          </button>
        )}
      </div>
      <nav className="nav" aria-label="Atalhos">
        {NAV.map(n => (
          <button key={n.id} className="navbtn" onClick={() => onNav(n.id)}>
            <Icon name={n.icon} size={17} /> {n.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
