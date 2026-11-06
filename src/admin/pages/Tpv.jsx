import { useState } from 'react';
import { PageHeader, Card, Stat, Table, Badge, Btn, Tabs, Field, toast } from '../ui.jsx';
import { LOCATIONS, ADMIN_PRODUCTS, productByEan, totalStock, eur, ACTIVITY_SYNC } from '../../data/mock.js';

const SAMPLE = ADMIN_PRODUCTS.find((p) => !String(p.id).startsWith('AUTO'));

export default function Tpv() {
  const [tab, setTab] = useState('conexion');
  const [code, setCode] = useState('');
  const [res, setRes] = useState(null);
  const [newP, setNewP] = useState({ name: '', price: '' });

  function scan(value) {
    const c = (value ?? code).trim();
    if (!c) return;
    const p = productByEan(c);
    setRes(p ? { found: true, p } : { found: false, code: c });
  }

  return (
    <>
      <PageHeader title="Conexión con el TPV de las tiendas" subtitle="Fase final: una vez aprobada la web, se conecta el programa de caja para que todo el stock y los precios sean un único sistema." icon="fa-solid fa-barcode" />
      <div className="adm-callout pink" style={{ marginBottom: 18 }}><i className="fa-solid fa-plug-circle-bolt" /><div><b>Esta pantalla es una demostración de cómo funcionará.</b> Los datos son de ejemplo. La conexión real se instala al final del proyecto, cuando el propietario dé el visto bueno a la web.</div></div>
      <div className="adm-grid g4">
        {LOCATIONS.map((l) => <Stat key={l.id} label={l.name} value="Conectado" icon={l.id === 'nave' ? 'fa-solid fa-warehouse' : 'fa-solid fa-cash-register'} tone="green" hint={`${l.tpv} · sincronizado hace ${l.id === 'centro' ? '4' : l.id === 'plaza' ? '9' : '2'} s`} />)}
        <Stat label="Web y panel" value="Sincronizado" icon="fa-solid fa-globe" tone="pink" hint="Mismo stock que las tiendas" />
      </div>
      <Tabs value={tab} onChange={setTab} tabs={[{ key: 'conexion', label: 'Cómo se conecta' }, { key: 'escaner', label: 'Prueba del escáner' }, { key: 'actividad', label: 'Actividad en vivo' }, { key: 'reglas', label: 'Qué se sincroniza' }]} />

      {tab === 'conexion' && (
        <div className="adm-stack">
          <Card title="Un solo cerebro para tres tiendas y la web">
            <div className="adm-flow">
              <div className="adm-stack">{LOCATIONS.map((l) => <div key={l.id} className="node"><i className="big fa-solid fa-cash-register" /><b>{l.name}</b><br /><small className="adm-muted">{l.tpv}</small></div>)}</div>
              <div className="arrow"><i className="fa-solid fa-arrows-left-right" /></div>
              <div className="node hub"><i className="big fa-solid fa-database" /><b style={{ fontSize: 16 }}>Núcleo de stock y precios</b><p style={{ fontSize: 12.5, opacity: .85, marginTop: 6 }}>Cada venta, entrada, traslado o cambio de precio se refleja al instante en todas partes.</p></div>
              <div className="arrow"><i className="fa-solid fa-arrows-left-right" /></div>
              <div className="adm-stack"><div className="node"><i className="big fa-solid fa-globe" /><b>Tienda online</b><br /><small className="adm-muted">Stock real en la ficha del producto</small></div><div className="node"><i className="big fa-solid fa-gauge-high" /><b>Este panel</b><br /><small className="adm-muted">Control total desde el móvil</small></div></div>
            </div>
          </Card>
          <div className="adm-grid g3">
            {[['fa-solid fa-barcode', 'Escanear y listo', 'Pasas la pistola por el código de barras y aparece el producto con su precio, su foto y cuánto queda en cada tienda.'], ['fa-solid fa-circle-plus', 'Altas desde la caja', 'Si el código no existe, se da de alta en segundos (nombre y precio) y queda en la web como borrador para completarlo.'], ['fa-solid fa-right-left', 'Saber dónde está cada cosa', 'Si falta en Tienda Centro y hay 40 en la Nave, el sistema te lo dice y propone el traslado.']].map(([i, t, d]) => (
              <Card key={t}><i className={i} style={{ fontSize: 24, color: 'var(--adm-accent)', marginBottom: 8, display: 'block' }} /><b>{t}</b><p className="adm-muted" style={{ marginTop: 4 }}>{d}</p></Card>))}
          </div>
        </div>
      )}

      {tab === 'escaner' && (
        <div className="adm-grid g2">
          <Card title="Escanea un código de barras">
            <div className="adm-stack">
              <div className="adm-scan"><input autoFocus value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && scan()} placeholder="Escanea o escribe el EAN…" aria-label="Código de barras" /><Btn variant="primary" icon="fa-solid fa-magnifying-glass" onClick={() => scan()}>Buscar</Btn></div>
              <div className="adm-small adm-muted">Prueba rápida: <button className="adm-chip" onClick={() => { setCode(SAMPLE.ean); scan(SAMPLE.ean); }}>{SAMPLE.ean} (existente)</button> <button className="adm-chip" onClick={() => { setCode('8499999999991'); scan('8499999999991'); }}>8499999999991 (nuevo)</button></div>
            </div>
          </Card>
          <Card title="Resultado">
            {!res && <p className="adm-muted">Escanea un código para ver el producto y el stock en las tres tiendas.</p>}
            {res?.found && (<div className="adm-stack">
              <div className="adm-pthumb"><img src={res.p.image} alt="" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = res.p.fallbackImage; }} /><div><b>{res.p.name}</b><small>{res.p.ref} · {res.p.ean}</small></div></div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700 }}>{eur(res.p.price)}</div>
              <Table dense rows={LOCATIONS.map((l) => ({ id: l.id, l: l.name, q: res.p.stockLoc[l.id] }))} columns={[{ key: 'l', label: 'Ubicación' }, { label: 'Unidades', align: 'right', render: (r) => <Badge color={r.q === 0 ? 'red' : r.q < 5 ? 'amber' : 'green'}>{r.q}</Badge> }]} />
              <div className="adm-small">Total: <b>{totalStock(res.p)}</b> uds. · {totalStock(res.p) > 0 ? 'Disponible en la web' : 'Agotado en la web'}</div>
            </div>)}
            {res && !res.found && (<div className="adm-stack">
              <div className="adm-callout amber"><i className="fa-solid fa-circle-question" /><div>El código <b>{res.code}</b> no existe todavía. Dalo de alta ahora:</div></div>
              <div className="adm-form"><Field label="Nombre" wide><input value={newP.name} onChange={(e) => setNewP({ ...newP, name: e.target.value })} placeholder="Ej. Estuche de gel Pastel" /></Field><Field label="Precio (con IVA)"><input type="number" value={newP.price} onChange={(e) => setNewP({ ...newP, price: e.target.value })} /></Field><Field label="Unidades que entran"><input type="number" defaultValue={12} /></Field></div>
              <Btn variant="primary" icon="fa-solid fa-circle-plus" onClick={() => { toast('Producto creado en caja, panel y web (borrador)'); setRes(null); setCode(''); }}>Dar de alta</Btn>
            </div>)}
          </Card>
        </div>
      )}

      {tab === 'actividad' && (
        <Card title="Lo que está pasando ahora" pad={false}><Table rows={ACTIVITY_SYNC.map((a, i) => ({ ...a, id: i }))} columns={[{ key: 'when', label: 'Hora' }, { label: 'Origen', render: (a) => <Badge color={a.loc === 'Web' ? 'pink' : 'indigo'}>{a.loc}</Badge> }, { key: 'ev', label: 'Evento' }, { key: 'res', label: 'Resultado' }]} /></Card>
      )}

      {tab === 'reglas' && (
        <div className="adm-grid g2">
          <Card title="Datos que viajan entre caja y web">
            <ul className="adm-list">{[['Stock (ventas, entradas, traslados, mermas)', 'Caja ⇄ Web'], ['Precios y ofertas', 'Caja ⇄ Web'], ['Altas de productos nuevos', 'Caja → Web (borrador)'], ['Fotos y descripciones', 'Web → Caja'], ['Pedidos web recogidos en tienda', 'Web → Caja'], ['Clientes y facturas', 'Web ⇄ Caja']].map(([a, b]) => <li key={a}><div className="grow"><b>{a}</b></div><Badge color="indigo">{b}</Badge></li>)}</ul>
          </Card>
          <Card title="Qué necesitamos de la tienda">
            <ul className="adm-list">{['Saber qué programa de caja/TPV usan hoy', 'Que el programa permita exportar o conectar (API, base de datos o ficheros)', 'Una jornada para la puesta en marcha y prueba con un artículo', 'Plan B: carga por fichero programado si no hay conexión directa'].map((t) => <li key={t}><i className="fa-solid fa-check" style={{ color: '#22a559' }} /><div className="grow">{t}</div></li>)}</ul>
          </Card>
        </div>
      )}
    </>
  );
}
