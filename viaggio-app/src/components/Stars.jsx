import { useState } from 'react'
import Icon from './Icon'

export default function Stars({ value = 0, count, onRate, size = 22, showVal = false }) {
  const [hover, setHover] = useState(0)
  const full = Math.round(hover || value)
  return (
    <span className="stars" role={onRate ? "group" : "img"} aria-label={`Avaliação ${value} de 5`}>
      {[1, 2, 3, 4, 5].map(i => (
        onRate ? (
          <button key={i} onClick={() => onRate(i)}
            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(0)}
            aria-label={`Dar ${i} estrela${i > 1 ? "s" : ""}`}>
            <Icon name="star" size={size} fill={i <= full} className={i <= full ? "" : "empty"} style={i <= full ? {} : { opacity: .3 }} />
          </button>
        ) : (
          <Icon key={i} name="star" size={size} fill={i <= full} style={i <= full ? {} : { opacity: .3 }} />
        )
      ))}
      {showVal && <span className="rating-val">{value.toFixed(1)}{count ? ` · ${count}` : ""}</span>}
    </span>
  )
}
