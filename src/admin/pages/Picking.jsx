import { useState } from 'react';
import { PageHeader, Card, Tabs, Badge, Btn, Progress, toast } from '../ui.jsx';
import { ORDERS } from '../../data/mock.js';

export default function Picking() {
  const [mode, setMode] = useState('pedido');
  const [done, setDone] = useState({});
  const queue = ORDERS.filter((o) => ['pagado', 'preparando'].includes(o.status)).slice(0, 8);
  const toggle = (k) => setDone((d) => ({ ...d, [k]: !d[k] }));

  const consolidated = {};
  queue.forEach((o) => o.items.forEach((it) => {
    const c = consolidated[it.product.id] || { product: it.product, qty: 0, orders: [] };
    c.qty += it.qty; c.orders.push(o.id); consolidated[it.product.id] = c;
  }));
  const bySchool = {};
  queue.forEach((o) => { const k = o.school || 'Sin colegio (compra general)'; (bySchool[k] = bySchool[k] || []).push(o); });

  return (
    <>
      <PageHeader title="Preparación de pedidos" subtitle="Vista pensada para el almacén: qué sacar de las estanterías, en qué orden y para quién." icon="fa-solid fa-boxes-packing">
        <Btn icon="fa-solid fa-print" onClick={() => toast('Hoja de picking enviada a imprimir (demo)')}>Imprimir hoja de picking</Btn>
        <Btn icon="fa-solid fa-mobile-screen" onClick={() => toast('Abierto en el móvil del almacén (demo)', 'info')}>Abrir en el móvil</Btn>
      </PageHeader>
      <Tabs value={mode} onChange={setMode} tabs={[{ key: 'pedido', label: 'Por pedido' }, { key: 'producto', label: 'Total por producto' }, { key: 'colegio', label: 'Por colegio' }]} />

      {mode === 'pedido' && (
        <div className="adm-grid g2">
          {queue.map((o) => {
            const n = o.items.filter((it) => done[`${o.id}-${it.product.id}`]).length;
            return (
              <Card key={o.id} title={`${o.id} · ${o.customer.name}`} action={<Badge color="amber">{o.delivery}</Badge>}>
                <Progress value={n} max={o.items.length} tone="green" />
                {o.items.map((it) => {
                  const k = `${o.id}-${it.product.id}`;
                  return (
                    <label key={k} className={`adm-check ${done[k] ? 'done' : ''}`}>
                      <input type="checkbox" checked={!!done[k]} onChange={() => toggle(k)} />
                      <span><b>{it.qty} ×</b> {it.product.name.slice(0, 54)} <small className="adm-muted">· pasillo {String.fromCharCode(65 + (Number(String(it.product.id).replace(/\D/g, '').slice(-2)) % 8))}-{(it.qty * 3) % 9 + 1}</small></span>
                    </label>
                  );
                })}
                <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                  <Btn small variant="primary" disabled={n < o.items.length} onClick={() => toast(`${o.id} marcado como listo y avisado el cliente`)}>Marcar como listo</Btn>
                  <Btn small onClick={() => toast('Etiqueta impresa (demo)')} icon="fa-solid fa-tag">Etiqueta</Btn>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {mode === 'producto' && (
        <Card title="Qué sacar del almacén (suma de todos los pedidos en cola)" pad={false}>
          <ul className="adm-list" style={{ padding: '4px 20px 12px' }}>
            {Object.values(consolidated).sort((a, b) => b.qty - a.qty).map((c) => (
              <li key={c.product.id}><span className="adm-num" style={{ fontSize: 20, minWidth: 44 }}>{c.qty}×</span>
                <div className="grow"><b>{c.product.name.slice(0, 60)}</b><small>Pedidos: {c.orders.join(', ')}</small></div><Badge color="gray">{c.product.ref}</Badge></li>
            ))}
          </ul>
        </Card>
      )}

      {mode === 'colegio' && (
        <div className="adm-grid g2">
          {Object.entries(bySchool).map(([school, list]) => (
            <Card key={school} title={school} action={<Badge color="indigo">{list.length} pedidos</Badge>}>
              <ul className="adm-list">{list.map((o) => <li key={o.id}><div className="grow"><b>{o.id}</b> · {o.customer.name}<small>{o.items.reduce((s, it) => s + it.qty, 0)} artículos</small></div><Badge color="amber">{o.delivery.replace('Recogida en ', '')}</Badge></li>)}</ul>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
