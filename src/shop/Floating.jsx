import { useState } from 'react';

export function Floating() {
  const [cookies, setCookies] = useState(() => { try { return localStorage.getItem('isidoro_cookies') !== '1'; } catch { return true; } });
  const accept = () => { try { localStorage.setItem('isidoro_cookies', '1'); } catch { /* sin almacenamiento */ } setCookies(false); };
  return (
    <>
      <a className="sh-demo-pill" href="#/admin" title="Abrir el panel de gestión (demo)"><i className="fa-solid fa-gauge-high" /><span>Panel del propietario</span></a>
      <a className="sh-float-wa" href="https://wa.me/34954000000" target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp"><i className="fa-brands fa-whatsapp" /></a>
      {cookies && (
        <div className="sh-cookie" role="dialog" aria-label="Cookies"><p>Usamos cookies propias para que la tienda funcione y, con tu permiso, para mejorarla. Puedes cambiarlo cuando quieras.</p>
          <button className="sh-btn small ghost" onClick={accept}>Solo necesarias</button><button className="sh-btn small" onClick={accept}>Aceptar todas</button></div>
      )}
    </>
  );
}
