import { useState } from 'react';
import { StockStatus } from './ProductCard.jsx';
import ProductCard from './ProductCard.jsx';
import { PRODUCTS } from '../data/products.js';
import { ADMIN_PRODUCTS, LOCATIONS, REVIEWS } from '../data/mock.js';
import { useFavorites } from '../hooks/useFavorites.js';

export default function DetailView({ product, onBack, onAddToCart, onSelectProduct }) {
  const [qty, setQty] = useState(1);
  const { isFav, toggle } = useFavorites();

  if (!product) return <div id="detail-view" className="page-view active" />;

  const isOut = product.stock === 'out-of-stock';
  const basePrice = product.price / 1.21;
  const full = ADMIN_PRODUCTS.find((p) => p.id === product.id);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id && p.stock === 'in-stock').slice(0, 4);
  const cls = (n) => (n === 0 ? 'no' : n < 5 ? 'low' : 'ok');

  return (
    <div id="detail-view" className="page-view active">
      <button className="back-btn" onClick={onBack}>
        <i className="fa-solid fa-arrow-left-long" /> Volver a los productos
      </button>

      <div className="detail-layout">
        <div className="detail-gallery">
          <div className="detail-img-box">
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = product.fallbackImage;
              }}
            />
          </div>
        </div>

        <div className="detail-info">
          <span className="detail-ref">
            REF: {product.ref} | ID: {product.id}
          </span>
          <h2 className="detail-title">{product.name}</h2>

          <div className="detail-status-row">
            <StockStatus stock={product.stock} />
          </div>

          <div className="detail-price-box">
            <span className="detail-price-main">{product.price.toFixed(2)} €</span>
            <span className="detail-price-base">Precio base: {basePrice.toFixed(2)} € + IVA (21%)</span>
          </div>

          <div className="detail-actions">
            <div className="quantity-selector">
              <button className="qty-btn" onClick={() => setQty((v) => Math.max(1, v - 1))}>
                <i className="fa-solid fa-minus" />
              </button>
              <input type="text" className="qty-input" value={qty} readOnly />
              <button className="qty-btn" onClick={() => setQty((v) => v + 1)}>
                <i className="fa-solid fa-plus" />
              </button>
            </div>

            <button
              className={`detail-add-cart-btn ${isOut ? 'disabled' : ''}`}
              disabled={isOut}
              onClick={() => onAddToCart(product, qty)}
            >
              {isOut ? (
                <>
                  <i className="fa-solid fa-circle-xmark" /> Agotado
                </>
              ) : (
                <>
                  <i className="fa-solid fa-cart-plus" /> Añadir al Carrito
                </>
              )}
            </button>
          </div>

          <button type="button" className="sh-btn ghost small" style={{ marginTop: 14 }} onClick={() => toggle(product.id)} aria-pressed={isFav(product.id)}>
            <i className={isFav(product.id) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} style={{ color: 'var(--accent)' }} /> {isFav(product.id) ? 'Guardado en favoritos' : 'Guardar en favoritos'}
          </button>

          {full && (
            <div className="sh-stockbox">
              <h5><i className="fa-solid fa-store" /> Disponibilidad por tienda</h5>
              {LOCATIONS.map((l) => {
                const n = full.stockLoc[l.id];
                return (
                  <div className="r" key={l.id}>
                    <span>{l.name}</span>
                    <span className={`u ${cls(n)}`}>{n === 0 ? 'Sin stock' : n < 5 ? `Quedan ${n}` : 'Disponible'}</span>
                  </div>
                );
              })}
              <div className="r" style={{ borderTop: '1px solid var(--border-color)', marginTop: 4, paddingTop: 8 }}><span><i className="fa-solid fa-truck" /> Envío a domicilio</span><span className="u ok">24-48 h</span></div>
            </div>
          )}

          <div className="detail-desc-box">
            <h4>Descripción</h4>
            <p>{product.description}</p>
          </div>

          <ul style={{ listStyle: 'none', display: 'grid', gap: 8, marginTop: 14, fontSize: 14 }}>
            <li><i className="fa-solid fa-truck-fast" style={{ color: 'var(--primary)', width: 22 }} /> Envío gratis desde 49 €</li>
            <li><i className="fa-solid fa-store" style={{ color: 'var(--primary)', width: 22 }} /> Recogida gratis en tienda en 2 horas</li>
            <li><i className="fa-solid fa-rotate-left" style={{ color: 'var(--primary)', width: 22 }} /> 30 días para devolverlo</li>
          </ul>
        </div>
      </div>

      <section className="sh-reviews">
        <h3 className="section-title">Opiniones de clientes</h3>
        <div className="sh-grid2">
          {REVIEWS.filter((r) => r.state === 'Publicada').map((r) => (
            <div className="sh-card" key={r.id}>
              <div className="sh-stars" aria-label={`${r.stars} de 5 estrellas`}>{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
              <p style={{ margin: '6px 0' }}>{r.text}</p>
              <small className="sh-muted">{r.who} · compra verificada</small>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="sh-related">
          <h3 className="section-title">También te puede interesar</h3>
          <div className="products-grid">
            {related.map((p) => <ProductCard key={p.id} product={p} onSelect={onSelectProduct} onAddToCart={onAddToCart} />)}
          </div>
        </section>
      )}
    </div>
  );
}
