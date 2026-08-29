function StockStatus({ stock, compact }) {
  if (stock === 'in-stock') {
    return (
      <span className="product-status-row status-in-stock">
        <span className="status-dot" /> {compact ? 'En Stock' : 'En Stock (Entrega en 24h)'}
      </span>
    );
  }
  if (stock === 'low-stock') {
    return (
      <span className="product-status-row status-low-stock">
        <span className="status-dot" /> {compact ? 'Stock Bajo' : '¡Últimas Unidades disponibles!'}
      </span>
    );
  }
  return (
    <span className="product-status-row status-out-stock">
      <span className="status-dot" /> {compact ? 'Agotado' : 'Temporalmente Agotado / Bajo Pedido'}
    </span>
  );
}

export default function ProductCard({ product, onSelect, onAddToCart }) {
  const isOut = product.stock === 'out-of-stock';

  return (
    <article className="product-card">
      {product.stock === 'low-stock' && (
        <span className="product-badge" style={{ backgroundColor: 'var(--warning)' }}>
          Últimas uds.
        </span>
      )}
      {isOut && <span className="product-badge out-of-stock">Agotado</span>}

      <button
        type="button"
        className="product-card-img-wrapper"
        onClick={() => onSelect(product)}
        aria-label={`Ver detalle de ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-card-img"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = product.fallbackImage;
          }}
        />
      </button>

      <div className="product-card-content">
        <span className="product-ref">REF: {product.ref}</span>
        <button type="button" className="product-title" onClick={() => onSelect(product)}>
          {product.name}
        </button>

        <StockStatus stock={product.stock} compact />

        <div className="product-price-row">
          <div className="product-price-container">
            <span className="price-main">{product.price.toFixed(2)} €</span>
            <span className="price-iva">con IVA</span>
          </div>
          <button
            type="button"
            className={`add-cart-btn ${isOut ? 'disabled' : ''}`}
            title="Añadir a la cesta"
            disabled={isOut}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, 1);
            }}
          >
            <i className="fa-solid fa-cart-plus" />
          </button>
        </div>
      </div>
    </article>
  );
}

export { StockStatus };
