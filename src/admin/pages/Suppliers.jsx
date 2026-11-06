import { useState } from 'react';
import { PageHeader, Card, Table, Badge, Btn, Tabs, Modal, Field, toast } from '../ui.jsx';
import { SUPPLIERS, PURCHASE_ORDERS, ADMIN_PRODUCTS, totalStock, eur, fmtDate } from '../../data/mock.js';

const stateColor = { Borrador: 'gray', Enviado: 'blue', 'Parcialmente recibido': 'amber', Recibido: 'green' };

export default function Suppliers() {
  const [tab, setTab] = useState('compras');
  const [open, setOpen] = useState(false);
  const suggested = ADMIN_PRODUCTS.filter((p) => totalStock(p) <= p.min && p.published).slice(0, 8);
  return (
    <>
      <PageHeader title="Proveedores y compras" subtitle="Quién te suministra, qué has pedido y qué debes reponer antes de quedarte sin stock." icon="fa-solid fa-truck-ramp-box">
        <Btn variant="primary" icon="fa-solid fa-plus" onClick={() => setOpen(true)}>Nuevo pedido a proveedor</Btn>
      </PageHeader>
      <Tabs value={tab} onChange={setTab} tabs={[{ key: 'compras', label: 'Pedidos a proveedor' }, { key: 'sugerido', label: 'Reposición sugerida', count: suggested.length }, { key: 'prov', label: 'Proveedores' }]} />
      {tab === 'compras' && (
        <Card pad={false}><Table rows={PURCHASE_ORDERS} columns={[
          { label: 'Pedido', render: (r) => <b>{r.id}</b> }, { key: 'supplier', label: 'Proveedor' }, { key: 'dest', label: 'Destino' }, { label: 'Líneas', align: 'right', render: (r) => r.lines },
          { label: 'Importe', align: 'right', render: (r) => <span className="adm-num">{eur(r.total)}</span> }, { label: 'Fecha', render: (r) => fmtDate(r.date) }, { label: 'Llegada prevista', render: (r) => fmtDate(r.eta) },
          { label: 'Estado', render: (r) => <Badge color={stateColor[r.state]}>{r.state}</Badge> },
          { label: '', align: 'right', render: (r) => (r.state === 'Recibido' ? null : <Btn small onClick={() => toast(`Recepción de ${r.id}: cantidades añadidas al stock de ${r.dest}`)}>Recibir</Btn>) }]} /></Card>
      )}
      {tab === 'sugerido' && (
        <Card title="Productos por debajo del mínimo" action={<Btn variant="primary" small onClick={() => toast('Pedidos creados por proveedor (demo)')}>Crear pedidos automáticos</Btn>} pad={false}>
          <Table rows={suggested} columns={[
            { label: 'Producto', render: (p) => <div className="adm-pthumb"><img src={p.image} alt="" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = p.fallbackImage; }} /><div><b>{p.name}</b><small>{SUPPLIERS.find((s) => s.id === p.supplierId).name}</small></div></div> },
            { label: 'Stock', align: 'right', render: (p) => <Badge color="red">{totalStock(p)}</Badge> }, { label: 'Mínimo', align: 'right', render: (p) => p.min }, { label: 'Vendidas 30 d.', align: 'right', render: (p) => p.sold30 },
            { label: 'Sugerido pedir', align: 'right', render: (p) => <b>{Math.max(p.min * 3 - totalStock(p), 6)}</b> }]} />
        </Card>
      )}
      {tab === 'prov' && (
        <div className="adm-grid g3">
          {SUPPLIERS.map((s) => (
            <Card key={s.id} title={s.name} action={s.pending ? <Badge color="amber">{s.pending} pendiente</Badge> : <Badge color="green">Al día</Badge>}>
              <dl className="adm-kv"><dt>Contacto</dt><dd>{s.contact}</dd><dt>Teléfono</dt><dd>{s.phone}</dd><dt>Email</dt><dd>{s.email}</dd><dt>Plazo</dt><dd>{s.lead} días</dd><dt>Suministra</dt><dd>{s.cats}</dd><dt>Último pedido</dt><dd>{fmtDate(s.last)}</dd></dl>
              <div style={{ marginTop: 12, display: 'flex', gap: 6 }}><Btn small icon="fa-solid fa-phone" onClick={() => toast('Llamando… (demo)', 'info')}>Llamar</Btn><Btn small icon="fa-solid fa-plus" onClick={() => setOpen(true)}>Pedido</Btn></div>
            </Card>
          ))}
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)} title="Nuevo pedido a proveedor" footer={<><Btn onClick={() => setOpen(false)}>Cancelar</Btn><Btn variant="primary" onClick={() => { toast('Pedido PO-0193 enviado al proveedor por email'); setOpen(false); }}>Enviar al proveedor</Btn></>}>
        <div className="adm-form"><Field label="Proveedor"><select>{SUPPLIERS.map((s) => <option key={s.id}>{s.name}</option>)}</select></Field><Field label="Destino de la mercancía"><select><option>Nave</option><option>Tienda Centro</option><option>Tienda Plaza</option></select></Field>
          <Field label="Artículos (referencia y cantidad)" wide><textarea placeholder="Ej.&#10;BOL-AZ-07 × 60&#10;CUA-A4-80 × 200" /></Field></div>
      </Modal>
    </>
  );
}
