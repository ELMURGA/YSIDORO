import { useEffect, useRef, useState } from 'react';
import { searchProducts } from '../data/products.js';

export default function SearchBar({ onSearch, onSelectProduct }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const matches = query.trim() ? searchProducts(query.trim()).slice(0, 5) : [];

  function handleSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      setOpen(false);
      onSearch(q);
    }
  }

  return (
    <div className="search-container" ref={containerRef}>
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="¿Qué estás buscando hoy? Escribe 'bolígrafo', 'mochila'..."
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(Boolean(e.target.value.trim()));
          }}
        />
        <button type="submit" className="search-btn">
          <i className="fa-solid fa-magnifying-glass" />
        </button>
      </form>

      <div className={`autocomplete-dropdown ${open ? 'active' : ''}`}>
        <div className="dropdown-section">
          <div className="dropdown-section-title">
            {matches.length ? 'Productos Recomendados' : 'Resultados de búsqueda'}
          </div>
          {!matches.length && query.trim() && (
            <div style={{ padding: '10px 20px', fontSize: 13, color: 'var(--neutral-body)' }}>
              No se encontraron artículos
            </div>
          )}
          {matches.map((prod) => (
            <div
              className="autocomplete-item"
              key={prod.id}
              onClick={() => {
                setOpen(false);
                setQuery(prod.name);
                onSelectProduct(prod);
              }}
            >
              <img
                src={prod.image}
                alt={prod.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = prod.fallbackImage;
                }}
              />
              <div className="autocomplete-item-info">
                <span className="autocomplete-item-name">{prod.name}</span>
                <span className="autocomplete-item-price">{prod.price.toFixed(2)} €</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
