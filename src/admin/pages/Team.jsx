import { useState } from 'react';
import { PageHeader, Card, Table, Badge, Btn, Tabs, Toggle, toast } from '../ui.jsx';
import { STAFF, ROLES, AUDIT_LOG } from '../../data/mock.js';

const AREAS = ['Pedidos', 'Productos', 'Stock', 'Precios', 'Colegios y listas', 'Clientes', 'Facturas', 'Informes', 'Ajustes'];
const MATRIX = {
  Propietario: [1, 1, 1, 1, 1, 1, 1, 1, 1], 'Encargado/a de tienda': [1, 1, 1, 1, 1, 1, 0, 1, 0], Dependiente: [1, 0, 1, 0, 0, 1, 0, 0, 0], 'Almacén': [1, 0, 1, 0, 0, 0, 0, 0, 0], 'Contabilidad / Gestoría': [0, 0, 0, 0, 0, 0, 1, 1, 0],
};

export default function Team() {
  const [tab, setTab] = useState('personas');
  const [staff, setStaff] = useState(STAFF);
  return (
    <>
      <PageHeader title="Equipo y permisos" subtitle="Cada persona ve y toca solo lo que necesita. Y todo queda registrado." icon="fa-solid fa-user-shield">
        <Btn variant="primary" icon="fa-solid fa-user-plus" onClick={() => toast('Invitación enviada por email (demo)')}>Invitar a alguien</Btn>
      </PageHeader>
      <Tabs value={tab} onChange={setTab} tabs={[{ key: 'personas', label: 'Personas' }, { key: 'roles', label: 'Roles y permisos' }, { key: 'log', label: 'Registro de actividad' }]} />
      {tab === 'personas' && (
        <Card pad={false}><Table rows={staff} columns={[
          { label: 'Persona', render: (u) => <div className="adm-pthumb" style={{ minWidth: 0 }}><div className="adm-avatar">{u.name[0]}</div><b>{u.name}</b></div> }, { label: 'Rol', render: (u) => <Badge color={ROLES[u.role].color}>{u.role}</Badge> }, { key: 'place', label: 'Ubicación' }, { key: 'last', label: 'Último acceso' },
          { label: 'Activo', render: (u) => <Toggle on={u.on} label={u.name} onChange={(v) => setStaff((p) => p.map((x) => (x.id === u.id ? { ...x, on: v } : x)))} /> }]} /></Card>
      )}
      {tab === 'roles' && (
        <Card pad={false}><Table rows={Object.keys(MATRIX).map((r) => ({ id: r, r }))} columns={[{ label: 'Rol', render: (x) => <Badge color={ROLES[x.r].color}>{x.r}</Badge> }, ...AREAS.map((a, i) => ({ label: a, align: 'center', render: (x) => (MATRIX[x.r][i] ? <i className="fa-solid fa-circle-check" style={{ color: '#22a559' }} aria-label="Permitido" /> : <i className="fa-solid fa-minus" style={{ color: '#c4cbe9' }} aria-label="Sin acceso" />) }))]} /></Card>
      )}
      {tab === 'log' && (
        <Card pad={false}><ul className="adm-list" style={{ padding: '4px 20px' }}>{AUDIT_LOG.map((l) => <li key={l.what}><span className="adm-alert-ic" style={{ background: '#eef0fb', color: '#1c2c8a' }}><i className="fa-solid fa-clock-rotate-left" /></span><div className="grow"><b>{l.who}</b><small>{l.what}</small></div><span className="adm-muted adm-small">{l.when}</span></li>)}</ul></Card>
      )}
    </>
  );
}
