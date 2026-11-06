import { PageHeader, Card, Stat, Badge, LineChart, Donut, Progress, Btn } from '../ui.jsx';
import { navigate } from '../../router.js';
import { ORDERS, ORDER_STATUS, SALES_30, SALES_BY_LOCATION, eur, ADMIN_PRODUCTS, totalStock, MESSAGES } from '../../data/mock.js';

export default function Dashboard() {
  const today = SALES_30[29];
  const pending = ORDERS.filter((o) => ['nuevo', 'pagado'].includes(o.status)).length;
  const low = ADMIN_PRODUCTS.filter((p) => totalStock(p) <= p.min && p.published).slice(0, 5);
  const top = [...ADMIN_PRODUCTS].filter((p) => !String(p.id).startsWith('AUTO')).sort((a, b) => b.sold30 - a.sold30).slice(0, 5);

  return (
    <>
      <PageHeader title="Buenos días, Isidoro" subtitle="Resumen de tus tres tiendas y la web. Todo en una sola pantalla.">
        <Btn icon="fa-solid fa-plus" variant="primary" onClick={() => navigate('/admin/productos')}>Nuevo producto</Btn>
        <Btn icon="fa-solid fa-bag-shopping" onClick={() => navigate('/admin/pedidos')}>Ver pedidos</Btn>
      </PageHeader>

      <div className="adm-grid g4">
        <Stat label="Ventas de hoy" value={eur(today.web + today.tienda)} delta="+12% vs. ayer" icon="fa-solid fa-euro-sign" tone="green" hint={`Web ${eur(today.web)} · Tiendas ${eur(today.tienda)}`} />
        <Stat label="Pedidos por preparar" value={pending} icon="fa-solid fa-boxes-packing" tone="amber" hint="Nuevos y pagados" />
        <Stat label="Ticket medio web" value={eur(46.8)} delta="+3,4%" icon="fa-solid fa-receipt" tone="blue" />
        <Stat label="Conversión de la web" value="3,7%" delta="+0,6 pts" icon="fa-solid fa-bullseye" tone="pink" />
      </div>

      <div className="adm-grid g21">
        <Card title="Ventas de los últimos 30 días" action={<div className="adm-legend"><span><i style={{ background: '#fb13bf' }} />Web</span><span><i style={{ background: '#1c2c8a' }} />Tiendas</span></div>}>
          <LineChart data={SALES_30} keys={['web', 'tienda']} colors={['#fb13bf', '#1c2c8a']} />
        </Card>
        <Card title="Reparto de ventas por canal"><Donut data={SALES_BY_LOCATION} /></Card>
      </div>

      <div className="adm-grid g3">
        <Card title="Campaña escolar 2026-27" action={<Badge color="pink">En curso</Badge>}>
          <div className="adm-stack">
            <div><div className="adm-small adm-muted">Listas de colegio pedidas</div><strong style={{ fontSize: 22 }}>1.284</strong> <span className="adm-muted">de 1.800 previstas</span><Progress value={1284} max={1800} tone="pink" /></div>
            <div><div className="adm-small adm-muted">Colegios con lista publicada</div><strong style={{ fontSize: 22 }}>16</strong> <span className="adm-muted">de 24</span><Progress value={16} max={24} /></div>
            <div><div className="adm-small adm-muted">Pedidos a recoger en tienda</div><strong style={{ fontSize: 22 }}>312</strong><Progress value={312} max={450} tone="green" /></div>
            <Btn small onClick={() => navigate('/admin/colegios')} icon="fa-solid fa-school">Gestionar colegios</Btn>
          </div>
        </Card>
        <Card title="Necesita tu atención">
          <ul className="adm-list">
            <li><span className="adm-alert-ic" style={{ background: '#ffe3e3', color: '#c42d2d' }}><i className="fa-solid fa-triangle-exclamation" /></span><div className="grow"><b>{ADMIN_PRODUCTS.filter((p) => totalStock(p) <= p.min).length} productos con stock bajo</b><small>Reponer antes del fin de semana</small></div><Btn small onClick={() => navigate('/admin/stock')}>Ver</Btn></li>
            <li><span className="adm-alert-ic" style={{ background: '#fff1d6', color: '#b36b00' }}><i className="fa-solid fa-envelope" /></span><div className="grow"><b>{MESSAGES.filter((m) => m.state === 'Sin responder').length} mensajes sin responder</b><small>El más antiguo: hace 1 día</small></div><Btn small onClick={() => navigate('/admin/mensajes')}>Ver</Btn></li>
            <li><span className="adm-alert-ic" style={{ background: '#e3edff', color: '#1f4fcf' }}><i className="fa-solid fa-star" /></span><div className="grow"><b>2 reseñas por aprobar</b><small>Publicarlas mejora la confianza</small></div><Btn small onClick={() => navigate('/admin/mensajes')}>Ver</Btn></li>
            <li><span className="adm-alert-ic" style={{ background: '#f1e5ff', color: '#7a2bd1' }}><i className="fa-solid fa-file-invoice" /></span><div className="grow"><b>3 facturas de empresa vencen esta semana</b><small>Total pendiente 1.240 €</small></div><Btn small onClick={() => navigate('/admin/facturas')}>Ver</Btn></li>
            <li><span className="adm-alert-ic" style={{ background: '#def7e8', color: '#17803f' }}><i className="fa-solid fa-user-plus" /></span><div className="grow"><b>2 solicitudes de alta de empresa</b><small>Esperan tu aprobación</small></div><Btn small onClick={() => navigate('/admin/clientes')}>Ver</Btn></li>
          </ul>
        </Card>
        <Card title="Más vendidos (30 días)">
          <ul className="adm-list">
            {top.map((p) => (
              <li key={p.id}><img src={p.image} alt="" width="38" height="38" style={{ borderRadius: 8, objectFit: 'cover' }} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = p.fallbackImage; }} />
                <div className="grow"><b style={{ fontSize: 13 }}>{p.name.slice(0, 38)}</b><small>{p.sold30} uds.</small></div><span className="adm-num">{eur(p.price * p.sold30)}</span></li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="adm-grid g2">
        <Card title="Últimos pedidos" action={<Btn small onClick={() => navigate('/admin/pedidos')}>Ver todos</Btn>} pad={false}>
          <ul className="adm-list" style={{ padding: '4px 20px 10px' }}>
            {ORDERS.slice(0, 6).map((o) => (
              <li key={o.id}><div className="grow"><b>{o.id}</b> · {o.customer.name}<small>{o.delivery}</small></div><span className="adm-num">{eur(o.total)}</span><Badge color={ORDER_STATUS[o.status].color}>{ORDER_STATUS[o.status].label}</Badge></li>
            ))}
          </ul>
        </Card>
        <Card title="Stock bajo — productos a reponer" action={<Btn small onClick={() => navigate('/admin/proveedores')}>Crear pedido a proveedor</Btn>} pad={false}>
          <ul className="adm-list" style={{ padding: '4px 20px 10px' }}>
            {low.map((p) => (
              <li key={p.id}><div className="grow"><b style={{ fontSize: 13 }}>{p.name.slice(0, 46)}</b><small>Mínimo {p.min} · Centro {p.stockLoc.centro} · Plaza {p.stockLoc.plaza} · Nave {p.stockLoc.nave}</small></div><Badge color={totalStock(p) === 0 ? 'red' : 'amber'}>{totalStock(p)} uds.</Badge></li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
