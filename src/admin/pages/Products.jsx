import { useMemo, useState } from 'react';
import { PageHeader, Card, Table, Badge, Btn, SearchInput, Select, Modal, Tabs, Field, Toggle, Dropzone, toast } from '../ui.jsx';
import { ADMIN_PRODUCTS, totalStock, eur, LOCATIONS, SUPPLIERS } from '../../data/mock.js';
import { NAV_CATEGORIES } from '../../data/categories.js';

const CATS = [{ value: 'todas', label: 'Todas las categorías' }, ...NAV_CATEGORIES.map((c) => ({ value: c.key, label: c.label }))];

function Editor({ product, onClose, onSave }) {
  const isNew = !product.id;
  const [tab, setTab] = useState('general');
  const [f, setF] = useState({ name: '', ref: '', ean: '', price: 0, cost: 0, vat: 21, b2bPrice: 0, min: 5, published: true, description: '', parentCategory: 'PAPELERIA', supplierId: 's1', stockLoc: { centro: 0, plaza: 0, nave: 0 }, ...product });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const base = f.price / (1 + f.vat / 100);
  const margin = base > 0 ? ((base - f.cost) / base) * 100 : 0;
  return (
    <Modal open wide onClose={onClose} title={isNew ? 'Nuevo producto' : 'Editar producto'}
      footer={<><Btn onClick={onClose}>Cancelar</Btn><Btn variant="primary" icon="fa-solid fa-floppy-disk" onClick={() => { onSave(f); toast(isNew ? 'Producto creado y publicado en la web' : 'Cambios guardados'); onClose(); }}>Guardar</Btn></>}>
      <Tabs value={tab} onChange={setTab} tabs={[{ key: 'general', label: 'General' }, { key: 'precios', label: 'Precios' }, { key: 'stock', label: 'Stock' }, { key: 'imagenes', label: 'Imágenes' }, { key: 'colegios', label: 'Listas de colegios' }, { key: 'seo', label: 'Buscadores (SEO)' }]} />
      {tab === 'general' && (
        <div className="adm-form">
          <Field label="Nombre del producto" wide><input value={f.name} onChange={(e) => set('name', e.target.value)} placeholder="Ej. Bolígrafo gel azul 0,7 mm" /></Field>
          <Field label="Referencia interna"><input value={f.ref} onChange={(e) => set('ref', e.target.value)} /></Field>
          <Field label="Código de barras (EAN)" hint="Se puede rellenar escaneando con la pistola"><input value={f.ean} onChange={(e) => set('ean', e.target.value)} /></Field>
          <Field label="Categoría"><select value={f.parentCategory} onChange={(e) => set('parentCategory', e.target.value)}>{NAV_CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}</select></Field>
          <Field label="Proveedor habitual"><select value={f.supplierId} onChange={(e) => set('supplierId', e.target.value)}>{SUPPLIERS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></Field>
          <Field label="Descripción" wide><textarea value={f.description} onChange={(e) => set('description', e.target.value)} /></Field>
          <Field label="Visible en la web"><Toggle on={f.published} onChange={(v) => set('published', v)} label="Publicado" /></Field>
        </div>
      )}
      {tab === 'precios' && (
        <>
          <div className="adm-form">
            <Field label="Precio de venta (con IVA)"><input type="number" step="0.01" value={f.price} onChange={(e) => set('price', Number(e.target.value))} /></Field>
            <Field label="IVA"><select value={f.vat} onChange={(e) => set('vat', Number(e.target.value))}><option value={21}>21% general</option><option value={10}>10% reducido</option><option value={4}>4% superreducido (libros)</option></select></Field>
            <Field label="Precio de coste (sin IVA)"><input type="number" step="0.01" value={f.cost} onChange={(e) => set('cost', Number(e.target.value))} /></Field>
            <Field label="Precio empresa (tarifa B2B)"><input type="number" step="0.01" value={f.b2bPrice} onChange={(e) => set('b2bPrice', Number(e.target.value))} /></Field>
            <Field label="Oferta (precio rebajado)" hint="Opcional · con fechas de inicio y fin"><input type="number" step="0.01" placeholder="—" /></Field>
            <Field label="Vigencia de la oferta"><input type="text" placeholder="del 01/09 al 20/09" /></Field>
          </div>
          <div className="adm-callout" style={{ marginTop: 16 }}><i className="fa-solid fa-calculator" /><div>Base imponible <b>{eur(base)}</b> · Margen bruto <b>{margin.toFixed(1)}%</b> · Beneficio por unidad <b>{eur(base - f.cost)}</b></div></div>
        </>
      )}
      {tab === 'stock' && (
        <div className="adm-form">
          {LOCATIONS.map((l) => (
            <Field key={l.id} label={`Unidades en ${l.name}`}><input type="number" value={f.stockLoc[l.id]} onChange={(e) => set('stockLoc', { ...f.stockLoc, [l.id]: Number(e.target.value) })} /></Field>
          ))}
          <Field label="Stock mínimo (aviso de reposición)"><input type="number" value={f.min} onChange={(e) => set('min', Number(e.target.value))} /></Field>
          <div className="adm-callout pink" style={{ gridColumn: '1/-1' }}><i className="fa-solid fa-barcode" /><div>Cuando se conecte el TPV, estas cantidades se actualizarán solas con cada venta, recepción o transferencia.</div></div>
        </div>
      )}
      {tab === 'imagenes' && <Dropzone title="Arrastra aquí las fotos del producto" hint="JPG o PNG · La primera será la imagen principal" onFile={() => toast('Imagen subida (demo)')} />}
      {tab === 'colegios' && <div className="adm-callout"><i className="fa-solid fa-school" /><div>Este producto aparece como sugerido en <b>3 listas</b>: CEIP Al-Ándalus (3º), Colegio Salesianos (1º ESO), CEIP Rodrigo Caro (2º). Edita las listas desde <b>Colegios y listas</b>.</div></div>}
      {tab === 'seo' && (
        <div className="adm-form">
          <Field label="Título en Google" wide hint="Máx. 60 caracteres"><input defaultValue={f.name} /></Field>
          <Field label="Descripción en Google" wide><textarea defaultValue={f.description.slice(0, 150)} /></Field>
          <Field label="Dirección (URL)" wide><input defaultValue={`/producto/${(f.name || 'nuevo').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} /></Field>
        </div>
      )}
    </Modal>
  );
}

export default function Products() {
  const [items, setItems] = useState(ADMIN_PRODUCTS);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('todas');
  const [state, setState] = useState('todos');
  const [page, setPage] = useState(0);
  const [edit, setEdit] = useState(null);
  const [checked, setChecked] = useState({});

  const filtered = useMemo(() => items.filter((p) =>
    (cat === 'todas' || p.parentCategory === cat)
    && (state === 'todos' || (state === 'bajo' ? totalStock(p) <= p.min : state === 'oculto' ? !p.published : p.published))
    && (`${p.name} ${p.ref} ${p.ean}`).toLowerCase().includes(q.toLowerCase())), [items, q, cat, state]);
  const pages = Math.ceil(filtered.length / 15);
  const view = filtered.slice(page * 15, page * 15 + 15);
  const nChecked = Object.values(checked).filter(Boolean).length;

  function save(p) { setItems((prev) => (p.id ? prev.map((x) => (x.id === p.id ? p : x)) : [{ ...p, id: `NEW-${Date.now()}`, image: 'https://placehold.co/250x250/1c2c8a/ffffff?text=Nuevo', fallbackImage: 'https://placehold.co/250x250/1c2c8a/ffffff?text=Nuevo', stock: 'in-stock' }, ...prev])); }

  return (
    <>
      <PageHeader title="Productos" subtitle={`${items.length} artículos en el catálogo. Edita precios, fotos, stock y visibilidad sin tocar código.`} icon="fa-solid fa-tags">
        <Btn icon="fa-solid fa-file-arrow-up" onClick={() => { window.location.hash = '/admin/importar'; }}>Importar Excel</Btn>
        <Btn variant="primary" icon="fa-solid fa-plus" onClick={() => setEdit({})}>Nuevo producto</Btn>
      </PageHeader>
      <div className="adm-toolbar">
        <div className="grow"><SearchInput value={q} onChange={(v) => { setQ(v); setPage(0); }} placeholder="Buscar por nombre, referencia o código de barras…" /></div>
        <Select value={cat} onChange={(v) => { setCat(v); setPage(0); }} options={CATS} />
        <Select value={state} onChange={(v) => { setState(v); setPage(0); }} options={[{ value: 'todos', label: 'Todos' }, { value: 'pub', label: 'Publicados' }, { value: 'oculto', label: 'Ocultos' }, { value: 'bajo', label: 'Stock bajo' }]} />
      </div>
      {nChecked > 0 && (
        <div className="adm-callout" style={{ marginBottom: 12, alignItems: 'center' }}>
          <b>{nChecked} seleccionados</b>
          <Btn small onClick={() => toast('Precios actualizados en bloque (demo)')}>Cambiar precio %</Btn>
          <Btn small onClick={() => toast('Productos ocultados')}>Ocultar</Btn>
          <Btn small onClick={() => toast('Añadidos a la oferta')}>Añadir a oferta</Btn>
          <Btn small variant="danger" onClick={() => setChecked({})}>Quitar selección</Btn>
        </div>
      )}
      <Card pad={false}>
        <Table onRowClick={setEdit} rows={view} columns={[
          { label: '', width: 36, render: (p) => <input type="checkbox" checked={!!checked[p.id]} onClick={(e) => e.stopPropagation()} onChange={() => setChecked((c) => ({ ...c, [p.id]: !c[p.id] }))} /> },
          { label: 'Producto', render: (p) => <div className="adm-pthumb"><img src={p.image} alt="" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = p.fallbackImage; }} /><div><b>{p.name}</b><small>{p.ref} · {p.ean}</small></div></div> },
          { label: 'Categoría', render: (p) => <span className="adm-small">{p.category.toLowerCase()}</span> },
          { label: 'Precio', align: 'right', render: (p) => <span className="adm-num">{eur(p.price)}</span> },
          { label: 'Margen', align: 'right', render: (p) => <span className="adm-muted">{(((p.price / 1.21 - p.cost) / (p.price / 1.21)) * 100).toFixed(0)}%</span> },
          { label: 'Stock', align: 'right', render: (p) => { const t = totalStock(p); return <Badge color={t === 0 ? 'red' : t <= p.min ? 'amber' : 'green'}>{t} uds.</Badge>; } },
          { label: 'Web', render: (p) => <Badge color={p.published ? 'green' : 'gray'}>{p.published ? 'Visible' : 'Oculto'}</Badge> },
        ]} />
      </Card>
      <div className="adm-toolbar" style={{ marginTop: 12, justifyContent: 'space-between' }}>
        <span className="adm-muted">{filtered.length} resultados · página {page + 1} de {Math.max(pages, 1)}</span>
        <div style={{ display: 'flex', gap: 8 }}><Btn small disabled={page === 0} onClick={() => setPage(page - 1)}>Anterior</Btn><Btn small disabled={page + 1 >= pages} onClick={() => setPage(page + 1)}>Siguiente</Btn></div>
      </div>
      {edit && <Editor product={edit} onClose={() => setEdit(null)} onSave={save} />}
    </>
  );
}
