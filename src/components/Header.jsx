import MegaMenu from './MegaMenu.jsx';
import SearchBar from './SearchBar.jsx';
import { NAV_CATEGORIES } from '../data/categories.js';
import { useFavorites } from '../hooks/useFavorites.js';
import logo from '../assets/logo-ipapel.jpg';

export default function Header({
  onLogoClick,
  onSearch,
  onSelectProduct,
  onSelectCategory,
  onSelectSubcategory,
  cartCount,
  onOpenCart,
  user,
  onAccount,
  onFavorites,
  onNavigate,
  onShopSchool,
}) {
  const { favorites } = useFavorites();
  return (
    <header className="header-wrapper">
      <div className="sh-topbar">
        <div className="container">
          <div className="sh-promo"><b>NUEVO</b> Envío gratis desde 49 €<span className="sh-promo-extra"> · Recogida en tienda en 2 h</span></div>
          <nav className="sh-links" aria-label="Enlaces rápidos">
            <button onClick={onShopSchool}><i className="fa-solid fa-school" /> Listas de colegios</button>
            <button onClick={() => onNavigate('tracking')}><i className="fa-solid fa-truck" /> Seguir pedido</button>
            <button onClick={() => onNavigate('stores')}><i className="fa-solid fa-location-dot" /> Tiendas</button>
            <button onClick={() => onNavigate('business')}><i className="fa-solid fa-briefcase" /> Empresas</button>
            <a href="tel:+34954000000"><i className="fa-solid fa-phone" /> 954 00 00 00</a>
          </nav>
        </div>
      </div>
      <div className="container main-header">
        <a
          href="#"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            onLogoClick();
          }}
        >
          <img src={logo} alt="iPapel.es" />
        </a>

        <SearchBar onSearch={onSearch} onSelectProduct={onSelectProduct} />

        <div className="header-actions">
          <button className="header-action-btn" title="Favoritos" onClick={onFavorites} aria-label="Favoritos">
            <i className="fa-regular fa-heart" />
            {favorites.length > 0 && <span className="badge-count">{favorites.length}</span>}
          </button>
          <button className="header-action-btn" title={user ? 'Mi cuenta' : 'Entrar'} onClick={onAccount} aria-label="Mi cuenta">
            <i className={user ? 'fa-solid fa-user-check' : 'fa-regular fa-user'} />
          </button>
          <button className="header-action-btn" title="Carrito de Compra" onClick={onOpenCart}>
            <i className="fa-solid fa-cart-shopping" />
            <span className="badge-count">{cartCount}</span>
          </button>
        </div>
      </div>

      <MegaMenu
        categories={NAV_CATEGORIES}
        onSelectCategory={onSelectCategory}
        onSelectSubcategory={onSelectSubcategory}
      />
    </header>
  );
}
