import Icon from './Icon'
import Stars from './Stars'
import Photo from './Photo'
import { CITY_PHOTOS } from '../data/data'

export default function CityHero({ cidade, variant = "editorial", rating, onRate }) {
  const photoSrc = CITY_PHOTOS[cidade.id]
  const Info = (
    <>
      <div className="flag-line" style={{ marginBottom: 6, flexWrap: "nowrap", whiteSpace: "nowrap" }}>
        <Icon name="pin" size={16} />
        <span className="mono" style={{ fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase" }}>{cidade.pais}</span>
        <span style={{ opacity: .4 }}>·</span>
        <span className="mono" style={{ fontSize: ".72rem", whiteSpace: "nowrap" }}>{cidade.noites} noite{cidade.noites > 1 ? "s" : ""}</span>
      </div>
      <h1 className="title" style={{ fontSize: "2.7rem", marginBottom: 6 }}>{cidade.nome}</h1>
      <div className="mono" style={{ fontSize: ".84rem", color: "var(--solar-deep)", marginBottom: 10 }}>{cidade.datas}</div>
      <p style={{ margin: "0 0 12px", fontSize: ".98rem" }}>{cidade.resumo}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <Stars value={rating || cidade.rating} onRate={onRate} size={26} />
        <span className="rating-val" style={{ whiteSpace: "nowrap" }}>
          {(rating || cidade.rating).toFixed(1)} · {cidade.ratingN} avaliações
        </span>
      </div>
    </>
  )

  if (variant === "linhas") return <div className="card" style={{ padding: "18px 18px" }}>{Info}</div>

  if (variant === "postal") {
    return (
      <div className="card" style={{ overflow: "hidden", borderWidth: 2 }}>
        <div style={{ borderBottom: "1.5px dashed var(--line)" }}><Photo label={cidade.nome} h={150} src={photoSrc} /></div>
        <div style={{ padding: "16px 18px" }}>{Info}</div>
      </div>
    )
  }

  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <Photo label={cidade.nome} h={200} src={photoSrc} />
      <div style={{ padding: "16px 18px" }}>{Info}</div>
    </div>
  )
}
