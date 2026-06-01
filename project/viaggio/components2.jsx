/* VIAGGIO — timeline, cards de cidade/hotel, sugestões, links */
const { useState: useState2 } = React;
const DD = window.VIAGGIO;
const VG = window.VG;

/* ============ TIMELINE ============ */
function DayDot({ tipo }){
  const map = { partida:"plane", estrada:"car", cidade:"pin", retorno:"home" };
  const color = tipo==="estrada" ? "var(--solar-deep)" : (tipo==="cidade" ? "var(--ocean)" : "var(--olive)");
  return (
    <span style={{ width:34, height:34, borderRadius:"50%", border:"1.6px solid var(--line)",
      background:"var(--surface)", display:"flex", alignItems:"center", justifyContent:"center", color, flex:"none" }}>
      <Icon name={map[tipo]||"pin"} size={17} stroke={1.8}/>
    </span>
  );
}

function DateTab({ d, accent }){
  return (
    <div style={{ textAlign:"center", lineHeight:1, flex:"none", width:46 }}>
      <div className="mono" style={{ fontSize:"1.5rem", fontWeight:500, color: accent?"var(--solar-deep)":"var(--ocean)" }}>{VG.fmtDia(d.data)}</div>
      <div className="mono" style={{ fontSize:".64rem", textTransform:"uppercase", letterSpacing:".1em", color:"var(--ocean-soft)" }}>{VG.fmtMes(d.data)}</div>
    </div>
  );
}

