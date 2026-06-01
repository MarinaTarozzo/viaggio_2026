/* VIAGGIO — app principal */
const { useState: uS, useEffect: uE } = React;
const DATA = window.VIAGGIO;
const C = window.VG;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "timelineStyle": "compacto",
  "cardStyle": "editorial",
  "accent": "#D95A2B",
  "base": 22
}/*EDITMODE-END*/;

const ACCENTS = { "#D95A2B":"Solar", "#46552A":"Oliva", "#1A4B6E":"Oceano" };

/* ---------- Header + Busca + Menu ---------- */
const NAV = [
  { id:"sec-roteiro", label:"Roteiro", icon:"route" },
  { id:"sec-mapa", label:"Mapa", icon:"map" },
  { id:"sec-hoteis", label:"Hotéis", icon:"bed" },
  { id:"sec-sugestoes", label:"Sugestões", icon:"thumb" },
  { id:"sec-links", label:"Links", icon:"sheet" },
];
function Header({ query, setQuery, falta, onNav }){
  return (
    <header className="hdr">
      <div className="hdr-top">
        <div>
          <div className="brand">VIAGGIO<span className="dot">.</span></div>
          <div className="brand-sub">Roteiro da viagem</div>
        </div>
        <div className="hdr-stamp">
          <Icon name="plane" size={13}/> {falta>0 ? <>faltam <b>{falta}d</b></> : <b>em viagem</b>}
        </div>
      </div>
      <div className="search" role="search">
        <Icon name="search" size={22} style={{ color:"var(--ocean-soft)", flex:"none" }}/>
        <input value={query} onChange={e=>setQuery(e.target.value)}
          placeholder="Buscar cidade, hotel ou passeio" aria-label="Buscar" />
        {query && <button onClick={()=>setQuery("")} aria-label="Limpar busca" style={{ background:"none", border:"none", cursor:"pointer", color:"var(--ocean)", padding:6 }}><Icon name="close" size={18}/></button>}
      </div>
      <nav className="nav" aria-label="Atalhos">
        {NAV.map(n=>(
          <button key={n.id} className="navbtn" onClick={()=>onNav(n.id)}><Icon name={n.icon} size={17}/> {n.label}</button>
        ))}
      </nav>
    </header>
  );
}

/* ---------- Passeio planejado ---------- */
function PasseioRow({ p, rating, onRate }){
  return (
    <div className="card" style={{ padding:"13px 15px" }}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:10, justifyContent:"space-between" }}>
        <div style={{ minWidth:0 }}>
          <div className="chips" style={{ marginBottom:5 }}>
            <span className="chip chip--cat">{p.categoria}</span>
            {p.reservado && <span className="chip chip--cat" style={{ color:"var(--olive)", borderColor:"var(--olive)", background:"rgba(70,85,42,.1)" }}>✓ reservado</span>}
          </div>
          <b style={{ fontSize:"1.08rem" }}>{p.nome}</b>
        </div>
        {p.link && <a className="btn btn--sm btn--ghost" href={p.link} target="_blank" rel="noopener" style={{ width:"auto", flex:"none" }}><Icon name="external" size={16}/></a>}
      </div>
      <div style={{ marginTop:9 }}><C.Stars value={rating||0} onRate={onRate} size={24}/></div>
    </div>
  );
}

