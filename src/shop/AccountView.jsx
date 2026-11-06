import { useState } from 'react';
import { CUSTOMERS, ORDERS, ORDER_STATUS, INVOICES, fmtDate } from '../data/mock.js';
import { useFavorites } from '../hooks/useFavorites.js';
import { eur, F } from './shared.jsx';

const NAV = [['resumen', 'fa-house', 'Resumen'], ['pedidos', 'fa-bag-shopping', 'Mis pedidos'], ['hijos', 'fa-children', 'Mis hijos y listas'], ['favoritos', 'fa-heart', 'Favoritos'], ['direcciones', 'fa-location-dot', 'Direcciones'], ['facturas', 'fa-file-invoice', 'Facturas'], ['datos', 'fa-user-gear', 'Mis datos']];

export default function AccountView({ onLogout, onTrack, onRepeat, onOpenList, onOpenFavorites }) {
  const [tab, setTab] = useState('resumen');
  const { favorites } = useFavorites();
  const me = CUSTOMERS[0];
  const orders = ORDERS.filter((o) => o.customer.id === me.id).slice(0, 5);
  const myOrders = orders.length ? orders : ORDERS.slice(0, 3);
  const invoices = INVOICES.filter((i) => i.customer === me.name).slice(0, 5);

  return (
    <div className="page-view active sh-page">
      <h1>Mi cuenta</h1><p className="sub">Hola, {me.name.split(' ')[0]}. Aquí tienes todo lo tuyo en un solo sitio.</p>
      <div className="sh-account">
        <aside className="sh-side">
          <div className="who"><div className="av">LG</div><div><b style={{ color: 'var(--neutral-dark)' }}>{me.name}</b><br /><small className="sh-muted">Cliente desde {me.since}</small></div></div>
          {NAV.map(([k, i, l]) => <button key={k} className={`nav ${tab === k ? 'active' : ''}`} onClick={() => (k === 'favoritos' ? onOpenFavorites() : setTab(k))}><i className={`fa-solid ${i}`} />{l}{k === 'favoritos' && favorites.length > 0 && <span className="sh-pill pink" style={{ marginLeft: 'auto' }}>{favorites.length}</span>}</button>)}
          <button className="nav" onClick={onLogout}><i className="fa-solid fa-right-from-bracket" />Cerrar sesión</button>
        </aside>

        <div>
          {tab === 'resumen' && (<div style={{ display: 'grid', gap: 18 }}>
            <div className="sh-grid3"><div className="sh-stat"><span className="sh-muted">Pedidos realizados</span><b>{me.orders}</b></div><div className="sh-stat"><span className="sh-muted">Mis puntos</span><b>412</b><small className="sh-muted">= 4,12 € de descuento</small></div><div className="sh-stat"><span className="sh-muted">Hijos con lista guardada</span><b>{me.kids.length}</b></div></div>
            <div className="sh-card" style={{ background: 'linear-gradient(120deg, var(--primary), #7a1fa2)', color: '#fff' }}><h3 style={{ color: '#fff' }}>Pide de nuevo la lista del curso</h3><p style={{ opacity: .9, marginBottom: 14 }}>Ya tenemos cargada la lista de {me.kids[0].n} ({me.kids[0].course}). Revísala y pídela en un clic.</p><button className="sh-btn accent small" onClick={() => onOpenList(me.kids[0].school, me.kids[0].course)}>Ver la lista y comprar</button></div>
            <div className="sh-card"><h3>Último pedido</h3>{myOrders.slice(0, 1).map((o) => <div className="sh-order" key={o.id} style={{ margin: 0 }}><div className="grow"><b>{o.id}</b><br /><span className="sh-muted">{fmtDate(o.date)} · {o.delivery}</span></div><b>{eur(o.total)}</b><span className="sh-pill">{ORDER_STATUS[o.status].label}</span><button className="sh-btn small ghost" onClick={onTrack}>Seguir</button></div>)}</div>
          </div>)}

          {tab === 'pedidos' && (<div>{myOrders.map((o) => (
            <div className="sh-order" key={o.id}><div className="grow"><b>{o.id}</b> <span className={`sh-pill ${o.status === 'entregado' ? 'green' : 'amber'}`}>{ORDER_STATUS[o.status].label}</span><br /><span className="sh-muted">{fmtDate(o.date)} · {o.delivery} · {o.items.length} artículos</span></div><b>{eur(o.total)}</b>
              <div style={{ display: 'flex', gap: 8 }}><button className="sh-btn small ghost" onClick={onTrack}>Seguir</button><button className="sh-btn small" onClick={() => onRepeat(o.items)}><i className="fa-solid fa-rotate" /> Repetir pedido</button></div></div>))}</div>)}

          {tab === 'hijos' && (<div>
            <div className="sh-grid2">{me.kids.map((k) => (
              <div className="sh-kid" key={k.n}><div className="av"><i className="fa-solid fa-child-reaching" /></div><b style={{ color: 'var(--neutral-dark)', fontSize: 18 }}>{k.n}</b><span className="sh-muted">{k.school}<br />{k.course}</span>
                <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}><button className="sh-btn small" onClick={() => onOpenList(k.school, k.course)}>Ver lista y comprar</button><button className="sh-btn small ghost">Pasar al curso siguiente</button></div></div>))}
              <div className="sh-kid" style={{ borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}><i className="fa-solid fa-circle-plus" style={{ fontSize: 28, color: 'var(--accent)' }} /><b style={{ color: 'var(--neutral-dark)' }}>Añadir otro hijo/a</b></div></div>
            <p className="sh-muted" style={{ marginTop: 14 }}>Si el colegio cambia algo en la lista, te avisamos por email antes de que compres.</p></div>)}

          {tab === 'direcciones' && (<div className="sh-grid2"><div className="sh-card"><h3>Casa <span className="sh-pill green">Predeterminada</span></h3><p>{me.name}<br />C/ Ejemplo, 12 · 41710 Utrera<br />{me.phone}</p></div><div className="sh-card" style={{ borderStyle: 'dashed', display: 'grid', placeItems: 'center' }}><b><i className="fa-solid fa-plus" /> Añadir dirección</b></div></div>)}

          {tab === 'facturas' && (<div className="sh-card"><h3>Mis facturas</h3>{(invoices.length ? invoices : INVOICES.slice(0, 3)).map((i) => <div key={i.id} className="sh-order" style={{ margin: '0 0 8px' }}><div className="grow"><b>{i.id}</b><br /><span className="sh-muted">{fmtDate(i.date)} · pedido {i.order}</span></div><b>{eur(i.total)}</b><button className="sh-btn small ghost"><i className="fa-solid fa-file-pdf" /> Descargar PDF</button></div>)}</div>)}

          {tab === 'datos' && (<div className="sh-card"><h3>Mis datos</h3><div className="sh-form"><F label="Nombre" id="m1"><input id="m1" defaultValue={me.name} /></F><F label="Correo" id="m2"><input id="m2" defaultValue={me.email} /></F><F label="Teléfono" id="m3"><input id="m3" defaultValue={me.phone} /></F><F label="Contraseña" id="m4"><input id="m4" type="password" defaultValue="********" /></F><label className="full" style={{ display: 'flex', gap: 10 }}><input type="checkbox" defaultChecked /> Quiero recibir avisos de mis pedidos por WhatsApp</label><label className="full" style={{ display: 'flex', gap: 10 }}><input type="checkbox" defaultChecked /> Quiero recibir ofertas y novedades por email</label></div><button className="sh-btn accent" style={{ marginTop: 16 }}>Guardar cambios</button></div>)}
        </div>
      </div>
    </div>
  );
}
