import Icon from './Icon'

export default function StatusBadge({ status }) {
  if (status === "pago") return (
    <span className="status status--pago">
      <Icon name="check" size={14} stroke={2.2} />Pago
    </span>
  )
  return (
    <span className="status status--verificar">
      <Icon name="clock" size={14} stroke={2} />Na chegada
    </span>
  )
}
