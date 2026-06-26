import { useState } from 'react'
import Icon from './Icon'
import SectionHead from './SectionHead'
import NextStop from './NextStop'
import MapSection from './MapSection'
import Timeline from './Timeline'
import HotelCard from './HotelCard'
import SuggestionCard from './SuggestionCard'
import UsefulLinks from './UsefulLinks'
import { cidades, resumo, cidadePorId, normalizeSearch, cidadeMatch, links } from '../data/data'

function buildResults(q, sugg, onOpenCity, onNav) {
  if (!q) return []
  const results = []

  cidades.forEach(c => {
    if (cidadeMatch(c, q)) {
      results.push({ key: "cidade:" + c.id, tipo: "Cidade", icon: "pin", titulo: c.nome, subtitulo: c.pais, onClick: () => onOpenCity(c.id) })
    }
    c.passeios.forEach((p, i) => {
      if (normalizeSearch(p.nome).includes(q)) {
        results.push({ key: "passeio:" + c.id + ":" + i, tipo: "Passeio", icon: "route", titulo: p.nome, subtitulo: c.nome, onClick: () => onOpenCity(c.id) })
      }
    })
    c.stays.forEach((s, i) => {
      if (normalizeSearch(s.hotel).includes(q)) {
        results.push({ key: "hotel:" + c.id + ":" + i, tipo: "Hotel", icon: "bed", titulo: s.hotel, subtitulo: c.nome, onClick: () => onOpenCity(c.id) })
      }
    })
  })

  sugg.forEach(s => {
    if (normalizeSearch(s.nome).includes(q)) {
      const cidade = cidadePorId[s.cidadeId]
      results.push({
        key: "sugestao:" + s.id, tipo: "Sugestão", icon: "thumb", titulo: s.nome,
        subtitulo: cidade ? cidade.nome : "Sugestão de passeio",
        onClick: () => cidade ? onOpenCity(cidade.id) : onNav("sec-sugestoes"),
      })
    }
  })

  links.forEach((l, i) => {
    if (normalizeSearch(l.titulo).includes(q) || normalizeSearch(l.desc).includes(q)) {
      results.push({ key: "link:" + i, tipo: "Arquivo", icon: l.icone || "sheet", titulo: l.titulo, subtitulo: l.desc, onClick: () => onNav("sec-links") })
    }
  })

  return results
}

