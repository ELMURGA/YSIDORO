import { useState } from 'react';
import { StockStatus } from './ProductCard.jsx';

export default function DetailView({ product, onBack, onAddToCart }) {
  const [qty, setQty] = useState(1);

  if (!product) return <div id="detail-view" className="page-view active" />;

  const isOut = product.stock === 'out-of-stock';
  const basePrice = product.price / 1.21;

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

          <div className="detail-desc-box">
            <h4>Descripción</h4>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
