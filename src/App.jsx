import { useState } from 'react';
import Header from './components/Header.jsx';
import HomeView from './components/HomeView.jsx';
import CatalogView from './components/CatalogView.jsx';
import DetailView from './components/DetailView.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Footer from './components/Footer.jsx';
import InfoPage from './components/InfoPage.jsx';
import { useCart } from './hooks/useCart.js';

export default function App() {
  const [view, setView] = useState('home'); // 'home' | 'catalog' | 'detail' | 'info'
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeInfoPage, setActiveInfoPage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [activeSubcategory, setActiveSubcategory] = useState('');
  const [schoolFilter, setSchoolFilter] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [previousView, setPreviousView] = useState('home');

  const { cart, addToCart, addManyToCart, updateQty, removeItem, clearCart, totalItems, totalPrice } = useCart();

  function resetFilters() {
    setSearchQuery('');
    setActiveCategory('');
    setActiveSubcategory('');
    setSchoolFilter(null);
  }

  function goHome() {
    resetFilters();
    setView('home');
    window.scrollTo(0, 0);
  }

  function handleSearch(query) {
    resetFilters();
    setSearchQuery(query);
    setView('catalog');
    window.scrollTo(0, 0);
  }

  function handleSelectCategory(categoryKey) {
    resetFilters();
    setActiveCategory(categoryKey);
    setView('catalog');
    window.scrollTo(0, 0);
  }

  function handleSelectSubcategory(categoryKey, sub) {
    resetFilters();
    setActiveCategory(categoryKey);
    setActiveSubcategory(sub);
    setView('catalog');
    window.scrollTo(0, 0);
  }

  function handleSelectProduct(product) {
    setPreviousView(view === 'detail' ? previousView : view);
    setActiveProduct(product);
    setView('detail');
    window.scrollTo(0, 0);
  }

  function handleSchoolFinderSubmit(filter) {
    resetFilters();
    setSchoolFilter(filter);
    setView('catalog');
    window.scrollTo(0, 0);
  }

  function handleNavigateInfo(pageKey) {
    setPreviousView(view === 'info' ? previousView : view);
    setActiveInfoPage(pageKey);
    setView('info');
    window.scrollTo(0, 0);
  }

  function handleAddToCart(product, qty = 1) {
    addToCart(product, qty);
    setCartOpen(true);
  }

  function handleAddMany(entries) {
    addManyToCart(entries);
    setCartOpen(true);
  }

  function handleCheckout() {
    if (cart.length === 0) return;
    alert('¡Pedido Tramitado!\n(Simulación de checkout para el cliente Isidoro)');
    clearCart();
    setCartOpen(false);
  }

  return (
    <>
      <Header
        onLogoClick={goHome}
        onSearch={handleSearch}
        onSelectProduct={handleSelectProduct}
        onSelectCategory={handleSelectCategory}
        onSelectSubcategory={handleSelectSubcategory}
        cartCount={totalItems}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="container" id="app-viewport">
        {view === 'home' && (
          <HomeView
            onSubmitSchoolFinder={handleSchoolFinderSubmit}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {view === 'catalog' && (
          <CatalogView
            searchQuery={searchQuery}
            activeCategory={activeCategory}
            activeSubcategory={activeSubcategory}
            schoolFilter={schoolFilter}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onAddMany={handleAddMany}
          />
        )}

        {view === 'detail' && (
          <DetailView
            product={activeProduct}
            onBack={() => {
              setView(previousView);
              window.scrollTo(0, 0);
            }}
            onAddToCart={handleAddToCart}
          />
        )}

        {view === 'info' && (
          <InfoPage
            pageKey={activeInfoPage}
            onBack={() => {
              setView(previousView);
              window.scrollTo(0, 0);
            }}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigateInfo} />

      <CartDrawer
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
        totalPrice={totalPrice}
      />
    </>
  );
}
