import { useEffect } from 'react'
import Icon from './Icon'
import Stars from './Stars'
import SectionHead from './SectionHead'
import CityHero from './CityHero'
import HotelCard from './HotelCard'
import SuggestionCard from './SuggestionCard'
import { cidadePorId, cidades } from '../data/data'

function PasseioRow({ p, rating, onRate }) {
  return (
    <div className="card" style={{ padding: "13px 15px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, justifyContent: "space-between" }}>
        <div style={{ minWidth: 0 }}>
          <div className="chips" style={{ marginBottom: 5 }}>
            <span className="chip chip--cat">{p.categoria}</span>
            {p.reservado && (
              <span className="chip chip--cat" style={{ color: "var(--olive)", borderColor: "var(--olive)", background: "rgba(70,85,42,.1)" }}>
                ✓ reservado
              </span>
            )}
          </div>
          <b style={{ fontSize: "1.08rem" }}>{p.nome}</b>
        </div>
        {p.link && (
          <a className="btn btn--sm btn--ghost" href={p.link} target="_blank" rel="noopener noreferrer" style={{ width: "auto", flex: "none" }}>
            <Icon name="external" size={16} />
          </a>
        )}
      </div>
      <div style={{ marginTop: 9 }}>
        <Stars value={rating || 0} onRate={onRate} size={24} />
      </div>
    </div>
  )
}

export default function CityDetail({ id, cardStyle, onBack, onMap, sugg, onVote, rate, ratings, onOpenCity, onEdit, onDelete, onVisited }) {
  const c = cidadePorId[id]
  const idx = cidades.findIndex(x => x.id === id)
  const prev = cidades[idx - 1]
  const next = cidades[idx + 1]
  const citySugg = sugg.filter(s => s.cidadeId === id).sort((a, b) => (a.visitado - b.visitado) || (b.votos - a.votos))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  return (
    <div className="scroll">
      <div style={{
        position: "sticky", top: 0, zIndex: 30, background: "var(--sand)",
        borderBottom: "1.5px solid var(--line)", padding: "12px 14px",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <button className="btn btn--sm" style={{ width: "auto", paddingInline: 14 }} onClick={onBack}>
          <Icon name="chevronL" size={20} /> Roteiro
        </button>
        <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <b className="title" style={{ fontSize: "1.25rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.nome}</b>
          <span className="mono" style={{ fontSize: ".66rem", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ocean-soft)" }}>{c.pais}</span>
        </span>
      </div>

      <section className="block">
        <CityHero cidade={c} variant={cardStyle}
          rating={ratings["cidade:" + id]}
          onRate={(v) => rate("cidade:" + id, v)}
        />
      </section>

      <section className="block">
        <SectionHead title={c.stays.length > 1 ? "Hotéis" : "Hotel reservado"} />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {c.stays.map((s, i) => (
            <HotelCard key={i} stay={s} cidade={c.nome} variant={cardStyle} onMaps={onMap}
              rating={ratings["hotel:" + s.hotel]}
              onRate={(v) => rate("hotel:" + s.hotel, v)}
            />
          ))}
        </div>
      </section>

      {c.passeios.length > 0 && (
        <section className="block">
          <SectionHead title="Passeios planejados" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {c.passeios.map((p, i) => (
              <PasseioRow key={i} p={p}
                rating={ratings["passeio:" + id + ":" + i]}
                onRate={(v) => rate("passeio:" + id + ":" + i, v)}
              />
            ))}
          </div>
        </section>
      )}

      <section className="block">
        <SectionHead title="Sugestões da família" />
        {citySugg.length
          ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {citySugg.map(s => (
                <SuggestionCard key={s.id} s={s} onVote={onVote}
                  onRate={(id2, v) => rate("sug:" + id2, v)}
                  rating={ratings["sug:" + s.id]}
                  onEdit={onEdit} onDelete={onDelete} onVisited={onVisited}
                />
              ))}
            </div>
          )
          : <p className="muted">Ainda não há sugestões para {c.nome}. Que tal adicionar uma?</p>
        }
      </section>

      <section className="block" style={{ display: "flex", gap: 10, borderBottom: "none" }}>
        {prev
          ? <button className="btn btn--sm" onClick={() => onOpenCity(prev.id)} style={{ flex: 1 }}>
              <Icon name="chevronL" size={18} /> {prev.nome}
            </button>
          : <span style={{ flex: 1 }} />
        }
        {next
          ? <button className="btn btn--sm" onClick={() => onOpenCity(next.id)} style={{ flex: 1 }}>
              {next.nome} <Icon name="chevron" size={18} />
            </button>
          : <span style={{ flex: 1 }} />
        }
      </section>
    </div>
  )
}
