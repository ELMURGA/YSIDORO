import { useEffect, useState } from 'react';
import { PACKS, eur } from '../data/mock.js';
import { PRODUCTS } from '../data/products.js';

export function TrustBar() {
  return (
    <div className="sh-trust">
      {[['fa-truck-fast', 'Envío gratis', 'desde 49 € en pedidos'], ['fa-store', 'Recoge en 2 horas', 'en 3 tiendas'], ['fa-lock', 'Pago 100% seguro', 'Tarjeta, Bizum y PayPal'], ['fa-rotate-left', 'Devolución fácil', '30 días para cambiar']].map(([i, t, s]) => (
        <div key={t}><i className={`fa-solid ${i}`} /><div><b>{t}</b><small>{s}</small></div></div>))}
    </div>
  );
}

function useCountdown(days) {
  const [end] = useState(() => Date.now() + days * 864e5 + 3 * 36e5);
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const d = Math.max(0, end - now);
  return [Math.floor(d / 864e5), Math.floor((d / 36e5) % 24), Math.floor((d / 6e4) % 60), Math.floor((d / 1e3) % 60)];
}

export function CampaignBanner({ onStart }) {
  const [d, h, m, s] = useCountdown(12);
  return (
    <section className="sh-campaign" aria-label="Campaña escolar">
      <div><h3>Pide ahora y recíbelo antes de que empiecen las clases</h3><p>Pedido anticipado de listas escolares con entrega en tu colegio o recogida en tienda. Sin colas.</p></div>
      <div className="sh-count" aria-live="off">{[[d, 'días'], [h, 'horas'], [m, 'min'], [s, 'seg']].map(([v, l]) => <div key={l}><b>{String(v).padStart(2, '0')}</b><small>{l}</small></div>)}</div>
      <button className="sh-btn accent" onClick={onStart}>Buscar mi lista <i className="fa-solid fa-arrow-right" /></button>
    </section>
  );
}

const ICONS = ['fa-shapes', 'fa-pencil', 'fa-book-open', 'fa-graduation-cap', 'fa-laptop'];
export function PacksSection({ onAddMany }) {
  const pool = PRODUCTS.filter((p) => p.stock === 'in-stock' && !String(p.id).startsWith('AUTO'));
  return (
    <section style={{ marginBottom: 50 }}>
      <h3 className="section-title">Kits “Vuelta al cole”</h3>
      <div className="sh-packs">
        {PACKS.map((k, idx) => (
          <article className="sh-pack" key={k.id}>
            <span className="tag">−{Math.round((1 - k.price / k.normal) * 100)}%</span>
            <i className={`ic fa-solid ${ICONS[idx % ICONS.length]}`} />
            <h4>{k.name}</h4><p>{k.items} artículos seleccionados por nuestros dependientes. Todo lo básico en un clic.</p>
            <div className="price">{eur(k.price)}<s>{eur(k.normal)}</s></div>
            <button className="sh-btn small" onClick={() => onAddMany(pool.slice(idx * 3, idx * 3 + 4).map((p) => ({ product: p, quantity: 1 })))}><i className="fa-solid fa-cart-plus" /> Añadir kit</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export function BottomBand({ onBusiness }) {
  const [ok, setOk] = useState(false);
  return (
    <section className="sh-band">
      <div><h3>¿Eres una empresa o autónomo?</h3><p className="sh-muted">Tarifa profesional, pago a 30 días y pedidos recurrentes de folios y tóner.</p><button className="sh-btn small" style={{ marginTop: 12 }} onClick={onBusiness}>Ver Isidoro Empresas</button></div>
      <div><h3>Ofertas y novedades en tu correo</h3><p className="sh-muted">Un aviso cuando salgan las listas de tu colegio. Sin spam.</p>
        {ok ? <p className="sh-ok" style={{ marginTop: 12 }}><i className="fa-solid fa-circle-check" /> ¡Apuntado! Revisa tu correo.</p> : <form className="sh-news" onSubmit={(e) => { e.preventDefault(); setOk(true); }}><input type="email" required placeholder="tu@correo.com" aria-label="Correo electrónico" /><button className="sh-btn">Suscribirme</button></form>}</div>
    </section>
  );
}
