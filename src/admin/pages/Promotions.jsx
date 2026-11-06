import { useState } from 'react';
import { PageHeader, Card, Table, Badge, Btn, Tabs, Modal, Field, Toggle, Progress, toast } from '../ui.jsx';
import { COUPONS, PACKS, eur } from '../../data/mock.js';

export default function Promotions() {
  const [tab, setTab] = useState('cupones');
  const [coupons, setCoupons] = useState(COUPONS);
  const [open, setOpen] = useState(false);
  const [pts, setPts] = useState(true);
  return (
    <>
      <PageHeader title="Promociones y packs" subtitle="Cupones, ofertas programadas, kits de vuelta al cole y fidelización de clientes." icon="fa-solid fa-percent">
        <Btn variant="primary" icon="fa-solid fa-plus" onClick={() => setOpen(true)}>{tab === 'packs' ? 'Nuevo pack' : 'Nuevo cupón'}</Btn>
      </PageHeader>
      <Tabs value={tab} onChange={setTab} tabs={[{ key: 'cupones', label: 'Cupones' }, { key: 'ofertas', label: 'Ofertas programadas' }, { key: 'packs', label: 'Packs y kits' }, { key: 'fidel', label: 'Puntos y tarjetas regalo' }]} />
      {tab === 'cupones' && (
        <Card pad={false}><Table rows={coupons.map((c) => ({ ...c, id: c.code }))} columns={[
          { label: 'Código', render: (c) => <b style={{ fontFamily: 'ui-monospace,monospace', letterSpacing: '.05em' }}>{c.code}</b> }, { key: 'desc', label: 'Descripción' }, { key: 'type', label: 'Tipo' },
          { label: 'Usos', render: (c) => <div style={{ minWidth: 120 }}><span className="adm-small">{c.used}{c.limit ? ` / ${c.limit}` : ''}</span><Progress value={c.used} max={c.limit || c.used * 2} /></div> }, { key: 'ends', label: 'Caduca' },
          { label: 'Activo', render: (c) => <Toggle on={c.active} label={`Activar ${c.code}`} onChange={(v) => setCoupons((prev) => prev.map((x) => (x.code === c.code ? { ...x, active: v } : x)))} /> }]} /></Card>
      )}
      {tab === 'ofertas' && (
        <div className="adm-grid g2">
          {[['Mochilas Totto -15%', '5 sep → 20 sep', '12 productos', true], ['Black Friday: papelería -20%', '22 nov → 1 dic', '240 productos', false], ['2x1 en cuadernos Rubio', '1 sep → 15 sep', '8 productos', true], ['Liquidación agendas 2026', '10 nov → 31 dic', '30 productos', false]].map(([t, d, n, on]) => (
            <Card key={t}><div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><i className="fa-solid fa-calendar-check" style={{ fontSize: 22, color: 'var(--adm-accent)' }} /><div style={{ flex: 1 }}><b>{t}</b><p className="adm-muted adm-small">{d} · {n}</p></div><Badge color={on ? 'green' : 'gray'}>{on ? 'Activa' : 'Programada'}</Badge></div></Card>
          ))}
        </div>
      )}
      {tab === 'packs' && (
        <div className="adm-grid g3">
          {PACKS.map((p) => (
            <Card key={p.id} title={p.name} action={<Badge color="pink">-{Math.round((1 - p.price / p.normal) * 100)}%</Badge>}>
              <p className="adm-muted adm-small">{p.items} artículos incluidos</p>
              <div style={{ margin: '10px 0' }}><b style={{ fontSize: 24, fontFamily: 'var(--font-display)' }}>{eur(p.price)}</b> <s className="adm-muted">{eur(p.normal)}</s></div>
              <div className="adm-small adm-muted" style={{ marginBottom: 10 }}>{p.sold} vendidos esta campaña</div>
              <div style={{ display: 'flex', gap: 6 }}><Btn small onClick={() => toast('Editar pack (demo)', 'info')}>Editar contenido</Btn><Btn small onClick={() => toast('Pack duplicado')}>Duplicar</Btn></div>
            </Card>
          ))}
        </div>
      )}
      {tab === 'fidel' && (
        <div className="adm-grid g2">
          <Card title="Programa de puntos" action={<Toggle on={pts} onChange={setPts} label="Programa de puntos" />}>
            <div className="adm-form"><Field label="Puntos por cada euro"><input type="number" defaultValue={1} /></Field><Field label="Valor de 100 puntos"><input defaultValue="1,00 €" /></Field><Field label="Los puntos caducan a los" wide><select><option>12 meses</option><option>24 meses</option><option>Nunca</option></select></Field></div>
          </Card>
          <Card title="Tarjetas regalo"><ul className="adm-list"><li><div className="grow"><b>Tarjeta regalo 10 €</b><small>Válida en web y tiendas</small></div><Badge color="green">48 vendidas</Badge></li><li><div className="grow"><b>Tarjeta regalo 25 €</b></div><Badge color="green">31 vendidas</Badge></li><li><div className="grow"><b>Tarjeta regalo 50 €</b></div><Badge color="green">12 vendidas</Badge></li></ul></Card>
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)} title={tab === 'packs' ? 'Nuevo pack' : 'Nuevo cupón'} footer={<><Btn onClick={() => setOpen(false)}>Cancelar</Btn><Btn variant="primary" onClick={() => { toast('Guardado y activo en la web'); setOpen(false); }}>Guardar</Btn></>}>
        <div className="adm-form"><Field label="Código"><input placeholder="VERANO10" /></Field><Field label="Tipo"><select><option>% de descuento</option><option>Importe fijo</option><option>Envío gratis</option></select></Field><Field label="Valor"><input type="number" /></Field><Field label="Compra mínima"><input type="number" placeholder="0" /></Field><Field label="Fecha de inicio"><input type="date" /></Field><Field label="Fecha de fin"><input type="date" /></Field><Field label="Límite de usos" wide><input type="number" placeholder="Sin límite" /></Field></div>
      </Modal>
    </>
  );
}
