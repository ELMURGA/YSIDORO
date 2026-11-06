// ==========================================
// DATOS DE DEMOSTRACIÓN (sin base de datos)
// Todo el panel y la zona de cliente leen de aquí. Cuando se apruebe el
// proyecto, cada export se sustituye por una consulta a la base de datos.
// Datos 100% ficticios, generados de forma determinista.
// ==========================================
import { PRODUCTS } from './products.js';
import { SCHOOLS_DATA, COURSE_MATERIAL_LISTS } from './schools.js';

function hash(text) {
  let h = 0;
  for (let i = 0; i < text.length; i += 1) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return h;
}
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
export const eur = (n) =>
  Number(n).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
export const daysAgo = (n, hour = 10) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(hour, (n * 7) % 60, 0, 0);
  return d;
};
export const fmtDate = (d) =>
  d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
export const fmtDateTime = (d) =>
  `${fmtDate(d)} · ${d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;

// ---------- Ubicaciones ----------
export const LOCATIONS = [
  { id: 'centro', name: 'Tienda Centro', short: 'Centro', kind: 'Tienda', address: 'C/ Real, 12 (ejemplo)', phone: '954 00 00 01', hours: 'L-V 9:30-14:00 / 17:00-20:30 · S 10:00-14:00', pickup: true, tpv: 'TPV-01 · 2 cajas' },
  { id: 'plaza', name: 'Tienda Plaza', short: 'Plaza', kind: 'Tienda', address: 'Plaza Mayor, 4 (ejemplo)', phone: '954 00 00 02', hours: 'L-V 9:30-14:00 / 17:00-20:30 · S 10:00-14:00', pickup: true, tpv: 'TPV-02 · 1 caja' },
  { id: 'nave', name: 'Nave Almacén + Outlet', short: 'Nave', kind: 'Almacén y tienda', address: 'Pol. Ind. Norte, nave 12 (ejemplo)', phone: '954 00 00 03', hours: 'L-V 8:00-14:00 / 16:00-19:00 · S 9:30-13:30', pickup: true, tpv: 'TPV-03 · 1 caja + terminal de mano' },
];

// ---------- Catálogo de administración ----------
export const SUPPLIERS = [
  { id: 's1', name: 'Distribuciones Papelmar', contact: 'Marta Ríos', phone: '955 10 20 30', email: 'pedidos@papelmar.example', lead: 3, cats: 'Papelería, escritura', last: daysAgo(6), pending: 2 },
  { id: 's2', name: 'Mayorista Escolar Sur', contact: 'Jorge Peña', phone: '955 40 50 60', email: 'comercial@escolarsur.example', lead: 2, cats: 'Mochilas, estuches, escolar', last: daysAgo(11), pending: 1 },
  { id: 's3', name: 'Editorial & Libros Andalucía', contact: 'Elena Soto', phone: '955 70 80 90', email: 'libreria@editandalucia.example', lead: 5, cats: 'Libros de texto, lecturas', last: daysAgo(20), pending: 0 },
  { id: 's4', name: 'Tecnología Oficina Global', contact: 'Pablo Mena', phone: '954 22 33 44', email: 'ventas@tog.example', lead: 4, cats: 'Informática, tóners', last: daysAgo(3), pending: 1 },
  { id: 's5', name: 'Juguetes y Regalos Triana', contact: 'Rosa Gil', phone: '954 55 66 77', email: 'rosa@jrtriana.example', lead: 6, cats: 'Juguetes, regalo', last: daysAgo(32), pending: 0 },
];

const EAN = (id) => `84${String(hash(id) % 100000000000).padStart(11, '0')}`;

export const ADMIN_PRODUCTS = PRODUCTS.map((p) => {
  const h = hash(p.id);
  const r = rng(h);
  const out = p.stock === 'out-of-stock';
  const low = p.stock === 'low-stock';
  const q = (a, b) => (out ? 0 : low ? Math.floor(r() * 3) : a + Math.floor(r() * (b - a)));
  const stock = { centro: q(4, 40), plaza: q(2, 26), nave: out ? 0 : low ? Math.floor(r() * 4) : 40 + Math.floor(r() * 260) };
  const price = p.price;
  return {
    ...p,
    ean: EAN(p.id),
    cost: Number(((price / 1.21) * (0.52 + r() * 0.22)).toFixed(2)),
    vat: p.parentCategory === 'LIBRERIA' ? 4 : 21,
    stockLoc: stock,
    min: 4 + (h % 8),
    supplierId: SUPPLIERS[h % SUPPLIERS.length].id,
    published: !(h % 17 === 0),
    b2bPrice: Number((price * 0.92).toFixed(2)),
    sold30: Math.floor(r() * 90),
  };
});
export const totalStock = (p) => p.stockLoc.centro + p.stockLoc.plaza + p.stockLoc.nave;
export const productByEan = (ean) => ADMIN_PRODUCTS.find((p) => p.ean === ean.trim());

// ---------- Clientes ----------
export const CUSTOMERS = [
  { id: 'c1', name: 'Laura Gómez Prieto', type: 'Particular', email: 'laura.gomez@example.com', phone: '600 11 22 33', city: 'Utrera', orders: 7, spent: 412.8, since: '2023', kids: [{ n: 'Lucas', school: 'CEIP Al-Ándalus', course: '3º de Primaria' }, { n: 'Marta', school: 'CEIP Al-Ándalus', course: 'Infantil 5 Años' }], tags: ['Familia', 'Recompra'] },
  { id: 'c2', name: 'Antonio Rivas Mora', type: 'Particular', email: 'antonio.rivas@example.com', phone: '611 22 33 44', city: 'Sevilla', orders: 3, spent: 148.2, since: '2024', kids: [{ n: 'Sara', school: 'Colegio Santa María', course: '1º de ESO' }], tags: ['Familia'] },
  { id: 'c3', name: 'Clínica Dental Sonríe S.L.', type: 'Empresa', email: 'admin@sonrie.example', phone: '955 12 34 56', city: 'Utrera', orders: 21, spent: 2310.5, since: '2021', cif: 'B-12345678', tariff: 'Tarifa A (-8%)', credit: '30 días', kids: [], tags: ['B2B', 'Oficina'] },
  { id: 'c4', name: 'Marina Delgado', type: 'Particular', email: 'marina.d@example.com', phone: '622 33 44 55', city: 'Dos Hermanas', orders: 2, spent: 86.4, since: '2025', kids: [{ n: 'Hugo', school: 'Colegio María Auxiliadora', course: '2º de Primaria' }], tags: [] },
  { id: 'c5', name: 'Gestoría Hernández y Asociados', type: 'Empresa', email: 'info@gestoriahdez.example', phone: '954 67 89 01', city: 'Sevilla', orders: 34, spent: 3987.1, since: '2020', cif: 'B-87654321', tariff: 'Tarifa A (-8%)', credit: '30 días', kids: [], tags: ['B2B', 'Recurrente'] },
  { id: 'c6', name: 'Carmen Ortiz Salas', type: 'Particular', email: 'carmen.ortiz@example.com', phone: '633 44 55 66', city: 'Utrera', orders: 11, spent: 598.0, since: '2022', kids: [{ n: 'Pablo', school: 'Colegio Salesianos Utrera', course: '1º de ESO' }, { n: 'Irene', school: 'Colegio Salesianos Utrera', course: '4º de Primaria' }], tags: ['Familia', 'VIP'] },
  { id: 'c7', name: 'Academia Futuro', type: 'Empresa', email: 'secretaria@academiafuturo.example', phone: '955 98 76 54', city: 'Utrera', orders: 9, spent: 1204.9, since: '2023', cif: 'B-11223344', tariff: 'Tarifa B (-5%)', credit: 'Pago inmediato', kids: [], tags: ['B2B'] },
  { id: 'c8', name: 'David Moreno', type: 'Particular', email: 'david.moreno@example.com', phone: '644 55 66 77', city: 'Utrera', orders: 1, spent: 24.9, since: '2026', kids: [], tags: ['Nuevo'] },
  { id: 'c9', name: 'AMPA CEIP Rodrigo Caro', type: 'Entidad', email: 'ampa.rcaro@example.com', phone: '655 66 77 88', city: 'Utrera', orders: 4, spent: 760.0, since: '2024', kids: [], tags: ['AMPA', 'Colegio'] },
  { id: 'c10', name: 'Elena Navarro', type: 'Particular', email: 'elena.n@example.com', phone: '666 77 88 99', city: 'Los Molares', orders: 5, spent: 233.6, since: '2023', kids: [{ n: 'Álvaro', school: 'CEIP San Juan de Ribera (Los Molares)', course: '5º de Primaria' }], tags: ['Familia'] },
];

// ---------- Pedidos ----------
export const ORDER_STATUS = {
  nuevo: { label: 'Nuevo', color: 'blue' },
  pagado: { label: 'Pagado', color: 'indigo' },
  preparando: { label: 'Preparando', color: 'amber' },
  listo: { label: 'Listo para recoger', color: 'teal' },
  enviado: { label: 'Enviado', color: 'violet' },
  entregado: { label: 'Entregado', color: 'green' },
  cancelado: { label: 'Cancelado', color: 'red' },
  devuelto: { label: 'Devuelto', color: 'gray' },
};
const STATUS_FLOW = ['nuevo', 'pagado', 'preparando', 'listo', 'enviado', 'entregado'];
export { STATUS_FLOW };
const DELIVERY = ['Envío a domicilio', 'Recogida en Tienda Centro', 'Recogida en Tienda Plaza', 'Recogida en Nave', 'Entrega en el colegio'];
const PAY = ['Tarjeta', 'Bizum', 'PayPal', 'Transferencia', 'Pago en tienda'];
const curated = ADMIN_PRODUCTS.filter((p) => !String(p.id).startsWith('AUTO')).slice(0, 24);

const statuses = ['nuevo', 'nuevo', 'pagado', 'pagado', 'preparando', 'preparando', 'preparando', 'listo', 'listo', 'enviado', 'enviado', 'entregado', 'entregado', 'entregado', 'entregado', 'entregado', 'entregado', 'cancelado', 'devuelto'];
export const ORDERS = Array.from({ length: 36 }, (_, i) => {
  const r = rng(1000 + i * 17);
  const cust = CUSTOMERS[Math.floor(r() * CUSTOMERS.length)];
  const nItems = 1 + Math.floor(r() * 5);
  const items = [];
  for (let k = 0; k < nItems; k += 1) {
    const pr = curated[Math.floor(rng(i * 31 + k * 7)() * curated.length)];
    const qty = 1 + Math.floor(r() * 3);
    const dup = items.find((it) => it.product.id === pr.id);
    if (dup) dup.qty += qty; else items.push({ product: pr, qty });
  }
  const subtotal = items.reduce((s, it) => s + it.product.price * it.qty, 0);
  const delivery = DELIVERY[Math.floor(r() * DELIVERY.length)];
  const shipping = delivery === 'Envío a domicilio' ? (subtotal >= 49 ? 0 : 4.95) : 0;
  const status = i < 19 ? statuses[i] : statuses[Math.floor(r() * statuses.length)];
  const kid = cust.kids[0];
  return {
    id: `WEB-${(2400 + 36 - i).toString()}`,
    date: daysAgo(Math.floor(i / 2.5), 9 + (i % 9)),
    customer: cust,
    items,
    subtotal,
    shipping,
    total: subtotal + shipping,
    status: status === 'entregado' || status === 'cancelado' || status === 'devuelto' || status === 'enviado' || i < 19 ? status : 'entregado',
    delivery,
    payment: PAY[Math.floor(r() * PAY.length)],
    channel: i % 7 === 0 ? 'Teléfono' : 'Web',
    school: kid ? `${kid.school} · ${kid.course}` : null,
    note: i % 9 === 0 ? 'Por favor, preparar antes del lunes.' : '',
  };
});

export const INVOICES = ORDERS.filter((o) => !['cancelado'].includes(o.status)).map((o, i) => ({
  id: `F-2026-${String(1200 + 36 - i).padStart(5, '0')}`,
  order: o.id,
  date: o.date,
  customer: o.customer.name,
  base: o.total / 1.21,
  vat: o.total - o.total / 1.21,
  total: o.total,
  state: o.customer.type === 'Empresa' && i % 4 === 0 ? 'Pendiente de cobro' : o.status === 'devuelto' ? 'Rectificada' : 'Cobrada',
}));

// ---------- Series de ventas ----------
export const SALES_30 = Array.from({ length: 30 }, (_, i) => {
  const r = rng(77 + i);
  const wd = (new Date().getDay() + i) % 7;
  const base = wd === 0 ? 0.4 : wd === 6 ? 0.8 : 1;
  const web = Math.round((420 + r() * 520) * base * (1 + i / 60));
  const tienda = Math.round((780 + r() * 640) * base);
  const d = daysAgo(29 - i);
  return { label: fmtDate(d), web, tienda };
});
export const SALES_MONTHLY = [
  ['Ene', 14200, 5200], ['Feb', 12900, 4300], ['Mar', 13800, 4900], ['Abr', 12400, 4200], ['May', 13100, 5000], ['Jun', 12100, 4600],
  ['Jul', 15800, 7400], ['Ago', 28900, 18900], ['Sep', 52400, 31800], ['Oct', 17200, 6900], ['Nov', 13500, 5300], ['Dic', 19800, 8800],
].map(([m, tienda, web]) => ({ label: m, tienda, web }));
export const SALES_BY_LOCATION = [
  { label: 'Web', value: 31800, color: '#fb13bf' },
  { label: 'Tienda Centro', value: 24600, color: '#1c2c8a' },
  { label: 'Tienda Plaza', value: 17900, color: '#3b82f6' },
  { label: 'Nave', value: 22200, color: '#0ea5a4' },
];
export const SALES_BY_CATEGORY = [
  { label: 'Material escolar', value: 38 }, { label: 'Libros y lecturas', value: 21 }, { label: 'Mochilas y estuches', value: 14 },
  { label: 'Oficina e informática', value: 12 }, { label: 'Juguetes y regalo', value: 9 }, { label: 'Otros', value: 6 },
];

// ---------- Colegios (admin) ----------
export const SCHOOLS_ADMIN = Object.entries(SCHOOLS_DATA).flatMap(([townKey, t]) =>
  t.schools.map((name) => {
    const r = rng(hash(name));
    return {
      id: `${townKey}-${hash(name)}`,
      name,
      town: t.label,
      courses: t.courses[name] || [],
      orders: Math.floor(r() * 140) + 8,
      families: Math.floor(r() * 90) + 10,
      revenue: Math.round((r() * 9000 + 800) * 100) / 100,
      status: r() > 0.18 ? 'Lista publicada' : 'Pendiente de recibir lista',
      contact: r() > 0.5 ? 'Dirección / Jefatura' : 'AMPA',
    };
  }),
);
export { COURSE_MATERIAL_LISTS };

// ---------- Promociones ----------
export const COUPONS = [
  { code: 'COLE10', desc: '10% en listas escolares', type: '% sobre listas', value: 10, used: 142, limit: 500, ends: '30 sep', active: true },
  { code: 'BIENVENIDA5', desc: '5 € primera compra', type: 'Importe fijo', value: 5, used: 67, limit: null, ends: 'Sin fecha', active: true },
  { code: 'ENVIOGRATIS', desc: 'Envío gratis sin mínimo', type: 'Envío', value: 0, used: 23, limit: 100, ends: '15 sep', active: false },
  { code: 'EMPRESA8', desc: 'Tarifa empresa -8%', type: '% general', value: 8, used: 311, limit: null, ends: 'Sin fecha', active: true },
  { code: 'AMPA15', desc: 'AMPAs colaboradoras', type: '% sobre listas', value: 15, used: 38, limit: 200, ends: '20 sep', active: true },
];
export const PACKS = [
  { id: 'k1', name: 'Kit Infantil 3 años', items: 9, price: 38.9, normal: 46.5, sold: 54 },
  { id: 'k2', name: 'Kit 1º-2º Primaria', items: 14, price: 52.0, normal: 63.4, sold: 88 },
  { id: 'k3', name: 'Kit 3º-4º Primaria', items: 15, price: 58.5, normal: 69.1, sold: 71 },
  { id: 'k4', name: 'Kit Secundaria básico', items: 12, price: 49.9, normal: 58.0, sold: 36 },
  { id: 'k5', name: 'Pack Oficina Home-Working', items: 8, price: 44.0, normal: 53.2, sold: 19 },
];

// ---------- Marketing ----------
export const CAMPAIGNS = [
  { id: 'm1', name: 'Listas 2026-27 ya disponibles', channel: 'Email', segment: 'Familias con hijos (1.842)', sent: 1842, open: 61, click: 24, sales: 6420, state: 'Enviada', date: daysAgo(40) },
  { id: 'm2', name: 'Últimos días para pedir y recibir a tiempo', channel: 'WhatsApp', segment: 'Carritos abandonados (212)', sent: 212, open: 94, click: 41, sales: 2180, state: 'Enviada', date: daysAgo(18) },
  { id: 'm3', name: 'Tarifa empresa: toners y papel', channel: 'Email', segment: 'Empresas (86)', sent: 86, open: 58, click: 19, sales: 1960, state: 'Enviada', date: daysAgo(9) },
  { id: 'm4', name: 'Black Friday papelero', channel: 'Email', segment: 'Todos los suscriptores (3.410)', sent: 0, open: 0, click: 0, sales: 0, state: 'Programada', date: daysAgo(-14) },
];
export const AUTOMATIONS = [
  { id: 'a1', name: 'Carrito abandonado', desc: 'Email a las 2 h y WhatsApp a las 24 h con un cupón del 5%.', on: true, stat: '18% recuperados' },
  { id: 'a2', name: 'Pedido listo para recoger', desc: 'Aviso por WhatsApp y email cuando el pedido está preparado en tienda.', on: true, stat: '100% enviados' },
  { id: 'a3', name: 'Pide la lista del curso siguiente', desc: 'En julio, a las familias con hijos, con su lista del año anterior ya cargada.', on: true, stat: '3.2% conversión' },
  { id: 'a4', name: 'Avísame cuando haya stock', desc: 'Notifica al cliente si un producto agotado vuelve a estar disponible.', on: true, stat: '41 avisos activos' },
  { id: 'a5', name: 'Opinión tras la compra', desc: 'Solicita reseña 7 días después de la entrega.', on: false, stat: '—' },
  { id: 'a6', name: 'Reposición de consumibles (empresas)', desc: 'Recuerda tóner/papel según el ritmo de compra de cada empresa.', on: false, stat: '—' },
];
export const BANNERS = [
  { id: 'b1', name: 'Hero · Vuelta al Cole', place: 'Portada · principal', from: '1 ago', to: '30 sep', on: true, clicks: 3124 },
  { id: 'b2', name: 'Banner · Envío gratis desde 49 €', place: 'Cabecera', from: 'Siempre', to: '—', on: true, clicks: 811 },
  { id: 'b3', name: 'Promo · Mochilas Totto -15%', place: 'Portada · secundario', from: '5 sep', to: '20 sep', on: true, clicks: 640 },
  { id: 'b4', name: 'Hero · Black Friday', place: 'Portada · principal', from: '22 nov', to: '1 dic', on: false, clicks: 0 },
];

// ---------- Mensajes y reseñas ----------
export const MESSAGES = [
  { id: 'mm1', from: 'Laura Gómez Prieto', subject: '¿Pueden preparar la lista de 3º para el lunes?', body: 'Hola, quería saber si pueden tener lista la compra del colegio para recoger el lunes por la tarde en Tienda Centro. Gracias.', date: daysAgo(0, 8), state: 'Sin responder', channel: 'Web' },
  { id: 'mm2', from: 'Clínica Dental Sonríe S.L.', subject: 'Presupuesto 20 cajas de folios + tóner', body: 'Necesitamos presupuesto para 20 cajas de folios A4 y 4 tóners compatibles. Entrega en clínica.', date: daysAgo(1, 12), state: 'Sin responder', channel: 'Formulario empresas' },
  { id: 'mm3', from: 'Carmen Ortiz Salas', subject: 'Cambio de mochila', body: 'Compré la mochila Totto y quería cambiarla por otro color. ¿Puedo hacerlo en la Nave?', date: daysAgo(2, 17), state: 'Respondido', channel: 'WhatsApp' },
  { id: 'mm4', from: 'AMPA CEIP Rodrigo Caro', subject: 'Lista de 5º modificada', body: 'Os enviamos la lista corregida de 5º de Primaria. Hay dos cambios en cuadernos.', date: daysAgo(3, 10), state: 'Respondido', channel: 'Email' },
  { id: 'mm5', from: 'David Moreno', subject: 'Factura de mi pedido', body: '¿Puedo descargar la factura desde mi cuenta? No la encuentro.', date: daysAgo(4, 19), state: 'Respondido', channel: 'Web' },
];
export const REVIEWS = [
  { id: 'r1', product: 'Masilla Adhesiva 75g. UHU Blanca (Patafix)', who: 'Elena N.', stars: 5, text: 'Llegó rápido y en perfecto estado. La uso para decorar la clase de mi hijo.', state: 'Pendiente', date: daysAgo(1) },
  { id: 'r2', product: 'Mochila escolar', who: 'Antonio R.', stars: 4, text: 'Buena calidad, aunque el color es un poco más oscuro que en la foto.', state: 'Pendiente', date: daysAgo(2) },
  { id: 'r3', product: 'Estuche portatodos', who: 'Marina D.', stars: 5, text: 'Muy práctico, cabe todo. Repetiré.', state: 'Publicada', date: daysAgo(6) },
  { id: 'r4', product: 'Diccionario escolar', who: 'Carmen O.', stars: 2, text: 'Venía con una esquina doblada. Me lo cambiaron sin problema.', state: 'Publicada', date: daysAgo(9) },
];

// ---------- Personal ----------
export const ROLES = {
  Propietario: { color: 'indigo', perms: ['Todo'] },
  'Encargado/a de tienda': { color: 'blue', perms: ['Pedidos', 'Productos', 'Stock', 'Clientes', 'Informes'] },
  Dependiente: { color: 'teal', perms: ['Pedidos', 'Stock (consulta)', 'Clientes'] },
  'Almacén': { color: 'amber', perms: ['Preparación', 'Stock', 'Recepción'] },
  'Contabilidad / Gestoría': { color: 'violet', perms: ['Facturas', 'Informes IVA'] },
};
export const STAFF = [
  { id: 'u1', name: 'Isidoro (propietario)', role: 'Propietario', place: 'Todas', last: 'Hoy 08:12', on: true },
  { id: 'u2', name: 'Encargada Tienda Centro', role: 'Encargado/a de tienda', place: 'Tienda Centro', last: 'Hoy 09:40', on: true },
  { id: 'u3', name: 'Encargado Tienda Plaza', role: 'Encargado/a de tienda', place: 'Tienda Plaza', last: 'Ayer 19:03', on: true },
  { id: 'u4', name: 'Responsable de la Nave', role: 'Almacén', place: 'Nave', last: 'Hoy 07:55', on: true },
  { id: 'u5', name: 'Dependiente 1', role: 'Dependiente', place: 'Tienda Centro', last: 'Ayer 14:11', on: true },
  { id: 'u6', name: 'Gestoría externa', role: 'Contabilidad / Gestoría', place: 'Solo informes', last: 'Hace 6 días', on: true },
];
export const AUDIT_LOG = [
  { who: 'Encargada Tienda Centro', what: 'Cambió el precio de "Mochila escolar" de 24,90 € a 22,90 €', when: 'Hoy 09:44' },
  { who: 'Responsable de la Nave', what: 'Registró recepción de mercancía (pedido PO-0189) · 12 artículos', when: 'Hoy 08:02' },
  { who: 'Isidoro (propietario)', what: 'Publicó la lista de 4º Primaria · CEIP Rodrigo Caro', when: 'Ayer 18:20' },
  { who: 'Dependiente 1', what: 'Procesó la devolución del pedido WEB-2398', when: 'Ayer 12:09' },
  { who: 'Encargado Tienda Plaza', what: 'Transfirió 24 uds. de "Cuaderno con separadores" desde la Nave', when: 'Hace 2 días' },
  { who: 'Isidoro (propietario)', what: 'Creó el cupón AMPA15', when: 'Hace 3 días' },
];

// ---------- Compras a proveedor ----------
export const PURCHASE_ORDERS = [
  { id: 'PO-0192', supplier: 'Distribuciones Papelmar', dest: 'Nave', lines: 18, total: 1840.5, state: 'Enviado', date: daysAgo(2), eta: daysAgo(-1) },
  { id: 'PO-0191', supplier: 'Mayorista Escolar Sur', dest: 'Nave', lines: 9, total: 2310.0, state: 'Parcialmente recibido', date: daysAgo(5), eta: daysAgo(-2) },
  { id: 'PO-0190', supplier: 'Tecnología Oficina Global', dest: 'Tienda Centro', lines: 6, total: 612.3, state: 'Borrador', date: daysAgo(1), eta: daysAgo(-4) },
  { id: 'PO-0189', supplier: 'Editorial & Libros Andalucía', dest: 'Nave', lines: 12, total: 4120.0, state: 'Recibido', date: daysAgo(12), eta: daysAgo(7) },
  { id: 'PO-0188', supplier: 'Distribuciones Papelmar', dest: 'Tienda Plaza', lines: 7, total: 489.9, state: 'Recibido', date: daysAgo(19), eta: daysAgo(15) },
];
export const STOCK_MOVES = [
  { when: 'Hoy 10:12', type: 'Venta TPV', product: 'Bolígrafo tinta gel', from: 'Tienda Centro', to: '—', qty: -3, who: 'TPV-01' },
  { when: 'Hoy 09:50', type: 'Venta web', product: 'Masilla UHU 75g', from: 'Nave', to: 'Cliente', qty: -2, who: 'WEB-2436' },
  { when: 'Hoy 08:02', type: 'Recepción', product: 'Cuaderno con separadores', from: 'Proveedor', to: 'Nave', qty: 120, who: 'Resp. Nave' },
  { when: 'Ayer 18:30', type: 'Transferencia', product: 'Mochila escolar', from: 'Nave', to: 'Tienda Plaza', qty: 12, who: 'Enc. Plaza' },
  { when: 'Ayer 12:09', type: 'Devolución', product: 'Estuche portatodos', from: 'Cliente', to: 'Tienda Centro', qty: 1, who: 'Dependiente 1' },
  { when: 'Ayer 09:15', type: 'Ajuste inventario', product: 'Goma de borrar', from: 'Tienda Centro', to: '—', qty: -2, who: 'Enc. Centro' },
];
export const ACTIVITY_SYNC = [
  { when: 'Hoy 10:12', loc: 'Tienda Centro', ev: 'Venta registrada · 3 artículos', res: 'Stock actualizado en 0,8 s' },
  { when: 'Hoy 10:09', loc: 'Tienda Plaza', ev: 'Alta de producto desde escáner · EAN 8412345678901', res: 'Producto creado en web (borrador)' },
  { when: 'Hoy 09:58', loc: 'Nave', ev: 'Recepción de mercancía · 12 líneas', res: 'Stock web +120 uds.' },
  { when: 'Hoy 09:50', loc: 'Web', ev: 'Pedido WEB-2436 · reserva de stock', res: 'Nave -2 uds.' },
  { when: 'Hoy 09:31', loc: 'Tienda Centro', ev: 'Cambio de precio desde TPV', res: 'Precio web actualizado' },
];
export const lowStock = ADMIN_PRODUCTS.filter((p) => !String(p.id).startsWith('AUTO') || p.min).filter((p) => totalStock(p) <= p.min);
