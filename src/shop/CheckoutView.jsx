import { useState } from 'react';
import { ADMIN_PRODUCTS, LOCATIONS } from '../data/mock.js';
import { SCHOOLS_DATA } from '../data/schools.js';
import { eur, FREE_FROM, SHIPPING, COUPONS, Img, F, Back } from './shared.jsx';

const PAYMENTS = [
  { id: 'Tarjeta', icon: 'fa-regular fa-credit-card', t: 'Tarjeta de crédito o débito', s: 'Visa, Mastercard · pago seguro' },
  { id: 'Bizum', icon: 'fa-solid fa-mobile-screen', t: 'Bizum', s: 'Confirmas desde la app de tu banco' },
  { id: 'PayPal', icon: 'fa-brands fa-paypal', t: 'PayPal', s: 'Con tu cuenta PayPal' },
  { id: 'Transferencia', icon: 'fa-solid fa-building-columns', t: 'Transferencia bancaria', s: 'Preparamos el pedido al recibir el pago' },
  { id: 'Pago en tienda', icon: 'fa-solid fa-store', t: 'Pagar al recoger en tienda', s: 'Solo con recogida en tienda', pickupOnly: true },
];

export default function CheckoutView({ cart, subtotal, user, onBack, onPlaced, onLogin }) {
  const [step, setStep] = useState(1);
  const [guest, setGuest] = useState(!user);
  const [data, setData] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', company: false, cif: '', cname: '', address: '', zip: '', city: '' });
  const [delivery, setDelivery] = useState('home');
  const [store, setStore] = useState('centro');
  const [school, setSchool] = useState('CEIP Al-Ándalus');
  const [pay, setPay] = useState('Tarjeta');
  const [code, setCode] = useState('');
  const [coupon, setCoupon] = useState(null);
  const [msg, setMsg] = useState('');
  const [accept, setAccept] = useState(false);
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const discount = coupon ? Math.min(COUPONS[coupon].apply(subtotal), subtotal) : 0;
  const shipping = delivery === 'home' ? (subtotal - discount >= FREE_FROM ? 0 : SHIPPING) : 0;
  const total = subtotal - discount + shipping;
  const pickup = delivery !== 'home';
  const canStep1 = data.name && /\S+@\S+\.\S+/.test(data.email) && data.phone && (!data.company || (data.cif && data.cname));
  const canStep2 = delivery !== 'home' || (data.address && data.zip && data.city);
  const schools = Object.values(SCHOOLS_DATA).flatMap((t) => t.schools);

  function applyCode() {
    const c = code.trim().toUpperCase();
    if (COUPONS[c]) { setCoupon(c); setMsg(''); } else { setCoupon(null); setMsg('Ese cupón no existe o ha caducado.'); }
  }
  function place() {
    const where = delivery === 'home' ? `Envío a ${data.address}, ${data.city}` : delivery === 'store' ? `Recogida en ${LOCATIONS.find((l) => l.id === store).name}` : `Entrega en ${school}`;
    onPlaced({ id: `WEB-${2437 + Math.floor(Math.random() * 40)}`, items: cart, subtotal, discount, shipping, total, pay, where, email: data.email, name: data.name, pickup });
  }

  const unitsIn = (p, l) => ADMIN_PRODUCTS.find((x) => x.id === p.id)?.stockLoc[l] ?? 5;

  return (
    <div className="page-view active sh-page">
      <Back onClick={onBack}>Volver a la tienda</Back>
      <h1>Finalizar compra</h1>
      <p className="sub">Tres pasos y listo. No hace falta crear cuenta.</p>
      <div className="sh-steps" role="tablist">
        {[['Tus datos', 'fa-user'], ['Entrega', 'fa-truck'], ['Pago', 'fa-credit-card']].map(([t], i) => (
          <button key={t} className={step === i + 1 ? 'active' : step > i + 1 ? 'done' : ''} onClick={() => step > i + 1 && setStep(i + 1)}><b>{step > i + 1 ? <i className="fa-solid fa-check" style={{ fontSize: 11 }} /> : i + 1}</b><span>{t}</span></button>
        ))}
      </div>

      <div className="sh-checkout">
        <div>
          {step === 1 && (
            <div className="sh-card">
              {!user && (<div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                <button className={`sh-btn small ${guest ? '' : 'ghost'}`} onClick={() => setGuest(true)}>Comprar como invitado</button>
                <button className="sh-btn small ghost" onClick={onLogin}>Ya tengo cuenta</button></div>)}
              <h3>Tus datos de contacto</h3>
              <div className="sh-form">
                <F label="Nombre y apellidos" id="c-name" full><input id="c-name" value={data.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" /></F>
                <F label="Correo electrónico" id="c-mail"><input id="c-mail" type="email" value={data.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" /></F>
                <F label="Teléfono (te avisamos por WhatsApp)" id="c-tel"><input id="c-tel" type="tel" value={data.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" /></F>
                <label className="full" style={{ display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer' }}><input type="checkbox" checked={data.company} onChange={(e) => set('company', e.target.checked)} /> Necesito factura a nombre de una empresa</label>
                {data.company && <><F label="Empresa" id="c-comp"><input id="c-comp" value={data.cname} onChange={(e) => set('cname', e.target.value)} /></F><F label="CIF / NIF" id="c-cif"><input id="c-cif" value={data.cif} onChange={(e) => set('cif', e.target.value)} /></F></>}
              </div>
              <button className="sh-btn accent" style={{ marginTop: 20 }} disabled={!canStep1} onClick={() => setStep(2)}>Continuar a entrega <i className="fa-solid fa-arrow-right" /></button>
            </div>
          )}

          {step === 2 && (
            <div className="sh-card">
              <h3>¿Cómo quieres recibirlo?</h3>
              <label className={`sh-option ${delivery === 'home' ? 'sel' : ''}`}><input type="radio" name="d" checked={delivery === 'home'} onChange={() => { setDelivery('home'); if (pay === 'Pago en tienda') setPay('Tarjeta'); }} /><div><b><i className="fa-solid fa-truck" /> Envío a domicilio</b><small>Entrega en 24-48 h laborables · gratis desde {eur(FREE_FROM)}</small></div><span className="pr">{subtotal - discount >= FREE_FROM ? 'Gratis' : eur(SHIPPING)}</span></label>
              <label className={`sh-option ${delivery === 'store' ? 'sel' : ''}`}><input type="radio" name="d" checked={delivery === 'store'} onChange={() => setDelivery('store')} /><div><b><i className="fa-solid fa-store" /> Recogida en tienda</b><small>Listo en 2 horas laborables · te avisamos por WhatsApp</small></div><span className="pr">Gratis</span></label>
              <label className={`sh-option ${delivery === 'school' ? 'sel' : ''}`}><input type="radio" name="d" checked={delivery === 'school'} onChange={() => { setDelivery('school'); if (pay === 'Pago en tienda') setPay('Tarjeta'); }} /><div><b><i className="fa-solid fa-school" /> Entrega en el colegio</b><small>Para listas escolares · el día que fija el centro</small></div><span className="pr">Gratis</span></label>

              {delivery === 'home' && <div className="sh-form" style={{ marginTop: 14 }}><F label="Dirección" id="a1" full><input id="a1" value={data.address} onChange={(e) => set('address', e.target.value)} autoComplete="street-address" /></F><F label="Código postal" id="a2"><input id="a2" value={data.zip} onChange={(e) => set('zip', e.target.value)} autoComplete="postal-code" /></F><F label="Localidad" id="a3"><input id="a3" value={data.city} onChange={(e) => set('city', e.target.value)} /></F></div>}
              {delivery === 'store' && (<div style={{ marginTop: 14 }}>
                {LOCATIONS.map((l) => {
                  const all = cart.every((it) => unitsIn(it.product, l.id) >= it.quantity);
                  return (<label key={l.id} className={`sh-option ${store === l.id ? 'sel' : ''}`}><input type="radio" name="s" checked={store === l.id} onChange={() => setStore(l.id)} /><div><b>{l.name}</b><small>{l.address} · {l.hours.split('·')[0]}</small></div><span className={`sh-pill ${all ? 'green' : 'amber'} pr`} style={{ marginLeft: 'auto' }}>{all ? 'Todo disponible hoy' : 'Parte en 24 h'}</span></label>);
                })}
              </div>)}
              {delivery === 'school' && <div className="sh-form" style={{ marginTop: 14 }}><F label="Colegio" id="sc" full><select id="sc" value={school} onChange={(e) => setSchool(e.target.value)}>{schools.map((s) => <option key={s}>{s}</option>)}</select></F><F label="Nombre del alumno/a y curso" id="al" full><input id="al" placeholder="Ej. Lucas Pérez · 3º A" /></F></div>}
              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}><button className="sh-btn ghost" onClick={() => setStep(1)}>Atrás</button><button className="sh-btn accent" disabled={!canStep2} onClick={() => setStep(3)}>Continuar al pago <i className="fa-solid fa-arrow-right" /></button></div>
            </div>
          )}

          {step === 3 && (
            <div className="sh-card">
              <h3>Método de pago</h3>
              {PAYMENTS.filter((p) => !p.pickupOnly || delivery === 'store').map((p) => (
                <label key={p.id} className={`sh-option ${pay === p.id ? 'sel' : ''}`}><input type="radio" name="p" checked={pay === p.id} onChange={() => setPay(p.id)} /><div><b><i className={p.icon} /> {p.t}</b><small>{p.s}</small></div></label>
              ))}
              {pay === 'Tarjeta' && <div className="sh-form" style={{ marginTop: 12 }}><F label="Número de tarjeta" id="cc" full><input id="cc" placeholder="4242 4242 4242 4242" inputMode="numeric" autoComplete="cc-number" /></F><F label="Caducidad" id="ce"><input id="ce" placeholder="MM/AA" autoComplete="cc-exp" /></F><F label="CVV" id="cv"><input id="cv" placeholder="123" autoComplete="cc-csc" /></F></div>}
              <label style={{ display: 'flex', gap: 10, marginTop: 16, alignItems: 'flex-start', cursor: 'pointer' }}><input type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} style={{ marginTop: 4 }} /> <span className="sh-muted">He leído y acepto las condiciones de compra, la política de privacidad y la política de devoluciones.</span></label>
              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}><button className="sh-btn ghost" onClick={() => setStep(2)}>Atrás</button><button className="sh-btn accent" disabled={!accept} onClick={place}><i className="fa-solid fa-lock" /> Pagar {eur(total)}</button></div>
              <p className="sh-muted" style={{ marginTop: 10 }}>Demostración: no se realiza ningún cobro real.</p>
            </div>
          )}
        </div>

        <aside className="sh-card sh-summary">
          <h3>Tu pedido ({cart.reduce((s, i) => s + i.quantity, 0)} artículos)</h3>
          {cart.map((it) => <div className="sh-sum-item" key={it.product.id}><Img product={it.product} /><span className="n">{it.product.name.slice(0, 50)}<br /><small className="sh-muted">× {it.quantity}</small></span><b>{eur(it.product.price * it.quantity)}</b></div>)}
          <div className="sh-coupon"><input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Código de cupón" aria-label="Código de cupón" /><button className="sh-btn small ghost" onClick={applyCode}>Aplicar</button></div>
          {coupon && <p className="sh-ok"><i className="fa-solid fa-circle-check" /> {coupon}: {COUPONS[coupon].label}</p>}{msg && <p style={{ color: 'var(--danger)', fontSize: 13 }}>{msg}</p>}
          <p className="sh-muted" style={{ fontSize: 12 }}>Prueba: COLE10 o BIENVENIDA5</p>
          <div className="sh-row"><span>Subtotal</span><span>{eur(subtotal)}</span></div>
          {discount > 0 && <div className="sh-row" style={{ color: 'var(--success)' }}><span>Descuento</span><span>−{eur(discount)}</span></div>}
          <div className="sh-row"><span>Envío</span><span>{shipping === 0 ? 'Gratis' : eur(shipping)}</span></div>
          <div className="sh-row total"><span>Total</span><span>{eur(total)}</span></div>
          <p className="sh-muted" style={{ fontSize: 12 }}>IVA incluido</p>
        </aside>
      </div>
    </div>
  );
}
