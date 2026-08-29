import { useMemo, useState } from 'react';
import ProductCard from './ProductCard.jsx';
import SchoolListResult from './SchoolListResult.jsx';
import { PRODUCTS, searchProducts } from '../data/products.js';

export default function CatalogView({
  searchQuery,
  activeCategory,
  activeSubcategory,
  schoolFilter,
  onSelectProduct,
  onAddToCart,
  onAddMany,
}) {
  const [stockFilters, setStockFilters] = useState(['in-stock']);
  const [priceFilters, setPriceFilters] = useState([]);
  const [sortValue, setSortValue] = useState('relevance');

  function toggleStock(value) {
    setStockFilters((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  }

  function togglePrice(value) {
    setPriceFilters((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  }

  const { title, results } = useMemo(() => {
    let list = [...PRODUCTS];
    let heading = 'Todos los productos';

    if (searchQuery) {
      heading = `Búsqueda: "${searchQuery}"`;
      list = searchProducts(searchQuery);
    } else if (activeCategory) {
      if (activeSubcategory) {
        heading = activeSubcategory;
        list = list.filter((p) => p.category === activeSubcategory);
      } else {
        heading = activeCategory;
        list = list.filter((p) => p.parentCategory === activeCategory);
      }
    }

    list = list.filter((p) => {
      if (p.stock === 'in-stock' || p.stock === 'low-stock') {
        return stockFilters.includes('in-stock');
      }
      return stockFilters.includes('out-of-stock');
    });

    if (priceFilters.length > 0) {
      list = list.filter((p) =>
        priceFilters.some((bracket) => {
          if (bracket === '0-10') return p.price <= 10;
          if (bracket === '10-20') return p.price > 10 && p.price <= 20;
          if (bracket === '20-50') return p.price > 20 && p.price <= 50;
          if (bracket === '50+') return p.price > 50;
          return false;
        }),
      );
    }

    if (sortValue === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return { title: heading, results: list };
  }, [searchQuery, activeCategory, activeSubcategory, stockFilters, priceFilters, sortValue]);

  return (
    <div id="catalog-view" className="page-view active">
      {schoolFilter ? (
        <SchoolListResult schoolFilter={schoolFilter} onAddToCart={onAddToCart} onAddMany={onAddMany} />
      ) : (
        <div className="catalog-layout">
          <aside className="catalog-sidebar">
            <div className="filter-block">
              <h4 className="filter-title">Disponibilidad</h4>
              <ul className="filter-list">
                <li>
                  <label className="filter-checkbox-label">
                    <input
                      type="checkbox"
                      className="filter-checkbox"
                      checked={stockFilters.includes('in-stock')}
                      onChange={() => toggleStock('in-stock')}
                    />
                    En Stock
                  </label>
                </li>
                <li>
                  <label className="filter-checkbox-label">
                    <input
                      type="checkbox"
                      className="filter-checkbox"
                      checked={stockFilters.includes('out-of-stock')}
                      onChange={() => toggleStock('out-of-stock')}
                    />
                    Bajo Pedido / Sin Stock
                  </label>
                </li>
              </ul>
            </div>

            <div className="filter-block">
              <h4 className="filter-title">Filtrar por Precio</h4>
              <ul className="filter-list">
                {[
                  ['0-10', 'De 0 a 10 €'],
                  ['10-20', 'De 10 a 20 €'],
                  ['20-50', 'De 20 a 50 €'],
                  ['50+', 'Más de 50 €'],
                ].map(([value, label]) => (
                  <li key={value}>
                    <label className="filter-checkbox-label">
                      <input
                        type="checkbox"
                        className="filter-checkbox"
                        checked={priceFilters.includes(value)}
                        onChange={() => togglePrice(value)}
                      />
                      {label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section className="catalog-main">
            <div className="catalog-header">
              <div className="catalog-results-title">
                <h2>{title}</h2>
                <p className="catalog-results-count">Mostrando {results.length} artículo(s)</p>
              </div>

              <div className="catalog-sort">
                <select value={sortValue} onChange={(e) => setSortValue(e.target.value)}>
                  <option value="relevance">Relevancia</option>
                  <option value="price-asc">Precio: de menor a mayor</option>
                  <option value="price-desc">Precio: de mayor a menor</option>
                </select>
              </div>
            </div>

            {results.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: 'var(--neutral-body)' }}>
                <i
                  className="fa-solid fa-circle-question"
                  style={{ fontSize: 48, color: 'hsl(220, 15%, 80%)', marginBottom: 16 }}
                />
                <p>No se encontraron productos que coincidan con los filtros aplicados.</p>
              </div>
            ) : (
              <div className="products-grid">
                {results.map((prod) => (
                  <ProductCard key={prod.id} product={prod} onSelect={onSelectProduct} onAddToCart={onAddToCart} />
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