/* ---------- HOME ---------- */
function Home({ t, query, onOpenCity, onMap, sugg, onVote, rate, ratings, catFilter, setCatFilter, onEdit, onDelete, onVisited }){
  const q = query.trim().toLowerCase();
  let visSugg = [...sugg].sort((a,b)=> (a.visitado-b.visitado) || (b.votos-a.votos));
  if(catFilter!=="todas") visSugg = visSugg.filter(s=>s.categoria===catFilter);
  if(q) visSugg = visSugg.filter(s=>s.nome.toLowerCase().includes(q)||s.quem.toLowerCase().includes(q)||(DATA.cidadePorId[s.cidadeId]?.nome.toLowerCase().includes(q)));
  const cats = ["todas", ...Array.from(new Set(sugg.map(s=>s.categoria)))];

  // hotéis de toda a viagem (uma entrada por estadia)
  const stays = [];
  DATA.cidades.forEach(c=> c.stays.forEach(s=> stays.push({ ...s, cidade:c.nome })));

  return (
    <div className="scroll">
      {q && <div className="block" style={{ padding:"14px 18px", background:"rgba(26,75,110,.05)" }}>
        <span className="mono" style={{ fontSize:".8rem" }}>Mostrando resultados para “{query}”.</span>
      </div>}

      <section className="block">
        <C.SectionHead num="01" title="Próxima parada"/>
        <C.NextStop onOpen={()=>onOpenCity("milao")} onMap={onMap}/>
      </section>

      <section className="block" id="sec-mapa">
        <C.SectionHead num="02" title="Mapa da viagem"/>
        <C.MapSection/>
      </section>

      <section className="block" id="sec-roteiro">
        <C.SectionHead num="03" title="Linha do tempo"/>
        <div className="chips" style={{ marginBottom:16 }}>
          <span className="chip" style={{ pointerEvents:"none", display:"inline-flex", gap:6 }}><Icon name="car" size={15} style={{ color:"var(--solar-deep)" }}/> {DATA.resumo.totalKm.toLocaleString("pt-BR")} km</span>
          <span className="chip" style={{ pointerEvents:"none" }}>{DATA.resumo.totalDias} dias</span>
          <span className="chip" style={{ pointerEvents:"none" }}>{DATA.resumo.cidades} cidades</span>
        </div>
        <C.Timeline style={t.timelineStyle} onOpenCity={onOpenCity} query={q}/>
      </section>

      <section className="block" id="sec-hoteis">
        <C.SectionHead num="04" title="Hotéis reservados"/>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {stays.filter(s=>!q || s.hotel.toLowerCase().includes(q) || s.cidade.toLowerCase().includes(q)).map((s,i)=>(
            <C.HotelCard key={i} stay={s} cidade={s.cidade} variant={t.cardStyle} onMaps={onMap}
              rating={ratings["hotel:"+s.hotel]} onRate={(v)=>rate("hotel:"+s.hotel, v)} />
          ))}
        </div>
      </section>

      <section className="block" id="sec-sugestoes">
        <C.SectionHead num="05" title="Sugestões da família"/>
        <p className="muted" style={{ margin:"-6px 0 14px", fontSize:".9rem" }}>Mais votadas pela família — vote e avalie depois da visita.</p>
        <div className="chips" style={{ marginBottom:16, overflowX:"auto", flexWrap:"nowrap", paddingBottom:4 }}>
          {cats.map(c=>(
            <button key={c} className="chip" aria-pressed={catFilter===c} onClick={()=>setCatFilter(c)} style={{ textTransform:c==="todas"?"uppercase":"none", letterSpacing:c==="todas"?".06em":0 }}>{c}</button>
          ))}
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {visSugg.length? visSugg.map(s=><C.SuggestionCard key={s.id} s={s} onVote={onVote} onRate={rate&&((id,v)=>rate("sug:"+id,v))} rating={ratings["sug:"+s.id]} onEdit={onEdit} onDelete={onDelete} onVisited={onVisited}/>)
            : <p className="muted">Nenhuma sugestão nessa categoria.</p>}
        </div>
      </section>

      <section className="block" id="sec-links">
        <C.SectionHead num="06" title="Links úteis"/>
        <C.UsefulLinks/>
      </section>

      <section className="block" style={{ borderBottom:"none", textAlign:"center", paddingTop:30, paddingBottom:30 }}>
        <Icon name="flag" size={26} style={{ color:"var(--accent)" }}/>
        <p className="title" style={{ fontSize:"1.3rem", marginTop:8 }}>Boa viagem, família!</p>
        <p className="muted mono" style={{ fontSize:".72rem", letterSpacing:".1em", textTransform:"uppercase", marginTop:6 }}>{DATA.resumo.dataInicio.split("-").reverse().join("/")} — {DATA.resumo.dataFim.split("-").reverse().join("/")}</p>
      </section>
    </div>
  );
}

