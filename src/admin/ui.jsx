import { useEffect, useState } from 'react';

// ---------- Toast global ----------
let toastListener = null;
export function toast(message, tone = 'ok') {
  if (toastListener) toastListener({ message, tone, id: Date.now() + Math.random() });
}
export function Toaster() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    toastListener = (t) => {
      setItems((prev) => [...prev, t]);
      setTimeout(() => setItems((prev) => prev.filter((x) => x.id !== t.id)), 3200);
    };
    return () => { toastListener = null; };
  }, []);
  return (
    <div className="adm-toasts">
      {items.map((t) => (
        <div key={t.id} className={`adm-toast ${t.tone}`}>
          <i className={t.tone === 'ok' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-info'} /> {t.message}
        </div>
      ))}
    </div>
  );
}

// ---------- Estructura ----------
export function PageHeader({ title, subtitle, children, icon }) {
  return (
    <div className="adm-page-head">
      <div>
        <h1>{icon && <i className={icon} />} {title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="adm-page-actions">{children}</div>
    </div>
  );
}
export function Card({ title, action, children, pad = true, className = '' }) {
  return (
    <section className={`adm-card ${className}`}>
      {(title || action) && (
        <header className="adm-card-head">
          <h3>{title}</h3>
          {action}
        </header>
      )}
      <div className={pad ? 'adm-card-body' : ''}>{children}</div>
    </section>
  );
}
export function Stat({ label, value, delta, icon, tone = 'blue', hint }) {
  return (
    <div className="adm-stat">
      <div className={`adm-stat-icon ${tone}`}><i className={icon} /></div>
      <div>
        <span className="adm-stat-label">{label}</span>
        <strong className="adm-stat-value">{value}</strong>
        {delta !== undefined && (
          <span className={`adm-delta ${String(delta).startsWith('-') ? 'down' : 'up'}`}>
            <i className={String(delta).startsWith('-') ? 'fa-solid fa-arrow-trend-down' : 'fa-solid fa-arrow-trend-up'} /> {delta}
          </span>
        )}
        {hint && <span className="adm-hint">{hint}</span>}
      </div>
    </div>
  );
}
export function Badge({ children, color = 'gray' }) {
  return <span className={`adm-badge ${color}`}>{children}</span>;
}
export function Btn({ children, onClick, variant = 'default', icon, small, disabled, type = 'button' }) {
  return (
    <button type={type} disabled={disabled} className={`adm-btn ${variant} ${small ? 'small' : ''}`} onClick={onClick}>
      {icon && <i className={icon} />} {children}
    </button>
  );
}
export function Tabs({ tabs, value, onChange }) {
  return (
    <div className="adm-tabs" role="tablist">
      {tabs.map((t) => {
        const key = typeof t === 'string' ? t : t.key;
        const label = typeof t === 'string' ? t : t.label;
        return (
          <button key={key} role="tab" aria-selected={value === key} className={value === key ? 'active' : ''} onClick={() => onChange(key)}>
            {label}
            {t.count !== undefined && <em>{t.count}</em>}
          </button>
        );
      })}
    </div>
  );
}
export function SearchInput({ value, onChange, placeholder = 'Buscar…' }) {
  return (
    <label className="adm-search">
      <i className="fa-solid fa-magnifying-glass" />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </label>
  );
}
export function Select({ value, onChange, options, label }) {
  return (
    <label className="adm-select">
      {label && <span>{label}</span>}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={typeof o === 'string' ? o : o.value} value={typeof o === 'string' ? o : o.value}>
            {typeof o === 'string' ? o : o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
export function Field({ label, children, hint, wide }) {
  return (
    <label className={`adm-field ${wide ? 'wide' : ''}`}>
      <span>{label}</span>
      {children}
      {hint && <small>{hint}</small>}
    </label>
  );
}
export function Toggle({ on, onChange, label }) {
  return (
    <button type="button" className={`adm-toggle ${on ? 'on' : ''}`} role="switch" aria-checked={on} onClick={() => onChange(!on)} aria-label={label}>
      <i />
    </button>
  );
}
export function Progress({ value, max = 100, tone = 'blue' }) {
  return (
    <div className="adm-progress"><div className={tone} style={{ width: `${Math.min(100, (value / max) * 100)}%` }} /></div>
  );
}
export function Table({ columns, rows, onRowClick, empty = 'Sin resultados', dense }) {
  return (
    <div className="adm-table-wrap">
      <table className={`adm-table ${dense ? 'dense' : ''}`}>
        <thead>
          <tr>{columns.map((c) => <th key={c.key || c.label} style={{ textAlign: c.align || 'left', width: c.width }}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={columns.length} className="adm-empty">{empty}</td></tr>}
          {rows.map((r, i) => (
            <tr key={r.id || i} className={onRowClick ? 'clickable' : ''} onClick={onRowClick ? () => onRowClick(r) : undefined}>
              {columns.map((c) => (
                <td key={c.key || c.label} style={{ textAlign: c.align || 'left' }}>{c.render ? c.render(r) : r[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function Drawer({ open, onClose, title, subtitle, children, footer, wide }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="adm-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <aside className={`adm-drawer ${wide ? 'wide' : ''}`}>
        <header>
          <div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>
          <button className="adm-icon-btn" onClick={onClose} aria-label="Cerrar"><i className="fa-solid fa-xmark" /></button>
        </header>
        <div className="adm-drawer-body">{children}</div>
        {footer && <footer>{footer}</footer>}
      </aside>
    </div>
  );
}
export function Modal({ open, onClose, title, children, footer, wide }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="adm-overlay center" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`adm-modal ${wide ? 'wide' : ''}`} role="dialog" aria-modal="true">
        <header><h2>{title}</h2><button className="adm-icon-btn" onClick={onClose} aria-label="Cerrar"><i className="fa-solid fa-xmark" /></button></header>
        <div className="adm-modal-body">{children}</div>
        {footer && <footer>{footer}</footer>}
      </div>
    </div>
  );
}
export function Dropzone({ title, hint, icon = 'fa-solid fa-cloud-arrow-up', onFile }) {
  return (
    <div className="adm-dropzone" onClick={() => onFile && onFile()}>
      <i className={icon} />
      <strong>{title}</strong>
      <span>{hint}</span>
    </div>
  );
}
export const Timeline = ({ steps }) => (
  <ol className="adm-timeline">
    {steps.map((s) => (
      <li key={s.label} className={s.done ? 'done' : s.current ? 'current' : ''}>
        <i />
        <div><strong>{s.label}</strong>{s.note && <span>{s.note}</span>}</div>
      </li>
    ))}
  </ol>
);

// ---------- Gráficos SVG sin librerías ----------
export function LineChart({ data, keys, colors, height = 220 }) {
  const w = 720;
  const pad = { l: 44, r: 12, t: 12, b: 26 };
  const max = Math.max(...data.flatMap((d) => keys.map((k) => d[k]))) * 1.1;
  const x = (i) => pad.l + (i * (w - pad.l - pad.r)) / (data.length - 1);
  const y = (v) => pad.t + (1 - v / max) * (height - pad.t - pad.b);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round((max * t) / 100) * 100);
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="adm-chart" role="img" aria-label="Gráfico de ventas">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={pad.l} x2={w - pad.r} y1={y(t)} y2={y(t)} stroke="var(--adm-line)" />
          <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" className="adm-axis">{t >= 1000 ? `${t / 1000}k` : t}</text>
        </g>
      ))}
      {keys.map((k, ki) => {
        const path = data.map((d, i) => `${i ? 'L' : 'M'}${x(i)},${y(d[k])}`).join(' ');
        return (
          <g key={k}>
            <path d={`${path} L${x(data.length - 1)},${y(0)} L${x(0)},${y(0)} Z`} fill={colors[ki]} opacity="0.08" />
            <path d={path} fill="none" stroke={colors[ki]} strokeWidth="2.4" strokeLinejoin="round" />
          </g>
        );
      })}
      {data.map((d, i) => (i % 5 === 0 ? <text key={d.label} x={x(i)} y={height - 6} textAnchor="middle" className="adm-axis">{d.label}</text> : null))}
    </svg>
  );
}
export function BarChart({ data, keys, colors, height = 240 }) {
  const w = 720;
  const pad = { l: 44, r: 12, t: 12, b: 26 };
  const max = Math.max(...data.map((d) => keys.reduce((s, k) => s + d[k], 0))) * 1.1;
  const bw = (w - pad.l - pad.r) / data.length;
  const y = (v) => pad.t + (1 - v / max) * (height - pad.t - pad.b);
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="adm-chart" role="img" aria-label="Gráfico de barras">
      {[0, 0.5, 1].map((t) => (
        <g key={t}>
          <line x1={pad.l} x2={w - pad.r} y1={y(max * t)} y2={y(max * t)} stroke="var(--adm-line)" />
          <text x={pad.l - 8} y={y(max * t) + 4} textAnchor="end" className="adm-axis">{Math.round((max * t) / 1000)}k</text>
        </g>
      ))}
      {data.map((d, i) => {
        let acc = 0;
        return (
          <g key={d.label}>
            {keys.map((k, ki) => {
              const h = (d[k] / max) * (height - pad.t - pad.b);
              const yy = y(0) - acc - h;
              acc += h;
              return <rect key={k} x={pad.l + i * bw + bw * 0.18} y={yy} width={bw * 0.64} height={h} rx="3" fill={colors[ki]} />;
            })}
            <text x={pad.l + i * bw + bw / 2} y={height - 6} textAnchor="middle" className="adm-axis">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}
export function Donut({ data, size = 170 }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 62;
  const c = 2 * Math.PI * r;
  let off = 0;
  return (
    <div className="adm-donut">
      <svg viewBox="0 0 180 180" width={size} height={size} role="img" aria-label="Reparto de ventas">
        <g transform="rotate(-90 90 90)">
          {data.map((d) => {
            const len = (d.value / total) * c;
            const el = <circle key={d.label} cx="90" cy="90" r={r} fill="none" stroke={d.color} strokeWidth="26" strokeDasharray={`${len - 2} ${c - len + 2}`} strokeDashoffset={-off} />;
            off += len;
            return el;
          })}
        </g>
        <text x="90" y="88" textAnchor="middle" className="adm-donut-n">{Math.round(total / 1000)}k €</text>
        <text x="90" y="106" textAnchor="middle" className="adm-axis">este año</text>
      </svg>
      <ul>
        {data.map((d) => (
          <li key={d.label}><i style={{ background: d.color }} />{d.label}<strong>{Math.round((d.value / total) * 100)}%</strong></li>
        ))}
      </ul>
    </div>
  );
}
export function HBars({ data, suffix = '%' }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <ul className="adm-hbars">
      {data.map((d) => (
        <li key={d.label}>
          <span>{d.label}</span>
          <div><i style={{ width: `${(d.value / max) * 100}%` }} /></div>
          <strong>{d.value}{suffix}</strong>
        </li>
      ))}
    </ul>
  );
}
export function Spark({ values, color = '#1c2c8a' }) {
  const max = Math.max(...values);
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * 100},${28 - (v / max) * 26}`).join(' ');
  return <svg viewBox="0 0 100 30" className="adm-spark" preserveAspectRatio="none"><polyline points={pts} fill="none" stroke={color} strokeWidth="2" /></svg>;
}
