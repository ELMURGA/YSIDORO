// ==========================================
// MOCK PRODUCT CATALOG
// Sustituir por consultas a Sanity (Fase 1 - schema `product`) cuando el
// dataset esté disponible. La forma de cada producto ya está alineada
// con los campos previstos en el schema `product`.
//
// Catálogo basado en el árbol de categorías real de ipapel.es/isidoro/cpweb
// (analizado para esta maqueta). La tienda real carga los artículos de
// forma dinámica vía JS/ASP y no expone fotos de producto navegables sin
// sesión, así que aquí se completan visualmente todas las secciones con
// productos "curados" (foto de referencia real) + un generador de relleno
// para que ninguna categoría se vea vacía en la demo.
// ==========================================

import { NAV_CATEGORIES } from './categories.js';

const CURATED_PRODUCTS = [
  {
    id: '2349423',
    name: 'Masilla Adhesiva 75g. UHU Blanca (Patafix)',
    ref: 'UHU-75G-BL',
    price: 1.3,
    category: 'PEGAMENTOS',
    parentCategory: 'PAPELERIA',
    image: 'https://images.unsplash.com/photo-1590244921250-d53fd3a92cd8?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/3b82f6/ffffff?text=UHU+Masilla',
    stock: 'in-stock',
    featured: true,
    description:
      'Masilla adhesiva reposicionable y reutilizable para pegar de forma rápida y limpia objetos pequeños como fotos, pósters o dibujos en paredes, puertas o cristales. ¡La alternativa ideal a chinchetas y cintas adhesivas!',
  },
  {
    id: '2300891',
    name: 'Bolígrafo Pilot Super Gel Negro 0.7mm',
    ref: 'PILOT-SG-NE',
    price: 2.1,
    category: 'BOLIGRAFOS DE TINTA LIQUIDA Y GEL',
    parentCategory: 'ESCRITURA Y CORRECCION',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/10b981/ffffff?text=Pilot+Gel',
    stock: 'in-stock',
    featured: true,
    description:
      'Bolígrafo de tinta de gel de alta calidad para una escritura suave y fluida. Grip de caucho antideslizante para reducir la fatiga al escribir. Punta de bola de 0.7mm.',
  },
  {
    id: '2436030',
    name: 'Mochila Escolar Totto Acuareles Adaptable',
    ref: 'TOTTO-ACU-AD',
    price: 44.95,
    category: 'MOCHILAS',
    parentCategory: 'MOCHILAS Y PORTATODOS',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/ec4899/ffffff?text=Mochila+Totto',
    stock: 'in-stock',
    featured: true,
    description:
      'Mochila escolar de alta resistencia con espalda ergonómica y tirantes anchos. Compartimento para portátil, bolsillo organizador de audio y llavero extraíble. Adaptable a carro escolar.',
  },
  {
    id: '2309352',
    name: 'Cuadernillo Rubio Operaciones N.1 (Suma)',
    ref: 'RUBIO-OP-01',
    price: 1.9,
    category: 'CUADERNILLOS RUBIO OPERACIONES',
    parentCategory: 'LIBRERIA',
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/f59e0b/ffffff?text=Cuaderno+Rubio',
    stock: 'low-stock',
    featured: false,
    description:
      'Cuaderno didáctico de educación primaria para iniciar el aprendizaje de la suma sin llevar. Ayuda a desarrollar el cálculo mental de forma divertida y estructurada.',
  },
  {
    id: '2406104',
    name: 'Juego de Mesa Parchís y Oca de Madera - Cayro',
    ref: 'CAYRO-PAR-OCA',
    price: 15.9,
    category: 'JUEGOS DE MESA / CAYRO',
    parentCategory: 'JUGUETES',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/6366f1/ffffff?text=Parchis+Cayro',
    stock: 'in-stock',
    featured: true,
    description:
      'Tablero clásico reversible de madera con el Parchís por un lado y el juego de la Oca por el otro. Incluye todos los cubiletes, fichas y dados necesarios en madera pulida.',
  },
  {
    id: '2313539',
    name: 'LEGO Harry Potter Gran Comedor de Hogwarts',
    ref: 'LEGO-HP-HOG',
    price: 129.9,
    category: 'LEGO',
    parentCategory: 'JUGUETES',
    image: 'https://images.unsplash.com/photo-1566698621401-f57b75a3a4fd?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/ef4444/ffffff?text=LEGO+Hogwarts',
    stock: 'low-stock',
    featured: true,
    description:
      'Construye el espectacular Gran Comedor de Hogwarts con este fantástico set de LEGO. Incluye 10 minifiguras icónicas de Harry Potter, criaturas mágicas y accesorios detallados.',
  },
  {
    id: '2300256',
    name: 'Goma de Borrar Milan 430 de Nata Blanca',
    ref: 'MILAN-430-BL',
    price: 0.6,
    category: 'CORRECTORES',
    parentCategory: 'ESCRITURA Y CORRECCION',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/14b8a6/ffffff?text=Milan+430',
    stock: 'in-stock',
    featured: false,
    description:
      'La clásica goma de borrar Milan de nata sintética suave. Ideal para borrar todo tipo de lápices de grafito sobre cualquier clase de papel.',
  },
  {
    id: '2313739',
    name: 'Bloc de Dibujo Canson A4 Esbozo 90g',
    ref: 'CANSON-A4-90',
    price: 4.5,
    category: 'BLOC DE DIBUJO Y DE MANUALIDADES',
    parentCategory: 'MANUALIDADES Y BELLAS ART.',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/8b5cf6/ffffff?text=Bloc+Canson',
    stock: 'out-of-stock',
    featured: false,
    description:
      'Bloc de dibujo para esbozo y croquis Canson. Contiene 80 hojas de papel blanco de 90g, de textura ligera y libre de ácidos.',
  },
  {
    id: '2300858',
    name: 'Rotulador Posca PC-5M Punta Cónica Negro',
    ref: 'POSCA-PC5M-NE',
    price: 3.5,
    category: 'ROTULADOR POSCA',
    parentCategory: 'ESCRITURA Y CORRECCION',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/0f172a/ffffff?text=Posca+Negro',
    stock: 'in-stock',
    featured: false,
    description:
      'Marcador de pintura acrílica con base de agua. Punta cónica mediana de 1.8mm a 2.5mm de grosor de trazo. Es permanente en superficies porosas y borrable en superficies lisas.',
  },
  {
    id: '2311098',
    name: 'Goma de Borrar Pelikan Blanca Bicolor',
    ref: 'PELIKAN-BC-01',
    price: 0.75,
    category: 'CORRECTORES',
    parentCategory: 'ESCRITURA Y CORRECCION',
    image: 'https://images.unsplash.com/photo-1587145717151-2f8f664e63e7?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/9333ea/ffffff?text=Pelikan',
    stock: 'in-stock',
    featured: false,
    description:
      'Goma de borrar bicolor Pelikan de alta calidad, no mancha el papel y borra con precisión trazos de lápiz de grafito.',
  },
  {
    id: '2320011',
    name: 'Bolígrafo Bic Cristal Original Azul (Caja 50u)',
    ref: 'BIC-CRIST-AZ',
    price: 6.95,
    category: 'BOLIGRAFOS  DE TINTA NORMAL',
    parentCategory: 'ESCRITURA Y CORRECCION',
    image: 'https://images.unsplash.com/photo-1517971053567-8bde93bc6a58?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/1d4ed8/ffffff?text=Bic+Cristal',
    stock: 'in-stock',
    featured: true,
    description:
      'El bolígrafo más vendido del mundo. Punta media de 1.0mm, escritura suave y fiable. Caja de 50 unidades ideal para aula u oficina.',
  },
  {
    id: '2320045',
    name: 'Rotulador Stabilo Boss Fluorescente Amarillo',
    ref: 'STABILO-BOSS-AM',
    price: 1.65,
    category: 'ROTULADOR FLUORESCENTE',
    parentCategory: 'ESCRITURA Y CORRECCION',
    image: 'https://images.unsplash.com/photo-1587145717151-2f8f664e63e7?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/facc15/1e293b?text=Stabilo+Boss',
    stock: 'in-stock',
    featured: false,
    description:
      'Subrayador fluorescente de referencia, con punta biselada y tinta que no traspasa el papel. Ideal para destacar apuntes y libros de texto.',
  },
  {
    id: '2320078',
    name: 'Pegamento de Barra Pritt Stick 43g',
    ref: 'PRITT-43G',
    price: 2.95,
    category: 'PEGAMENTOS',
    parentCategory: 'PAPELERIA',
    image: 'https://images.unsplash.com/photo-1600431521340-491eca880813?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/dc2626/ffffff?text=Pritt+Stick',
    stock: 'in-stock',
    featured: false,
    description:
      'Barra adhesiva sin disolventes, seca transparente y no arruga el papel. El clásico imprescindible del estuche escolar.',
  },
  {
    id: '2320102',
    name: 'Grapadora de Sobremesa Rapid Metálica',
    ref: 'RAPID-GRAP-01',
    price: 12.9,
    category: 'GRAPADORAS',
    parentCategory: 'PAPELERIA',
    image: 'https://images.unsplash.com/photo-1568205612837-017257d2310a?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/475569/ffffff?text=Grapadora',
    stock: 'in-stock',
    featured: false,
    description:
      'Grapadora robusta de estructura metálica con capacidad de hasta 20 hojas. Incluye caja de grapas de regalo.',
  },
  {
    id: '2320136',
    name: 'Tijeras Escolares Punta Redonda Milan',
    ref: 'MILAN-TIJ-ESC',
    price: 1.45,
    category: 'TIJERAS',
    parentCategory: 'PAPELERIA',
    image: 'https://images.unsplash.com/photo-1584824388878-2c04f0e30c19?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/16a34a/ffffff?text=Tijeras+Milan',
    stock: 'in-stock',
    featured: false,
    description:
      'Tijeras escolares de punta redonda, seguras para los más pequeños, con hoja de acero inoxidable y mango ergonómico.',
  },
  {
    id: '2320170',
    name: 'Pizarra Blanca Magnética 60x40cm',
    ref: 'PIZ-BLANC-6040',
    price: 18.5,
    category: 'PIZARRAS BLANCAS',
    parentCategory: 'PAPELERIA',
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/e2e8f0/1e293b?text=Pizarra+Blanca',
    stock: 'in-stock',
    featured: false,
    description:
      'Pizarra blanca magnética con marco de aluminio, ideal para el estudio o la oficina en casa. Incluye kit de montaje.',
  },
  {
    id: '2320204',
    name: 'Mochila Escolar Pepe Jeans Doble Compartimento',
    ref: 'PEPEJ-MOCH-DC',
    price: 39.9,
    category: 'PEPE JEANS',
    parentCategory: 'MOCHILAS Y PORTATODOS',
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/1e3a8a/ffffff?text=Pepe+Jeans',
    stock: 'in-stock',
    featured: true,
    description:
      'Mochila escolar de doble compartimento con estampado exclusivo Pepe Jeans, espalda acolchada y asa reforzada.',
  },
  {
    id: '2320238',
    name: 'Estuche Portatodos Miquelrius 4 Cremalleras',
    ref: 'MIQ-EST-4C',
    price: 16.9,
    category: 'PORTATODOS y ESTUCHES',
    parentCategory: 'MOCHILAS Y PORTATODOS',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/be185d/ffffff?text=Estuche+Miquelrius',
    stock: 'in-stock',
    featured: false,
    description:
      'Estuche portatodos con 4 cremalleras y organizadores internos. Gran capacidad para material completo de escritura.',
  },
  {
    id: '2320271',
    name: 'Cuaderno Miquelrius A4 Notebook 5 Tapas Duras',
    ref: 'MIQ-NB5-A4',
    price: 8.95,
    category: 'MIQUELRIUS',
    parentCategory: 'MOCHILAS Y PORTATODOS',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/7c3aed/ffffff?text=Miquelrius',
    stock: 'in-stock',
    featured: false,
    description:
      'Cuaderno universitario con 5 separadores de tapa dura, hojas microperforadas y cuadrícula 5x5. Encuadernación en espiral.',
  },
  {
    id: '2320305',
    name: 'Libro Juvenil "El Diario de Greg" (Últ. Volumen)',
    ref: 'DIARIO-GREG-N',
    price: 12.9,
    category: 'LIBROS JUVENILES',
    parentCategory: 'LIBRERIA',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/f97316/ffffff?text=Libro+Juvenil',
    stock: 'in-stock',
    featured: true,
    description:
      'Última entrega de la saga juvenil más divertida. Tapa blanda, ilustraciones a lo largo de todo el libro.',
  },
  {
    id: '2320339',
    name: 'Manga "One Piece" Tomo Nuevo',
    ref: 'MANGA-OP-TOMO',
    price: 7.5,
    category: 'COMICS Y MANGA',
    parentCategory: 'LIBRERIA',
    image: 'https://images.unsplash.com/photo-1601513237763-1f0dcb60c1fa?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/0f172a/ffffff?text=Manga',
    stock: 'in-stock',
    featured: false,
    description:
      'Tomo más reciente del manga best-seller. Edición en español, papel de calidad y sobrecubierta a color.',
  },
  {
    id: '2320373',
    name: 'Diccionario Escolar Vox Ilustrado',
    ref: 'VOX-DICC-ESC',
    price: 14.5,
    category: 'DICCIONARIOS',
    parentCategory: 'LIBRERIA',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/065f46/ffffff?text=Diccionario',
    stock: 'in-stock',
    featured: false,
    description:
      'Diccionario escolar ilustrado con más de 30.000 entradas, láminas a color y apéndices gramaticales.',
  },
  {
    id: '2320407',
    name: 'Plastilina Jovi 15 Colores Surtidos',
    ref: 'JOVI-PLAST-15',
    price: 3.95,
    category: 'PLASTILINAS MEDIANAS',
    parentCategory: 'MANUALIDADES Y BELLAS ART.',
    image: 'https://images.unsplash.com/photo-1560421683-6856ea585c78?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/f59e0b/ffffff?text=Plastilina+Jovi',
    stock: 'in-stock',
    featured: false,
    description:
      'Pack de 15 barras de plastilina blanda de colores surtidos, no tóxica y fácil de moldear para manualidades escolares.',
  },
  {
    id: '2320441',
    name: 'Témperas Escolares Alpino 6 Botes',
    ref: 'ALPINO-TEMP-6',
    price: 4.75,
    category: 'TEMPERAS',
    parentCategory: 'MANUALIDADES Y BELLAS ART.',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/db2777/ffffff?text=Temperas',
    stock: 'in-stock',
    featured: false,
    description:
      'Set de 6 botes de témpera escolar lavable en colores vivos. Ideal para iniciación a la pintura en el aula.',
  },
  {
    id: '2320475',
    name: 'Set Playmobil City Life Clínica Veterinaria',
    ref: 'PLAYMO-VET-01',
    price: 34.9,
    category: 'PLAYMOBIL',
    parentCategory: 'JUGUETES',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/2563eb/ffffff?text=Playmobil',
    stock: 'in-stock',
    featured: true,
    description:
      'Set de juego Playmobil con figuras, mobiliario y accesorios detallados. Fomenta el juego imaginativo desde los 4 años.',
  },
  {
    id: '2320509',
    name: 'Puzzle Educa 500 Piezas Paisaje',
    ref: 'EDUCA-PZ-500',
    price: 11.9,
    category: 'PUZZLES DE 201 A 10.000 PIEZAS',
    parentCategory: 'JUGUETES',
    image: 'https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/059669/ffffff?text=Puzzle+Educa',
    stock: 'in-stock',
    featured: false,
    description:
      'Puzzle de 500 piezas con acabado antirreflejos. Incluye póster de referencia y bolsa para guardar las piezas.',
  },
  {
    id: '2320543',
    name: 'Cubo de Rubik 3x3 Original Speed Cube',
    ref: 'RUBIK-3X3-SP',
    price: 9.9,
    category: 'CUBOS DE RUBIK',
    parentCategory: 'JUGUETES',
    image: 'https://images.unsplash.com/photo-1591991564021-8ee9d13c2e0d?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/ef4444/ffffff?text=Rubik',
    stock: 'in-stock',
    featured: false,
    description:
      'Cubo de Rubik de competición con giro rápido y suave. Mecanismo de alta precisión para speedcubers.',
  },
  {
    id: '2320577',
    name: 'Cartucho de Tinta HP 302XL Negro Original',
    ref: 'HP-302XL-NE',
    price: 24.5,
    category: 'HP ORIGINALES',
    parentCategory: 'INFORMATICA',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eabd?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/1e293b/ffffff?text=HP+302XL',
    stock: 'in-stock',
    featured: false,
    description:
      'Cartucho de tinta original HP de alta capacidad, compatible con impresoras HP DeskJet y OfficeJet.',
  },
  {
    id: '2320611',
    name: 'Memoria USB Kingston 32GB 3.0',
    ref: 'KING-USB-32GB',
    price: 7.95,
    category: 'MEMORIAS USB',
    parentCategory: 'INFORMATICA',
    image: 'https://images.unsplash.com/photo-1618410320928-25228d811631?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/334155/ffffff?text=USB+32GB',
    stock: 'in-stock',
    featured: false,
    description:
      'Pendrive USB 3.0 de 32GB con carcasa metálica compacta y alta velocidad de transferencia.',
  },
  {
    id: '2320645',
    name: 'Taza de Cerámica con Mensaje "Mejor Profe"',
    ref: 'TAZA-PROFE-01',
    price: 8.9,
    category: 'TAZAS CON MENSAJE',
    parentCategory: 'ALGO PARA REGALAR',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/be123c/ffffff?text=Taza+Regalo',
    stock: 'in-stock',
    featured: true,
    description:
      'Taza de cerámica de alta calidad con divertido mensaje impreso. El detalle perfecto para regalar a profesores.',
  },
  {
    id: '2320679',
    name: 'Agenda Legami 12 Meses Diseño Floral',
    ref: 'LEGAMI-AG-12M',
    price: 19.9,
    category: 'LEGAMI',
    parentCategory: 'ALGO PARA REGALAR',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=250&auto=format&fit=crop',
    fallbackImage: 'https://placehold.co/250x250/9d174d/ffffff?text=Legami',
    stock: 'in-stock',
    featured: false,
    description:
      'Agenda anual Legami con diseño exclusivo, gomas elásticas de cierre y páginas semanales a color.',
  },
];

