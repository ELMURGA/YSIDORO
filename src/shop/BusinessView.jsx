import { useState } from 'react';
import { PRODUCTS } from '../data/products.js';
import { F } from './shared.jsx';

export default function BusinessView({ onAddMany }) {
  const [text, setText] = useState('UHU-75G-BL x 24\n2300256 x 50\nBOL-AZ-07 x 12');
  const [result, setResult] = useState(null);
  const [sent, setSent] = useState(false);

  function parse() {
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => {
      const [ref, qty] = l.split(/[x×;,\t]/i).map((s) => s.trim());
      const p = PRODUCTS.find((x) => x.ref.toLowerCase() === ref?.toLowerCase() || x.id === ref);
      return { ref, qty: Math.max(1, parseInt(qty, 10) || 1), p };
    });
    setResult(lines);
  }
  const ok = result?.filter((r) => r.p) || [];

  return (
    <div className="page-view active sh-page">
      <div className="sh-hero-b2b"><span className="sh-pill pink">Isidoro Empresas</span><h1 style={{ margin: '10px 0 0' }}>Suministros de oficina para tu negocio</h1><p>Tarifas profesionales, factura con pago a 30 días, pedidos recurrentes y entrega gratuita en tu zona.</p><button className="sh-btn accent" onClick={() => document.getElementById('alta-b2b')?.scrollIntoView({ behavior: 'smooth' })}>Solicitar alta de empresa</button></div>
      <div className="sh-grid3" style={{ marginBottom: 26 }}>
        {[['fa-percent', 'Tarifa profesional', 'Hasta un 8% menos según volumen, aplicada automáticamente al entrar.'], ['fa-file-invoice', 'Factura y pago a 30 días', 'Facturación mensual agrupada y descarga de PDF.'], ['fa-repeat', 'Pedidos recurrentes', 'Folios, tóner y cafetería cada mes sin acordarte.'], ['fa-bolt', 'Pedido rápido', 'Pega tus referencias y cantidades y se carga todo al carrito.'], ['fa-print', 'Tóner por modelo', 'Dinos tu impresora y te mostramos solo lo compatible.'], ['fa-users', 'Varios usuarios', 'Que compren varias personas de tu empresa, tú controlas.']].map(([i, t, d]) => (
          <div className="sh-card" key={t}><i className={`fa-solid ${i}`} style={{ fontSize: 22, color: 'var(--accent)' }} /><h3 style={{ marginTop: 8 }}>{t}</h3><p className="sh-muted">{d}</p></div>))}
      </div>
      <div className="sh-grid2">
        <div className="sh-card"><h3><i className="fa-solid fa-bolt" /> Pedido rápido por referencias</h3><p className="sh-muted" style={{ marginBottom: 10 }}>Una referencia y una cantidad por línea (ej. <code>UHU-75G-BL x 24</code>).</p>
          <div className="sh-field"><textarea value={text} onChange={(e) => setText(e.target.value)} aria-label="Referencias y cantidades" style={{ fontFamily: 'ui-monospace, monospace' }} /></div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}><button className="sh-btn" onClick={parse}>Comprobar referencias</button><button className="sh-btn ghost"><i className="fa-solid fa-file-csv" /> Subir Excel/CSV</button></div>
          {result && (<div style={{ marginTop: 14 }}>{result.map((r, i) => <div key={i} className="sh-row" style={{ borderBottom: '1px solid var(--border-color)' }}><span>{r.p ? <><i className="fa-solid fa-circle-check" style={{ color: 'var(--success)' }} /> {r.p.name.slice(0, 40)}</> : <><i className="fa-solid fa-circle-xmark" style={{ color: 'var(--danger)' }} /> {r.ref} no encontrada</>}</span><b>× {r.qty}</b></div>)}
            <button className="sh-btn accent block" style={{ marginTop: 12 }} disabled={!ok.length} onClick={() => onAddMany(ok.map((r) => ({ product: r.p, quantity: r.qty })))}><i className="fa-solid fa-cart-plus" /> Añadir {ok.length} referencias al carrito</button></div>)}
        </div>
        <form id="alta-b2b" className="sh-card" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <h3>Solicitud de alta de empresa</h3>
          {sent ? <div className="sh-empty"><i className="fa-solid fa-circle-check" style={{ color: 'var(--success)' }} /><h3>¡Solicitud recibida!</h3><p className="sh-muted">Revisaremos tus datos y te escribiremos en menos de 24 h laborables.</p></div> : (<><div className="sh-form"><F label="Empresa" id="b1"><input id="b1" required /></F><F label="CIF" id="b2"><input id="b2" required /></F><F label="Persona de contacto" id="b3"><input id="b3" required /></F><F label="Teléfono" id="b4"><input id="b4" required /></F><F label="Correo" id="b5" full><input id="b5" type="email" required /></F><F label="¿Qué sueles comprar?" id="b6" full><textarea id="b6" placeholder="Folios, tóner, material de oficina…" /></F></div><button className="sh-btn accent" style={{ marginTop: 14 }}>Enviar solicitud</button></>)}
        </form>
      </div>
    </div>
  );
}
