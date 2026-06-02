import Icon from './Icon'
import RoadBlock from './RoadBlock'
import { dias as allDias, fmtDia, fmtMes, SEM } from '../data/data'

function DayDot({ tipo }) {
  const map = { partida: "plane", estrada: "car", cidade: "pin", retorno: "home" }
  const color = tipo === "estrada" ? "var(--solar-deep)" : (tipo === "cidade" ? "var(--ocean)" : "var(--olive)")
  return (
    <span style={{
      width: 34, height: 34, borderRadius: "50%", border: "1.6px solid var(--line)",
      background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center",
      color, flex: "none",
    }}>
      <Icon name={map[tipo] || "pin"} size={17} stroke={1.8} />
    </span>
  )
}

function DateTab({ d, accent }) {
  return (
    <div style={{ textAlign: "center", lineHeight: 1, flex: "none", width: 46 }}>
      <div className="mono" style={{ fontSize: "1.5rem", fontWeight: 500, color: accent ? "var(--solar-deep)" : "var(--ocean)" }}>
        {fmtDia(d.data)}
      </div>
      <div className="mono" style={{ fontSize: ".64rem", textTransform: "uppercase", letterSpacing: ".1em", color: "var(--ocean-soft)" }}>
        {fmtMes(d.data)}
      </div>
    </div>
  )
}

function DiaLabel({ d }) {
  return (
    <span className="mono" style={{ fontSize: ".66rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ocean-soft)", whiteSpace: "nowrap" }}>
      Dia {String(d.dia).padStart(2, "0")} · {SEM[d.semana]}
    </span>
  )
}

export default function Timeline({ style = "compacto", onOpenCity, query }) {
  let dias = allDias
  if (query) {
    const q = query.toLowerCase()
    dias = dias.filter(d =>
      (d.cidadeNoite || "").toLowerCase().includes(q) ||
      (d.hotel || "").toLowerCase().includes(q) ||
      (d.estrada && (d.estrada.origem.toLowerCase().includes(q) || d.estrada.destino.toLowerCase().includes(q)))
    )
  }
  if (!dias.length) return <p className="muted">Nenhum dia encontrado para "{query}".</p>

  const clickable = (d) => d.cidadeId ? () => onOpenCity(d.cidadeId) : undefined

  /* ---- COMPACTO ---- */
  if (style === "compacto") {
    return (
      <div className="card" style={{ overflow: "hidden" }}>
        {dias.map((d, i) => {
          const road = d.tipo === "estrada"
          return (
            <div key={d.dia} onClick={clickable(d)} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 14px", borderTop: i ? "1.5px solid var(--line)" : "none",
              cursor: d.cidadeId ? "pointer" : "default",
              background: road ? "rgba(217,90,43,.05)" : "transparent",
            }}>
              <DateTab d={d} accent={road} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <DayDot tipo={d.tipo} />
                  <b style={{ color: road ? "var(--solar-deep)" : "var(--ocean)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {d.cidadeNoite}
                  </b>
                </div>
                {road && (
                  <div className="mono" style={{ fontSize: ".78rem", color: "var(--solar-deep)", marginTop: 5, paddingLeft: 41 }}>
                    {d.estrada.km} km · {d.estrada.tempo}
                  </div>
                )}
                {!road && d.hotel && (
                  <div className="muted" style={{ fontSize: ".82rem", marginTop: 4, paddingLeft: 41, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {d.hotel}
                  </div>
                )}
              </div>
              {d.cidadeId && <Icon name="chevron" size={18} style={{ color: "var(--ocean-soft)" }} />}
            </div>
          )
        })}
      </div>
    )
  }

  /* ---- BILHETE ---- */
  if (style === "bilhete") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {dias.map(d => {
          const road = d.tipo === "estrada"
          return (
            <div key={d.dia} className="card" onClick={clickable(d)} style={{
              overflow: "hidden", cursor: d.cidadeId ? "pointer" : "default",
              borderColor: road ? "var(--solar-deep)" : "var(--line)",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                borderBottom: "1.5px solid var(--line)",
                background: road ? "rgba(217,90,43,.06)" : "var(--sand)",
              }}>
                <DateTab d={d} accent={road} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <DiaLabel d={d} />
                  <div className="title" style={{ fontSize: "1.35rem", color: road ? "var(--solar-deep)" : "var(--ocean)" }}>
                    {d.cidadeNoite}
                  </div>
                </div>
                {d.cidadeId && <Icon name="chevron" size={20} style={{ color: "var(--ocean-soft)" }} />}
              </div>
              <div style={{ padding: "12px 14px" }}>
                {road
                  ? <RoadBlock e={d.estrada} variant="bilhete" />
                  : d.hotel
                    ? <div style={{ display: "flex", alignItems: "center", gap: 9 }}><Icon name="bed" size={18} /><span className="muted">{d.hotel}</span></div>
                    : <div style={{ display: "flex", alignItems: "center", gap: 9 }}><Icon name={d.tipo === "partida" ? "plane" : "home"} size={18} /><span className="muted">{d.nota}</span></div>
                }
                {road && d.nota && <p className="muted" style={{ margin: "10px 0 0", fontSize: ".88rem" }}>{d.nota}</p>}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  /* ---- LINHA (padrão) ---- */
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: 16, top: 18, bottom: 18, width: 1.5, background: "var(--line)", opacity: .4 }}></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {dias.map(d => {
          const road = d.tipo === "estrada"
          return (
            <div key={d.dia} style={{ display: "flex", gap: 14, position: "relative" }}>
              <DayDot tipo={d.tipo} />
              <div style={{ flex: 1, minWidth: 0, paddingTop: 1 }}>
                <div style={{ marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  <span className="mono" style={{ fontSize: ".64rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ocean-soft)" }}>
                    Dia {String(d.dia).padStart(2, "0")} · {SEM[d.semana]} · {fmtDia(d.data)} {fmtMes(d.data)}
                  </span>
                </div>
                <div onClick={clickable(d)} style={{ cursor: d.cidadeId ? "pointer" : "default", display: "flex", alignItems: "center", gap: 8 }}>
                  <h3 className="title" style={{ fontSize: "1.4rem", color: road ? "var(--solar-deep)" : "var(--ocean)" }}>{d.cidadeNoite}</h3>
                  {d.cidadeId && <Icon name="chevron" size={18} style={{ color: "var(--ocean-soft)" }} />}
                </div>
                {road
                  ? <RoadBlock e={d.estrada} />
                  : d.hotel
                    ? <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}><Icon name="bed" size={17} style={{ color: "var(--ocean-soft)" }} /><span className="muted" style={{ fontSize: ".9rem" }}>{d.hotel}</span></div>
                    : <p className="muted" style={{ margin: "6px 0 0", fontSize: ".9rem", display: "flex", gap: 8, alignItems: "center" }}><Icon name={d.tipo === "partida" ? "plane" : "home"} size={17} />{d.nota}</p>
                }
                {road && d.nota && <p className="muted" style={{ margin: "8px 0 0", fontSize: ".86rem" }}>{d.nota}</p>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
