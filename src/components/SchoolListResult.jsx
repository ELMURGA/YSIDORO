import { useState } from 'react';
import { getProductById, getAlternativesFor } from '../data/products.js';
import { COURSE_MATERIAL_LISTS } from '../data/schools.js';

// FASE 3: cada línea de la lista escolar es una necesidad genérica con
// un producto sugerido y alternativas calculadas por categoría. El
// usuario puede cambiar la opción sugerida por cualquier alternativa
// válida antes de añadirla (individualmente o con "Añadir toda la lista").
export default function SchoolListResult({ schoolFilter, onAddToCart, onAddMany }) {
  const lines = COURSE_MATERIAL_LISTS[schoolFilter.course] || [];

  const [selections, setSelections] = useState(() => {
    const initial = {};
    lines.forEach((line) => {
      initial[line.need] = line.suggestedId;
    });
    return initial;
  });

  function handleAddAll() {
    const entries = lines
      .map((line) => getProductById(selections[line.need]))
      .filter(Boolean)
      .map((product) => ({ product, quantity: 1 }));
    onAddMany(entries);
  }

  return (
    <>
      <div className="school-list-toolbar">
        <div>
          <h2 style={{ fontSize: 24, marginBottom: 4 }}>
            <i className="fa-solid fa-school-flag" style={{ color: 'var(--secondary)', marginRight: 10 }} />
            Material: {schoolFilter.course}
          </h2>
          <p className="catalog-results-count">
            Lista para <strong>{schoolFilter.school}</strong> ({schoolFilter.course})
          </p>
        </div>
        <button className="add-all-list-btn" onClick={handleAddAll}>
          <i className="fa-solid fa-cart-plus" /> Añadir toda la lista al carrito
        </button>
      </div>

      <div className="school-list-items">
        {lines.map((line) => {
          const suggested = getProductById(line.suggestedId);
          if (!suggested) return null;
          const alternatives = getAlternativesFor(suggested);
          const selectedProduct = getProductById(selections[line.need]) || suggested;

          return (
            <div className="school-list-row" key={line.need}>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="school-list-row-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = selectedProduct.fallbackImage;
                }}
              />
              <div className="school-list-row-info">
                <div className="school-list-need">{line.need}</div>
                <div className="school-list-row-name">{selectedProduct.name}</div>
                <div className="school-list-row-price">{selectedProduct.price.toFixed(2)} €</div>
              </div>

              <select
                className="school-list-alt-select"
                value={selections[line.need]}
                onChange={(e) =>
                  setSelections((prev) => ({ ...prev, [line.need]: e.target.value }))
                }
              >
                {alternatives.map((alt) => (
                  <option key={alt.id} value={alt.id}>
                    {alt.id === line.suggestedId ? '★ ' : ''}
                    {alt.name} — {alt.price.toFixed(2)} €
                  </option>
                ))}
              </select>

              <button
                className="school-list-add-btn"
                title="Añadir esta opción al carrito"
                onClick={() => onAddToCart(selectedProduct, 1)}
              >
                <i className="fa-solid fa-cart-plus" />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
