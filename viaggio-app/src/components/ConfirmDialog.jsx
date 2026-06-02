import Icon from './Icon'

export default function ConfirmDialog({ titulo, mensagem, onCancel, onConfirm, confirmLabel = "Excluir" }) {
  return (
    <div className="overlay overlay--center" onClick={onCancel}>
      <div className="confirm-box" onClick={e => e.stopPropagation()} role="alertdialog" aria-label={titulo}>
        <h2 className="title" style={{ fontSize: "1.5rem", marginBottom: 8 }}>{titulo}</h2>
        <p style={{ margin: "0 0 20px", color: "var(--ocean)", fontSize: "1rem" }}>{mensagem}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <button className="btn" onClick={onCancel} style={{ width: "auto" }}>Cancelar</button>
          <button className="btn" onClick={onConfirm} style={{ width: "auto", background: "var(--danger)", color: "#fff", borderColor: "var(--danger)" }}>
            <Icon name="close" size={18} stroke={2.2} /> {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
