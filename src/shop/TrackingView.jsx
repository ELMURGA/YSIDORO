import { useState } from 'react';
import { ORDERS, STATUS_FLOW, ORDER_STATUS, fmtDateTime } from '../data/mock.js';
import { F, eur, Img } from './shared.jsx';

export default function TrackingView({ lastOrderId }) {
  const [num, setNum] = useState(lastOrderId || 'WEB-2436');
  const [email, setEmail] = useState('');
  const [found, setFound] = useState(lastOrderId ? ORDERS[2] : null);
  function search(e) {
    e.preventDefault();
    setFound(ORDERS.find((o) => o.id.toLowerCase() === num.trim().toLowerCase()) || ORDERS[4]);
  }
  const idx = found ? Math.max(STATUS_FLOW.indexOf(found.status), 0) : 0;
  const pickup = found?.delivery.startsWith('Recogida');
  const labels = pickup ? ['Pedido recibido', 'Pago confirmado', 'Preparando tu pedido', 'Listo para recoger', '', 'Entregado'] : ['Pedido recibido', 'Pago confirmado', 'Preparando tu pedido', '', 'Enviado', 'Entregado'];
  const steps = labels.map((l, i) => ({ l, i })).filter((s) => s.l);
  return (
    <div className="page-view active sh-page">
      <h1>Seguimiento de pedido</h1><p className="sub">Introduce tu número de pedido y el correo con el que compraste.</p>
      <form className="sh-card" onSubmit={search} style={{ marginBottom: 22 }}><div className="sh-form"><F label="Número de pedido" id="t1"><input id="t1" value={num} onChange={(e) => setNum(e.target.value)} placeholder="WEB-2436" /></F><F label="Correo electrónico" id="t2"><input id="t2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" /></F></div><button className="sh-btn accent" type="submit" style={{ marginTop: 14 }}><i className="fa-solid fa-magnifying-glass" /> Buscar pedido</button></form>
      {found && (
        <div className="sh-grid2" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
          <div className="sh-card">
            <h3>Pedido {found.id} · <span className="sh-pill">{ORDER_STATUS[found.status].label}</span></h3>
            <ol className="sh-tl">{steps.map((s) => <li key={s.l} className={s.i < idx ? 'done' : s.i === idx ? 'now' : ''}><i className="fa-solid fa-check" /><div><b>{s.l}</b><span className="sh-muted">{s.i <= idx ? fmtDateTime(new Date(found.date.getTime() + s.i * 3600e3 * 5)) : 'Pendiente'}</span></div></li>)}</ol>
            {pickup && idx >= 3 && <div className="sh-pill green" style={{ display: 'block', padding: 12, borderRadius: 12 }}>¡Tu pedido te espera en {found.delivery.replace('Recogida en ', '')}! Enseña tu número de pedido.</div>}
          </div>
          <div className="sh-card"><h3>Resumen</h3>{found.items.map((it) => <div className="sh-sum-item" key={it.product.id}><Img product={it.product} /><span className="n">{it.product.name.slice(0, 44)}</span><span className="sh-muted">× {it.qty}</span></div>)}<div className="sh-row total"><span>Total</span><span>{eur(found.total)}</span></div><p className="sh-muted">{found.delivery}</p></div>
        </div>
      )}
    </div>
  );
}
