import { useMemo, useState } from 'react';
import { PageHeader, Card, Table, Badge, Btn, Tabs, SearchInput, Drawer, Select, Timeline, toast } from '../ui.jsx';
import { ORDERS, ORDER_STATUS, STATUS_FLOW, eur, fmtDateTime, fmtDate } from '../../data/mock.js';

export default function Orders() {
  const [orders, setOrders] = useState(ORDERS);
  const [tab, setTab] = useState('todos');
  const [q, setQ] = useState('');
  const [delivery, setDelivery] = useState('Todas');
  const [sel, setSel] = useState(null);

  const counts = useMemo(() => {
    const c = { todos: orders.length };
    orders.forEach((o) => { c[o.status] = (c[o.status] || 0) + 1; });
    return c;
  }, [orders]);
  const rows = orders.filter((o) => (tab === 'todos' || o.status === tab) && (delivery === 'Todas' || o.delivery === delivery)
    && (o.id + o.customer.name).toLowerCase().includes(q.toLowerCase()));
  const current = sel && orders.find((o) => o.id === sel);

  function setStatus(id, status) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    toast(`Pedido ${id} → ${ORDER_STATUS[status].label}. Se avisa al cliente automáticamente.`);
  }
  const tabs = [{ key: 'todos', label: 'Todos', count: counts.todos }, ...['nuevo', 'pagado', 'preparando', 'listo', 'enviado', 'entregado'].map((k) => ({ key: k, label: ORDER_STATUS[k].label, count: counts[k] || 0 })), { key: 'devuelto', label: 'Devoluciones', count: counts.devuelto || 0 }];

  return (
    <>
      <PageHeader title="Pedidos" subtitle="Todos los pedidos de la web y los encargos por teléfono, con su estado en cada paso." icon="fa-solid fa-bag-shopping">
        <Btn icon="fa-solid fa-file-export" onClick={() => toast('Pedidos exportados a Excel (demo)')}>Exportar</Btn>
        <Btn variant="primary" icon="fa-solid fa-plus" onClick={() => toast('Aquí se crearía un pedido manual (demo)', 'info')}>Pedido manual</Btn>
      </PageHeader>
      <Tabs tabs={tabs} value={tab} onChange={setTab} />
      <div className="adm-toolbar">
        <div className="grow"><SearchInput value={q} onChange={setQ} placeholder="Buscar por nº de pedido o cliente…" /></div>
        <Select label="Entrega" value={delivery} onChange={setDelivery} options={['Todas', 'Envío a domicilio', 'Recogida en Tienda Centro', 'Recogida en Tienda Plaza', 'Recogida en Nave', 'Entrega en el colegio']} />
      </div>
      <Card pad={false}>
        <Table onRowClick={(o) => setSel(o.id)} rows={rows.map((o) => ({ ...o, id: o.id }))} columns={[
          { label: 'Pedido', render: (o) => <b>{o.id}</b> },
          { label: 'Fecha', render: (o) => fmtDate(o.date) },
          { label: 'Cliente', render: (o) => <><b style={{ fontWeight: 600 }}>{o.customer.name}</b><br /><small className="adm-muted">{o.school || o.customer.type}</small></> },
          { label: 'Entrega', render: (o) => o.delivery },
          { label: 'Pago', render: (o) => o.payment },
          { label: 'Total', align: 'right', render: (o) => <span className="adm-num">{eur(o.total)}</span> },
          { label: 'Estado', render: (o) => <Badge color={ORDER_STATUS[o.status].color}>{ORDER_STATUS[o.status].label}</Badge> },
        ]} />
      </Card>

      <Drawer open={!!current} onClose={() => setSel(null)} wide title={current ? `Pedido ${current.id}` : ''} subtitle={current ? fmtDateTime(current.date) : ''}
        footer={current && (<>
          <Btn icon="fa-solid fa-print" onClick={() => toast('Albarán enviado a imprimir (demo)')}>Albarán</Btn>
          <Btn icon="fa-solid fa-tag" onClick={() => toast('Etiqueta de envío generada (demo)')}>Etiqueta</Btn>
          <Btn icon="fa-solid fa-file-invoice" onClick={() => toast('Factura generada y enviada al cliente (demo)')}>Factura</Btn>
          <Btn icon="fa-brands fa-whatsapp" onClick={() => toast('Mensaje de WhatsApp enviado al cliente (demo)')}>Avisar por WhatsApp</Btn>
          <Btn variant="danger" icon="fa-solid fa-rotate-left" onClick={() => toast('Reembolso parcial/total iniciado (demo)', 'info')}>Reembolsar</Btn>
        </>)}>
        {current && (
          <div className="adm-stack" style={{ gap: 18 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <Badge color={ORDER_STATUS[current.status].color}>{ORDER_STATUS[current.status].label}</Badge>
              <Select label="Cambiar a" value={current.status} onChange={(v) => setStatus(current.id, v)} options={Object.entries(ORDER_STATUS).map(([k, v]) => ({ value: k, label: v.label }))} />
              {STATUS_FLOW.indexOf(current.status) >= 0 && STATUS_FLOW.indexOf(current.status) < 5 && (
                <Btn small variant="primary" onClick={() => setStatus(current.id, STATUS_FLOW[STATUS_FLOW.indexOf(current.status) + 1])}>Avanzar al siguiente paso <i className="fa-solid fa-arrow-right" /></Btn>
              )}
            </div>
            <div className="adm-grid g2" style={{ marginBottom: 0 }}>
              <div><h3 style={{ fontSize: 14, marginBottom: 8 }}>Cliente</h3>
                <dl className="adm-kv"><dt>Nombre</dt><dd>{current.customer.name}</dd><dt>Email</dt><dd>{current.customer.email}</dd><dt>Teléfono</dt><dd>{current.customer.phone}</dd><dt>Tipo</dt><dd>{current.customer.type}</dd></dl></div>
              <div><h3 style={{ fontSize: 14, marginBottom: 8 }}>Entrega y pago</h3>
                <dl className="adm-kv"><dt>Entrega</dt><dd>{current.delivery}</dd><dt>Pago</dt><dd>{current.payment}</dd><dt>Canal</dt><dd>{current.channel}</dd><dt>Colegio</dt><dd>{current.school || '—'}</dd></dl></div>
            </div>
            {current.note && <div className="adm-callout amber"><i className="fa-solid fa-note-sticky" /><div><b>Nota del cliente:</b> {current.note}</div></div>}
            <div><h3 style={{ fontSize: 14, marginBottom: 6 }}>Artículos</h3>
              <Table dense rows={current.items.map((it) => ({ id: it.product.id, ...it }))} columns={[
                { label: 'Producto', render: (it) => <div className="adm-pthumb"><img src={it.product.image} alt="" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = it.product.fallbackImage; }} /><div><b>{it.product.name.slice(0, 50)}</b><small>{it.product.ref}</small></div></div> },
                { label: 'Ud.', align: 'right', render: (it) => it.qty }, { label: 'Importe', align: 'right', render: (it) => <span className="adm-num">{eur(it.product.price * it.qty)}</span> },
              ]} />
              <dl className="adm-kv" style={{ marginTop: 10, gridTemplateColumns: '1fr auto', textAlign: 'right' }}>
                <dt>Subtotal</dt><dd>{eur(current.subtotal)}</dd><dt>Envío</dt><dd>{eur(current.shipping)}</dd><dt><b>Total (IVA incl.)</b></dt><dd><b>{eur(current.total)}</b></dd></dl>
            </div>
            <div><h3 style={{ fontSize: 14, marginBottom: 8 }}>Seguimiento</h3>
              <Timeline steps={STATUS_FLOW.slice(0, 6).map((s, i) => ({ label: ORDER_STATUS[s].label, done: STATUS_FLOW.indexOf(current.status) > i, current: current.status === s, note: STATUS_FLOW.indexOf(current.status) >= i ? 'Registrado' : '' }))} /></div>
          </div>
        )}
      </Drawer>
    </>
  );
}
