// ==========================================
// PÁGINAS INFORMATIVAS DEL FOOTER
// Contenido visual de demostración para las páginas legales/informativas
// que en la web real (ipapel.es/isidoro) son enlaces del footer.
// Estructura de bloques genérica: paragraph | list | table.
// ==========================================

export const INFO_PAGES = {
  'quienes-somos': {
    title: '¿Quiénes Somos?',
    icon: 'fa-solid fa-store',
    updated: 'Actualizado: enero 2026',
    blocks: [
      {
        type: 'paragraph',
        text: 'Isidoro Suministros a Oficinas S.L. es una librería y papelería familiar con más de 30 años de historia, especializada en material escolar, de oficina y libros de texto para colegios de Sevilla y su provincia.',
      },
      {
        type: 'paragraph',
        text: 'Nacimos como un pequeño local de barrio y hoy acompañamos cada septiembre a cientos de familias en la Vuelta al Cole, gestionando directamente los listados de libros y materiales que nos facilitan los propios centros educativos.',
      },
      { type: 'heading', text: 'Nuestro compromiso' },
      {
        type: 'list',
        items: [
          'Precios ajustados y stock garantizado en temporada de vuelta al cole.',
          'Atención cercana y asesoramiento personalizado en tienda física.',
          'Compra online sencilla con recogida en tienda o envío a domicilio.',
          'Colaboración directa con AMPAs y equipos directivos de los colegios.',
        ],
      },
    ],
  },

  envios: {
    title: 'Gastos de Envío',
    icon: 'fa-solid fa-truck-fast',
    updated: 'Tarifas vigentes en 2026',
    blocks: [
      {
        type: 'paragraph',
        text: 'Preparamos cada pedido en nuestro almacén de Sevilla en un plazo de 24-48h laborables. Los gastos de envío se calculan según el importe total del pedido y la modalidad de entrega elegida.',
      },
      {
        type: 'table',
        headers: ['Importe del pedido', 'Envío a domicilio', 'Recogida en tienda'],
        rows: [
          ['Menos de 30 €', '4,95 €', 'Gratis'],
          ['De 30 € a 60 €', '2,95 €', 'Gratis'],
          ['Más de 60 €', 'Gratis', 'Gratis'],
        ],
      },
      { type: 'heading', text: 'Zonas de entrega' },
      {
        type: 'list',
        items: [
          'Sevilla capital: entrega en 24-48h laborables.',
          'Provincia de Sevilla: entrega en 48-72h laborables.',
          'Resto de España peninsular: 3-5 días laborables.',
          'Baleares, Canarias, Ceuta y Melilla: consultar plazos y aranceles antes de comprar.',
        ],
      },
    ],
  },

  'bases-promocion': {
    title: 'Bases de Promociones',
    icon: 'fa-solid fa-tags',
    updated: 'Válidas para la campaña Vuelta al Cole 2026',
    blocks: [
      {
        type: 'paragraph',
        text: 'Las promociones y descuentos publicados en la web son válidos salvo error tipográfico y mientras dure el stock disponible, según las condiciones particulares de cada campaña anunciada.',
      },
      {
        type: 'list',
        items: [
          'Las promociones no son acumulables entre sí salvo que se indique expresamente lo contrario.',
          'Los precios mostrados no incluyen IVA salvo que se especifique lo contrario en la ficha de producto.',
          'Isidoro Suministros a Oficinas S.L. se reserva el derecho a limitar unidades por cliente en artículos de alta demanda.',
          'En caso de agotamiento de stock durante una promoción, se ofrecerá un producto equivalente o el reembolso íntegro del importe.',
        ],
      },
    ],
  },

  'compra-rapida': {
    title: 'Compra Rápida',
    icon: 'fa-solid fa-bolt',
    updated: 'Guía de uso',
    blocks: [
      {
        type: 'paragraph',
        text: 'La Compra Rápida está pensada para clientes habituales y AMPAs que ya conocen las referencias exactas que necesitan y quieren añadirlas al carrito sin navegar por el catálogo.',
      },
      { type: 'heading', text: 'Cómo funciona' },
      {
        type: 'list',
        items: [
          '1. Introduce la referencia o el nombre exacto del artículo en el buscador del header.',
          '2. Selecciona la cantidad deseada directamente desde el resultado de búsqueda.',
          '3. Añade el artículo al carrito con un solo clic y repite con el resto de tu lista.',
          '4. Revisa el carrito y finaliza la compra cuando tengas todos los artículos necesarios.',
        ],
      },
      {
        type: 'paragraph',
        text: 'También puedes usar el Buscador de Libros y Materiales por Colegio de la portada para cargar de golpe toda la lista oficial de tu centro educativo.',
      },
    ],
  },

  garantias: {
    title: 'Garantías',
    icon: 'fa-solid fa-shield-halved',
    updated: 'Conforme a la normativa de consumo vigente',
    blocks: [
      {
        type: 'paragraph',
        text: 'Todos los artículos vendidos en ipapel.es cuentan con la garantía legal establecida por el Real Decreto Legislativo 1/2007, de Defensa de los Consumidores y Usuarios, frente a cualquier defecto de fabricación.',
      },
      {
        type: 'list',
        items: [
          'Material escolar y papelería: garantía de conformidad de 2 años desde la entrega.',
          'Material tecnológico e informático: garantía del fabricante, gestionada directamente por Isidoro Suministros a Oficinas S.L.',
          'Juguetes y juegos de mesa: garantía de 2 años ante defectos de fabricación (excluye el mal uso).',
        ],
      },
      {
        type: 'paragraph',
        text: 'Para tramitar cualquier incidencia de garantía, contacta con nuestro equipo indicando el número de pedido y una descripción del problema.',
      },
    ],
  },

  devoluciones: {
    title: 'Devoluciones',
    icon: 'fa-solid fa-rotate-left',
    updated: 'Plazo de 14 días naturales',
    blocks: [
      {
        type: 'paragraph',
        text: 'Dispones de 14 días naturales desde la recepción del pedido para solicitar la devolución de cualquier artículo, según el derecho de desistimiento recogido en la normativa de consumo.',
      },
      { type: 'heading', text: 'Pasos para devolver un artículo' },
      {
        type: 'list',
        items: [
          '1. Solicita la devolución desde tu cuenta o contactando con nuestro equipo por teléfono o email.',
          '2. Empaqueta el artículo en su embalaje original, sin usar y con todos sus accesorios.',
          '3. Entrégalo en cualquiera de nuestras tiendas o concierta la recogida a domicilio.',
          '4. Recibirás el reembolso en un plazo máximo de 14 días desde que confirmemos la devolución.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Quedan excluidos de devolución los libros de texto personalizados, productos precintados de higiene ya abiertos y artículos hechos a medida.',
      },
    ],
  },

  'aviso-legal': {
    title: 'Aviso Legal',
    icon: 'fa-solid fa-scale-balanced',
    updated: 'Última revisión: enero 2026',
    blocks: [
      {
        type: 'paragraph',
        text: 'En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa que el titular de este sitio web es Isidoro Suministros a Oficinas S.L., con domicilio en Sevilla, España.',
      },
      {
        type: 'list',
        items: [
          'Denominación social: Isidoro Suministros a Oficinas S.L.',
          'Actividad: venta al por menor de material de oficina, papelería, libros y juguetes.',
          'Domicilio: Sevilla, España.',
          'Contacto: contacto@libreriaisidoro.com · +34 954 00 00 00.',
        ],
      },
      {
        type: 'paragraph',
        text: 'El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación de las condiciones aquí recogidas. Isidoro Suministros a Oficinas S.L. se reserva el derecho a modificar el contenido de la web sin previo aviso.',
      },
    ],
  },

  cookies: {
    title: 'Política de Cookies',
    icon: 'fa-solid fa-cookie-bite',
    updated: 'Última revisión: enero 2026',
    blocks: [
      {
        type: 'paragraph',
        text: 'Este sitio web utiliza cookies propias y de terceros para mejorar la experiencia de navegación, analizar el uso de la web y mostrar contenido personalizado.',
      },
      {
        type: 'table',
        headers: ['Tipo de cookie', 'Finalidad', 'Duración'],
        rows: [
          ['Técnicas', 'Necesarias para el funcionamiento del carrito y la sesión', 'Sesión'],
          ['Analíticas', 'Estadísticas de uso agregadas y anónimas', '12 meses'],
          ['Preferencias', 'Recordar filtros y búsquedas recientes', '6 meses'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Puedes configurar o rechazar el uso de cookies en cualquier momento desde los ajustes de tu navegador. La desactivación de las cookies técnicas puede afectar al correcto funcionamiento de la tienda.',
      },
    ],
  },

  'registro-tratamiento': {
    title: 'Registro de Tratamiento',
    icon: 'fa-solid fa-database',
    updated: 'Conforme al RGPD (UE) 2016/679',
    blocks: [
      {
        type: 'paragraph',
        text: 'Isidoro Suministros a Oficinas S.L., como responsable del tratamiento, mantiene un registro de las actividades de tratamiento de datos personales conforme al artículo 30 del Reglamento General de Protección de Datos.',
      },
      {
        type: 'list',
        items: [
          'Gestión de pedidos y facturación: base legal, ejecución del contrato de compraventa.',
          'Envío de comunicaciones comerciales: base legal, consentimiento del usuario.',
          'Listados de libros y materiales por colegio: base legal, interés legítimo en la prestación del servicio.',
          'Los datos se conservan durante el tiempo necesario para cumplir con las obligaciones legales y fiscales aplicables.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a contacto@libreriaisidoro.com.',
      },
    ],
  },
};

export function getInfoPage(key) {
  return INFO_PAGES[key] || null;
}
