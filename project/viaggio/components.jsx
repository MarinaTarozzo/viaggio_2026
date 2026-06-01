/* VIAGGIO — componentes compartilhados */
const { useState } = React;
const D = window.VIAGGIO;

/* ---------- helpers ---------- */
const MESES = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
const SEM = { "segunda":"seg","terça":"ter","quarta":"qua","quinta":"qui","sexta":"sex","sábado":"sáb","domingo":"dom" };
function parseISO(iso){ const [y,m,d]=iso.split("-").map(Number); return new Date(y,m-1,d); }
function fmtDia(iso){ const dt=parseISO(iso); return dt.getDate(); }
function fmtMes(iso){ const dt=parseISO(iso); return MESES[dt.getMonth()]; }
function diasAte(iso){ const hoje=new Date(); hoje.setHours(0,0,0,0); const alvo=parseISO(iso); return Math.round((alvo-hoje)/86400000); }

/* ---------- estrelas ---------- */
function Stars({ value=0, count, onRate, size=22, showVal=false }){
  const [hover,setHover]=useState(0);
  const full=Math.round(hover||value);
  return (
    <span className="stars" role={onRate?"group":"img"} aria-label={`Avaliação ${value} de 5`}>
      {[1,2,3,4,5].map(i=>(
        onRate ? (
          <button key={i} onClick={()=>onRate(i)} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(0)}
            aria-label={`Dar ${i} estrela${i>1?"s":""}`}>
            <Icon name="star" size={size} fill={i<=full} className={i<=full?"":"empty"} style={i<=full?{}:{opacity:.3}} />
          </button>
        ) : (
          <Icon key={i} name="star" size={size} fill={i<=full} style={i<=full?{}:{opacity:.3}} />
        )
      ))}
      {showVal && <span className="rating-val">{value.toFixed(1)}{count?` · ${count}`:""}</span>}
    </span>
  );
}

/* ---------- status de pagamento ---------- */
function StatusBadge({ status }){
  if(status==="pago") return <span className="status status--pago"><Icon name="check" size={14} stroke={2.2}/>Pago</span>;
  return <span className="status status--verificar"><Icon name="clock" size={14} stroke={2}/>Na chegada</span>;
}

/* ---------- placeholder de foto (sem inventar imagem) ---------- */
function Photo({ label, h=130, tone="ocean" }){
  const bg = tone==="ocean" ? "rgba(26,75,110,.10)" : "rgba(70,85,42,.12)";
  const stripe = tone==="ocean" ? "rgba(26,75,110,.16)" : "rgba(70,85,42,.18)";
  return (
    <div style={{
      height:h, borderBottom:"1.5px solid var(--line)", position:"relative", overflow:"hidden",
      background:`repeating-linear-gradient(135deg, ${stripe} 0 1.5px, ${bg} 1.5px 13px)`,
      display:"flex", alignItems:"flex-end", padding:"10px 12px"
    }}>
      <span className="mono" style={{ fontSize:".66rem", letterSpacing:".08em", textTransform:"uppercase",
        color:"var(--ocean)", background:"var(--sand)", border:"1.4px solid var(--line)", padding:"3px 8px", borderRadius:4,
        whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:"calc(100% - 4px)" }}>
        foto · {label}
      </span>
    </div>
  );
}

/* ---------- cabeçalho de seção ---------- */
function SectionHead({ num, title, action }){
  return (
    <div className="sec-head">
      {num && <span className="sec-num">{num}</span>}
      <h2 className="sec-title">{title}</h2>
      <span className="sec-rule"></span>
      {action}
    </div>
  );
}

