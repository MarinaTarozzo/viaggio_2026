import { useState } from 'react'
import Icon from './Icon'
import { resumo, MOEDAS } from '../data/data'

const todayISO = () => new Date().toISOString().slice(0, 10)

export default function ExpenseForm({ onClose, onSave, initial, user }) {
  const isEdit = !!initial
  const [f, setF] = useState(initial || {
    nome: "", descricao: "", valor: "", moeda: "EUR",
    quem: resumo.pessoas.includes(user) ? user : resumo.pessoas[0],
    data: todayISO(),
  })
  const up = (k, v) => setF(s => ({ ...s, [k]: v }))
  const submit = (e) => {
    e.preventDefault()
    if (!f.nome.trim() || !f.valor || Number(f.valor) <= 0) return
    onSave({ ...f, valor: Number(f.valor) }, initial && initial.id)
    onClose()
  }
  return (
    <div className="overlay" onClick={onClose}>
      <form className="sheet" onClick={e => e.stopPropagation()} onSubmit={submit}>
        <div className="sheet-grab"></div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 18px 14px", borderBottom: "1.5px solid var(--line)" }}>
          <h2 className="title" style={{ fontSize: "1.6rem" }}>{isEdit ? "Editar despesa" : "Nova despesa"}</h2>
          <button type="button" onClick={onClose} aria-label="Fechar" style={{ background: "none", border: "1.5px solid var(--line)", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", color: "var(--ocean)" }}>
            <Icon name="close" size={20} />
          </button>
        </div>
        <div style={{ padding: "18px" }}>
          <div className="field">
            <label>Nome da despesa *</label>
            <input value={f.nome} onChange={e => up("nome", e.target.value)} placeholder="Ex.: Jantar em Trieste" autoFocus />
          </div>
          <div className="field">
            <label>Descrição (opcional)</label>
            <textarea rows={2} value={f.descricao} onChange={e => up("descricao", e.target.value)} placeholder="Detalhes da despesa"></textarea>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field">
              <label>Valor *</label>
              <input type="number" min="0" step="0.01" value={f.valor} onChange={e => up("valor", e.target.value)} placeholder="0,00" />
            </div>
            <div className="field">
              <label>Moeda</label>
              <select value={f.moeda} onChange={e => up("moeda", e.target.value)}>
                {MOEDAS.map(m => <option key={m.code} value={m.code}>{m.nome}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field">
              <label>Quem pagou</label>
              <select value={f.quem} onChange={e => up("quem", e.target.value)}>
                {resumo.pessoas.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Data</label>
              <input type="date" value={f.data} onChange={e => up("data", e.target.value)} />
            </div>
          </div>
          <button type="submit" className="btn btn--solid" style={{ minHeight: 56, fontSize: "1.05rem" }}>
            <Icon name={isEdit ? "check" : "plus"} size={20} stroke={2.2} />
            {isEdit ? "Salvar alterações" : "Adicionar despesa"}
          </button>
        </div>
      </form>
    </div>
  )
}
