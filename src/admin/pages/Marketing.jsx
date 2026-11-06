import { useState } from 'react';
import { PageHeader, Card, Table, Badge, Btn, Tabs, Modal, Field, Toggle, Stat, toast } from '../ui.jsx';
import { CAMPAIGNS, AUTOMATIONS, BANNERS, eur, fmtDate } from '../../data/mock.js';

export default function Marketing() {
  const [tab, setTab] = useState('campanas');
  const [open, setOpen] = useState(false);
  const [autos, setAutos] = useState(AUTOMATIONS);
  const [banners, setBanners] = useState(BANNERS);
  return (
    <>
      <PageHeader title="Marketing y portada" subtitle="Avisa a tus clientes, automatiza recordatorios y cambia la portada de la web sin llamar a nadie." icon="fa-solid fa-bullhorn">
        <Btn variant="primary" icon="fa-solid fa-paper-plane" onClick={() => setOpen(true)}>Nueva campaña</Btn>
      </PageHeader>
      <div className="adm-grid g4">
        <Stat label="Suscriptores" value="3.410" delta="+212 este mes" icon="fa-solid fa-envelope-open-text" tone="blue" /><Stat label="Apertura media" value="58%" icon="fa-solid fa-eye" tone="green" /><Stat label="Ventas por campañas" value={eur(10560)} icon="fa-solid fa-euro-sign" tone="pink" /><Stat label="Carritos recuperados" value="18%" icon="fa-solid fa-cart-arrow-down" tone="amber" />
      </div>
      <Tabs value={tab} onChange={setTab} tabs={[{ key: 'campanas', label: 'Campañas' }, { key: 'auto', label: 'Automatizaciones' }, { key: 'portada', label: 'Portada y banners' }, { key: 'segm', label: 'Segmentos' }]} />
      {tab === 'campanas' && (
        <Card pad={false}><Table rows={CAMPAIGNS} columns={[
          { label: 'Campaña', render: (c) => <><b>{c.name}</b><br /><small className="adm-muted">{c.segment}</small></> }, { label: 'Canal', render: (c) => <Badge color={c.channel === 'WhatsApp' ? 'green' : 'blue'}>{c.channel}</Badge> },
          { label: 'Fecha', render: (c) => fmtDate(c.date) }, { label: 'Apertura', align: 'right', render: (c) => (c.open ? `${c.open}%` : '—') }, { label: 'Clics', align: 'right', render: (c) => (c.click ? `${c.click}%` : '—') },
          { label: 'Ventas', align: 'right', render: (c) => <span className="adm-num">{c.sales ? eur(c.sales) : '—'}</span> }, { label: 'Estado', render: (c) => <Badge color={c.state === 'Enviada' ? 'green' : 'amber'}>{c.state}</Badge> }]} /></Card>
      )}
      {tab === 'auto' && (
        <div className="adm-grid g2">{autos.map((a) => (
          <Card key={a.id}><div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}><div style={{ flex: 1 }}><b>{a.name}</b><p className="adm-muted adm-small">{a.desc}</p><span className="adm-chip" style={{ marginTop: 8 }}>{a.stat}</span></div>
            <Toggle on={a.on} label={a.name} onChange={(v) => { setAutos((p) => p.map((x) => (x.id === a.id ? { ...x, on: v } : x))); toast(`${a.name}: ${v ? 'activada' : 'desactivada'}`); }} /></div></Card>))}</div>
      )}
      {tab === 'portada' && (
        <Card pad={false} title="Bloques de la portada" action={<Btn small icon="fa-solid fa-plus" onClick={() => toast('Nuevo banner (demo)', 'info')}>Añadir banner</Btn>}>
          <Table rows={banners} columns={[{ label: 'Banner', render: (b) => <b>{b.name}</b> }, { key: 'place', label: 'Posición' }, { label: 'Desde', render: (b) => b.from }, { label: 'Hasta', render: (b) => b.to }, { label: 'Clics', align: 'right', render: (b) => b.clicks.toLocaleString('es-ES') },
            { label: 'Visible', render: (b) => <Toggle on={b.on} label={b.name} onChange={(v) => setBanners((p) => p.map((x) => (x.id === b.id ? { ...x, on: v } : x)))} /> }, { label: '', render: () => <Btn small onClick={() => toast('Editor de banner (demo)', 'info')}>Editar</Btn> }]} />
        </Card>
      )}
      {tab === 'segm' && (
        <div className="adm-grid g3">{[['Familias con hijos', '1.842', 'fa-solid fa-children'], ['Empresas', '86', 'fa-solid fa-building'], ['Carritos abandonados (7 días)', '212', 'fa-solid fa-cart-shopping'], ['Clientes VIP (>500 €)', '94', 'fa-solid fa-crown'], ['Sin comprar en 12 meses', '640', 'fa-solid fa-moon'], ['AMPAs y colegios', '24', 'fa-solid fa-school']].map(([t, n, i]) => (
          <Card key={t}><div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><i className={i} style={{ fontSize: 22, color: 'var(--adm-accent)' }} /><div style={{ flex: 1 }}><b>{t}</b><p className="adm-muted adm-small">{n} contactos</p></div><Btn small onClick={() => setOpen(true)}>Enviar</Btn></div></Card>))}</div>
      )}
      <Modal open={open} onClose={() => setOpen(false)} title="Nueva campaña" footer={<><Btn onClick={() => setOpen(false)}>Cancelar</Btn><Btn onClick={() => { toast('Programada para mañana 10:00'); setOpen(false); }}>Programar</Btn><Btn variant="primary" onClick={() => { toast('Campaña enviada'); setOpen(false); }}>Enviar ahora</Btn></>}>
        <div className="adm-form"><Field label="Nombre" wide><input placeholder="Ej. Listas de 2º ya disponibles" /></Field><Field label="Canal"><select><option>Email</option><option>WhatsApp</option></select></Field><Field label="A quién"><select><option>Familias con hijos (1.842)</option><option>Empresas (86)</option><option>Todos (3.410)</option></select></Field><Field label="Mensaje" wide><textarea placeholder="Escribe el mensaje…" /></Field></div>
      </Modal>
    </>
  );
}
