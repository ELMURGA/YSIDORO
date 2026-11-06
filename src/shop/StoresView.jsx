import { LOCATIONS } from '../data/mock.js';
import { F } from './shared.jsx';

export default function StoresView() {
  return (
    <div className="page-view active sh-page">
      <h1>Nuestras tiendas</h1><p className="sub">Tres espacios para atenderte: dos tiendas en la ciudad y una nave grande donde encuentras todo, incluido nuestro outlet. Recoge tu pedido web en cualquiera de ellas.</p>
      <div className="sh-grid3">
        {LOCATIONS.map((l) => (
          <article className="sh-card sh-store" key={l.id}>
            <div className="map" aria-hidden="true"><i className="fa-solid fa-location-dot" /><span>Mapa</span></div>
            <div className="body"><h3 style={{ marginBottom: 2 }}>{l.name}</h3><span className="sh-pill pink">{l.kind}</span>
              <ul><li><i className="fa-solid fa-location-dot" />{l.address}</li><li><i className="fa-solid fa-phone" />{l.phone}</li><li><i className="fa-regular fa-clock" />{l.hours}</li><li><i className="fa-solid fa-bag-shopping" />Recogida de pedidos web en 2 h</li></ul>
              <div style={{ display: 'flex', gap: 8 }}><button className="sh-btn small"><i className="fa-solid fa-route" /> Cómo llegar</button><a className="sh-btn small ghost" href={`tel:${l.phone.replace(/\s/g, '')}`}><i className="fa-solid fa-phone" /> Llamar</a></div></div>
          </article>
        ))}
      </div>
      <div className="sh-grid2" style={{ marginTop: 24 }}>
        <div className="sh-card"><h3>¿Qué tienda me conviene?</h3><ul style={{ listStyle: 'none', display: 'grid', gap: 12 }}><li><b>Tienda Centro y Tienda Plaza:</b> <span className="sh-muted">atención cercana, recogida rápida y asesoramiento.</span></li><li><b>La Nave:</b> <span className="sh-muted">todo el catálogo, compras grandes, outlet y recogida de listas completas del colegio.</span></li></ul></div>
        <form className="sh-card" onSubmit={(e) => e.preventDefault()}><h3>Escríbenos</h3><div className="sh-form"><F label="Nombre" id="s1"><input id="s1" /></F><F label="Correo" id="s2"><input id="s2" type="email" /></F><F label="Mensaje" id="s3" full><textarea id="s3" /></F></div><button className="sh-btn accent" style={{ marginTop: 14 }}>Enviar mensaje</button></form>
      </div>
    </div>
  );
}
