import MegaMenu from './MegaMenu.jsx';
import SearchBar from './SearchBar.jsx';
import { NAV_CATEGORIES } from '../data/categories.js';
import logo from '../assets/logo-ipapel.jpg';

export default function Header({
  onLogoClick,
  onSearch,
  onSelectProduct,
  onSelectCategory,
  onSelectSubcategory,
  cartCount,
  onOpenCart,
}) {
  return (
    <header className="header-wrapper">
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
          <button className="header-action-btn" title="Mi Cuenta">
            <i className="fa-regular fa-user" />
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