export default function Home({ cardStyle, timelineStyle, query, onOpenCity, onMap, onNav, sugg, onVote, rate, ratings, catFilter, setCatFilter, onEdit, onDelete, onVisited }) {
  const [cityFilter, setCityFilter] = useState("todas")
  const [sortBy, setSortBy] = useState("votos")

  const q = normalizeSearch(query.trim())
  const results = buildResults(q, sugg, onOpenCity, onNav)
  const cats = ["todas", ...Array.from(new Set(sugg.map(s => s.categoria)))]
  const suggCities = Array.from(new Set(sugg.map(s => s.cidadeId).filter(Boolean)))

  let visSugg = [...sugg]
  if (sortBy === "votos") {
    visSugg.sort((a, b) => (a.visitado - b.visitado) || (b.votos - a.votos))
  } else {
    visSugg.sort((a, b) => (a.visitado - b.visitado) || (b.created_at > a.created_at ? 1 : -1))
  }
  if (catFilter !== "todas") visSugg = visSugg.filter(s => s.categoria === catFilter)
  if (cityFilter !== "todas") visSugg = visSugg.filter(s => s.cidadeId === cityFilter)
  if (q) visSugg = visSugg.filter(s =>
    normalizeSearch(s.nome).includes(q) ||
    normalizeSearch(s.quem).includes(q) ||
    cidadeMatch(cidadePorId[s.cidadeId], q)
  )

  const stays = []
  cidades.forEach(c => c.stays.forEach(s => stays.push({ ...s, cidade: c.nome, cidadeId: c.id })))

  return (
    <div className="scroll">
      {q && (
        <div className="block" style={{ padding: "14px 18px", background: "rgba(26,75,110,.05)" }}>
          <span className="mono" style={{ fontSize: ".8rem" }}>Mostrando resultados para "{query}".</span>
        </div>
      )}

      {q && (
        <section className="block" id="sec-busca">
          {results.length ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {results.map(r => (
                <button key={r.key} className="card" onClick={r.onClick} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                  width: "100%", textAlign: "left", cursor: "pointer", background: "var(--surface)",
                }}>
                  <span style={{
                    width: 34, height: 34, borderRadius: "50%", border: "1.6px solid var(--line)",
                    background: "var(--sand)", display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--ocean)", flex: "none",
                  }}>
                    <Icon name={r.icon} size={17} stroke={1.8} />
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span className="mono" style={{ fontSize: ".64rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ocean-soft)", display: "block" }}>
                      {r.tipo}
                    </span>
                    <b style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.titulo}</b>
                    {r.subtitulo && <span className="muted" style={{ fontSize: ".82rem" }}>{r.subtitulo}</span>}
                  </span>
                  <Icon name="chevron" size={18} style={{ color: "var(--ocean-soft)" }} />
                </button>
              ))}
            </div>
          ) : (
            <p className="muted">Nenhum resultado encontrado para "{query}".</p>
          )}
        </section>
      )}

      {!q && (
        <section className="block">
          <SectionHead num="01" title="Próxima parada" />
          <NextStop onOpenCity={onOpenCity} onMap={onMap} />
        </section>
      )}

      <section className="block" id="sec-mapa">
        <SectionHead num="02" title="Mapa da viagem" />
        <MapSection />
      </section>

      <section className="block" id="sec-roteiro">
        <SectionHead num="03" title="Linha do tempo" />
        <div className="chips" style={{ marginBottom: 16 }}>
          <span className="chip" style={{ pointerEvents: "none", display: "inline-flex", gap: 6 }}>
            <Icon name="car" size={15} style={{ color: "var(--solar-deep)" }} />
            {resumo.totalKm.toLocaleString("pt-BR")} km
          </span>
          <span className="chip" style={{ pointerEvents: "none" }}>{resumo.totalDias} dias</span>
          <span className="chip" style={{ pointerEvents: "none" }}>{resumo.cidades} cidades</span>
        </div>
        <Timeline style={timelineStyle} onOpenCity={onOpenCity} query={q} />
      </section>

      <section className="block" id="sec-hoteis">
        <SectionHead num="04" title="Hotéis reservados" />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {(() => {
            const filtered = stays.filter(s =>
              !q || normalizeSearch(s.hotel).includes(q) || cidadeMatch(cidadePorId[s.cidadeId], q)
            )
            return filtered.length
              ? filtered.map((s, i) => (
                <HotelCard key={i} stay={s} cidade={s.cidade} variant={cardStyle} onMaps={onMap}
                  rating={ratings["hotel:" + s.hotel]}
                  onRate={(v) => rate("hotel:" + s.hotel, v)}
                />
              ))
              : <p className="muted">Nenhum hotel encontrado para "{query}".</p>
          })()}
        </div>
      </section>

      <section className="block" id="sec-sugestoes">
        <SectionHead num="05" title="Sugestões de passeio" />
        <p className="muted" style={{ margin: "-6px 0 14px", fontSize: ".9rem" }}>
          Vote e avalie depois da visita.
        </p>

        <div className="chips" style={{ marginBottom: 8, overflowX: "auto", flexWrap: "nowrap", paddingBottom: 2 }}>
          {cats.map(c => (
            <button key={c} className="chip" aria-pressed={catFilter === c} onClick={() => setCatFilter(c)}
              style={{ textTransform: c === "todas" ? "uppercase" : "none", letterSpacing: c === "todas" ? ".06em" : 0 }}>
              {c}
            </button>
          ))}
        </div>

        {suggCities.length > 1 && (
          <div className="chips" style={{ marginBottom: 8, overflowX: "auto", flexWrap: "nowrap", paddingBottom: 2 }}>
            <button className="chip" aria-pressed={cityFilter === "todas"} onClick={() => setCityFilter("todas")}
              style={{ textTransform: "uppercase", letterSpacing: ".06em" }}>
              Todas as cidades
            </button>
            {suggCities.map(id => (
              <button key={id} className="chip" aria-pressed={cityFilter === id} onClick={() => setCityFilter(id)}>
                {cidadePorId[id]?.nome || id}
              </button>
            ))}
          </div>
        )}

        <div className="chips" style={{ marginBottom: 16, paddingBottom: 2 }}>
          <button className="chip" aria-pressed={sortBy === "votos"} onClick={() => setSortBy("votos")}>
            <Icon name="thumb" size={14} /> Mais curtidos
          </button>
          <button className="chip" aria-pressed={sortBy === "recentes"} onClick={() => setSortBy("recentes")}>
            Mais recentes
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {visSugg.length
            ? visSugg.map(s => (
              <SuggestionCard key={s.id} s={s} onVote={onVote}
                onRate={rate && ((id, v) => rate("sug:" + id, v))}
                rating={ratings["sug:" + s.id]}
                onEdit={onEdit} onDelete={onDelete} onVisited={onVisited}
              />
            ))
            : <p className="muted">Nenhuma sugestão nessa categoria.</p>
          }
        </div>
      </section>

      <section className="block" id="sec-links">
        <SectionHead num="06" title="Links úteis" />
        <UsefulLinks />
      </section>

      <section className="block" style={{ borderBottom: "none", textAlign: "center", paddingTop: 30, paddingBottom: 30 }}>
        <Icon name="flag" size={26} style={{ color: "var(--accent)" }} />
        <p className="title" style={{ fontSize: "1.3rem", marginTop: 8 }}>Boa viagem, família!</p>
        <p className="muted mono" style={{ fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase", marginTop: 6 }}>
          {resumo.dataInicio.split("-").reverse().join("/")} — {resumo.dataFim.split("-").reverse().join("/")}
        </p>
      </section>
    </div>
  )
}
