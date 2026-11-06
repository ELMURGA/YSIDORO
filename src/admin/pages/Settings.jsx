import { useState } from 'react';
import { PageHeader, Card, Btn, Tabs, Field, Toggle, Table, Badge, toast } from '../ui.jsx';
import { LOCATIONS } from '../../data/mock.js';

export default function Settings() {
  const [tab, setTab] = useState('empresa');
  const [pay, setPay] = useState({ Tarjeta: true, Bizum: true, PayPal: true, Transferencia: true, 'Pago en tienda': true, 'Apple Pay / Google Pay': false });
  const [notif, setNotif] = useState({ 'Nuevo pedido': true, 'Stock bajo': true, 'Mensaje nuevo': true, 'Reseña nueva': false, 'Resumen diario': true });
  return (
    <>
      <PageHeader title="Ajustes" subtitle="Datos de la empresa, envíos, pagos, impuestos y avisos." icon="fa-solid fa-gear">
        <Btn variant="primary" icon="fa-solid fa-floppy-disk" onClick={() => toast('Ajustes guardados')}>Guardar cambios</Btn>
      </PageHeader>
      <Tabs value={tab} onChange={setTab} tabs={[{ key: 'empresa', label: 'Empresa' }, { key: 'tiendas', label: 'Tiendas' }, { key: 'envios', label: 'Envíos y recogida' }, { key: 'pagos', label: 'Pagos' }, { key: 'impuestos', label: 'Impuestos' }, { key: 'avisos', label: 'Avisos' }, { key: 'legal', label: 'Textos legales' }]} />
      {tab === 'empresa' && <Card><div className="adm-form"><Field label="Razón social"><input defaultValue="Isidoro Suministros a Oficinas S.L." /></Field><Field label="CIF"><input defaultValue="B-00000000" /></Field><Field label="Teléfono"><input defaultValue="954 00 00 00" /></Field><Field label="Email de contacto"><input defaultValue="contacto@libreriaisidoro.example" /></Field><Field label="Logotipo" wide hint="PNG o SVG, fondo transparente"><input type="file" /></Field></div></Card>}
      {tab === 'tiendas' && <div className="adm-grid g3">{LOCATIONS.map((l) => <Card key={l.id} title={l.name} action={<Badge color="green">Activa</Badge>}><dl className="adm-kv"><dt>Tipo</dt><dd>{l.kind}</dd><dt>Dirección</dt><dd>{l.address}</dd><dt>Teléfono</dt><dd>{l.phone}</dd><dt>Horario</dt><dd>{l.hours}</dd><dt>Recogida web</dt><dd><Badge color="green">Permitida</Badge></dd></dl></Card>)}</div>}
      {tab === 'envios' && (
        <div className="adm-grid g2">
          <Card title="Tarifas de envío a domicilio" pad={false}><Table rows={[{ id: 1, z: 'Sevilla provincia', p: '4,95 €', f: 'Gratis desde 49 €', t: '24-48 h' }, { id: 2, z: 'Resto de Andalucía', p: '5,95 €', f: 'Gratis desde 69 €', t: '48 h' }, { id: 3, z: 'Península', p: '6,95 €', f: 'Gratis desde 79 €', t: '48-72 h' }, { id: 4, z: 'Baleares y Canarias', p: '12,00 €', f: '—', t: '4-6 días' }]} columns={[{ key: 'z', label: 'Zona' }, { key: 'p', label: 'Precio' }, { key: 'f', label: 'Envío gratis' }, { key: 't', label: 'Plazo' }]} /></Card>
          <Card title="Otras formas de entrega"><ul className="adm-list">{[['Recogida en tiendas', 'Gratis · listo en 2 h laborables'], ['Entrega en el colegio', 'Gratis · día de entrega fijado por el centro'], ['Entrega en el mismo día (zona urbana)', '3,50 €']].map(([a, b]) => <li key={a}><div className="grow"><b>{a}</b><small>{b}</small></div><Toggle on label={a} onChange={() => {}} /></li>)}</ul></Card>
        </div>
      )}
      {tab === 'pagos' && <Card><ul className="adm-list">{Object.entries(pay).map(([k, v]) => <li key={k}><div className="grow"><b>{k}</b></div><Toggle on={v} label={k} onChange={(x) => setPay({ ...pay, [k]: x })} /></li>)}</ul></Card>}
      {tab === 'impuestos' && <Card><div className="adm-form"><Field label="Mostrar precios en la web"><select><option>Con IVA incluido (particulares)</option><option>Sin IVA (solo empresas)</option><option>Según tipo de cliente</option></select></Field><Field label="IVA general"><input defaultValue="21%" /></Field><Field label="IVA libros"><input defaultValue="4%" /></Field><Field label="Recargo de equivalencia"><select><option>No aplica</option><option>Aplica</option></select></Field></div></Card>}
      {tab === 'avisos' && <Card title="Avisos por email al propietario"><ul className="adm-list">{Object.entries(notif).map(([k, v]) => <li key={k}><div className="grow"><b>{k}</b></div><Toggle on={v} label={k} onChange={(x) => setNotif({ ...notif, [k]: x })} /></li>)}</ul></Card>}
      {tab === 'legal' && <div className="adm-grid g2">{['Aviso legal', 'Política de cookies', 'Política de privacidad', 'Condiciones de compra', 'Devoluciones', 'Gastos de envío'].map((t) => <Card key={t}><div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><i className="fa-solid fa-scale-balanced" style={{ color: 'var(--adm-accent)' }} /><b style={{ flex: 1 }}>{t}</b><Btn small onClick={() => toast('Editor de texto (demo)', 'info')}>Editar</Btn></div></Card>)}</div>}
    </>
  );
}
