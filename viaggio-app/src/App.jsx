import { useState, useEffect } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import CityDetail from './components/CityDetail'
import SuggestionForm from './components/SuggestionForm'
import ConfirmDialog from './components/ConfirmDialog'
import LoginScreen from './components/LoginScreen'
import Icon from './components/Icon'
import { useViaggio } from './hooks/useViaggio'
import { MAPA_URL } from './data/data'

export default function App() {
  const [user, setUser] = useState(() => localStorage.getItem('viaggio_user') || '')
  const [view, setView] = useState("home")
  const [activeCity, setActiveCity] = useState(null)
  const [query, setQuery] = useState("")
  const [catFilter, setCatFilter] = useState("todas")
  const [showAdd, setShowAdd] = useState(false)
  const [editing, setEditing] = useState(null)
  const [pendingDel, setPendingDel] = useState(null)
  const [showTop, setShowTop] = useState(false)

  const { sugg, ratings, loading, onVote, rate, saveSug, deleteSug, toggleVisited } = useViaggio(user)

  useEffect(() => {
    document.documentElement.style.setProperty("--base", "22px")
  }, [])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 520)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* ---- login / logout ---- */
  const login = (name) => {
    localStorage.setItem('viaggio_user', name)
    setUser(name)
  }
  const switchUser = () => {
    localStorage.removeItem('viaggio_user')
    setUser('')
    setView('home')
    setActiveCity(null)
  }

  if (!user) return <LoginScreen onLogin={login} />

  /* ---- navigation ---- */
  const openCity = (id) => { setActiveCity(id); setView("city"); window.scrollTo(0, 0) }
  const goHome = () => { setView("home"); setActiveCity(null) }
  const onMap = () => window.open(MAPA_URL, "_blank")

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

  /* ---- suggestion CRUD ---- */
  const onSaveSug = async (f, id) => {
    await saveSug(f, id)
    closeForm()
  }
  const onDeleteSug = (id) => { const s = sugg.find(x => x.id === id); setPendingDel(s || null) }
  const confirmDelete = async () => {
    if (pendingDel) { await deleteSug(pendingDel.id); setPendingDel(null) }
  }
  const openEdit = (s) => setEditing(s)
  const closeForm = () => { setShowAdd(false); setEditing(null) }
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  const sharedProps = {
    sugg, onVote, rate, ratings,
    onEdit: openEdit, onDelete: onDeleteSug, onVisited: toggleVisited,
  }

  /* ---- loading state ---- */
  if (loading) {
    return (
      <div className="page">
        <div className="device">
          <div className="loading-wrap">
            <div className="spinner" />
            <p className="muted" style={{ fontSize: ".9rem" }}>Carregando roteiro…</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="device">
        {view === "home" && (
          <Header
            query={query} setQuery={setQuery} onNav={navTo}
            user={user} onSwitchUser={switchUser}
          />
        )}

        {view === "home"
          ? <Home
              cardStyle="editorial"
              timelineStyle="compacto"
              query={query}
              onOpenCity={openCity}
              onMap={onMap}
              catFilter={catFilter}
              setCatFilter={setCatFilter}
              {...sharedProps}
            />
          : <CityDetail
              id={activeCity}
              cardStyle="editorial"
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