// ==========================================
// GENERADOR DE PRODUCTOS DE RELLENO
// Recorre el árbol de NAV_CATEGORIES y garantiza que cada subcategoría del
// mega-menú tenga al menos 3 artículos visibles en el catálogo (imagen,
// nombre, precio, stock). Donde no hay foto curada se usa un marcador de
// posición de color con el nombre de la sección, puramente a nivel visual
// para la demo del boceto.
// ==========================================

const PLACEHOLDER_PALETTE = [
  '3b82f6', '10b981', 'ec4899', 'f59e0b', '6366f1', 'ef4444',
  '14b8a6', '8b5cf6', '0f172a', '9333ea', '2563eb', '059669',
];

const PRICE_RANGES = {
  INFORMATICA: [4.95, 59.9],
  'MOCHILAS Y PORTATODOS': [7.9, 64.9],
  JUGUETES: [4.5, 99.9],
  LIBRERIA: [3.2, 19.9],
  'ALGO PARA REGALAR': [4.9, 39.9],
  'MANUALIDADES Y BELLAS ART.': [1.2, 15.9],
  'ESCRITURA Y CORRECCION': [0.6, 12.9],
  PAPELERIA: [0.5, 14.9],
};

const FILLER_SUFFIXES = ['Estándar', 'Premium', 'Pack Ahorro', 'Edición Especial', 'Modelo Clásico'];

