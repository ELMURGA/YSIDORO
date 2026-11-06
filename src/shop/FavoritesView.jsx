import ProductCard from '../components/ProductCard.jsx';
import { PRODUCTS } from '../data/products.js';
import { useFavorites } from '../hooks/useFavorites.js';

export default function FavoritesView({ onSelectProduct, onAddToCart, onShop }) {
  const { favorites } = useFavorites();
  const items = favorites.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
  return (
    <div className="page-view active sh-page">
      <h1>Mis favoritos</h1><p className="sub">Los productos que has guardado con el corazón. Perfecto para listas de deseos y regalos.</p>
      {items.length === 0 ? (
        <div className="sh-empty"><i className="fa-regular fa-heart" /><h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--neutral-dark)' }}>Aún no tienes favoritos</h3><p className="sh-muted" style={{ marginBottom: 16 }}>Pulsa el corazón de cualquier producto para guardarlo aquí.</p><button className="sh-btn" onClick={onShop}>Explorar la tienda</button></div>
      ) : (<div className="products-grid">{items.map((p) => <ProductCard key={p.id} product={p} onSelect={onSelectProduct} onAddToCart={onAddToCart} />)}</div>)}
    </div>
  );
}
