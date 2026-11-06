import { useState } from 'react';
import Header from './components/Header.jsx';
import HomeView from './components/HomeView.jsx';
import CatalogView from './components/CatalogView.jsx';
import DetailView from './components/DetailView.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Footer from './components/Footer.jsx';
import InfoPage from './components/InfoPage.jsx';
import { useCart } from './hooks/useCart.js';
import CheckoutView from './shop/CheckoutView.jsx';
import ConfirmationView from './shop/ConfirmationView.jsx';
import AuthView from './shop/AuthView.jsx';
import AccountView from './shop/AccountView.jsx';
import TrackingView from './shop/TrackingView.jsx';
import StoresView from './shop/StoresView.jsx';
import BusinessView from './shop/BusinessView.jsx';
import FavoritesView from './shop/FavoritesView.jsx';
import { Floating } from './shop/Floating.jsx';

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
  const [user, setUser] = useState(() => { try { return sessionStorage.getItem('isidoro_user') ? { name: 'Laura Gómez Prieto', email: 'laura.gomez@example.com', phone: '600 11 22 33' } : null; } catch { return null; } });
  const [lastOrder, setLastOrder] = useState(null);

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

  function go(nextView) {
    setPreviousView(['home', 'catalog'].includes(view) ? view : previousView);
    setView(nextView);
    window.scrollTo(0, 0);
  }

  function handleCheckout() {
    if (cart.length === 0) return;
    setCartOpen(false);
    go('checkout');
  }

  function handlePlaced(order) {
    setLastOrder(order);
    clearCart();
    setView('confirmation');
    window.scrollTo(0, 0);
  }

  function handleLogin() {
    try { sessionStorage.setItem('isidoro_user', '1'); } catch { /* sin almacenamiento */ }
    setUser({ name: 'Laura Gómez Prieto', email: 'laura.gomez@example.com', phone: '600 11 22 33' });
    go('account');
  }

  function handleLogout() {
    try { sessionStorage.removeItem('isidoro_user'); } catch { /* sin almacenamiento */ }
    setUser(null);
    goHome();
  }

  function handleOpenList(school, course) {
    handleSchoolFinderSubmit({ school, course });
  }

  function handleRepeat(items) {
    handleAddMany(items.map((it) => ({ product: it.product, quantity: it.qty })));
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
        user={user}
        onAccount={() => go(user ? 'account' : 'auth')}
        onFavorites={() => go('favorites')}
        onNavigate={(v) => go(v)}
        onShopSchool={() => { goHome(); setTimeout(() => document.getElementById('material-finder')?.scrollIntoView({ behavior: 'smooth' }), 80); }}
      />

      <main className="container" id="app-viewport">
        {view === 'home' && (
          <HomeView
            onSubmitSchoolFinder={handleSchoolFinderSubmit}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onSelectCategory={handleSelectCategory}
            onAddMany={handleAddMany}
            onBusiness={() => go('business')}
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
            onSelectProduct={handleSelectProduct}
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

        {view === 'checkout' && (
          <CheckoutView cart={cart} subtotal={totalPrice} user={user} onBack={(t) => (t ? go(t) : goHome())} onPlaced={handlePlaced} onLogin={() => go('auth')} />
        )}
        {view === 'confirmation' && (
          <ConfirmationView order={lastOrder} hasUser={!!user} onTrack={() => go('tracking')} onShop={goHome} onAccount={() => go('auth')} />
        )}
        {view === 'auth' && <AuthView onLogin={handleLogin} onBack={goHome} />}
        {view === 'account' && (
          <AccountView onLogout={handleLogout} onTrack={() => go('tracking')} onRepeat={handleRepeat} onOpenList={handleOpenList} onOpenFavorites={() => go('favorites')} />
        )}
        {view === 'tracking' && <TrackingView lastOrderId={lastOrder?.id} />}
        {view === 'stores' && <StoresView />}
        {view === 'business' && <BusinessView onAddMany={handleAddMany} />}
        {view === 'favorites' && <FavoritesView onSelectProduct={handleSelectProduct} onAddToCart={handleAddToCart} onShop={goHome} />}
      </main>

      <Footer onNavigate={handleNavigateInfo} onGo={go} />
      <Floating />

      <CartDrawer
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
        totalPrice={totalPrice}
        onShopMore={() => setCartOpen(false)}
      />
    </>
  );
}
