import { useState } from 'react';
import './admin.css';
import { navigate } from '../router.js';
import { Toaster, Field, Btn } from './ui.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Orders from './pages/Orders.jsx';
import Picking from './pages/Picking.jsx';
import Products from './pages/Products.jsx';
import ImportExport from './pages/ImportExport.jsx';
import Stock from './pages/Stock.jsx';
import Suppliers from './pages/Suppliers.jsx';
import Schools from './pages/Schools.jsx';
import Customers from './pages/Customers.jsx';
import Promotions from './pages/Promotions.jsx';
import Marketing from './pages/Marketing.jsx';
import Inbox from './pages/Inbox.jsx';
import Invoices from './pages/Invoices.jsx';
import Reports from './pages/Reports.jsx';
import Tpv from './pages/Tpv.jsx';
import Team from './pages/Team.jsx';
import Settings from './pages/Settings.jsx';

const NAV = [
  { group: 'Día a día', items: [
    { to: '/admin', label: 'Panel de control', icon: 'fa-solid fa-gauge-high', page: Dashboard },
    { to: '/admin/pedidos', label: 'Pedidos', icon: 'fa-solid fa-bag-shopping', badge: 6, page: Orders },
    { to: '/admin/preparacion', label: 'Preparación', icon: 'fa-solid fa-boxes-packing', page: Picking },
    { to: '/admin/mensajes', label: 'Mensajes y reseñas', icon: 'fa-solid fa-comments', badge: 4, page: Inbox },
  ] },
  { group: 'Catálogo e inventario', items: [
    { to: '/admin/productos', label: 'Productos', icon: 'fa-solid fa-tags', page: Products },
    { to: '/admin/stock', label: 'Stock por tienda', icon: 'fa-solid fa-warehouse', page: Stock },
    { to: '/admin/proveedores', label: 'Proveedores y compras', icon: 'fa-solid fa-truck-ramp-box', page: Suppliers },
    { to: '/admin/importar', label: 'Importar / Exportar', icon: 'fa-solid fa-file-arrow-up', page: ImportExport },
  ] },
  { group: 'Campaña escolar', items: [
    { to: '/admin/colegios', label: 'Colegios y listas', icon: 'fa-solid fa-school', page: Schools },
  ] },
  { group: 'Clientes y ventas', items: [
    { to: '/admin/clientes', label: 'Clientes y empresas', icon: 'fa-solid fa-users', page: Customers },
    { to: '/admin/promociones', label: 'Promociones y packs', icon: 'fa-solid fa-percent', page: Promotions },
    { to: '/admin/marketing', label: 'Marketing y portada', icon: 'fa-solid fa-bullhorn', page: Marketing },
  ] },
  { group: 'Administración', items: [
    { to: '/admin/facturas', label: 'Facturas y contabilidad', icon: 'fa-solid fa-file-invoice-dollar', page: Invoices },
    { to: '/admin/informes', label: 'Informes', icon: 'fa-solid fa-chart-line', page: Reports },
    { to: '/admin/equipo', label: 'Equipo y permisos', icon: 'fa-solid fa-user-shield', page: Team },
    { to: '/admin/ajustes', label: 'Ajustes', icon: 'fa-solid fa-gear', page: Settings },
  ] },
  { group: 'Fase final', items: [
    { to: '/admin/tpv', label: 'Conexión con el TPV', icon: 'fa-solid fa-barcode', soon: true, page: Tpv },
  ] },
];
const ALL = NAV.flatMap((g) => g.items);

function Login() {
  return (
    <div className="adm-login">
      <form className="adm-login-card" onSubmit={(e) => { e.preventDefault(); navigate('/admin'); }}>
        <div className="adm-brand-mark" style={{ width: 46, height: 46, borderRadius: 13, background: 'linear-gradient(135deg,#fb13bf,#6d28d9)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 20 }}>I</div>
        <h1>Panel de gestión</h1>
        <p>Librería Papelería Isidoro · IPAPEL</p>
        <Field label="Correo electrónico"><input defaultValue="isidoro@libreriaisidoro.example" type="email" /></Field>
        <Field label="Contraseña"><input defaultValue="demo-demo" type="password" /></Field>
        <Btn variant="primary" type="submit" icon="fa-solid fa-right-to-bracket">Entrar</Btn>
        <p style={{ marginTop: 14, fontSize: 12.5 }}>Versión de demostración · datos ficticios</p>
      </form>
    </div>
  );
}

export default function AdminApp({ path }) {
  const [menu, setMenu] = useState(false);
  if (path === '/admin/login') return <Login />;
  const clean = path.replace(/\/$/, '') || '/admin';
  const active = ALL.find((i) => i.to === clean) || ALL[0];
  const Page = active.page;

  return (
    <div className="adm-root">
      {menu && <div className="adm-scrim" onClick={() => setMenu(false)} aria-hidden="true" />}
      <aside className={`adm-side ${menu ? 'open' : ''}`}>
        <div className="adm-brand">
          <div className="adm-brand-mark">I</div>
          <div><b>Isidoro · IPAPEL</b><span>Panel de gestión</span></div>
          <button className="adm-side-close" onClick={() => setMenu(false)} aria-label="Cerrar menú"><i className="fa-solid fa-xmark" /></button>
        </div>
        <nav className="adm-nav" onClick={() => setMenu(false)}>
          {NAV.map((g) => (
            <div key={g.group}>
              <h6>{g.group}</h6>
              {g.items.map((it) => (
                <a key={it.to} href={`#${it.to}`} className={it.to === active.to ? 'active' : ''}>
                  <i className={it.icon} /> {it.label}
                  {it.badge && <em>{it.badge}</em>}
                  {it.soon && <span className="soon">Después</span>}
                </a>
              ))}
            </div>
          ))}
        </nav>
        <div className="adm-side-foot">
          <a href="#/"><i className="fa-solid fa-store" /> Ver la tienda online</a>
        </div>
      </aside>

      <div className="adm-main">
        <header className="adm-top">
          <button className="adm-menu-btn" onClick={() => setMenu((v) => !v)} aria-label="Menú"><i className="fa-solid fa-bars" /></button>
          <label className="adm-search">
            <i className="fa-solid fa-magnifying-glass" />
            <input placeholder="Buscar pedido, cliente, producto o código de barras…" />
          </label>
          <div className="adm-top-right">
            <span className="adm-chip adm-store-chip"><i className="fa-solid fa-location-dot" /> Todas las tiendas</span>
            <button className="adm-bell" aria-label="Avisos"><i className="fa-regular fa-bell" /><em>7</em></button>
            <div className="adm-user">
              <div className="adm-avatar">IS</div>
              <div><b>Isidoro</b><small>Propietario</small></div>
              <button className="adm-icon-btn" title="Cerrar sesión" onClick={() => navigate('/admin/login')}><i className="fa-solid fa-right-from-bracket" /></button>
            </div>
          </div>
        </header>
        <main className="adm-content" key={active.to}><Page /></main>
      </div>
      <Toaster />
    </div>
  );
}
