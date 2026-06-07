import Icon from './Icon'
import Stars from './Stars'
import { cidadePorId } from '../data/data'

export default function SuggestionCard({ s, onVote, onRate, rating, onEdit, onDelete, onVisited }) {
  const cidade = cidadePorId[s.cidadeId]
  const v = s.visitado
  return (
    <div className="card" style={{
      padding: "15px 16px",
      background: v ? "var(--sand)" : "var(--surface)",
      filter: v ? "grayscale(.4)" : "none",
      opacity: v ? .72 : 1,
      transition: "opacity .2s, filter .2s",
    }}>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="chips" style={{ marginBottom: 7 }}>
            {v && (
              <span className="chip chip--cat" style={{ color: "var(--olive)", borderColor: "var(--olive)", background: "rgba(70,85,42,.12)", textTransform: "uppercase", letterSpacing: ".06em" }}>
                <Icon name="check" size={13} stroke={2.4} />&nbsp;Visitado
              </span>
            )}
            <span className="chip chip--cat">{s.categoria}</span>
            <span className="chip chip--cat" style={{ color: "var(--ocean)", borderColor: "var(--ocean)" }}>{cidade ? cidade.nome : ""}</span>
            {s.periodo && s.periodo !== "Qualquer hora" && (
              <span className="chip chip--cat">{s.periodo}</span>
            )}
            {s.reservar && (
              <span className="chip chip--cat" style={{ color: "var(--solar-deep)", borderColor: "var(--solar-deep)", background: "rgba(180,90,20,.08)" }}>
                Reserva necessária
              </span>
            )}
          </div>
          <h3 className="title" style={{ fontSize: "1.3rem", lineHeight: 1.12 }}>{s.nome}</h3>
        </div>
        <button onClick={() => onVote(s.id)} aria-pressed={s.voted} style={{
          flex: "none", width: 62, border: "1.6px solid var(--line)", borderRadius: 10,
          background: s.voted ? "var(--accent)" : "var(--surface)",
          color: s.voted ? "#fff" : "var(--ocean)", padding: "8px 0", cursor: "pointer", textAlign: "center",
        }}>
          <Icon name="thumb" size={20} />
          <div className="mono" style={{ fontSize: "1rem", fontWeight: 500, marginTop: 2 }}>{s.votos}</div>
        </button>
      </div>
      {s.motivo && <p className="muted" style={{ margin: "10px 0 0", fontSize: ".9rem" }}>"{s.motivo}"</p>}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 11, gap: 10, flexWrap: "wrap" }}>
        <span className="mono" style={{ fontSize: ".72rem", letterSpacing: ".05em", textTransform: "uppercase", color: "var(--ocean-soft)", lineHeight: 1.4 }}>
          sugerido por {s.quem}
        </span>
        {s.link && (
          <a className="btn btn--sm btn--ghost" href={s.link} target="_blank" rel="noopener noreferrer" style={{ width: "auto", whiteSpace: "nowrap", flex: "none" }}>
            <Icon name="external" size={16} /> Abrir link
          </a>
        )}
      </div>
      {onRate && (
        <div style={{ marginTop: 10, paddingTop: 11, borderTop: "1.5px solid var(--line)", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span className="eyebrow" style={{ whiteSpace: "nowrap" }}>toque para avaliar</span>
          <Stars value={rating || 0} onRate={(v2) => onRate(s.id, v2)} size={26} />
        </div>
      )}
      {(onVisited || onEdit || onDelete) && (
        <div style={{ marginTop: 11, paddingTop: 11, borderTop: "1.5px solid var(--line)", display: "flex", gap: 9, flexWrap: "wrap" }}>
          {onVisited && (
            <button className={v ? "cardact cardact--done" : "cardact"} onClick={() => onVisited(s.id)} aria-pressed={v}>
              <Icon name="check" size={16} stroke={2.2} /> {v ? "Visitado" : "Marcar visitado"}
            </button>
          )}
          {onEdit && (
            <button className="cardact" onClick={() => onEdit(s)}>
              <Icon name="sheet" size={16} /> Editar
            </button>
          )}
          {onDelete && (
            <button className="cardact cardact--danger" onClick={() => onDelete(s.id)}>
              <Icon name="close" size={16} /> Excluir
            </button>
          )}
        </div>
      )}
    </div>
  )
}
