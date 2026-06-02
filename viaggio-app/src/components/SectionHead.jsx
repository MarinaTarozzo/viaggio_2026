export default function SectionHead({ num, title, action }) {
  return (
    <div className="sec-head">
      {num && <span className="sec-num">{num}</span>}
      <h2 className="sec-title">{title}</h2>
      <span className="sec-rule"></span>
      {action}
    </div>
  )
}
