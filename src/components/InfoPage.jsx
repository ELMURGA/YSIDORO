import { useState } from 'react';
import { getInfoPage } from '../data/infoPages.js';

function InfoBlock({ block }) {
  if (block.type === 'heading') {
    return <h4 className="info-block-heading">{block.text}</h4>;
  }
  if (block.type === 'paragraph') {
    return <p className="info-block-paragraph">{block.text}</p>;
  }
  if (block.type === 'list') {
    return (
      <ul className="info-block-list">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if (block.type === 'table') {
    return (
      <table className="info-table">
        <thead>
          <tr>
            {block.headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return null;
}

function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="contact-layout">
      <div className="contact-info-card">
        <h4>Habla con nosotros</h4>
        <p>
          ¿Tienes dudas sobre un pedido, una lista de material o disponibilidad de stock? Nuestro equipo te
          responderá en menos de 24h laborables.
        </p>
        <ul className="contact-info-list">
          <li>
            <i className="fa-solid fa-phone" />
            <a href="tel:+34954000000">+34 954 00 00 00</a>
          </li>
          <li>
            <i className="fa-solid fa-envelope" />
            <a href="mailto:contacto@libreriaisidoro.com">contacto@libreriaisidoro.com</a>
          </li>
          <li>
            <i className="fa-solid fa-location-dot" /> Sevilla, España
          </li>
          <li>
            <i className="fa-solid fa-clock" /> Lunes a Viernes, 9:00 - 20:00h
          </li>
        </ul>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        {sent ? (
          <div className="contact-form-success">
            <i className="fa-solid fa-circle-check" />
            <p>¡Gracias! Hemos recibido tu mensaje (simulación para la demo). Te contestaremos lo antes posible.</p>
          </div>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="contact-name">Nombre</label>
              <input id="contact-name" className="contact-form-input" type="text" required placeholder="Tu nombre" />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                className="contact-form-input"
                type="email"
                required
                placeholder="tucorreo@ejemplo.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Mensaje</label>
              <textarea
                id="contact-message"
                className="contact-form-input contact-form-textarea"
                required
                rows={5}
                placeholder="Cuéntanos en qué podemos ayudarte..."
              />
            </div>
            <button type="submit" className="finder-btn contact-form-submit">
              <i className="fa-solid fa-paper-plane" /> Enviar Mensaje
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default function InfoPage({ pageKey, onBack }) {
  const page = pageKey === 'contacto' ? null : getInfoPage(pageKey);

  return (
    <div id="info-view" className="page-view active info-page">
      <button className="back-btn" onClick={onBack}>
        <i className="fa-solid fa-arrow-left-long" /> Volver
      </button>

      {pageKey === 'contacto' ? (
        <>
          <div className="info-page-header">
            <div className="info-page-icon">
              <i className="fa-solid fa-headset" />
            </div>
            <div>
              <h2 className="info-page-title">Contacto</h2>
              <span className="info-page-meta">Estamos para ayudarte</span>
            </div>
          </div>
          <ContactPage />
        </>
      ) : page ? (
        <>
          <div className="info-page-header">
            <div className="info-page-icon">
              <i className={page.icon} />
            </div>
            <div>
              <h2 className="info-page-title">{page.title}</h2>
              <span className="info-page-meta">{page.updated}</span>
            </div>
          </div>
          <div className="info-page-body">
            {page.blocks.map((block, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <InfoBlock key={i} block={block} />
            ))}
          </div>
        </>
      ) : (
        <p>Página no encontrada.</p>
      )}
    </div>
  );
}
