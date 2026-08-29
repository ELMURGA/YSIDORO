export default function CartDrawer({ cart, isOpen, onClose, onUpdateQty, onRemoveItem, onCheckout, totalPrice }) {
  return (
    <div
      className={`cart-backdrop ${isOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside className="cart-panel">
        <div className="cart-header">
          <div className="cart-title">
            <i className="fa-solid fa-cart-shopping" />
            <h3>Tu Cesta de Compra</h3>
          </div>
          <button className="close-cart-btn" onClick={onClose}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <i className="fa-solid fa-basket-shopping" />
              <p>
                Tu cesta está vacía.
                <br />
                Agrega productos para comenzar.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.product.id}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="cart-item-img"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = item.product.fallbackImage;
                  }}
                />
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.product.name}</span>
                  <div className="cart-item-price-row">
                    <span className="cart-item-price">{(item.product.price * item.quantity).toFixed(2)} €</span>
                    <div className="cart-item-qty-selector">
                      <button className="cart-qty-btn" onClick={() => onUpdateQty(item.product.id, -1)}>
                        <i className="fa-solid fa-minus" style={{ fontSize: 8 }} />
                      </button>
                      <span className="cart-qty-input">{item.quantity}</span>
                      <button className="cart-qty-btn" onClick={() => onUpdateQty(item.product.id, 1)}>
                        <i className="fa-solid fa-plus" style={{ fontSize: 8 }} />
                      </button>
                    </div>
                  </div>
                </div>
                <button className="remove-item-btn" onClick={() => onRemoveItem(item.product.id)}>
                  <i className="fa-solid fa-trash-can" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-subtotal-row">
            <span className="subtotal-label">Subtotal (con IVA):</span>
            <span className="subtotal-val">{totalPrice.toFixed(2)} €</span>
          </div>
          <button className="checkout-btn" disabled={cart.length === 0} onClick={onCheckout}>
            Tramitar Pedido <i className="fa-solid fa-arrow-right" style={{ marginLeft: 8 }} />
          </button>
        </div>
      </aside>
    </div>
  );
}
