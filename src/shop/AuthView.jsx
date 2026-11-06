import { useState } from 'react';
import { F, Back } from './shared.jsx';

export default function AuthView({ onLogin, onBack }) {
  const [mode, setMode] = useState('login');
  const submit = (e) => { e.preventDefault(); onLogin(); };
  return (
    <div className="page-view active sh-page">
      <Back onClick={onBack} />
      <div className="sh-grid2" style={{ alignItems: 'stretch' }}>
        <form className="sh-card" onSubmit={submit}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            <button type="button" className={`sh-btn small ${mode === 'login' ? '' : 'ghost'}`} onClick={() => setMode('login')}>Entrar</button>
            <button type="button" className={`sh-btn small ${mode === 'reg' ? '' : 'ghost'}`} onClick={() => setMode('reg')}>Crear cuenta</button>
          </div>
          <h3 style={{ fontSize: 22 }}>{mode === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}</h3>
          <div className="sh-form" style={{ marginTop: 14 }}>
            {mode === 'reg' && <F label="Nombre y apellidos" id="rn" full><input id="rn" defaultValue="" required /></F>}
            <F label="Correo electrónico" id="re" full><input id="re" type="email" defaultValue={mode === 'login' ? 'laura.gomez@example.com' : ''} required /></F>
            <F label="Contraseña" id="rp" full><input id="rp" type="password" defaultValue={mode === 'login' ? 'demo-demo' : ''} required /></F>
            {mode === 'reg' && <label className="full" style={{ display: 'flex', gap: 10, alignItems: 'center' }}><input type="checkbox" /> Soy una empresa / autónomo (quiero tarifa profesional)</label>}
          </div>
          <button className="sh-btn accent block" style={{ marginTop: 18 }} type="submit">{mode === 'login' ? 'Entrar' : 'Crear mi cuenta'}</button>
          {mode === 'login' && <p className="sh-muted" style={{ marginTop: 12, textAlign: 'center' }}>¿Olvidaste tu contraseña? <a href="#" onClick={(e) => e.preventDefault()}>Recuperarla</a></p>}
          <p className="sh-muted" style={{ marginTop: 6, textAlign: 'center' }}>Demostración: pulsa “Entrar” para ver la cuenta de ejemplo.</p>
        </form>
        <div className="sh-card" style={{ background: 'var(--primary)', color: '#fff' }}>
          <h3 style={{ color: '#fff', fontSize: 22 }}>Con tu cuenta…</h3>
          <ul style={{ listStyle: 'none', display: 'grid', gap: 16, marginTop: 14 }}>
            {[['fa-children', 'Guardas el colegio y el curso de cada hijo/a'], ['fa-rotate', 'Repites el pedido del año pasado en un clic'], ['fa-truck-fast', 'Sigues tus pedidos en tiempo real'], ['fa-file-invoice', 'Descargas tus facturas cuando quieras'], ['fa-heart', 'Guardas tus favoritos y listas de deseos'], ['fa-gift', 'Acumulas puntos en cada compra']].map(([i, t]) => <li key={t} style={{ display: 'flex', gap: 14, alignItems: 'center' }}><i className={`fa-solid ${i}`} style={{ width: 38, height: 38, background: 'rgba(255,255,255,.14)', borderRadius: 10, display: 'grid', placeItems: 'center' }} />{t}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
