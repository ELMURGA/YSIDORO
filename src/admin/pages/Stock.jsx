import { useMemo, useState } from 'react';
import { PageHeader, Card, Stat, Table, Badge, Btn, Tabs, SearchInput, Select, Modal, Field, toast } from '../ui.jsx';
import { ADMIN_PRODUCTS, LOCATIONS, STOCK_MOVES, totalStock, eur } from '../../data/mock.js';

export default function Stock() {
  const [items, setItems] = useState(ADMIN_PRODUCTS);
  const [tab, setTab] = useState('stock');
  const [q, setQ] = useState('');
  const [loc, setLoc] = useState('todas');
  const [onlyAlerts, setOnlyAlerts] = useState(false);
  const [move, setMove] = useState(null);
  const [mv, setMv] = useState({ from: 'nave', to: 'centro', qty: 10 });
  const [page, setPage] = useState(0);

  const tot = (l) => items.reduce((s, p) => s + p.stockLoc[l], 0);
  const val = (l) => items.reduce((s, p) => s + p.stockLoc[l] * p.cost, 0);
  const alerts = (l) => items.filter((p) => (l ? p.stockLoc[l] : totalStock(p)) <= (l ? Math.ceil(p.min / 2) : p.min)).length;

  const rows = useMemo(() => items.filter((p) => (`${p.name} ${p.ref} ${p.ean}`).toLowerCase().includes(q.toLowerCase())
    && (!onlyAlerts || totalStock(p) <= p.min) && (loc === 'todas' || p.stockLoc[loc] > 0)), [items, q, onlyAlerts, loc]);
  const view = rows.slice(page * 14, page * 14 + 14);

  function adjust(id, l, d) { setItems((prev) => prev.map((p) => (p.id === id ? { ...p, stockLoc: { ...p.stockLoc, [l]: Math.max(0, p.stockLoc[l] + d) } } : p))); }
  function doMove() {
    const n = Math.min(mv.qty, move.stockLoc[mv.from]);
    setItems((prev) => prev.map((p) => (p.id === move.id ? { ...p, stockLoc: { ...p.stockLoc, [mv.from]: p.stockLoc[mv.from] - n, [mv.to]: p.stockLoc[mv.to] + n } } : p)));
    toast(`${n} uds. movidas de ${LOCATIONS.find((l) => l.id === mv.from).short} a ${LOCATIONS.find((l) => l.id === mv.to).short}`);
    setMove(null);
  }

  return (
    <>
      <PageHeader title="Stock por tienda" subtitle="Cuántas unidades hay de cada artículo en Tienda Centro, Tienda Plaza y la Nave, y cuánto vale todo." icon="fa-solid fa-warehouse">
        <Btn icon="fa-solid fa-clipboard-check" onClick={() => toast('Inventario iniciado: cuenta por pasillos desde el móvil (demo)', 'info')}>Iniciar inventario</Btn>
        <Btn variant="primary" icon="fa-solid fa-truck-ramp-box" onClick={() => toast('Recepción de mercancía abierta (demo)', 'info')}>Recibir mercancía</Btn>
      </PageHeader>
      <div className="adm-grid g4">
        {LOCATIONS.map((l) => (
          <Stat key={l.id} label={l.name} value={`${tot(l.id).toLocaleString('es-ES')} uds.`} icon={l.id === 'nave' ? 'fa-solid fa-warehouse' : 'fa-solid fa-store'} tone={l.id === 'nave' ? 'teal' : 'blue'} hint={`Valor a coste ${eur(val(l.id))} · ${alerts(l.id)} alertas`} />
        ))}
        <Stat label="Total en todo el negocio" value={`${LOCATIONS.reduce((s, l) => s + tot(l.id), 0).toLocaleString('es-ES')} uds.`} icon="fa-solid fa-boxes-stacked" tone="pink" hint={`Valor ${eur(LOCATIONS.reduce((s, l) => s + val(l.id), 0))}`} />
      </div>
      <Tabs value={tab} onChange={setTab} tabs={[{ key: 'stock', label: 'Existencias' }, { key: 'alertas', label: 'Alertas de reposición', count: alerts() }, { key: 'mov', label: 'Movimientos' }, { key: 'reglas', label: 'Reglas de la web' }]} />

      {(tab === 'stock' || tab === 'alertas') && (
        <>
          <div className="adm-toolbar">
            <div className="grow"><SearchInput value={q} onChange={(v) => { setQ(v); setPage(0); }} placeholder="Buscar producto, referencia o código…" /></div>
            <Select label="Ver" value={loc} onChange={setLoc} options={[{ value: 'todas', label: 'Todas las ubicaciones' }, ...LOCATIONS.map((l) => ({ value: l.id, label: l.name }))]} />
            <label className="adm-chip" style={{ cursor: 'pointer' }}><input type="checkbox" checked={onlyAlerts || tab === 'alertas'} onChange={(e) => setOnlyAlerts(e.target.checked)} /> Solo stock bajo</label>
          </div>
          <Card pad={false}>
            <Table rows={(tab === 'alertas' ? rows.filter((p) => totalStock(p) <= p.min) : view)} columns={[
              { label: 'Producto', render: (p) => <div className="adm-pthumb"><img src={p.image} alt="" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = p.fallbackImage; }} /><div><b>{p.name}</b><small>{p.ref} · mín. {p.min}</small></div></div> },
              ...LOCATIONS.map((l) => ({ label: l.short, align: 'center', render: (p) => (
                <span className="adm-qty"><button aria-label="Quitar uno" onClick={() => adjust(p.id, l.id, -1)}>−</button><span style={{ color: p.stockLoc[l.id] === 0 ? '#c42d2d' : undefined }}>{p.stockLoc[l.id]}</span><button aria-label="Añadir uno" onClick={() => adjust(p.id, l.id, 1)}>+</button></span>) })),
              { label: 'Total', align: 'right', render: (p) => { const t = totalStock(p); return <Badge color={t === 0 ? 'red' : t <= p.min ? 'amber' : 'green'}>{t}</Badge>; } },
              { label: '', align: 'right', render: (p) => <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}><Btn small icon="fa-solid fa-right-left" onClick={() => setMove(p)}>Mover</Btn>{totalStock(p) <= p.min && <Btn small variant="primary" onClick={() => toast('Añadido al pedido a proveedor')}>Reponer</Btn>}</div> },
            ]} />
          </Card>
          {tab === 'stock' && <div className="adm-toolbar" style={{ marginTop: 12, justifyContent: 'space-between' }}><span className="adm-muted">{rows.length} artículos</span><div style={{ display: 'flex', gap: 8 }}><Btn small disabled={page === 0} onClick={() => setPage(page - 1)}>Anterior</Btn><Btn small disabled={(page + 1) * 14 >= rows.length} onClick={() => setPage(page + 1)}>Siguiente</Btn></div></div>}
        </>
      )}

      {tab === 'mov' && (
        <Card pad={false}><Table rows={STOCK_MOVES.map((m, i) => ({ ...m, id: i }))} columns={[
          { key: 'when', label: 'Cuándo' }, { label: 'Tipo', render: (m) => <Badge color={m.qty > 0 ? 'green' : 'amber'}>{m.type}</Badge> }, { key: 'product', label: 'Producto' },
          { key: 'from', label: 'Origen' }, { key: 'to', label: 'Destino' }, { label: 'Uds.', align: 'right', render: (m) => <span className="adm-num">{m.qty > 0 ? `+${m.qty}` : m.qty}</span> }, { key: 'who', label: 'Quién' }]} /></Card>
      )}

      {tab === 'reglas' && (
        <div className="adm-grid g2">
          <Card title="¿De dónde sale el stock de la web?">
            <div className="adm-stack">
              <label className="adm-check"><input type="radio" name="r" defaultChecked /><span><b>Suma de las tres ubicaciones</b><br /><small className="adm-muted">La web vende lo que haya en cualquier tienda. Si está en otra tienda, se traslada o se envía desde allí.</small></span></label>
              <label className="adm-check"><input type="radio" name="r" /><span><b>Solo la Nave (almacén)</b><br /><small className="adm-muted">La web solo ve el stock del almacén; las tiendas no se tocan.</small></span></label>
              <label className="adm-check"><input type="radio" name="r" /><span><b>Reserva para la web</b><br /><small className="adm-muted">Se aparta un número fijo de unidades para online.</small></span></label>
            </div>
          </Card>
          <Card title="Avisos y límites">
            <div className="adm-form">
              <Field label="Mostrar “Últimas unidades” cuando queden"><input type="number" defaultValue={5} /></Field>
              <Field label="Permitir comprar sin stock (bajo pedido)"><select><option>No</option><option>Sí, con plazo de 5-7 días</option></select></Field>
              <Field label="Avisar por email cuando un producto baje de su mínimo" wide><input defaultValue="isidoro@libreriaisidoro.example" /></Field>
            </div>
          </Card>
        </div>
      )}

      <Modal open={!!move} onClose={() => setMove(null)} title="Transferir entre tiendas" footer={<><Btn onClick={() => setMove(null)}>Cancelar</Btn><Btn variant="primary" icon="fa-solid fa-right-left" onClick={doMove}>Confirmar traslado</Btn></>}>
        {move && (<div className="adm-stack">
          <b>{move.name}</b>
          <div className="adm-form">
            <Field label="Desde"><select value={mv.from} onChange={(e) => setMv({ ...mv, from: e.target.value })}>{LOCATIONS.map((l) => <option key={l.id} value={l.id}>{l.name} ({move.stockLoc[l.id]} uds.)</option>)}</select></Field>
            <Field label="Hasta"><select value={mv.to} onChange={(e) => setMv({ ...mv, to: e.target.value })}>{LOCATIONS.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}</select></Field>
            <Field label="Unidades"><input type="number" min="1" value={mv.qty} onChange={(e) => setMv({ ...mv, qty: Number(e.target.value) })} /></Field>
          </div>
        </div>)}
      </Modal>
    </>
  );
}