function Timeline({ style, onOpenCity, query }){
  let dias = DD.dias;
  if(query){
    const q=query.toLowerCase();
    dias = dias.filter(d => (d.cidadeNoite||"").toLowerCase().includes(q) || (d.hotel||"").toLowerCase().includes(q)
      || (d.estrada && (d.estrada.origem.toLowerCase().includes(q)||d.estrada.destino.toLowerCase().includes(q))));
  }
  if(!dias.length) return <p className="muted">Nenhum dia encontrado para “{query}”.</p>;

  const clickable = (d)=> d.cidadeId ? ()=>onOpenCity(d.cidadeId) : undefined;
  const DiaLabel = ({d}) => (
    <span className="mono" style={{ fontSize:".66rem", letterSpacing:".1em", textTransform:"uppercase", color:"var(--ocean-soft)", whiteSpace:"nowrap" }}>
      Dia {String(d.dia).padStart(2,"0")} · {VG.SEM[d.semana]}
    </span>
  );

  /* ---- variante BILHETE ---- */
  if(style==="bilhete"){
    return (
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {dias.map(d=>{
          const road = d.tipo==="estrada";
          return (
            <div key={d.dia} className="card" onClick={clickable(d)}
              style={{ overflow:"hidden", cursor:d.cidadeId?"pointer":"default", borderColor: road?"var(--solar-deep)":"var(--line)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px",
                borderBottom:"1.5px solid var(--line)", background: road?"rgba(217,90,43,.06)":"var(--sand)" }}>
                <DateTab d={d} accent={road}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <DiaLabel d={d}/>
                  <div className="title" style={{ fontSize:"1.35rem", color: road?"var(--solar-deep)":"var(--ocean)" }}>{d.cidadeNoite}</div>
                </div>
                {d.cidadeId && <Icon name="chevron" size={20} style={{ color:"var(--ocean-soft)" }}/>}
              </div>
              <div style={{ padding:"12px 14px" }}>
                {road ? <VG.RoadBlock e={d.estrada} variant="bilhete"/> :
                  d.hotel ? <div style={{ display:"flex", alignItems:"center", gap:9 }}><Icon name="bed" size={18}/><span className="muted">{d.hotel}</span></div> :
                  <div style={{ display:"flex", alignItems:"center", gap:9 }}><Icon name={d.tipo==="partida"?"plane":"home"} size={18}/><span className="muted">{d.nota}</span></div>}
                {road && d.nota && <p className="muted" style={{ margin:"10px 0 0", fontSize:".88rem" }}>{d.nota}</p>}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  /* ---- variante COMPACTO ---- */
  if(style==="compacto"){
    return (
      <div className="card" style={{ overflow:"hidden" }}>
        {dias.map((d,i)=>{
          const road=d.tipo==="estrada";
          return (
            <div key={d.dia} onClick={clickable(d)} style={{ display:"flex", alignItems:"center", gap:12,
              padding:"12px 14px", borderTop: i? "1.5px solid var(--line)":"none",
              cursor:d.cidadeId?"pointer":"default", background: road?"rgba(217,90,43,.05)":"transparent" }}>
              <DateTab d={d} accent={road}/>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <DayDot tipo={d.tipo}/>
                  <b style={{ color: road?"var(--solar-deep)":"var(--ocean)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{d.cidadeNoite}</b>
                </div>
                {road && <div className="mono" style={{ fontSize:".78rem", color:"var(--solar-deep)", marginTop:5, paddingLeft:41 }}>{d.estrada.km} km · {d.estrada.tempo}</div>}
                {!road && d.hotel && <div className="muted" style={{ fontSize:".82rem", marginTop:4, paddingLeft:41, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{d.hotel}</div>}
              </div>
              {d.cidadeId && <Icon name="chevron" size={18} style={{ color:"var(--ocean-soft)" }}/>}
            </div>
          );
        })}
      </div>
    );
  }

  /* ---- variante LINHA (padrão) ---- */
  return (
    <div style={{ position:"relative" }}>
      <div style={{ position:"absolute", left:16, top:18, bottom:18, width:1.5, background:"var(--line)", opacity:.4 }}></div>
      <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
        {dias.map(d=>{
          const road=d.tipo==="estrada";
          return (
            <div key={d.dia} style={{ display:"flex", gap:14, position:"relative" }}>
              <DayDot tipo={d.tipo}/>
              <div style={{ flex:1, minWidth:0, paddingTop:1 }}>
                <div style={{ marginBottom:4, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                  <span className="mono" style={{ fontSize:".64rem", letterSpacing:".1em", textTransform:"uppercase", color:"var(--ocean-soft)" }}>
                    Dia {String(d.dia).padStart(2,"0")} · {VG.SEM[d.semana]} · {VG.fmtDia(d.data)} {VG.fmtMes(d.data)}
                  </span>
                </div>
                <div onClick={clickable(d)} style={{ cursor:d.cidadeId?"pointer":"default", display:"flex", alignItems:"center", gap:8 }}>
                  <h3 className="title" style={{ fontSize:"1.4rem", color: road?"var(--solar-deep)":"var(--ocean)" }}>{d.cidadeNoite}</h3>
                  {d.cidadeId && <Icon name="chevron" size={18} style={{ color:"var(--ocean-soft)" }}/>}
                </div>
                {road ? <VG.RoadBlock e={d.estrada}/> :
                  d.hotel ? <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:6 }}><Icon name="bed" size={17} style={{ color:"var(--ocean-soft)" }}/><span className="muted" style={{ fontSize:".9rem" }}>{d.hotel}</span></div> :
                  <p className="muted" style={{ margin:"6px 0 0", fontSize:".9rem", display:"flex", gap:8, alignItems:"center" }}><Icon name={d.tipo==="partida"?"plane":"home"} size={17}/>{d.nota}</p>}
                {road && d.nota && <p className="muted" style={{ margin:"8px 0 0", fontSize:".86rem" }}>{d.nota}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============ HOTEL CARD (3 variantes) ============ */
function HotelCard({ stay, cidade, variant="editorial", onMaps, rating, onRate }){
  const Buttons = (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9, marginTop:13 }}>
      <a className="btn btn--solid btn--sm" href={stay.link} target="_blank" rel="noopener" style={{ width:"auto" }}>
        <Icon name="external" size={17}/> Abrir reserva
      </a>
      <button className="btn btn--sm" style={{ width:"auto" }} onClick={onMaps}><Icon name="pin" size={17}/> Mapa</button>
    </div>
  );
  const Meta = (
    <>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:10 }}>
        <Icon name="calendar" size={17} style={{ color:"var(--ocean-soft)", flex:"none" }}/><span className="muted" style={{ fontSize:".9rem", whiteSpace:"nowrap" }}>{stay.periodo}</span>
      </div>
      <div style={{ display:"flex", alignItems:"flex-start", gap:8, marginTop:7 }}>
        <Icon name="pin" size={17} style={{ color:"var(--ocean-soft)", flex:"none", marginTop:2 }}/><span className="muted" style={{ fontSize:".9rem", lineHeight:1.35 }}>{stay.endereco}</span>
      </div>
      {stay.obs && <p className="muted" style={{ fontSize:".84rem", margin:"8px 0 0", fontStyle:"italic", lineHeight:1.4 }}>{stay.obs}</p>}
    </>
  );

  if(variant==="linhas"){
    return (
      <div className="card" style={{ padding:"15px 16px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
          <div style={{ minWidth:0 }}>
            <div className="eyebrow" style={{ marginBottom:3 }}>Hotel{cidade?` · ${cidade}`:""}</div>
            <h3 className="title" style={{ fontSize:"1.3rem", lineHeight:1.1 }}>{stay.hotel}</h3>
          </div>
          <VG.StatusBadge status={stay.status}/>
        </div>
        {Meta}
        {onRate!=null && <div style={{ marginTop:10 }}><VG.Stars value={rating||0} onRate={onRate} size={24}/></div>}
        {Buttons}
      </div>
    );
  }

  if(variant==="postal"){
    return (
      <div className="card" style={{ overflow:"hidden", position:"relative", borderWidth:1.5 }}>
        <div style={{ position:"absolute", top:10, right:10, zIndex:2 }}><VG.StatusBadge status={stay.status}/></div>
        <div style={{ display:"flex" }}>
          <div style={{ width:108, flex:"none", borderRight:"1.5px dashed var(--line)" }}>
            <VG.Photo label={cidade||"hotel"} h={"100%"} tone="olive"/>
          </div>
          <div style={{ padding:"14px 15px", minWidth:0 }}>
            <div className="eyebrow" style={{ marginBottom:3 }}>Hotel reservado</div>
            <h3 className="title" style={{ fontSize:"1.25rem", lineHeight:1.1 }}>{stay.hotel}</h3>
            {Meta}
          </div>
        </div>
        <div style={{ padding:"0 15px 15px" }}>
          {onRate!=null && <div style={{ margin:"12px 0 2px" }}><VG.Stars value={rating||0} onRate={onRate} size={24}/></div>}
          {Buttons}
        </div>
      </div>
    );
  }

  /* editorial (padrão) */
  return (
    <div className="card" style={{ overflow:"hidden" }}>
      <VG.Photo label={`${stay.hotel}`} h={120} tone="olive"/>
      <div style={{ padding:"15px 16px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10, marginBottom:2 }}>
          <div className="eyebrow">Hotel{cidade?` · ${cidade}`:""}</div>
          <VG.StatusBadge status={stay.status}/>
        </div>
        <h3 className="title" style={{ fontSize:"1.4rem", lineHeight:1.1 }}>{stay.hotel}</h3>
        {Meta}
        {onRate!=null && <div style={{ marginTop:12 }}><VG.Stars value={rating||0} onRate={onRate} size={26}/></div>}
        {Buttons}
      </div>
    </div>
  );
}

/* ============ CITY CARD (hero do detalhe, 3 variantes) ============ */
function CityHero({ cidade, variant="editorial", rating, onRate }){
  const Info = (
    <>
      <div className="flag-line" style={{ marginBottom:6, flexWrap:"nowrap", whiteSpace:"nowrap" }}>
        <Icon name="pin" size={16}/><span className="mono" style={{ fontSize:".72rem", letterSpacing:".1em", textTransform:"uppercase" }}>{cidade.pais}</span>
        <span style={{ opacity:.4 }}>·</span><span className="mono" style={{ fontSize:".72rem", whiteSpace:"nowrap" }}>{cidade.noites} noite{cidade.noites>1?"s":""}</span>
      </div>
      <h1 className="title" style={{ fontSize:"2.7rem", marginBottom:6 }}>{cidade.nome}</h1>
      <div className="mono" style={{ fontSize:".84rem", color:"var(--solar-deep)", marginBottom:10 }}>{cidade.datas}</div>
      <p style={{ margin:"0 0 12px", fontSize:".98rem" }}>{cidade.resumo}</p>
      <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
        <VG.Stars value={rating||cidade.rating} onRate={onRate} size={26}/>
        <span className="rating-val" style={{ whiteSpace:"nowrap" }}>{(rating||cidade.rating).toFixed(1)} · {cidade.ratingN} avaliações</span>
      </div>
    </>
  );
  if(variant==="linhas"){
    return <div className="card" style={{ padding:"18px 18px" }}>{Info}</div>;
  }
  if(variant==="postal"){
    return (
      <div className="card" style={{ overflow:"hidden", borderWidth:2 }}>
        <div style={{ borderBottom:"1.5px dashed var(--line)" }}><VG.Photo label={cidade.nome} h={150}/></div>
        <div style={{ padding:"16px 18px" }}>{Info}</div>
      </div>
    );
  }
  return (
    <div className="card" style={{ overflow:"hidden" }}>
      <VG.Photo label={cidade.nome} h={160}/>
      <div style={{ padding:"16px 18px" }}>{Info}</div>
    </div>
  );
}

/* ============ SUGESTÃO ============ */
function SuggestionCard({ s, onVote, onRate, rating, onEdit, onDelete, onVisited }){
  const cidade = DD.cidadePorId[s.cidadeId];
  const v = s.visitado;
  return (
    <div className="card" style={{ padding:"15px 16px", background: v?"var(--sand)":"var(--surface)",
      filter: v?"grayscale(.4)":"none", opacity: v?.72:1, transition:"opacity .2s, filter .2s" }}>
      <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div className="chips" style={{ marginBottom:7 }}>
            {v && <span className="chip chip--cat" style={{ color:"var(--olive)", borderColor:"var(--olive)", background:"rgba(70,85,42,.12)", textTransform:"uppercase", letterSpacing:".06em" }}><Icon name="check" size={13} stroke={2.4}/>&nbsp;Visitado</span>}
            <span className="chip chip--cat">{s.categoria}</span>
            <span className="chip chip--cat" style={{ color:"var(--ocean)", borderColor:"var(--ocean)" }}>{cidade?cidade.nome:""}</span>
          </div>
          <h3 className="title" style={{ fontSize:"1.3rem", lineHeight:1.12 }}>{s.nome}</h3>
        </div>
        <button onClick={()=>onVote(s.id)} aria-pressed={s.voted}
          style={{ flex:"none", width:62, border:"1.6px solid var(--line)", borderRadius:10, background: s.voted?"var(--accent)":"var(--surface)",
            color: s.voted?"#fff":"var(--ocean)", padding:"8px 0", cursor:"pointer", textAlign:"center" }}>
          <Icon name="thumb" size={20}/>
          <div className="mono" style={{ fontSize:"1rem", fontWeight:500, marginTop:2 }}>{s.votos}</div>
        </button>
      </div>
      {s.motivo && <p className="muted" style={{ margin:"10px 0 0", fontSize:".9rem" }}>“{s.motivo}”</p>}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:11, gap:10, flexWrap:"wrap" }}>
        <span className="mono" style={{ fontSize:".72rem", letterSpacing:".05em", textTransform:"uppercase", color:"var(--ocean-soft)", lineHeight:1.4 }}>
          sugerido por {s.quem}
        </span>
        {s.link && <a className="btn btn--sm btn--ghost" href={s.link} target="_blank" rel="noopener" style={{ width:"auto", whiteSpace:"nowrap", flex:"none" }}><Icon name="external" size={16}/> Abrir link</a>}
      </div>
      {onRate && (
        <div style={{ marginTop:10, paddingTop:11, borderTop:"1.5px solid var(--line)", display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
          <span className="eyebrow" style={{ whiteSpace:"nowrap" }}>toque para avaliar</span><VG.Stars value={rating||0} onRate={(v2)=>onRate(s.id,v2)} size={26}/>
        </div>
      )}
      {(onVisited||onEdit||onDelete) && (
        <div style={{ marginTop:11, paddingTop:11, borderTop:"1.5px solid var(--line)", display:"flex", gap:9, flexWrap:"wrap" }}>
          {onVisited && <button className={v?"cardact cardact--done":"cardact"} onClick={()=>onVisited(s.id)} aria-pressed={v}>
            <Icon name="check" size={16} stroke={2.2}/> {v?"Visitado":"Marcar visitado"}
          </button>}
          {onEdit && <button className="cardact" onClick={()=>onEdit(s)}><Icon name="sheet" size={16}/> Editar</button>}
          {onDelete && <button className="cardact cardact--danger" onClick={()=>onDelete(s.id)}><Icon name="close" size={16}/> Excluir</button>}
        </div>
      )}
    </div>
  );
}

/* ============ LINKS ÚTEIS ============ */
function UsefulLinks(){
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
      {DD.links.map(l=>(
        <a key={l.titulo} className="card" href={l.url} target="_blank" rel="noopener"
          style={{ display:"flex", alignItems:"center", gap:14, padding:"15px 16px", textDecoration:"none", color:"var(--ocean)" }}>
          <span style={{ width:46, height:46, flex:"none", borderRadius:8, border:"1.5px solid var(--line)",
            display:"flex", alignItems:"center", justifyContent:"center", color:"var(--accent)" }}><Icon name={l.icone} size={24}/></span>
          <span style={{ flex:1, minWidth:0 }}>
            <b style={{ display:"block", fontSize:"1.05rem" }}>{l.titulo}</b>
            <span className="muted" style={{ fontSize:".86rem" }}>{l.desc}</span>
          </span>
          <Icon name="external" size={20} style={{ color:"var(--ocean-soft)" }}/>
        </a>
      ))}
    </div>
  );
}

window.VG = Object.assign(window.VG||{}, { Timeline, HotelCard, CityHero, SuggestionCard, UsefulLinks });
