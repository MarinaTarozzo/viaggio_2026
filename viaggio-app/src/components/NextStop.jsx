import Icon from './Icon'
import StatusBadge from './StatusBadge'
import Photo from './Photo'
import RoadBlock from './RoadBlock'
import { CITY_PHOTOS, getNextStop, cidadePorId } from '../data/data'

export default function NextStop({ onOpenCity, onMap }) {
  const stop = getNextStop()

  /* ---- Viagem concluída ---- */
  if (stop.type === 'done') {
    return (
      <div className="card" style={{ padding: "24px 18px", textAlign: "center" }}>
        <Icon name="flag" size={32} style={{ color: "var(--accent)" }} />
        <h2 className="title" style={{ fontSize: "2rem", marginTop: 10 }}>Viagem concluída!</h2>
        <p className="muted" style={{ margin: "8px 0 0" }}>Que saudade da Europa. Até a próxima viagem!</p>
      </div>
    )
  }

  /* ---- Dia de retorno ---- */
  if (stop.type === 'retorno') {
    return (
      <div className="card" style={{ overflow: "hidden", borderWidth: 2 }}>
        <div style={{ padding: "12px 16px", background: "var(--olive)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="eyebrow" style={{ color: "rgba(255,255,255,.85)", letterSpacing: ".12em" }}>Hoje é o dia</span>
          <span className="mono" style={{ fontSize: ".72rem", color: "#fff" }}>de volta para casa</span>
        </div>
        <div style={{ padding: "18px 16px" }}>
          <Icon name="plane" size={32} style={{ color: "var(--olive)", transform: "scaleX(-1)" }} />
          <h2 className="title" style={{ fontSize: "2rem", marginTop: 6 }}>Volta para o Brasil</h2>
          <p className="muted" style={{ margin: "8px 0 0" }}>{stop.dia.nota}</p>
        </div>
      </div>
    )
  }

  /* ---- Dia de partida ---- */
  if (stop.type === 'partida') {
    return (
      <div className="card" style={{ overflow: "hidden", borderWidth: 2 }}>
        <div style={{ padding: "12px 16px", background: "var(--ocean)", color: "var(--sand)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="eyebrow" style={{ color: "var(--sand)", opacity: .85, letterSpacing: ".12em" }}>Hoje é o dia</span>
          <span className="mono" style={{ fontSize: ".72rem", color: "var(--sand)" }}>embarque!</span>
        </div>
        <div style={{ padding: "18px 16px" }}>
          <Icon name="plane" size={32} style={{ color: "var(--ocean)" }} />
          <h2 className="title" style={{ fontSize: "2rem", marginTop: 6 }}>Partida para a Europa</h2>
          <p className="muted" style={{ margin: "8px 0 0" }}>{stop.dia.nota}</p>
        </div>
      </div>
    )
  }

  /* ---- Antes da viagem (pre) ou dia de cidade / estrada ---- */
  const cidade = stop.cidade
  if (!cidade) return null
  const photoSrc = CITY_PHOTOS[cidade.id]
  const stay = stop.dia ? cidade.stays.find(s => s.periodo === stop.dia.hotel || stop.dia.hotel?.startsWith(s.hotel.split(' ')[0])) || cidade.stays[0] : cidade.stays[0]
  const isPre = stop.type === 'pre'
  const isEstrada = stop.type === 'estrada'

  return (
    <div className="card" style={{ overflow: "hidden", borderWidth: 2 }}>
      {/* dark header bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 16px", borderBottom: "1.5px solid var(--line)",
        background: isEstrada ? "rgba(217,90,43,.12)" : "var(--ocean)",
        color: isEstrada ? "var(--solar-deep)" : "var(--sand)",
      }}>
        <span className="eyebrow" style={{ color: isEstrada ? "var(--solar-deep)" : "rgba(247,234,211,.85)", letterSpacing: ".12em", whiteSpace: "nowrap" }}>
          {stop.label}
        </span>
        <span className="mono" style={{ fontSize: ".72rem", whiteSpace: "nowrap", color: isEstrada ? "var(--solar-deep)" : "rgba(247,234,211,.9)" }}>
          {isPre ? `faltam ${stop.faltam} dia${stop.faltam !== 1 ? 's' : ''}` : `dia ${stop.dia?.dia} de ${stop.dia?.semana}`}
        </span>
      </div>

      <Photo label={cidade.nome} h={140} src={photoSrc} />

      <div style={{ padding: "18px 16px 16px" }}>
        <div className="flag-line" style={{ marginBottom: 6 }}>
          <Icon name="pin" size={16} />
          <span className="mono" style={{ fontSize: ".68rem", letterSpacing: ".06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            {cidade.pais}{isPre ? ' · 1ª cidade' : ''}
          </span>
        </div>
        <h2 className="title" style={{ fontSize: "2.4rem", marginBottom: 4 }}>{cidade.nome}</h2>

        {isEstrada && stop.dia?.estrada && (
          <div style={{ marginBottom: 14 }}>
            <RoadBlock e={stop.dia.estrada} />
            {stop.dia.nota && <p className="muted" style={{ margin: "8px 0 0", fontSize: ".88rem" }}>{stop.dia.nota}</p>}
          </div>
        )}

        {isPre && (
          <p className="muted" style={{ margin: "0 0 16px", fontSize: ".96rem" }}>
            Chegada em <b className="mono">30 jun</b> por voo de São Paulo. Sem estrada no primeiro dia.
          </p>
        )}

        {!isEstrada && stay && (
          <div className="card" style={{ background: "var(--sand)", padding: "12px 14px", marginBottom: 14, borderRadius: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <Icon name="bed" size={20} />
              <b style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{stay.hotel}</b>
              <StatusBadge status={stay.status} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Icon name="calendar" size={20} />
              <span className="muted" style={{ fontSize: ".9rem" }}>{stay.periodo}</span>
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 10 }}>
          <button className="btn btn--solid" onClick={() => onOpenCity(cidade.id)}>
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
