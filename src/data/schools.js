// ==========================================
// BUSCADOR DE MATERIAL POR COLEGIO
// Estructura pensada para reflejar el futuro schema `schoolList` +
// `listItem` (Fase 3, Sanity): cada línea es una NECESIDAD GENÉRICA con
// un producto sugerido; las alternativas se calculan dinámicamente por
// categoría (ver getAlternativesFor en data/products.js).
//
// El listado de "Utrera" recoge los centros reales que gestiona Isidoro
// Suministros a Oficinas S.L. en su web (ipapel.es/isidoro/cpweb), donde
// cada colegio tiene su propia sección de "lotes" de material por curso.
// A diferencia del sitio real (que vende un lote cerrado con marca fija
// por curso), aquí cada línea es una NECESIDAD genérica y el cliente
// puede cambiar el producto sugerido por cualquier alternativa de la
// misma categoría antes de añadirlo al carrito (ver SchoolListResult.jsx).
// ==========================================

const INFANTIL_COURSES = ['Infantil 3 Años', 'Infantil 4 Años', 'Infantil 5 Años'];
const PRIMARIA_COURSES = [
  '1º de Primaria',
  '2º de Primaria',
  '3º de Primaria',
  '4º de Primaria',
  '5º de Primaria',
  '6º de Primaria',
];
const ESO_COURSES = ['1º de ESO', '2º de ESO', '3º de ESO', '4º de ESO'];
const BACHILLERATO_COURSES = ['1º de Bachillerato', '2º de Bachillerato'];

// Combinaciones de etapas típicas por tipo de centro.
const COLEGIO_COMPLETO = [...INFANTIL_COURSES, ...PRIMARIA_COURSES, ...ESO_COURSES];
const CEIP_INFANTIL_PRIMARIA = [...INFANTIL_COURSES, ...PRIMARIA_COURSES];
const IES_SECUNDARIA = [...ESO_COURSES, ...BACHILLERATO_COURSES];
const ESCUELA_INFANTIL = [...INFANTIL_COURSES];

export const SCHOOLS_DATA = {
  sevilla: {
    label: 'Sevilla',
    schools: ['Colegio San Isidoro', 'Colegio Santa María', 'IES Fernando de Herrera'],
    courses: {
      'Colegio San Isidoro': ['1º de Primaria', '2º de Primaria', '3º de Primaria'],
      'Colegio Santa María': ['1º de Primaria', '2º de Primaria', '1º de ESO'],
      'IES Fernando de Herrera': ['1º de ESO', '2º de ESO'],
    },
  },
  utrera: {
    label: 'Utrera',
    schools: [
      'Colegio Salesianos Utrera',
      'CEIP Al-Ándalus',
      'CEIP Alfonso de Orleans',
      'CEIP Álvarez Quintero',
      'CEIP Coca de la Piñera',
      'Colegio Divino Salvador (Salesianas)',
      'IES José María Infantes',
      'IES Ponce de León',
      'IES Ruiz Gijón',
      'IES Virgen de Consolación',
      'CEIP Juan Antonio Velasco',
      'CEIP La Fontanilla',
      'CEIP María Montessori',
      'CEIP Rodrigo Caro',
      'Colegio Sagrada Familia',
      'Colegio Sagrado Corazón (Academia)',
      'CEIP Tierno Galván',
      'Escuela Infantil La Fuente',
      'CEIP San Juan de Ribera (Los Molares)',
    ],
    courses: {
      'Colegio Salesianos Utrera': COLEGIO_COMPLETO,
      'CEIP Al-Ándalus': CEIP_INFANTIL_PRIMARIA,
      'CEIP Alfonso de Orleans': CEIP_INFANTIL_PRIMARIA,
      'CEIP Álvarez Quintero': CEIP_INFANTIL_PRIMARIA,
      'CEIP Coca de la Piñera': CEIP_INFANTIL_PRIMARIA,
      'Colegio Divino Salvador (Salesianas)': COLEGIO_COMPLETO,
      'IES José María Infantes': IES_SECUNDARIA,
      'IES Ponce de León': IES_SECUNDARIA,
      'IES Ruiz Gijón': IES_SECUNDARIA,
      'IES Virgen de Consolación': IES_SECUNDARIA,
      'CEIP Juan Antonio Velasco': CEIP_INFANTIL_PRIMARIA,
      'CEIP La Fontanilla': CEIP_INFANTIL_PRIMARIA,
      'CEIP María Montessori': CEIP_INFANTIL_PRIMARIA,
      'CEIP Rodrigo Caro': CEIP_INFANTIL_PRIMARIA,
      'Colegio Sagrada Familia': COLEGIO_COMPLETO,
      'Colegio Sagrado Corazón (Academia)': COLEGIO_COMPLETO,
      'CEIP Tierno Galván': CEIP_INFANTIL_PRIMARIA,
      'Escuela Infantil La Fuente': ESCUELA_INFANTIL,
      'CEIP San Juan de Ribera (Los Molares)': CEIP_INFANTIL_PRIMARIA,
    },
  },
  'dos-hermanas': {
    label: 'Dos Hermanas',
    schools: ['Colegio San Hermenegildo', 'Colegio María Auxiliadora'],
    courses: {
      'Colegio San Hermenegildo': ['1º de Primaria', '1º de ESO'],
      'Colegio María Auxiliadora': ['1º de Primaria', '2º de Primaria'],
    },
  },
};

