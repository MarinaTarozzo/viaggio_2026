import { useState } from 'react'
import Icon from './Icon'
import ExpenseForm from './ExpenseForm'
import ConfirmDialog from './ConfirmDialog'
import { downloadCSV, downloadPDF } from '../lib/exportTable'

function fmtDataBR(iso) {
  if (!iso) return ""
  const [y, m, d] = iso.split("-")
  return `${d}/${m}/${y}`
}

function fmtValor(valor, moeda) {
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: moeda }).format(valor)
  } catch {
    return `${valor} ${moeda}`
  }
}

export default function Expenses({ expenses, onSave, onDelete, user }) {
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [pendingDel, setPendingDel] = useState(null)
  const [quemFilter, setQuemFilter] = useState("todos")
  const [moedaFilter, setMoedaFilter] = useState("todas")
  const [sortBy, setSortBy] = useState("recentes")

  const quens = Array.from(new Set(expenses.map(e => e.quem))).sort()
  const moedas = Array.from(new Set(expenses.map(e => e.moeda)))

  let list = [...expenses]
  if (quemFilter !== "todos") list = list.filter(e => e.quem === quemFilter)
  if (moedaFilter !== "todas") list = list.filter(e => e.moeda === moedaFilter)
  list.sort((a, b) => sortBy === "recentes" ? (a.data < b.data ? 1 : -1) : (a.data > b.data ? 1 : -1))

  const totals = {}
  expenses.forEach(e => {
    totals[e.quem] = totals[e.quem] || {}
    totals[e.quem][e.moeda] = (totals[e.quem][e.moeda] || 0) + Number(e.valor)
  })

  const exportCSV = () => {
    const headers = ["Data", "Despesa", "Descrição", "Quem pagou", "Valor", "Moeda"]
    const rows = list.map(e => [fmtDataBR(e.data), e.nome, e.descricao || "", e.quem, Number(e.valor).toFixed(2), e.moeda])
    downloadCSV("despesas-viaggio.csv", headers, rows)
  }
  const exportPDF = async () => {
    const headers = ["Data", "Despesa", "Quem", "Valor"]
    const rows = list.map(e => [fmtDataBR(e.data), e.nome, e.quem, fmtValor(e.valor, e.moeda)])
    await downloadPDF("despesas-viaggio.pdf", "Despesas da viagem", headers, rows)
  }

  return (
    <>
      {expenses.length === 0 ? (
        <p className="muted" style={{ marginBottom: 16 }}>Nenhuma despesa registrada ainda. Adicione a primeira abaixo.</p>
      ) : (
        <>
          <p className="eyebrow" style={{ marginBottom: 10 }}>Resumo por pessoa</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 20 }}>
            {Object.entries(totals).map(([quem, byMoeda]) => (
              <div key={quem} className="card" style={{ padding: "11px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                <b>{quem}</b>
                <span className="mono" style={{ fontSize: ".85rem", textAlign: "right" }}>
                  {Object.entries(byMoeda).map(([moeda, valor]) => fmtValor(valor, moeda)).join(" · ")}
                </span>
              </div>
            ))}
          </div>

          <div className="chips" style={{ marginBottom: 8, overflowX: "auto", flexWrap: "nowrap", paddingBottom: 2 }}>
            <button className="chip" aria-pressed={quemFilter === "todos"} onClick={() => setQuemFilter("todos")} style={{ textTransform: "uppercase", letterSpacing: ".06em" }}>
              Todos
            </button>
            {quens.map(q => (
              <button key={q} className="chip" aria-pressed={quemFilter === q} onClick={() => setQuemFilter(q)}>{q}</button>
            ))}
          </div>

          {moedas.length > 1 && (
            <div className="chips" style={{ marginBottom: 8, overflowX: "auto", flexWrap: "nowrap", paddingBottom: 2 }}>
              <button className="chip" aria-pressed={moedaFilter === "todas"} onClick={() => setMoedaFilter("todas")} style={{ textTransform: "uppercase", letterSpacing: ".06em" }}>
                Todas as moedas
              </button>
              {moedas.map(m => (
                <button key={m} className="chip" aria-pressed={moedaFilter === m} onClick={() => setMoedaFilter(m)}>{m}</button>
              ))}
            </div>
          )}

          <div className="chips" style={{ marginBottom: 16 }}>
            <button className="chip" aria-pressed={sortBy === "recentes"} onClick={() => setSortBy("recentes")}>Mais recentes</button>
            <button className="chip" aria-pressed={sortBy === "antigos"} onClick={() => setSortBy("antigos")}>Mais antigos</button>
          </div>

          {list.length ? (
            <div className="table-wrap" style={{ marginBottom: 16 }}>
              <table className="table">
                <thead>
                  <tr><th>Data</th><th>Despesa</th><th>Quem</th><th>Valor</th><th></th></tr>
                </thead>
                <tbody>
                  {list.map(e => (
                    <tr key={e.id}>
                      <td className="mono">{fmtDataBR(e.data)}</td>
                      <td className="wrap">
                        <b>{e.nome}</b>
                        {e.descricao && <div className="muted" style={{ fontSize: ".8rem", marginTop: 2 }}>{e.descricao}</div>}
                      </td>
                      <td>{e.quem}</td>
                      <td className="mono">{fmtValor(e.valor, e.moeda)}</td>
                      <td>
                        <div style={{ display: "flex", gap: 2 }}>
                          <button onClick={() => setEditing(e)} aria-label="Editar despesa" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ocean)", padding: 5 }}>
                            <Icon name="sheet" size={16} />
                          </button>
                          <button onClick={() => setPendingDel(e)} aria-label="Excluir despesa" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--danger)", padding: 5 }}>
                            <Icon name="close" size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="muted" style={{ marginBottom: 16 }}>Nenhuma despesa encontrada com esses filtros.</p>
          )}

          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <button className="btn btn--sm" style={{ flex: 1 }} onClick={exportCSV}>
              <Icon name="download" size={16} /> CSV
            </button>
            <button className="btn btn--sm" style={{ flex: 1 }} onClick={exportPDF}>
              <Icon name="download" size={16} /> PDF
            </button>
          </div>
        </>
      )}

      <button className="btn btn--solid" onClick={() => setShowForm(true)}>
        <Icon name="plus" size={20} stroke={2.2} /> Nova despesa
      </button>

      {(showForm || editing) && (
        <ExpenseForm
          user={user}
          initial={editing}
          onClose={() => { setShowForm(false); setEditing(null) }}
          onSave={onSave}
        />
      )}
      {pendingDel && (
        <ConfirmDialog
          titulo="Excluir despesa?"
          mensagem={`"${pendingDel.nome}" será removida. Esta ação não pode ser desfeita.`}
          onCancel={() => setPendingDel(null)}
          onConfirm={async () => { await onDelete(pendingDel.id); setPendingDel(null) }}
        />
      )}
    </>
  )
}
