export const FREE_FROM = 49;
export const SHIPPING = 4.95;
export const eur = (n) => Number(n).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
export const COUPONS = {
  COLE10: { label: '10% de descuento', apply: (sub) => sub * 0.1 },
  BIENVENIDA5: { label: '5 € de descuento', apply: () => 5 },
  AMPA15: { label: '15% (AMPAs)', apply: (sub) => sub * 0.15 },
};
export function Img({ product, ...rest }) {
  return <img src={product.image} alt={product.name} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = product.fallbackImage; }} {...rest} />;
}
export function F({ label, id, full, children }) {
  return (
    <div className={`sh-field ${full ? 'full' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
}
export function Back({ onClick, children = 'Volver' }) {
  return <button className="back-btn" onClick={onClick}><i className="fa-solid fa-arrow-left-long" /> {children}</button>;
}