/* ---------- PRÓXIMA PARADA (hero) ---------- */
function NextStop({ onOpen, onMap }){
  const cid = D.cidadePorId["milao"];
  const falta = diasAte("2026-06-29");
  const stay = cid.stays[0];
  return (
    <div className="card" style={{ overflow:"hidden", borderWidth:2 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"12px 16px", borderBottom:"1.5px solid var(--line)", background:"var(--ocean)", color:"var(--sand)" }}>
        <span className="eyebrow" style={{ color:"var(--sand)", opacity:.85, letterSpacing:".12em", whiteSpace:"nowrap" }}>Próxima parada</span>
        <span className="mono" style={{ fontSize:".72rem", letterSpacing:".04em", whiteSpace:"nowrap" }}>
          {falta>0 ? `faltam ${falta} dias` : "em viagem"}
        </span>
      </div>
      <Photo label="Milão" h={120} />
      <div style={{ padding:"18px 16px 16px" }}>
        <div className="flag-line" style={{ marginBottom:6 }}>
          <Icon name="pin" size={16} /><span className="mono" style={{ fontSize:".68rem", letterSpacing:".06em", textTransform:"uppercase", whiteSpace:"nowrap" }}>Itália · 1ª cidade</span>
        </div>
        <h2 className="title" style={{ fontSize:"2.5rem", marginBottom:4 }}>Milão</h2>
        <p className="muted" style={{ margin:"0 0 16px", fontSize:".96rem" }}>
          Chegada em <b className="mono">30 jun</b> por voo de São Paulo. Sem estrada no primeiro dia.
        </p>

        <div className="card" style={{ background:"var(--sand)", padding:"12px 14px", marginBottom:14, borderRadius:6 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
            <Icon name="bed" size={20} />
            <b style={{ flex:1 }}>{stay.hotel}</b>
            <StatusBadge status={stay.status} />
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <Icon name="calendar" size={20} />
            <span className="muted" style={{ fontSize:".92rem" }}>{stay.periodo} · 2 noites</span>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:10 }}>
          <button className="btn btn--solid" onClick={onOpen}>Ver detalhes <Icon name="arrow" size={20} stroke={2}/></button>
          <button className="btn" style={{ width:"auto", paddingInline:18 }} onClick={onMap} aria-label="Abrir mapa"><Icon name="map" size={20}/></button>
        </div>
      </div>
    </div>
  );
}

/* ---------- MAPA ---------- */
function MapSection(){
  const src = "https://www.google.com/maps?q=Liubliana%2C%20Eslov%C3%AAnia&z=6&output=embed";
  return (
    <div className="card" style={{ overflow:"hidden" }}>
      <div style={{ position:"relative" }}>
        <iframe title="Mapa da viagem" src={src} loading="lazy"
          style={{ width:"100%", height:220, border:"none", display:"block", filter:"saturate(.92)" }}
          referrerPolicy="no-referrer-when-downgrade"></iframe>
        <div className="mono" style={{ position:"absolute", top:10, left:10, background:"var(--sand)",
          border:"1.4px solid var(--line)", borderRadius:4, padding:"4px 9px", fontSize:".66rem",
          letterSpacing:".1em", textTransform:"uppercase", whiteSpace:"nowrap" }}>7 cidades · 4 países</div>
      </div>
      <div style={{ padding:14, borderTop:"1.5px solid var(--line)" }}>
        <a className="btn btn--solid" href={D.MAPA_URL} target="_blank" rel="noopener">
          <Icon name="map" size={20}/> Abrir no Google Maps <Icon name="external" size={18}/>
        </a>
      </div>
    </div>
  );
}

/* ---------- ESTRADA (bloco destacado) ---------- */
function RoadBlock({ e, variant="linha" }){
  return (
    <div className="perf" style={{
      border:"1.5px dashed var(--solar-deep)", borderRadius:8, background:"rgba(217,90,43,.06)",
      padding:"13px 16px", margin: variant==="bilhete" ? "0" : "10px 0 0",
    }}>
      <div className="flag-line" style={{ color:"var(--solar-deep)", marginBottom:9 }}>
        <Icon name="car" size={18} stroke={1.8}/>
        <span className="mono" style={{ fontSize:".7rem", letterSpacing:".1em", textTransform:"uppercase", fontWeight:500, whiteSpace:"nowrap" }}>Hoje tem estrada</span>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:8, fontWeight:600, fontSize:"1.05rem", marginBottom:10 }}>
        <span>{e.origem}</span>
        <Icon name="arrow" size={18} stroke={2} style={{ color:"var(--solar-deep)" }}/>
        <span>{e.destino}</span>
      </div>
      <div style={{ display:"flex", gap:0, borderTop:"1.4px solid rgba(217,90,43,.4)" }}>
        <div style={{ flex:1, paddingTop:8 }}>
          <div className="mono" style={{ fontSize:"1.4rem", color:"var(--solar-deep)", fontWeight:500 }}>{e.km}<span style={{ fontSize:".8rem" }}> km</span></div>
          <div className="eyebrow">distância</div>
        </div>
        <div style={{ width:1.4, background:"rgba(217,90,43,.4)" }}></div>
        <div style={{ flex:1, paddingTop:8, paddingLeft:14 }}>
          <div className="mono" style={{ fontSize:"1.4rem", color:"var(--solar-deep)", fontWeight:500 }}>{e.tempo}</div>
          <div className="eyebrow">tempo previsto</div>
        </div>
      </div>
    </div>
  );
}

window.VG = Object.assign(window.VG||{}, {
  Stars, StatusBadge, Photo, SectionHead, NextStop, MapSection, RoadBlock,
  fmtDia, fmtMes, diasAte, parseISO, MESES, SEM,
});