// Cada línea: { need: <necesidad genérica>, suggestedId: <producto oficial/sugerido> }
export const COURSE_MATERIAL_LISTS = {
  'Infantil 3 Años': [
    { need: 'Plastilina blanda de colores', suggestedId: '2301376' },
    { need: 'Témperas escolares lavables', suggestedId: '2300434' },
    { need: 'Tijeras de punta redonda', suggestedId: '2300693' },
  ],
  'Infantil 4 Años': [
    { need: 'Bloc de dibujo/manualidades', suggestedId: '2313739' },
    { need: 'Pegamento de barra', suggestedId: '2301028' },
    { need: 'Plastilina blanda de colores', suggestedId: '2301376' },
  ],
  'Infantil 5 Años': [
    { need: 'Cuadernillo de operaciones (sumas)', suggestedId: '2309352' },
    { need: 'Goma de borrar', suggestedId: '2300256' },
    { need: 'Témperas escolares lavables', suggestedId: '2300434' },
  ],
  '1º de Primaria': [
    { need: 'Masilla adhesiva reposicionable', suggestedId: '2349423' },
    { need: 'Goma de borrar', suggestedId: '2300256' },
    { need: 'Cuadernillo de operaciones (sumas)', suggestedId: '2309352' },
  ],
  '2º de Primaria': [
    { need: 'Bolígrafo de tinta líquida/gel', suggestedId: '2300891' },
    { need: 'Goma de borrar', suggestedId: '2300256' },
    { need: 'Mochila escolar', suggestedId: '2436030' },
  ],
  '3º de Primaria': [
    { need: 'Masilla adhesiva reposicionable', suggestedId: '2349423' },
    { need: 'Bolígrafo de tinta líquida/gel', suggestedId: '2300891' },
    { need: 'Rotulador de punta cónica', suggestedId: '2300858' },
  ],
  '4º de Primaria': [
    { need: 'Bolígrafo de tinta líquida/gel', suggestedId: '2300891' },
    { need: 'Goma de borrar', suggestedId: '2380041' },
    { need: 'Rotulador de punta cónica', suggestedId: '2300858' },
  ],
  '5º de Primaria': [
    { need: 'Bolígrafo de tinta normal', suggestedId: '2300315' },
    { need: 'Estuche portatodos', suggestedId: '2402326' },
    { need: 'Rotulador fluorescente', suggestedId: '2359447' },
  ],
  '6º de Primaria': [
    { need: 'Cuaderno con separadores', suggestedId: '2374577' },
    { need: 'Diccionario escolar', suggestedId: '2352156' },
    { need: 'Tijeras de punta redonda', suggestedId: '2300693' },
  ],
  '1º de ESO': [
    { need: 'Mochila escolar', suggestedId: '2436030' },
    { need: 'Bolígrafo de tinta líquida/gel', suggestedId: '2300891' },
    { need: 'Rotulador de punta cónica', suggestedId: '2300858' },
  ],
  '2º de ESO': [
    { need: 'Mochila escolar', suggestedId: '2436030' },
    { need: 'Bolígrafo de tinta líquida/gel', suggestedId: '2300891' },
    { need: 'Bloc de dibujo/manualidades', suggestedId: '2313739' },
  ],
  '3º de ESO': [
    { need: 'Rotulador fluorescente', suggestedId: '2359447' },
    { need: 'Estuche portatodos', suggestedId: '2402326' },
    { need: 'Cuaderno con separadores', suggestedId: '2374577' },
  ],
  '4º de ESO': [
    { need: 'Diccionario escolar', suggestedId: '2352156' },
    { need: 'Bolígrafo de tinta líquida/gel', suggestedId: '2300891' },
    { need: 'Cuaderno con separadores', suggestedId: '2374577' },
  ],
  '1º de Bachillerato': [
    { need: 'Cuaderno con separadores', suggestedId: '2374577' },
    { need: 'Bolígrafo de tinta normal', suggestedId: '2300315' },
    { need: 'Rotulador fluorescente', suggestedId: '2359447' },
  ],
  '2º de Bachillerato': [
    { need: 'Diccionario escolar', suggestedId: '2352156' },
    { need: 'Cuaderno con separadores', suggestedId: '2374577' },
    { need: 'Estuche portatodos', suggestedId: '2402326' },
  ],
};
