import { useState } from 'react'
import Icon from './Icon'
import { cidades, categorias, resumo } from '../data/data'

export default function SuggestionForm({ onClose, onSave, initial }) {
  const isEdit = !!initial
  const [f, setF] = useState(initial || {
    nome: "", categoria: categorias[0], cidadeId: cidades[0].id, quem: "Você",
    motivo: "", link: "", periodo: "Qualquer hora", reservar: false,
  })
  const up = (k, v) => setF(s => ({ ...s, [k]: v }))
  const submit = (e) => {
    e.preventDefault()
    if (!f.nome.trim()) return
    onSave(f, initial && initial.id)
    onClose()
  }
  return (
    <div className="overlay" onClick={onClose}>
      <form className="sheet" onClick={e => e.stopPropagation()} onSubmit={submit}>
        <div className="sheet-grab"></div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 18px 14px", borderBottom: "1.5px solid var(--line)" }}>
          <h2 className="title" style={{ fontSize: "1.6rem" }}>{isEdit ? "Editar sugestão" : "Sugerir lugar"}</h2>
          <button type="button" onClick={onClose} aria-label="Fechar" style={{ background: "none", border: "1.5px solid var(--line)", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", color: "var(--ocean)" }}>
            <Icon name="close" size={20} />
          </button>
        </div>
        <div style={{ padding: "18px" }}>
          <div className="field">
            <label>Nome do lugar *</label>
            <input value={f.nome} onChange={e => up("nome", e.target.value)} placeholder="Ex.: Gelateria perto do Duomo" autoFocus />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field">
              <label>Categoria</label>
              <select value={f.categoria} onChange={e => up("categoria", e.target.value)}>
                {categorias.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Cidade</label>
              <select value={f.cidadeId} onChange={e => up("cidadeId", e.target.value)}>
                {cidades.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
          </div>
          <div className="field">
            <label>Quem sugeriu</label>
            <select value={f.quem} onChange={e => up("quem", e.target.value)}>
              {["Você", ...resumo.pessoas].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field">
              <label>Período do dia</label>
              <select value={f.periodo || "Qualquer hora"} onChange={e => up("periodo", e.target.value)}>
                {["Qualquer hora", "Manhã", "Tarde", "Noite"].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Reservar / ingressos</label>
              <select value={f.reservar ? "Sim" : "Não"} onChange={e => up("reservar", e.target.value === "Sim")}>
                <option>Não</option>
                <option>Sim</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label>Motivo (opcional)</label>
            <textarea rows={2} value={f.motivo} onChange={e => up("motivo", e.target.value)} placeholder="Por que vale a pena?"></textarea>
          </div>
          <div className="field">
            <label>Link (opcional)</label>
            <input value={f.link} onChange={e => up("link", e.target.value)} placeholder="https://" />
          </div>
          <button type="submit" className="btn btn--solid" style={{ minHeight: 56, fontSize: "1.05rem" }}>
            <Icon name={isEdit ? "check" : "plus"} size={20} stroke={2.2} />
            {isEdit ? "Salvar alterações" : "Adicionar sugestão"}
          </button>
        </div>
      </form>
    </div>
  )
}
