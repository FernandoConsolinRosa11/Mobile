export default function Gauge({ value, label, pct, status, message }) {
  const r = 32, c = 2 * Math.PI * r;
  const off = c * (1 - Math.min(Math.max(pct, 0), 1));
  return (
    <div className={`gauge condition-${status}`}>
      <div className="ring">
        <svg viewBox="0 0 80 80">
          <circle className="track" cx="40" cy="40" r={r} />
          <circle className="fill" cx="40" cy="40" r={r} strokeDasharray={c} strokeDashoffset={off} />
        </svg>
        <div className="num">{value}</div>
      </div>
      <div className="lbl">{label}</div>
      <div className="condition-message">{message}</div>
    </div>
  );
}
