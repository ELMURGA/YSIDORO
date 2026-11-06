import { useState } from 'react';
import { PageHeader, Card, Stat, Table, Badge, Btn, Tabs, SearchInput, Drawer, toast } from '../ui.jsx';
import { CUSTOMERS, ORDERS, ORDER_STATUS, eur, fmtDate } from '../../data/mock.js';

const REQUESTS = [
  { id: 'q1', name: 'Taller Mecánico Los Pinos S.L.', cif: 'B-55667788', city: 'Utrera', date: 'Hoy' },
  { id: 'q2', name: 'Estudio de Arquitectura Rivas', cif: 'B-99001122', city: 'Sevilla', date: 'Ayer' },
];

export default function Customers() {
  const [tab, setTab] = useState('todos');
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(null);
  const rows = CUSTOMERS.filter((c) => (tab === 'todos' || (tab === 'empresas' ? c.type !== 'Particular' : c.type === 'Particular')) && c.name.toLowerCase().includes(q.toLowerCase()));
  const orders = sel ? ORDERS.filter((o) => o.customer.id === sel.id) : [];
  return (
    <>
      <PageHeader title="Clientes y empresas" subtitle="Familias, empresas con tarifa propia y AMPAs. Con su historial, hijos y colegios." icon="fa-solid fa-users">
        <Btn icon="fa-solid fa-file-export" onClick={() => toast('Clientes exportados (demo)')}>Exportar</Btn>
        <Btn variant="primary" icon="fa-solid fa-user-plus" onClick={() => toast('Nuevo cliente (demo)', 'info')}>Nuevo cliente</Btn>
      </PageHeader>
      <div className="adm-grid g4">
        <Stat label="Clientes totales" value="2.916" delta="+148 este mes" icon="fa-solid fa-users" tone="blue" /><Stat label="Familias con hijos" value="1.842" icon="fa-solid fa-children" tone="pink" />
        <Stat label="Empresas con tarifa" value="86" icon="fa-solid fa-building" tone="teal" /><Stat label="Clientes que repiten" value="58%" delta="+4 pts" icon="fa-solid fa-rotate" tone="green" />
      </div>
      <Tabs value={tab} onChange={setTab} tabs={[{ key: 'todos', label: 'Todos' }, { key: 'particulares', label: 'Particulares' }, { key: 'empresas', label: 'Empresas y AMPAs' }, { key: 'solicitudes', label: 'Solicitudes de alta', count: REQUESTS.length }]} />
      {tab === 'solicitudes' ? (
        <Card pad={false}><Table rows={REQUESTS} columns={[{ key: 'name', label: 'Empresa' }, { key: 'cif', label: 'CIF' }, { key: 'city', label: 'Localidad' }, { key: 'date', label: 'Solicitada' },
          { label: '', align: 'right', render: () => <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}><Btn small variant="primary" onClick={() => toast('Empresa aprobada con Tarifa B (demo)')}>Aprobar</Btn><Btn small variant="danger" onClick={() => toast('Solicitud rechazada', 'info')}>Rechazar</Btn></div> }]} /></Card>
      ) : (
        <>
          <div className="adm-toolbar"><div className="grow"><SearchInput value={q} onChange={setQ} placeholder="Buscar cliente…" /></div></div>
          <Card pad={false}><Table onRowClick={setSel} rows={rows} columns={[
            { label: 'Cliente', render: (c) => <div className="adm-pthumb" style={{ minWidth: 0 }}><div className="adm-avatar" style={{ background: c.type === 'Particular' ? '#1c2c8a' : '#0b7f7d' }}>{c.name.split(' ').slice(0, 2).map((w) => w[0]).join('')}</div><div><b>{c.name}</b><small>{c.email}</small></div></div> },
            { label: 'Tipo', render: (c) => <Badge color={c.type === 'Particular' ? 'blue' : 'teal'}>{c.type}</Badge> }, { key: 'city', label: 'Localidad' }, { label: 'Pedidos', align: 'right', render: (c) => c.orders },
            { label: 'Total gastado', align: 'right', render: (c) => <span className="adm-num">{eur(c.spent)}</span> }, { label: 'Etiquetas', render: (c) => c.tags.map((t) => <span key={t} className="adm-chip" style={{ marginRight: 4 }}>{t}</span>) }]} /></Card>
        </>
      )}
      <Drawer open={!!sel} onClose={() => setSel(null)} wide title={sel?.name} subtitle={sel && `Cliente desde ${sel.since} · ${sel.type}`}
        footer={<><Btn icon="fa-brands fa-whatsapp" onClick={() => toast('WhatsApp abierto (demo)', 'info')}>WhatsApp</Btn><Btn icon="fa-solid fa-envelope" onClick={() => toast('Email redactado (demo)', 'info')}>Enviar email</Btn><Btn variant="primary" onClick={() => toast('Cliente guardado')}>Guardar</Btn></>}>
        {sel && (<div className="adm-stack" style={{ gap: 18 }}>
          <div className="adm-grid g3" style={{ marginBottom: 0 }}><Stat label="Pedidos" value={sel.orders} icon="fa-solid fa-bag-shopping" tone="blue" /><Stat label="Gastado" value={eur(sel.spent)} icon="fa-solid fa-euro-sign" tone="green" /><Stat label="Ticket medio" value={eur(sel.spent / sel.orders)} icon="fa-solid fa-receipt" tone="pink" /></div>
          <dl className="adm-kv"><dt>Email</dt><dd>{sel.email}</dd><dt>Teléfono</dt><dd>{sel.phone}</dd><dt>Localidad</dt><dd>{sel.city}</dd>{sel.cif && <><dt>CIF</dt><dd>{sel.cif}</dd><dt>Tarifa</dt><dd>{sel.tariff}</dd><dt>Pago</dt><dd>{sel.credit}</dd></>}</dl>
          {sel.kids.length > 0 && <div><h3 style={{ fontSize: 14, marginBottom: 8 }}>Hijos y colegios</h3><ul className="adm-list">{sel.kids.map((k) => <li key={k.n}><i className="fa-solid fa-child" style={{ color: 'var(--adm-accent)' }} /><div className="grow"><b>{k.n}</b><small>{k.school} · {k.course}</small></div><Badge color="green">Lista cargada</Badge></li>)}</ul></div>}
          <div><h3 style={{ fontSize: 14, marginBottom: 8 }}>Últimos pedidos</h3>{orders.length === 0 ? <p className="adm-muted">Sin pedidos recientes.</p> : <ul className="adm-list">{orders.slice(0, 5).map((o) => <li key={o.id}><div className="grow"><b>{o.id}</b><small>{fmtDate(o.date)} · {o.delivery}</small></div><span className="adm-num">{eur(o.total)}</span><Badge color={ORDER_STATUS[o.status].color}>{ORDER_STATUS[o.status].label}</Badge></li>)}</ul>}</div>
          <div><h3 style={{ fontSize: 14, marginBottom: 8 }}>Notas internas</h3><textarea style={{ width: '100%', minHeight: 70, borderRadius: 10, border: '1px solid var(--adm-line)', padding: 10, font: 'inherit' }} placeholder="Ej. Prefiere recoger por la tarde en Tienda Centro." /></div>
        </div>)}
      </Drawer>
    </>
  );
}
