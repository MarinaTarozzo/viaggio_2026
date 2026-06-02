import { useState, useEffect } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import CityDetail from './components/CityDetail'
import SuggestionForm from './components/SuggestionForm'
import ConfirmDialog from './components/ConfirmDialog'
import Icon from './components/Icon'
import { sugestoesIniciais, MAPA_URL } from './data/data'

const DEFAULTS = {
  timelineStyle: "compacto",
  cardStyle: "editorial",
  base: 22,
}

export default function App() {
  const [view, setView] = useState("home")
  const [activeCity, setActiveCity] = useState(null)
  const [query, setQuery] = useState("")
  const [catFilter, setCatFilter] = useState("todas")
  const [showAdd, setShowAdd] = useState(false)
  const [editing, setEditing] = useState(null)
  const [pendingDel, setPendingDel] = useState(null)
  const [showTop, setShowTop] = useState(false)
  const [sugg, setSugg] = useState(() => sugestoesIniciais.map(s => ({ ...s, voted: false, visitado: false })))
  const [ratings, setRatings] = useState({})
  const [tweaks] = useState(DEFAULTS)

  useEffect(() => {
    document.documentElement.style.setProperty("--base", tweaks.base + "px")
  }, [tweaks.base])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 520)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const openCity = (id) => { setActiveCity(id); setView("city"); window.scrollTo(0, 0) }
  const goHome = () => { setView("home"); setActiveCity(null) }
  const onMap = () => window.open(MAPA_URL, "_blank")
  const rate = (key, v) => setRatings(r => ({ ...r, [key]: v }))
  const onVote = (id) => setSugg(list => list.map(s => s.id === id ? { ...s, voted: !s.voted, votos: s.votos + (s.voted ? -1 : 1) } : s))

  const navTo = (id) => {
    const doScroll = () => {
      const el = document.getElementById(id)
      if (!el) return
      const hdr = document.querySelector(".hdr")
      const off = hdr ? hdr.offsetHeight : 0
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - off - 8, behavior: "smooth" })
    }
    if (view !== "home") { goHome(); setTimeout(doScroll, 80) }
    else doScroll()
  }

  const onSaveSug = (f, id) => {
    if (id) {
      setSugg(list => list.map(s => s.id === id ? { ...s, ...f } : s))
    } else {
      setSugg(list => [{ id: "u" + Date.now(), ...f, votos: 1, voted: true, visitado: false }, ...list])
    }
  }

  const onDeleteSug = (id) => { const s = sugg.find(x => x.id === id); setPendingDel(s || null) }
  const confirmDelete = () => { if (pendingDel) setSugg(list => list.filter(x => x.id !== pendingDel.id)); setPendingDel(null) }
  const onVisited = (id) => setSugg(list => list.map(s => s.id === id ? { ...s, visitado: !s.visitado } : s))
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
  const openEdit = (s) => setEditing(s)
  const closeForm = () => { setShowAdd(false); setEditing(null) }

  const sharedProps = { sugg, onVote, rate, ratings, onEdit: openEdit, onDelete: onDeleteSug, onVisited }

  return (
    <div className="page">
      <div className="device">
        {view === "home" && <Header query={query} setQuery={setQuery} onNav={navTo} />}

        {view === "home"
          ? <Home
              cardStyle={tweaks.cardStyle}
              timelineStyle={tweaks.timelineStyle}
              query={query}
              onOpenCity={openCity}
              onMap={onMap}
              catFilter={catFilter}
              setCatFilter={setCatFilter}
              {...sharedProps}
            />
          : <CityDetail
              id={activeCity}
              cardStyle={tweaks.cardStyle}
              onBack={goHome}
              onMap={onMap}
              onOpenCity={openCity}
              {...sharedProps}
            />
        }

        <button className={"totop" + (showTop ? " show" : "")} onClick={scrollTop} aria-label="Voltar ao início">
          <Icon name="chevron" size={24} stroke={2.2} style={{ transform: "rotate(-90deg)" }} />
        </button>

        <div className="fab">
          <button className="btn btn--solid" onClick={() => setShowAdd(true)}>
            <Icon name="plus" size={22} stroke={2.2} /> Sugerir lugar
          </button>
        </div>

        {(showAdd || editing) && (
          <SuggestionForm onClose={closeForm} onSave={onSaveSug} initial={editing} />
        )}

        {pendingDel && (
          <ConfirmDialog
            titulo="Excluir sugestão?"
            mensagem={`"${pendingDel.nome}" será removida da lista. Esta ação não pode ser desfeita.`}
            onCancel={() => setPendingDel(null)}
            onConfirm={confirmDelete}
          />
        )}
      </div>
    </div>
  )
}
