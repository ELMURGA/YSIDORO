import { useState } from 'react';
import { PageHeader, Card, Tabs, Dropzone, Table, Badge, Btn, toast } from '../ui.jsx';

const PREVIEW = [
  { id: 1, ref: 'BOL-AZ-07', name: 'Bolígrafo gel azul 0,7 mm (caja 12)', ean: '8412345001234', price: '9,60', stock: 36, res: 'Nuevo' },
  { id: 2, ref: 'CUA-A4-80', name: 'Cuaderno A4 80 hojas cuadrícula', ean: '8412345001241', price: '2,35', stock: 120, res: 'Actualiza precio' },
  { id: 3, ref: 'MOC-TOT-02', name: 'Mochila Totto Acuareles', ean: '8412345001258', price: '39,90', stock: 14, res: 'Actualiza stock' },
  { id: 4, ref: 'REG-VEL-05', name: 'Vela aromática 120 g', ean: '8412345001265', price: '6,95', stock: 22, res: 'Nuevo' },
  { id: 5, ref: '—', name: 'Fila sin EAN ni referencia', ean: '', price: '1,00', stock: 3, res: 'Error' },
];

export default function ImportExport() {
  const [tab, setTab] = useState('importar');
  const [loaded, setLoaded] = useState(false);
  const color = { Nuevo: 'green', Error: 'red' };
  return (
    <>
      <PageHeader title="Importar y exportar" subtitle="Sube cientos de productos de golpe desde Excel o descarga tu catálogo para trabajar con él." icon="fa-solid fa-file-arrow-up" />
      <Tabs value={tab} onChange={setTab} tabs={[{ key: 'importar', label: 'Importar' }, { key: 'exportar', label: 'Exportar' }, { key: 'historial', label: 'Historial' }]} />
      {tab === 'importar' && (
        <div className="adm-stack">
          <div className="adm-callout"><i className="fa-solid fa-circle-info" /><div>1. Descarga la plantilla · 2. Rellénala con tus artículos (nombre, referencia, EAN, precio, IVA, stock, categoría) · 3. Súbela y revisa la vista previa antes de confirmar.</div></div>
          <div style={{ display: 'flex', gap: 10 }}><Btn icon="fa-solid fa-download" onClick={() => toast('Plantilla.xlsx descargada (demo)')}>Descargar plantilla Excel</Btn><Btn icon="fa-solid fa-file-csv" onClick={() => toast('Plantilla.csv descargada (demo)')}>Plantilla CSV</Btn></div>
          {!loaded ? <Dropzone title="Arrastra aquí tu archivo Excel o CSV" hint="Hasta 5.000 filas por archivo" onFile={() => setLoaded(true)} /> : (
            <Card title="Vista previa · catalogo-proveedor.xlsx" action={<Badge color="green">5 filas leídas</Badge>} pad={false}>
              <Table rows={PREVIEW} columns={[{ key: 'ref', label: 'Referencia' }, { key: 'name', label: 'Nombre' }, { key: 'ean', label: 'EAN' }, { label: 'Precio', align: 'right', render: (r) => `${r.price} €` }, { key: 'stock', label: 'Stock', align: 'right' }, { label: 'Qué ocurrirá', render: (r) => <Badge color={color[r.res] || 'blue'}>{r.res}</Badge> }]} />
              <div style={{ padding: 16, display: 'flex', gap: 10 }}><Btn variant="primary" icon="fa-solid fa-check" onClick={() => { toast('4 productos importados, 1 fila con error omitida'); setLoaded(false); }}>Confirmar importación</Btn><Btn onClick={() => setLoaded(false)}>Cancelar</Btn></div>
            </Card>
          )}
        </div>
      )}
      {tab === 'exportar' && (
        <div className="adm-grid g3">
          {[['Catálogo completo', 'Todos los productos con precios y stock', 'fa-solid fa-tags'], ['Stock por tienda', 'Unidades en Centro, Plaza y Nave', 'fa-solid fa-warehouse'], ['Pedidos del mes', 'Para tu gestoría o análisis', 'fa-solid fa-bag-shopping'], ['Clientes y empresas', 'Con su consentimiento de marketing', 'fa-solid fa-users'], ['Listas de colegios', 'Todas las listas por curso', 'fa-solid fa-school'], ['Facturas del trimestre', 'Formato para el gestor', 'fa-solid fa-file-invoice-dollar']].map(([t, d, i]) => (
            <Card key={t}><div style={{ display: 'flex', gap: 12 }}><i className={i} style={{ fontSize: 22, color: 'var(--adm-accent)' }} /><div style={{ flex: 1 }}><b>{t}</b><p className="adm-muted adm-small">{d}</p><div style={{ marginTop: 10, display: 'flex', gap: 6 }}><Btn small onClick={() => toast(`${t} exportado a Excel`)}>Excel</Btn><Btn small onClick={() => toast(`${t} exportado a CSV`)}>CSV</Btn></div></div></div></Card>
          ))}
        </div>
      )}
      {tab === 'historial' && (
        <Card pad={false}><Table rows={[{ id: 1, f: 'catalogo-papelmar.xlsx', w: 'Hoy 08:30', by: 'Isidoro', r: '214 nuevos · 38 actualizados' }, { id: 2, f: 'precios-septiembre.csv', w: 'Hace 5 días', by: 'Enc. Centro', r: '1.020 precios actualizados' }, { id: 3, f: 'libros-texto-2026.xlsx', w: 'Hace 3 semanas', by: 'Isidoro', r: '412 nuevos' }]} columns={[{ key: 'f', label: 'Archivo' }, { key: 'w', label: 'Cuándo' }, { key: 'by', label: 'Quién' }, { key: 'r', label: 'Resultado' }]} /></Card>
      )}
    </>
  );
}
