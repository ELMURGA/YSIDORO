import { useMemo, useState } from 'react';
import { PageHeader, Card, Stat, Table, Badge, Btn, Tabs, SearchInput, Modal, Dropzone, Select, toast } from '../ui.jsx';
import { SCHOOLS_ADMIN, COURSE_MATERIAL_LISTS, eur, ADMIN_PRODUCTS, totalStock } from '../../data/mock.js';
import { getProductById } from '../../data/products.js';

const byId = (id) => ADMIN_PRODUCTS.find((p) => p.id === id) || getProductById(id);

const AI_RESULT = [
  { need: 'Cuaderno A4 cuadrícula 80 h.', qty: 3, match: 'Cuaderno con separadores', conf: 96 },
  { need: 'Bolígrafos azul y rojo', qty: 2, match: 'Bolígrafo de tinta líquida/gel', conf: 91 },
  { need: 'Regla de 30 cm', qty: 1, match: 'Regla flexible 30 cm', conf: 88 },
  { need: 'Estuche con 3 compartimentos', qty: 1, match: 'Estuche portatodos', conf: 84 },
  { need: 'Diccionario escolar Santillana', qty: 1, match: 'Diccionario escolar', conf: 62 },
];

export default function Schools() {
  const [q, setQ] = useState('');
  const [town, setTown] = useState('Todos');
  const [sel, setSel] = useState(SCHOOLS_ADMIN.find((s) => s.name === 'CEIP Al-Ándalus') || SCHOOLS_ADMIN[0]);
  const [course, setCourse] = useState(null);
  const [tab, setTab] = useState('listas');
  const [imp, setImp] = useState(0);
  const list = useMemo(() => SCHOOLS_ADMIN.filter((s) => (town === 'Todos' || s.town === town) && s.name.toLowerCase().includes(q.toLowerCase())), [q, town]);
  const cur = course && sel.courses.includes(course) ? course : sel.courses[0];
  const lines = COURSE_MATERIAL_LISTS[cur] || [];
  const total = lines.reduce((s, l) => s + (byId(l.suggestedId)?.price || 0), 0);
  const sinStock = lines.filter((l) => { const p = ADMIN_PRODUCTS.find((x) => x.id === l.suggestedId); return p && totalStock(p) <= 3; });

  return (
    <>
      <PageHeader title="Colegios y listas de material" subtitle="El corazón de la campaña escolar: sube la lista de cada colegio y las familias la compran con un clic." icon="fa-solid fa-school">
        <Btn icon="fa-solid fa-copy" onClick={() => toast('Listas duplicadas al próximo curso escolar (demo)')}>Duplicar al curso siguiente</Btn>
        <Btn variant="primary" icon="fa-solid fa-wand-magic-sparkles" onClick={() => { setImp(1); }}>Importar lista (Excel / PDF)</Btn>
      </PageHeader>
      <div className="adm-grid g4">
        <Stat label="Colegios" value={SCHOOLS_ADMIN.length} icon="fa-solid fa-school" tone="blue" />
        <Stat label="Listas publicadas" value={SCHOOLS_ADMIN.filter((s) => s.status === 'Lista publicada').length} icon="fa-solid fa-circle-check" tone="green" />
        <Stat label="Pedidos de listas" value={SCHOOLS_ADMIN.reduce((s, c) => s + c.orders, 0).toLocaleString('es-ES')} icon="fa-solid fa-bag-shopping" tone="pink" />
        <Stat label="Facturado en campaña" value={eur(SCHOOLS_ADMIN.reduce((s, c) => s + c.revenue, 0))} icon="fa-solid fa-euro-sign" tone="amber" />
      </div>
      <div className="adm-split">
        <Card pad={false}>
          <div style={{ padding: 14, display: 'grid', gap: 8 }}><SearchInput value={q} onChange={setQ} placeholder="Buscar colegio…" /><Select value={town} onChange={setTown} options={['Todos', 'Utrera', 'Sevilla', 'Dos Hermanas']} /></div>
          <div className="adm-masters">{list.map((s) => (
            <button key={s.id} className={sel.id === s.id ? 'active' : ''} onClick={() => { setSel(s); setCourse(null); }}><b>{s.name}</b><small>{s.town} · {s.courses.length} cursos · </small><Badge color={s.status === 'Lista publicada' ? 'green' : 'amber'}>{s.status === 'Lista publicada' ? 'Publicada' : 'Falta lista'}</Badge></button>
          ))}</div>
        </Card>
        <div className="adm-stack">
          <Card title={sel.name} action={<Badge color={sel.status === 'Lista publicada' ? 'green' : 'amber'}>{sel.status}</Badge>}>
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              <div><span className="adm-muted adm-small">Pedidos</span><br /><b style={{ fontSize: 20 }}>{sel.orders}</b></div>
              <div><span className="adm-muted adm-small">Familias</span><br /><b style={{ fontSize: 20 }}>{sel.families}</b></div>
              <div><span className="adm-muted adm-small">Facturado</span><br /><b style={{ fontSize: 20 }}>{eur(sel.revenue)}</b></div>
              <div><span className="adm-muted adm-small">Contacto en el centro</span><br /><b>{sel.contact}</b></div>
            </div>
          </Card>
          <Tabs value={tab} onChange={setTab} tabs={[{ key: 'listas', label: 'Listas por curso' }, { key: 'stats', label: 'Estadísticas' }, { key: 'pub', label: 'Publicación' }]} />
          {tab === 'listas' && (
            <Card title={`Lista de ${cur}`} action={<div style={{ display: 'flex', gap: 8 }}><Select value={cur} onChange={setCourse} options={sel.courses} /><Btn small icon="fa-solid fa-plus" onClick={() => toast('Línea añadida (demo)')}>Añadir artículo</Btn></div>} pad={false}>
              {sinStock.length > 0 && <div className="adm-callout amber" style={{ margin: 16 }}><i className="fa-solid fa-triangle-exclamation" /><div><b>{sinStock.length} artículos de esta lista tienen poco stock.</b> Repón antes de que las familias empiecen a comprar.</div></div>}
              <Table rows={lines.map((l, i) => ({ ...l, id: i }))} columns={[
                { label: 'Necesidad', render: (l) => <b>{l.need}</b> },
                { label: 'Producto sugerido', render: (l) => { const p = byId(l.suggestedId); return p ? <div className="adm-pthumb"><img src={p.image} alt="" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = p.fallbackImage; }} /><div><b>{p.name.slice(0, 44)}</b><small>{p.ref}</small></div></div> : '—'; } },
                { label: 'Uds.', align: 'right', render: () => 1 },
                { label: 'Stock', render: (l) => { const p = ADMIN_PRODUCTS.find((x) => x.id === l.suggestedId); const t = p ? totalStock(p) : 0; return <Badge color={t <= 3 ? 'red' : 'green'}>{t} uds.</Badge>; } },
                { label: 'Precio', align: 'right', render: (l) => <span className="adm-num">{eur(byId(l.suggestedId)?.price || 0)}</span> },
                { label: '', align: 'right', render: () => <Btn small onClick={() => toast('Editar línea (demo)', 'info')}>Editar</Btn> }]} />
              <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between' }}><span className="adm-muted">Las familias podrán cambiar cada artículo por otro de su misma categoría.</span><b>Total de la lista: {eur(total)}</b></div>
            </Card>
          )}
          {tab === 'stats' && (
            <Card title="Cómo va este colegio"><div className="adm-grid g3" style={{ marginBottom: 0 }}>
              <Stat label="Cursos más pedidos" value={sel.courses[1] || sel.courses[0]} icon="fa-solid fa-ranking-star" tone="blue" /><Stat label="Pedido medio" value={eur(sel.revenue / sel.orders)} icon="fa-solid fa-receipt" tone="green" /><Stat label="Recogida en tienda" value="64%" icon="fa-solid fa-store" tone="pink" /></div></Card>
          )}
          {tab === 'pub' && (
            <Card title="Publicación en la web"><div className="adm-stack"><div className="adm-callout"><i className="fa-solid fa-link" /><div>Enlace directo para enviar al colegio o al AMPA: <b>isidoro.example/colegio/{sel.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}</b></div></div><div style={{ display: 'flex', gap: 8 }}><Btn icon="fa-solid fa-qrcode" onClick={() => toast('QR descargado (demo)')}>Descargar QR para cartel</Btn><Btn icon="fa-solid fa-envelope" onClick={() => toast('Enlace enviado al AMPA (demo)')}>Enviar al AMPA</Btn><Btn variant="primary" onClick={() => toast('Lista publicada en la web')}>Publicar listas</Btn></div></div></Card>
          )}
        </div>
      </div>

      <Modal open={imp > 0} onClose={() => setImp(0)} wide title="Importar lista de un colegio"
        footer={imp === 2 ? <><Btn onClick={() => setImp(0)}>Cancelar</Btn><Btn variant="primary" icon="fa-solid fa-check" onClick={() => { toast('Lista creada con 5 artículos para revisión'); setImp(0); }}>Crear lista</Btn></> : null}>
        {imp === 1 && (<div className="adm-stack"><div className="adm-callout pink"><i className="fa-solid fa-wand-magic-sparkles" /><div>Sube el PDF o Excel que te envía el colegio. El sistema <b>reconoce los artículos</b> y los empareja con tu catálogo; tú solo revisas.</div></div><Dropzone title="Arrastra el PDF o Excel del colegio" hint="lista-3-primaria.pdf · hasta 20 MB" onFile={() => setImp(2)} /></div>)}
        {imp === 2 && (<div className="adm-stack"><div className="adm-callout"><i className="fa-solid fa-circle-check" />Se han leído <b>5 líneas</b> de "lista-3-primaria.pdf". Revisa los emparejamientos de baja confianza.</div>
          <Table rows={AI_RESULT.map((r, i) => ({ ...r, id: i }))} columns={[{ key: 'need', label: 'Texto del colegio' }, { label: 'Uds.', align: 'right', render: (r) => r.qty }, { key: 'match', label: 'Producto emparejado' }, { label: 'Confianza', render: (r) => <Badge color={r.conf > 80 ? 'green' : 'amber'}>{r.conf}%</Badge> }]} /></div>)}
      </Modal>
    </>
  );
}
