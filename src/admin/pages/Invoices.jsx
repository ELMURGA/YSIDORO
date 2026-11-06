import { useState } from 'react';
import { PageHeader, Card, Stat, Table, Badge, Btn, Tabs, Select, toast } from '../ui.jsx';
import { INVOICES, eur, fmtDate } from '../../data/mock.js';

const stateColor = { Cobrada: 'green', 'Pendiente de cobro': 'amber', Rectificada: 'gray' };

export default function Invoices() {
  const [tab, setTab] = useState('facturas');
  const base = INVOICES.reduce((s, i) => s + i.base, 0);
  const vat = INVOICES.reduce((s, i) => s + i.vat, 0);
  const pend = INVOICES.filter((i) => i.state === 'Pendiente de cobro');
  return (
    <>
      <PageHeader title="Facturas y contabilidad" subtitle="Facturas automáticas, IVA del trimestre y todo listo para tu gestoría." icon="fa-solid fa-file-invoice-dollar">
        <Select label="Periodo" value="T4 2026" onChange={() => {}} options={['T4 2026', 'T3 2026', 'T2 2026', 'T1 2026']} />
        <Btn variant="primary" icon="fa-solid fa-paper-plane" onClick={() => toast('Paquete enviado a la gestoría: facturas + IVA + resumen (demo)')}>Enviar a la gestoría</Btn>
      </PageHeader>
      <div className="adm-grid g4">
        <Stat label="Facturado (base)" value={eur(base)} icon="fa-solid fa-euro-sign" tone="blue" /><Stat label="IVA repercutido" value={eur(vat)} icon="fa-solid fa-landmark" tone="amber" />
        <Stat label="Pendiente de cobro" value={eur(pend.reduce((s, i) => s + i.total, 0))} icon="fa-solid fa-hourglass-half" tone="red" hint={`${pend.length} facturas`} /><Stat label="Facturas emitidas" value={INVOICES.length} icon="fa-solid fa-file-invoice" tone="green" />
      </div>
      <Tabs value={tab} onChange={setTab} tabs={[{ key: 'facturas', label: 'Facturas' }, { key: 'cobros', label: 'Cobros pendientes', count: pend.length }, { key: 'iva', label: 'Informe de IVA' }, { key: 'gestor', label: 'Exportar al gestor' }]} />
      {(tab === 'facturas' || tab === 'cobros') && (
        <Card pad={false}><Table rows={(tab === 'cobros' ? pend : INVOICES).map((i) => ({ ...i, id: i.id }))} columns={[
          { label: 'Nº factura', render: (i) => <b>{i.id}</b> }, { label: 'Fecha', render: (i) => fmtDate(i.date) }, { key: 'customer', label: 'Cliente' }, { label: 'Pedido', render: (i) => i.order },
          { label: 'Base', align: 'right', render: (i) => eur(i.base) }, { label: 'IVA', align: 'right', render: (i) => eur(i.vat) }, { label: 'Total', align: 'right', render: (i) => <span className="adm-num">{eur(i.total)}</span> },
          { label: 'Estado', render: (i) => <Badge color={stateColor[i.state]}>{i.state}</Badge> },
          { label: '', align: 'right', render: (i) => <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}><Btn small icon="fa-solid fa-file-pdf" onClick={() => toast(`${i.id}.pdf descargada`)}>PDF</Btn>{i.state === 'Pendiente de cobro' && <Btn small variant="primary" onClick={() => toast('Recordatorio de pago enviado')}>Reclamar</Btn>}</div> }]} /></Card>
      )}
      {tab === 'iva' && (
        <Card title="Resumen de IVA · T4 2026" pad={false}><Table rows={[{ id: 1, t: '21% general', b: base * 0.78, v: base * 0.78 * 0.21 }, { id: 2, t: '10% reducido', b: base * 0.04, v: base * 0.004 }, { id: 3, t: '4% superreducido (libros)', b: base * 0.18, v: base * 0.18 * 0.04 }]}
          columns={[{ key: 't', label: 'Tipo' }, { label: 'Base imponible', align: 'right', render: (r) => eur(r.b) }, { label: 'Cuota IVA', align: 'right', render: (r) => <span className="adm-num">{eur(r.v)}</span> }]} /></Card>
      )}
      {tab === 'gestor' && (
        <Card title="Paquete para la gestoría"><div className="adm-stack"><div className="adm-callout"><i className="fa-solid fa-circle-info" /><div>Un clic genera un ZIP con todas las facturas en PDF, el libro de facturas emitidas en Excel y el resumen de IVA. También se puede programar para enviarse solo cada trimestre.</div></div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><Btn icon="fa-solid fa-file-zipper" onClick={() => toast('ZIP generado (demo)')}>Descargar ZIP</Btn><Btn icon="fa-solid fa-file-excel" onClick={() => toast('Libro de facturas generado (demo)')}>Libro de facturas Excel</Btn><Btn icon="fa-solid fa-clock" onClick={() => toast('Envío trimestral programado')}>Programar envío automático</Btn></div></div></Card>
      )}
    </>
  );
}
