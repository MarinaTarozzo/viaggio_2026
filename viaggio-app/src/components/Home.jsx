import Icon from './Icon'
import SectionHead from './SectionHead'
import NextStop from './NextStop'
import MapSection from './MapSection'
import Timeline from './Timeline'
import HotelCard from './HotelCard'
import SuggestionCard from './SuggestionCard'
import UsefulLinks from './UsefulLinks'
import { cidades, resumo } from '../data/data'

export default function Home({ cardStyle, timelineStyle, query, onOpenCity, onMap, sugg, onVote, rate, ratings, catFilter, setCatFilter, onEdit, onDelete, onVisited }) {
  const q = query.trim().toLowerCase()
  let visSugg = [...sugg].sort((a, b) => (a.visitado - b.visitado) || (b.votos - a.votos))
  if (catFilter !== "todas") visSugg = visSugg.filter(s => s.categoria === catFilter)
  if (q) visSugg = visSugg.filter(s =>
    s.nome.toLowerCase().includes(q) ||
    s.quem.toLowerCase().includes(q) ||
    (s.cidadeId && s.cidadeId.includes(q))
  )
  const cats = ["todas", ...Array.from(new Set(sugg.map(s => s.categoria)))]
  const stays = []
  cidades.forEach(c => c.stays.forEach(s => stays.push({ ...s, cidade: c.nome })))

  return (
    <div className="scroll">
      {q && (
        <div className="block" style={{ padding: "14px 18px", background: "rgba(26,75,110,.05)" }}>
          <span className="mono" style={{ fontSize: ".8rem" }}>Mostrando resultados para "{query}".</span>
        </div>
      )}

      <section className="block">
        <SectionHead num="01" title="Próxima parada" />
        <NextStop onOpenCity={onOpenCity} onMap={onMap} />
      </section>

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
          {stays
            .filter(s => !q || s.hotel.toLowerCase().includes(q) || s.cidade.toLowerCase().includes(q))
            .map((s, i) => (
              <HotelCard key={i} stay={s} cidade={s.cidade} variant={cardStyle} onMaps={onMap}
                rating={ratings["hotel:" + s.hotel]}
                onRate={(v) => rate("hotel:" + s.hotel, v)}
              />
            ))
          }
        </div>
      </section>

      <section className="block" id="sec-sugestoes">
        <SectionHead num="05" title="Sugestões da família" />
        <p className="muted" style={{ margin: "-6px 0 14px", fontSize: ".9rem" }}>
          Mais votadas pela família — vote e avalie depois da visita.
        </p>
        <div className="chips" style={{ marginBottom: 16, overflowX: "auto", flexWrap: "nowrap", paddingBottom: 4 }}>
          {cats.map(c => (
            <button key={c} className="chip" aria-pressed={catFilter === c} onClick={() => setCatFilter(c)}
              style={{ textTransform: c === "todas" ? "uppercase" : "none", letterSpacing: c === "todas" ? ".06em" : 0 }}>
              {c}
            </button>
          ))}
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
