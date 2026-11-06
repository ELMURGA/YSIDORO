// ==========================================
// MEGA-MENU NAVIGATION DATA
// Árbol REAL de categorías de la web antigua (ipapel.es/isidoro/cpweb):
// 12 menús (nivel 1) → grupos (columna del mega-menú) → 321 secciones
// (nivel 3, `sub`). El `sub` es el nombre exacto de la sección y coincide
// con `product.categories` del catálogo importado.
// ==========================================
import navTree from './navTree.json';

const SMALL = new Set(['de', 'del', 'y', 'e', 'o', 'a', 'al', 'en', 'con', 'para', 'por', 'el', 'la', 'los', 'las', 'un', 'una']);
const KEEP_UPPER = new Set(['USB', 'CD', 'DVD', 'HP', 'TPV', 'LED', 'LEGO', 'PVC', 'EVA', 'SAI', 'SAIS', 'IVA', 'ESO', 'RC', 'UHU', 'DIN', 'XL', 'MR', 'TOTTO']);

const ACCENTS = {"ACRILICOS": "acrílicos", "AUTOMATICO": "automático", "CARTELERIA": "cartelería", "CARTON": "cartón", "CATEGORIA": "categoría", "CLASIFICACION": "clasificación", "COMUNION": "comunión", "CORRECCION": "corrección", "CUADERNERIA": "cuadernería", "ELASTICAS": "elásticas", "ENCUADERNACION": "encuadernación", "FANTASIA": "fantasía", "FELICITACION": "felicitación", "FOTOGRAFICO": "fotográfico", "GUARDERIA": "guardería", "INFORMATICA": "informática", "LAPICES": "lápices", "LIBRERIA": "librería", "MAQUINAS": "máquinas", "MARQUETERIA": "marquetería", "METALICAS": "metálicas", "MUSICA": "música", "PAPELERIA": "papelería", "PLASTICO": "plástico", "PLASTICOS": "plásticos", "PROTECCION": "protección", "TELEFONOS": "teléfonos", "TERMICO": "térmico", "BOLIGRAFOS": "bolígrafos", "ALBUM": "álbum"};

export function prettyLabel(text) {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\s*\*\s*$/, '')
    .trim()
    .split(' ')
    .map((w, i) => {
      const bare = w.replace(/[^A-Za-zÁÉÍÓÚÑ0-9]/g, '');
      if (KEEP_UPPER.has(bare) || /\d/.test(bare)) return w;
      const lower = ACCENTS[bare] ? w.replace(bare, ACCENTS[bare]) : w.toLowerCase();
      if (i > 0 && SMALL.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

export const NAV_CATEGORIES = navTree.map((cat) => ({
  key: cat.k,
  label: prettyLabel(cat.k),
  columns: cat.c.map((col) => ({
    title: prettyLabel(col.t),
    items: col.i.map((it) => ({ label: prettyLabel(it.n), sub: it.n, id: it.s })),
  })),
}));

// Categorías destacadas en la home (grid rápido)
export const QUICK_CATEGORIES = [
  {
    category: 'PAPELERIA',
    icon: 'fa-solid fa-pen-nib',
    title: 'Papelería y Oficina',
    description: 'Archivadores, carpetas, bolígrafos, adhesivos...',
  },
  {
    category: 'LIBRERIA',
    icon: 'fa-solid fa-book',
    title: 'Librería y Lecturas',
    description: 'Manga, novelas juveniles, didácticos Rubio...',
  },
  {
    category: 'MOCHILAS Y PORTATODOS',
    icon: 'fa-solid fa-bag-shopping',
    title: 'Mochilas y Estuches',
    description: 'Colecciones Totto, Pepe Jeans, Anekke...',
  },
  {
    category: 'JUGUETES',
    icon: 'fa-solid fa-puzzle-piece',
    title: 'Juguetes y Juegos',
    description: 'LEGO, Playmobil, juegos de mesa Cayro...',
  },
];
