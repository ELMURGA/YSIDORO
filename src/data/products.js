// ==========================================
// CATÁLOGO REAL (importado de la web antigua ipapel.es/isidoro/cpweb)
// 8.057 artículos con nombre, referencia, descripción y precio (IVA incl.).
// Los datos viven en catalog.json (generado por el script de importación);
// cuando se conecte Sanity, este módulo se sustituye por consultas al
// schema `product`, manteniendo la misma forma de objeto.
// ==========================================

import catalog from './catalog.json';

// Las fotos siguen alojadas en la web antigua. Cuando se suban a un CDN /
// Sanity, basta con cambiar esta base.
export const PRODUCT_IMG_BASE = 'http://ipapel.es/ISI/WEB_IMG_SHOP/';
const NO_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 250 250"><rect width="250" height="250" fill="#eef1f8"/><g fill="none" stroke="#9aa6c9" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><rect x="75" y="85" width="100" height="80" rx="8"/><circle cx="105" cy="115" r="9"/><path d="M80 160l30-30 22 20 14-12 24 22"/></g></svg>',
  );

// Productos destacados de la home
const FEATURED_IDS = new Set(['2349423', '2300891', '2436030', '2406104', '2313539', '2300740']);

export const PRODUCTS = catalog.map((c) => ({
  id: c.id,
  name: c.name,
  ref: c.ref || c.id,
  price: c.price ?? 0,
  priceNet: c.net ?? null,
  vat: c.vat ?? 21,
  priceFrom: c.from ?? null, // precio "desde" por cantidad (web antigua)
  category: c.cat[0] || '',
  categories: c.cat,
  parentCategory: c.top[0] || '',
  parentCategories: c.top,
  image: c.img ? PRODUCT_IMG_BASE + c.img : NO_IMAGE,
  fallbackImage: NO_IMAGE,
  stock: c.stock,
  featured: FEATURED_IDS.has(c.id),
  description: c.desc || c.name,
}));

const BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));

// Búsqueda de texto simple sobre nombre, referencia o categoría.
export function searchProducts(query) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return PRODUCTS.filter((p) => {
    const hay = `${p.name} ${p.ref} ${p.categories.join(' ')} ${p.description}`.toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
}

export function getProductById(id) {
  return BY_ID.get(id) || null;
}

// Fase 3: alternativas válidas = misma categoría/subcategoría exacta
// (decisión de negocio confirmada). El producto sugerido se incluye
// siempre como primera opción.
export function getAlternativesFor(product) {
  if (!product) return [];
  const sameCategory = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id && p.stock === 'in-stock',
  ).slice(0, 12);
  return [product, ...sameCategory];
}
