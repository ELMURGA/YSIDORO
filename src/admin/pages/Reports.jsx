import { useState } from 'react';
import { PageHeader, Card, Stat, Table, Btn, BarChart, HBars, Donut, Select, Spark, toast } from '../ui.jsx';
import { SALES_MONTHLY, SALES_BY_LOCATION, SALES_BY_CATEGORY, SCHOOLS_ADMIN, ADMIN_PRODUCTS, eur } from '../../data/mock.js';

export default function Reports() {
  const [period, setPeriod] = useState('Este año');
  const total = SALES_MONTHLY.reduce((s, m) => s + m.web + m.tienda, 0);
  const topSchools = [...SCHOOLS_ADMIN].sort((a, b) => b.revenue - a.revenue).slice(0, 7);
  const dead = ADMIN_PRODUCTS.filter((p) => p.sold30 < 3 && !String(p.id).startsWith('AUTO')).slice(0, 5);
  return (
    <>
      <PageHeader title="Informes" subtitle="Qué se vende, dónde, cuándo y con qué margen. Para decidir con datos, no con intuición." icon="fa-solid fa-chart-line">
        <Select label="Periodo" value={period} onChange={setPeriod} options={['Este mes', 'Último trimestre', 'Este año', 'Campaña escolar']} />
        <Btn icon="fa-solid fa-file-pdf" onClick={() => toast('Informe PDF generado (demo)')}>Descargar PDF</Btn>
      </PageHeader>
      <div className="adm-grid g4">
        <Stat label="Ventas del año" value={eur(total)} delta="+18% vs. 2025" icon="fa-solid fa-euro-sign" tone="green" /><Stat label="Margen bruto" value="38,4%" delta="+1,2 pts" icon="fa-solid fa-percent" tone="blue" />
        <Stat label="Pedidos web" value="6.842" delta="+27%" icon="fa-solid fa-bag-shopping" tone="pink" /><Stat label="Rotación de stock" value="5,6×" icon="fa-solid fa-rotate" tone="amber" />
      </div>
      <div className="adm-grid g21">
        <Card title="Ventas por mes (septiembre manda)" action={<div className="adm-legend"><span><i style={{ background: '#1c2c8a' }} />Tiendas</span><span><i style={{ background: '#fb13bf' }} />Web</span></div>}><BarChart data={SALES_MONTHLY} keys={['tienda', 'web']} colors={['#1c2c8a', '#fb13bf']} /></Card>
        <Card title="Por tienda y web"><Donut data={SALES_BY_LOCATION} /></Card>
      </div>
      <div className="adm-grid g3">
        <Card title="Ventas por categoría"><HBars data={SALES_BY_CATEGORY} /></Card>
        <Card title="Colegios que más facturan" pad={false}><Table dense rows={topSchools} columns={[{ label: 'Colegio', render: (s) => <span style={{ fontWeight: 600 }}>{s.name.slice(0, 30)}</span> }, { label: 'Facturado', align: 'right', render: (s) => <span className="adm-num">{eur(s.revenue)}</span> }]} /></Card>
        <Card title="Productos sin movimiento (30 días)" pad={false}><Table dense rows={dead} columns={[{ label: 'Producto', render: (p) => p.name.slice(0, 32) }, { label: 'Vendidas', align: 'right', render: (p) => p.sold30 }]} />
          <div style={{ padding: 14 }}><Btn small onClick={() => toast('Oferta de liquidación creada (demo)')}>Crear oferta de liquidación</Btn></div></Card>
      </div>
      <Card title="Tendencia semanal de pedidos web"><div style={{ display: 'flex', gap: 30, flexWrap: 'wrap' }}>{[['Nuevos clientes', [3, 5, 4, 8, 9, 12, 14]], ['Carritos abandonados', [20, 18, 21, 17, 16, 14, 12]], ['Pedidos recogida en tienda', [10, 12, 15, 18, 22, 30, 33]]].map(([t, v]) => <div key={t}><div className="adm-muted adm-small">{t}</div><Spark values={v} color="#fb13bf" /></div>)}</div></Card>
    </>
  );
}
