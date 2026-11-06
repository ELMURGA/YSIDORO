import { useState } from 'react';
import { PageHeader, Card, Badge, Btn, Tabs, toast } from '../ui.jsx';
import { MESSAGES, REVIEWS, fmtDateTime } from '../../data/mock.js';

const stars = (n) => '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);

export default function Inbox() {
  const [tab, setTab] = useState('msg');
  const [msgs, setMsgs] = useState(MESSAGES);
  const [sel, setSel] = useState(MESSAGES[0].id);
  const [revs, setRevs] = useState(REVIEWS);
  const [reply, setReply] = useState('');
  const m = msgs.find((x) => x.id === sel);
  return (
    <>
      <PageHeader title="Mensajes y reseñas" subtitle="Todo lo que escriben tus clientes en un solo sitio: formulario, WhatsApp, correo y opiniones de productos." icon="fa-solid fa-comments" />
      <Tabs value={tab} onChange={setTab} tabs={[{ key: 'msg', label: 'Bandeja de mensajes', count: msgs.filter((x) => x.state === 'Sin responder').length }, { key: 'rev', label: 'Reseñas de productos', count: revs.filter((r) => r.state === 'Pendiente').length }]} />
      {tab === 'msg' && (
        <div className="adm-split">
          <Card pad={false}><div className="adm-masters">{msgs.map((x) => (
            <button key={x.id} className={sel === x.id ? 'active' : ''} onClick={() => setSel(x.id)}><b>{x.from}</b><small>{x.subject}</small><br /><Badge color={x.state === 'Sin responder' ? 'red' : 'green'}>{x.state}</Badge> <small>{x.channel}</small></button>))}</div></Card>
          <Card title={m.subject} action={<Badge color="gray">{m.channel}</Badge>}>
            <p className="adm-muted adm-small">{m.from} · {fmtDateTime(m.date)}</p>
            <p style={{ margin: '14px 0 20px', fontSize: 15 }}>{m.body}</p>
            <div className="adm-callout"><i className="fa-solid fa-lightbulb" /><div><b>Respuesta sugerida:</b> Hola, claro que sí. Lo tendremos preparado y te avisaremos por WhatsApp en cuanto esté listo. ¡Gracias!</div></div>
            <textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Escribe tu respuesta…" style={{ width: '100%', minHeight: 100, marginTop: 14, borderRadius: 10, border: '1px solid var(--adm-line)', padding: 12, font: 'inherit' }} />
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><Btn variant="primary" icon="fa-solid fa-paper-plane" onClick={() => { setMsgs((p) => p.map((x) => (x.id === m.id ? { ...x, state: 'Respondido' } : x))); setReply(''); toast('Respuesta enviada'); }}>Enviar respuesta</Btn><Btn onClick={() => setReply('Hola, claro que sí. Lo tendremos preparado y te avisaremos por WhatsApp en cuanto esté listo. ¡Gracias!')}>Usar sugerencia</Btn></div>
          </Card>
        </div>
      )}
      {tab === 'rev' && (
        <div className="adm-grid g2">{revs.map((r) => (
          <Card key={r.id}><div style={{ display: 'flex', justifyContent: 'space-between' }}><b>{r.product}</b><Badge color={r.state === 'Pendiente' ? 'amber' : 'green'}>{r.state}</Badge></div>
            <div style={{ color: '#f0a020', letterSpacing: 2, margin: '4px 0' }} aria-label={`${r.stars} estrellas`}>{stars(r.stars)}</div><p>{r.text}</p><p className="adm-muted adm-small" style={{ marginTop: 6 }}>{r.who}</p>
            <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>{r.state === 'Pendiente' ? <><Btn small variant="primary" onClick={() => { setRevs((p) => p.map((x) => (x.id === r.id ? { ...x, state: 'Publicada' } : x))); toast('Reseña publicada'); }}>Aprobar</Btn><Btn small variant="danger" onClick={() => toast('Reseña rechazada', 'info')}>Rechazar</Btn></> : <Btn small onClick={() => toast('Respuesta pública (demo)', 'info')}>Responder en público</Btn>}</div></Card>))}</div>
      )}
    </>
  );
}
