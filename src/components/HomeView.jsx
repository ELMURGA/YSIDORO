import SchoolFinder from './SchoolFinder.jsx';
import ProductCard from './ProductCard.jsx';
import { PRODUCTS } from '../data/products.js';
import { QUICK_CATEGORIES } from '../data/categories.js';

export default function HomeView({ onSubmitSchoolFinder, onSelectProduct, onAddToCart, onSelectCategory }) {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  return (
    <div id="home-view" className="page-view active">
      <section className="hero-carousel-wrapper">
        <div className="hero-slide">
          <div className="hero-content">
            <h2>
              Vuelta al Cole <span>2026</span>
            </h2>
            <p>
              Encuentra de forma rápida y sencilla la lista exacta de libros de texto y materiales escolares
              requeridos por tu colegio.
            </p>
            <a
              href="#material-finder"
              className="hero-btn"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('material-finder')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Comenzar Búsqueda <i className="fa-solid fa-arrow-right" />
            </a>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop"
              alt="Material Escolar"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/600x400/0c173c/ffffff?text=Material+Escolar';
              }}
            />
          </div>
        </div>
      </section>

      <SchoolFinder onSubmit={onSubmitSchoolFinder} />

      <section style={{ marginBottom: 50 }}>
        <h3 className="section-title">Categorías Populares</h3>
        <div className="category-quick-grid">
          {QUICK_CATEGORIES.map((qc) => (
            <div
              className="category-quick-card cursor-pointer"
              key={qc.category}
              onClick={() => onSelectCategory(qc.category)}
              role="button"
              tabIndex={0}
            >
              <div className="category-icon-wrapper">
                <i className={qc.icon} />
              </div>
              <h4>{qc.title}</h4>
              <p>{qc.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="section-title">Destacados de la Semana</h3>
        <div className="products-grid">
          {featured.map((prod) => (
            <ProductCard key={prod.id} product={prod} onSelect={onSelectProduct} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>
    </div>
  );
}
