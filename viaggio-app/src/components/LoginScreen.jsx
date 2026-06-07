const FAMILY = ["Fernando", "Ana Paula", "Mariana", "Pedro", "Marina"]

const INITIALS = {
  "Fernando":  "FE",
  "Ana Paula": "AP",
  "Mariana":   "MA",
  "Pedro":     "PE",
  "Marina":    "MI",
}

export default function LoginScreen({ onLogin }) {
  return (
    <div className="page">
      <div className="device login-screen">
        <div className="login-inner">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="brand" style={{ fontSize: "3rem", marginBottom: 6 }}>
              VIAGGIO<span className="dot">.</span>
            </div>
            <div className="brand-sub" style={{ letterSpacing: ".28em", fontSize: ".7rem" }}>
              roteiro da viagem
            </div>
          </div>

          <p style={{ margin: "0 0 28px", fontSize: "1.1rem", fontWeight: 600, color: "var(--ocean)", textAlign: "center" }}>
            Quem está acessando?
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAMILY.map(name => (
              <button
                key={name}
                className="login-btn"
                onClick={() => onLogin(name)}
              >
                <span className="login-avatar">{INITIALS[name]}</span>
                <span className="login-name">{name}</span>
              </button>
            ))}
          </div>

          <p className="muted" style={{ textAlign: "center", fontSize: ".8rem", marginTop: 32 }}>
            A escolha fica salva neste aparelho.
          </p>
        </div>
      </div>
    </div>
  )
}