/* ---------- DETALHE DA CIDADE ---------- */
function CityDetail({ id, t, onBack, onMap, sugg, onVote, rate, ratings, onOpenCity, onEdit, onDelete, onVisited }){
  const c = DATA.cidadePorId[id];
  const idx = DATA.cidades.findIndex(x=>x.id===id);
  const prev = DATA.cidades[idx-1], next = DATA.cidades[idx+1];
  const citySugg = sugg.filter(s=>s.cidadeId===id).sort((a,b)=> (a.visitado-b.visitado) || (b.votos-a.votos));
  uE(()=>{ const el=document.querySelector(".scroll-detail"); if(el) el.scrollTop=0; },[id]);

  return (
    <div className="view-detail scroll scroll-detail">
      <div style={{ position:"sticky", top:0, zIndex:30, background:"var(--sand)", borderBottom:"1.5px solid var(--line)", padding:"12px 14px", display:"flex", alignItems:"center", gap:12 }}>
        <button className="btn btn--sm" style={{ width:"auto", paddingInline:14 }} onClick={onBack}><Icon name="chevronL" size={20}/> Roteiro</button>
        <span style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column", lineHeight:1.1 }}>
          <b className="title" style={{ fontSize:"1.25rem", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{c.nome}</b>
          <span className="mono" style={{ fontSize:".66rem", letterSpacing:".08em", textTransform:"uppercase", color:"var(--ocean-soft)" }}>{c.pais}</span>
        </span>
      </div>

      <section className="block">
        <C.CityHero cidade={c} variant={t.cardStyle} rating={ratings["cidade:"+id]} onRate={(v)=>rate("cidade:"+id,v)}/>
      </section>

      <section className="block">
        <C.SectionHead title={c.stays.length>1?"Hotéis":"Hotel reservado"}/>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {c.stays.map((s,i)=>(
            <C.HotelCard key={i} stay={s} cidade={c.nome} variant={t.cardStyle} onMaps={onMap}
              rating={ratings["hotel:"+s.hotel]} onRate={(v)=>rate("hotel:"+s.hotel,v)} />
          ))}
        </div>
      </section>

      {c.passeios.length>0 && (
        <section className="block">
          <C.SectionHead title="Passeios planejados"/>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {c.passeios.map((p,i)=><PasseioRow key={i} p={p} rating={ratings["passeio:"+id+":"+i]} onRate={(v)=>rate("passeio:"+id+":"+i,v)}/>)}
          </div>
        </section>
      )}

      <section className="block">
        <C.SectionHead title="Sugestões da família"/>
        {citySugg.length? (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {citySugg.map(s=><C.SuggestionCard key={s.id} s={s} onVote={onVote} onRate={(id2,v)=>rate("sug:"+id2,v)} rating={ratings["sug:"+s.id]} onEdit={onEdit} onDelete={onDelete} onVisited={onVisited}/>)}
          </div>
        ) : <p className="muted">Ainda não há sugestões para {c.nome}. Que tal adicionar uma?</p>}
      </section>

      <section className="block" style={{ display:"flex", gap:10, borderBottom:"none" }}>
        {prev ? <button className="btn btn--sm" onClick={()=>onOpenCity(prev.id)} style={{ flex:1 }}><Icon name="chevronL" size={18}/> {prev.nome}</button> : <span style={{ flex:1 }}/>}
        {next ? <button className="btn btn--sm" onClick={()=>onOpenCity(next.id)} style={{ flex:1 }}>{next.nome} <Icon name="chevron" size={18}/></button> : <span style={{ flex:1 }}/>}
      </section>
    </div>
  );
}

/* ---------- MODAL: SUGERIR / EDITAR LUGAR ---------- */
function SuggestionForm({ onClose, onSave, initial }){
  const isEdit = !!initial;
  const [f,setF]=uS(initial || { nome:"", categoria:DATA.categorias[0], cidadeId:DATA.cidades[0].id, quem:"Você", motivo:"", link:"" });
  const up=(k,v)=>setF(s=>({...s,[k]:v}));
  const submit=(e)=>{ e.preventDefault(); if(!f.nome.trim()) return; onSave(f, initial && initial.id); onClose(); };
  return (
    <div className="overlay" onClick={onClose}>
      <form className="sheet" onClick={e=>e.stopPropagation()} onSubmit={submit}>
        <div className="sheet-grab"></div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"6px 18px 14px", borderBottom:"1.5px solid var(--line)" }}>
          <h2 className="title" style={{ fontSize:"1.6rem" }}>{isEdit ? "Editar sugestão" : "Sugerir lugar"}</h2>
          <button type="button" onClick={onClose} aria-label="Fechar" style={{ background:"none", border:"1.5px solid var(--line)", borderRadius:"50%", width:40, height:40, cursor:"pointer", color:"var(--ocean)" }}><Icon name="close" size={20}/></button>
        </div>
        <div style={{ padding:"18px" }}>
          <div className="field">
            <label>Nome do lugar *</label>
            <input value={f.nome} onChange={e=>up("nome",e.target.value)} placeholder="Ex.: Gelateria perto do Duomo" autoFocus/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div className="field"><label>Categoria</label>
              <select value={f.categoria} onChange={e=>up("categoria",e.target.value)}>{DATA.categorias.map(c=><option key={c}>{c}</option>)}</select></div>
            <div className="field"><label>Cidade</label>
              <select value={f.cidadeId} onChange={e=>up("cidadeId",e.target.value)}>{DATA.cidades.map(c=><option key={c.id} value={c.id}>{c.nome}</option>)}</select></div>
          </div>
          <div className="field"><label>Quem sugeriu</label>
            <select value={f.quem} onChange={e=>up("quem",e.target.value)}>{["Você",...DATA.resumo.pessoas].map(p=><option key={p}>{p}</option>)}</select></div>
          <div className="field"><label>Motivo (opcional)</label>
            <textarea rows={2} value={f.motivo} onChange={e=>up("motivo",e.target.value)} placeholder="Por que vale a pena?"></textarea></div>
          <div className="field"><label>Link (opcional)</label>
            <input value={f.link} onChange={e=>up("link",e.target.value)} placeholder="https://"/></div>
          <button type="submit" className="btn btn--solid" style={{ minHeight:56, fontSize:"1.05rem" }}>
            <Icon name={isEdit?"check":"plus"} size={20} stroke={2.2}/> {isEdit ? "Salvar alterações" : "Adicionar sugestão"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------- DIÁLOGO DE CONFIRMAÇÃO ---------- */
function ConfirmDialog({ titulo, mensagem, onCancel, onConfirm, confirmLabel="Excluir" }){
  return (
    <div className="overlay overlay--center" onClick={onCancel}>
      <div className="confirm-box" onClick={e=>e.stopPropagation()} role="alertdialog" aria-label={titulo}>
        <h2 className="title" style={{ fontSize:"1.5rem", marginBottom:8 }}>{titulo}</h2>
        <p style={{ margin:"0 0 20px", color:"var(--ocean)", fontSize:"1rem" }}>{mensagem}</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <button className="btn" onClick={onCancel} style={{ width:"auto" }}>Cancelar</button>
          <button className="btn" onClick={onConfirm} style={{ width:"auto", background:"var(--danger)", color:"#fff", borderColor:"var(--danger)" }}>
            <Icon name="close" size={18} stroke={2.2}/> {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- TWEAKS ---------- */
function TweaksUI({ t, setTweak }){
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Variações da timeline"/>
      <TweakRadio label="Estilo" value={t.timelineStyle} options={["linha","bilhete","compacto"]} onChange={v=>setTweak("timelineStyle",v)}/>
      <TweakSection label="Cards de cidade & hotel"/>
      <TweakRadio label="Estilo" value={t.cardStyle} options={["editorial","postal","linhas"]} onChange={v=>setTweak("cardStyle",v)}/>
      <TweakSection label="Identidade"/>
      <TweakColor label="Cor de destaque" value={t.accent} options={Object.keys(ACCENTS)} onChange={v=>setTweak("accent",v)}/>
      <TweakSection label="Acessibilidade"/>
      <TweakSlider label="Tamanho do texto" value={t.base} min={16} max={24} step={1} unit="px" onChange={v=>setTweak("base",v)}/>
    </TweaksPanel>
  );
}

/* ---------- APP ---------- */
function App(){
  const [t,setTweak]=useTweaks(TWEAK_DEFAULTS);
  const [view,setView]=uS("home");
  const [activeCity,setActiveCity]=uS(null);
  const [query,setQuery]=uS("");
  const [catFilter,setCatFilter]=uS("todas");
  const [showAdd,setShowAdd]=uS(false);
  const [editing,setEditing]=uS(null);
  const [pendingDel,setPendingDel]=uS(null);
  const [showTop,setShowTop]=uS(false);
  const [sugg,setSugg]=uS(()=>DATA.sugestoes.map(s=>({...s, voted:false, visitado:false})));
  const [ratings,setRatings]=uS({});

  uE(()=>{
    const onScroll=()=>setShowTop(window.scrollY>520);
    window.addEventListener("scroll", onScroll, { passive:true });
    onScroll();
    return ()=>window.removeEventListener("scroll", onScroll);
  },[]);

  uE(()=>{ document.documentElement.style.setProperty("--accent", t.accent); }, [t.accent]);
  uE(()=>{ document.documentElement.style.setProperty("--base", t.base+"px"); }, [t.base]);

  const falta = C.diasAte("2026-06-29");
  const openCity=(id)=>{ setActiveCity(id); setView("city"); window.scrollTo(0,0); };
  const goHome=()=>{ setView("home"); setActiveCity(null); };
  const onMap=()=>window.open(DATA.MAPA_URL,"_blank");
  const rate=(key,v)=>setRatings(r=>({...r,[key]:v}));
  const onVote=(id)=>setSugg(list=>list.map(s=> s.id===id ? {...s, voted:!s.voted, votos:s.votos+(s.voted?-1:1)} : s));

  const navTo=(id)=>{
    const doScroll=()=>{ const el=document.getElementById(id); if(!el) return;
      const hdr=document.querySelector(".hdr"); const off=hdr?hdr.offsetHeight:0;
      window.scrollTo({ top: el.getBoundingClientRect().top+window.scrollY-off-8, behavior:"smooth" }); };
    if(view!=="home"){ goHome(); setTimeout(doScroll,80); } else doScroll();
  };
  const onSaveSug=(f,id)=>{
    if(id){ setSugg(list=>list.map(s=> s.id===id ? {...s, ...f} : s)); }
    else { setSugg(list=>[{ id:"u"+Date.now(), ...f, votos:1, voted:true }, ...list]); }
  };
  const onDeleteSug=(id)=>{ const s=sugg.find(x=>x.id===id); setPendingDel(s||null); };
  const confirmDelete=()=>{ if(pendingDel) setSugg(list=>list.filter(x=>x.id!==pendingDel.id)); setPendingDel(null); };
  const onVisited=(id)=>setSugg(list=>list.map(s=> s.id===id ? {...s, visitado:!s.visitado} : s));
  const scrollTop=()=>window.scrollTo({ top:0, behavior:"smooth" });
  const openEdit=(s)=>setEditing(s);
  const closeForm=()=>{ setShowAdd(false); setEditing(null); };

  return (
    <div className="page">
      <div className="device">
        {view==="home" && <Header query={query} setQuery={setQuery} falta={falta} onNav={navTo}/>}
        {view==="home"
          ? <Home t={t} query={query} onOpenCity={openCity} onMap={onMap} sugg={sugg} onVote={onVote} rate={rate} ratings={ratings} catFilter={catFilter} setCatFilter={setCatFilter} onEdit={openEdit} onDelete={onDeleteSug} onVisited={onVisited}/>
          : <CityDetail id={activeCity} t={t} onBack={goHome} onMap={onMap} sugg={sugg} onVote={onVote} rate={rate} ratings={ratings} onOpenCity={openCity} onEdit={openEdit} onDelete={onDeleteSug} onVisited={onVisited}/>}
        <button className={"totop"+(showTop?" show":"")} onClick={scrollTop} aria-label="Voltar ao início"><Icon name="chevron" size={24} stroke={2.2} style={{ transform:"rotate(-90deg)" }}/></button>
        <div className="fab">
          <button className="btn btn--solid" onClick={()=>setShowAdd(true)}><Icon name="plus" size={22} stroke={2.2}/> Sugerir lugar</button>
        </div>
        {(showAdd || editing) && <SuggestionForm onClose={closeForm} onSave={onSaveSug} initial={editing}/>}
        {pendingDel && <ConfirmDialog titulo="Excluir sugestão?" mensagem={`"${pendingDel.nome}" será removida da lista. Esta ação não pode ser desfeita.`} onCancel={()=>setPendingDel(null)} onConfirm={confirmDelete}/>}
      </div>
      <TweaksUI t={t} setTweak={setTweak}/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