function hashText(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function buildFillerProducts(curated) {
  const countByCategory = new Map();
  curated.forEach((p) => countByCategory.set(p.category, (countByCategory.get(p.category) || 0) + 1));

  const filler = [];
  NAV_CATEGORIES.forEach((cat) => {
    const [minPrice, maxPrice] = PRICE_RANGES[cat.key] || [1, 15];
    cat.columns.forEach((col) => {
      col.items.forEach((item) => {
        const have = countByCategory.get(item.sub) || 0;
        const need = Math.max(0, 3 - have);
        for (let i = 0; i < need; i += 1) {
          const seed = hashText(`${item.sub}-${i}`);
          const color = PLACEHOLDER_PALETTE[seed % PLACEHOLDER_PALETTE.length];
          const price = Number((minPrice + ((seed % 1000) / 1000) * (maxPrice - minPrice)).toFixed(2));
          const suffix = FILLER_SUFFIXES[(seed + i) % FILLER_SUFFIXES.length];
          const label = encodeURIComponent(item.label);
          filler.push({
            id: `AUTO-${seed}-${i}`,
            name: `${item.label} ${suffix}`,
            ref: `${cat.key.slice(0, 3)}-${seed.toString(36).toUpperCase().slice(0, 6)}`,
            price,
            category: item.sub,
            parentCategory: cat.key,
            image: `https://placehold.co/250x250/${color}/ffffff?text=${label}`,
            fallbackImage: `https://placehold.co/250x250/${color}/ffffff?text=${label}`,
            stock: seed % 11 === 0 ? 'out-of-stock' : seed % 5 === 0 ? 'low-stock' : 'in-stock',
            featured: false,
            description: `Artículo de la sección "${item.label}", dentro de ${cat.label}. Calidad garantizada para uso escolar y de oficina.`,
          });
        }
      });
    });
  });
  return filler;
}

export const PRODUCTS = [...CURATED_PRODUCTS, ...buildFillerProducts(CURATED_PRODUCTS)];

// Búsqueda de texto simple sobre nombre, referencia o categoría.
export function searchProducts(query) {
  const q = query.toLowerCase();
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.ref.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q),
  );
}

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

// Fase 3: alternativas válidas = misma categoría/subcategoría exacta
// (decisión de negocio confirmada). El producto sugerido se incluye
// siempre como primera opción.
export function getAlternativesFor(product) {
  if (!product) return [];
  const sameCategory = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );
  return [product, ...sameCategory];
}
