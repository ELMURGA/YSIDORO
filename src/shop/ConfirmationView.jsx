import { eur, Img } from './shared.jsx';

export default function ConfirmationView({ order, onTrack, onShop, onAccount, hasUser }) {
  if (!order) return null;
  const steps = order.pickup
    ? [['fa-envelope', 'Te hemos enviado la confirmación', `A ${order.email}`], ['fa-boxes-packing', 'Preparamos tu pedido', 'Normalmente en menos de 2 horas laborables'], ['fa-bell', 'Te avisamos por WhatsApp y email', 'Cuando esté listo para recoger'], ['fa-store', 'Lo recoges con tu nº de pedido', order.where]]
    : [['fa-envelope', 'Te hemos enviado la confirmación', `A ${order.email}`], ['fa-boxes-packing', 'Preparamos tu pedido', 'En el día si compras antes de las 14:00'], ['fa-truck', 'Sale de camino', 'Recibirás el seguimiento por email'], ['fa-house', 'Llega a tu puerta', order.where]];
  return (
    <div className="page-view active sh-page">
      <div className="sh-confirm">
        <div className="big"><i className="fa-solid fa-check" /></div>
        <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--neutral-dark)' }}>¡Gracias, {order.name.split(' ')[0]}!</h1>
        <p className="sub" style={{ margin: '4px auto 20px' }}>Tu pedido <b>{order.id}</b> está confirmado. Total pagado: <b>{eur(order.total)}</b> ({order.pay}).</p>
        <div className="sh-card" style={{ textAlign: 'left' }}>
          <h3>Qué pasa ahora</h3>
          <div className="sh-steps-next">{steps.map(([i, t, s]) => <div key={t}><i className={`fa-solid ${i}`} /><div><b style={{ color: 'var(--neutral-dark)' }}>{t}</b><br /><span className="sh-muted">{s}</span></div></div>)}</div>
          <h3 style={{ marginTop: 6 }}>Resumen</h3>
          {order.items.map((it) => <div className="sh-sum-item" key={it.product.id}><Img product={it.product} /><span className="n">{it.product.name.slice(0, 60)}</span><span className="sh-muted">× {it.quantity}</span><b>{eur(it.product.price * it.quantity)}</b></div>)}
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 22, flexWrap: 'wrap' }}>
          <button className="sh-btn" onClick={onTrack}><i className="fa-solid fa-location-dot" /> Seguir mi pedido</button>
          <button className="sh-btn ghost" onClick={onShop}>Seguir comprando</button>
        </div>
        {!hasUser && <div className="sh-card" style={{ marginTop: 22, textAlign: 'left', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}><i className="fa-solid fa-user-plus" style={{ fontSize: 26, color: 'var(--accent)' }} /><div style={{ flex: 1, minWidth: 200 }}><b style={{ color: 'var(--neutral-dark)' }}>Crea tu cuenta en un clic</b><p className="sh-muted">Guarda tus datos, repite este pedido el año que viene y ten las listas de tus hijos a mano.</p></div><button className="sh-btn accent small" onClick={onAccount}>Crear cuenta</button></div>}
      </div>
    </div>
  );
}
