export default function Footer({ onNavigate }) {
  function go(pageKey) {
    return (e) => {
      e.preventDefault();
      onNavigate(pageKey);
    };
  }

  return (
    <footer className="main-footer">
      <div className="container footer-grid">
        <div className="footer-col footer-about">
          <h5>Librería Isidoro</h5>
          <p>
            Tu librería y papelería de confianza. Compra de forma fácil y cómoda los libros de texto y materiales de
            tu colegio.
          </p>
        </div>
        <div className="footer-col">
          <h5>Información</h5>
          <ul className="footer-links">
            <li>
              <a href="#" onClick={go('quienes-somos')}>¿Quiénes Somos?</a>
            </li>
            <li>
              <a href="#" onClick={go('envios')}>Gastos de Envío</a>
            </li>
            <li>
              <a href="#" onClick={go('bases-promocion')}>Bases de Promociones</a>
            </li>
            <li>
              <a href="#" onClick={go('contacto')}>Contacto</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Servicios</h5>
          <ul className="footer-links">
            <li>
              <a href="#" onClick={go('compra-rapida')}>Compra Rápida</a>
            </li>
            <li>
              <a href="#" onClick={go('garantias')}>Garantías</a>
            </li>
            <li>
              <a href="#" onClick={go('devoluciones')}>Devoluciones</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Contacto</h5>
          <ul className="footer-links">
            <li>
              <a href="tel:+34954000000" className="footer-contact-link">
                <i className="fa-solid fa-phone" style={{ marginRight: 8 }} /> +34 954 00 00 00
              </a>
            </li>
            <li>
              <a href="mailto:contacto@libreriaisidoro.com" className="footer-contact-link">
                <i className="fa-solid fa-envelope" style={{ marginRight: 8 }} /> contacto@libreriaisidoro.com
              </a>
            </li>
            <li>
              <i className="fa-solid fa-location-dot" style={{ marginRight: 8 }} /> Sevilla, España
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <div>
          &copy; 2026 Librería Papelería Isidoro. Todos los derechos reservados. |
          <a href="#" style={{ marginLeft: 6 }} onClick={go('aviso-legal')}>
            Aviso Legal
          </a>{' '}
          |
          <a href="#" style={{ marginLeft: 6 }} onClick={go('cookies')}>
            Política de Cookies
          </a>{' '}
          |
          <a href="#" style={{ marginLeft: 6 }} onClick={go('registro-tratamiento')}>
            Tratamiento de Datos
          </a>
        </div>
        <div className="footer-payments" title="Tarjetas y PayPal soportadas">
          <i className="fa-brands fa-cc-visa" />
          <i className="fa-brands fa-cc-mastercard" />
          <i className="fa-brands fa-cc-paypal" />
        </div>
      </div>
    </footer>
  );
}
