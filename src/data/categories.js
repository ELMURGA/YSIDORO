// ==========================================
// MEGA-MENU NAVIGATION DATA
// Estructura pensada para reflejar 1:1 el árbol de `category` (Fase 1,
// Sanity) con nivel 1 (categoría), nivel 2 (columna del mega-menú) y
// nivel 3 (subcategoría / data-sub).
// ==========================================

export const NAV_CATEGORIES = [
  {
    key: 'PAPELERIA',
    label: 'Papelería',
    columns: [
      {
        title: 'Adhesivos',
        items: [
          { label: 'Pegamentos', sub: 'PEGAMENTOS' },
          { label: 'Cintas Adhesivas', sub: 'CINTAS ADHESIVAS' },
          { label: 'Portarrollos', sub: 'PORTARROLLOS' },
        ],
      },
      {
        title: 'Escritorio',
        items: [
          { label: 'Grapadoras y Grapas', sub: 'GRAPADORAS' },
          { label: 'Clips y Pinzas', sub: 'CLIPS' },
          { label: 'Tijeras y Cutter', sub: 'TIJERAS' },
        ],
      },
      {
        title: 'Presentación',
        items: [
          { label: 'Pizarras Blancas', sub: 'PIZARRAS BLANCAS' },
          { label: 'Pizarras de Corcho', sub: 'PIZARRAS DE CORCHO' },
          { label: 'Talonarios e Impresos', sub: 'TALONARIOS' },
        ],
      },
      {
        title: 'Organización',
        items: [
          { label: 'Sobres de Envío', sub: 'SOBRES' },
          { label: 'Sobres Acolchados', sub: 'SOBRES DE BURBUJA' },
          { label: 'Cooperativas Escolares', sub: 'COOPERATIVAS ESCOLARES' },
        ],
      },
    ],
  },
  {
    key: 'ESCRITURA Y CORRECCION',
    label: 'Escritura',
    columns: [
      {
        title: 'Bolígrafos',
        items: [
          { label: 'Tinta Normal', sub: 'BOLIGRAFOS  DE TINTA NORMAL' },
          { label: 'Tinta Líquida y Gel', sub: 'BOLIGRAFOS DE TINTA LIQUIDA Y GEL' },
          { label: 'Bolígrafos Borrables', sub: 'BOLIGRAFOS BORRABLES' },
          { label: 'Bolígrafos Fantasía', sub: 'BOLIGRAFOS FANTASIA' },
        ],
      },
      {
        title: 'Rotuladores',
        items: [
          { label: 'Punta Fina', sub: 'ROTULADOR DE PUNTA FINA' },
          { label: 'Subrayadores', sub: 'ROTULADOR FLUORESCENTE' },
          { label: 'Rotuladores Posca', sub: 'ROTULADOR POSCA' },
          { label: 'Permanentes', sub: 'ROTULADOR PERMANENTE' },
        ],
      },
      {
        title: 'Lápices y Minas',
        items: [
          { label: 'Lápices de Grafito', sub: 'LAPICES' },
          { label: 'Portaminas', sub: 'PORTAMINAS' },
          { label: 'Minas de Recambio', sub: 'MINAS' },
        ],
      },
      {
        title: 'Alta Escritura',
        items: [
          { label: 'Alta Gama', sub: 'BOLIGRAFOS ALTA GAMA' },
          { label: 'Plumas Estilográficas', sub: 'PLUMAS PARA ESCRITURA' },
          { label: 'Correctores y Gomas', sub: 'CORRECTORES' },
        ],
      },
    ],
  },
  {
    key: 'MOCHILAS Y PORTATODOS',
    label: 'Mochilas & Accesorios',
    columns: [
      {
        title: 'Mochilas Escolares',
        items: [
          { label: 'Mochilas de Espalda', sub: 'MOCHILAS' },
          { label: 'Mochilas con Carro', sub: 'MOCHILAS CON CARRO' },
          { label: 'Carros Sueltos', sub: 'CARRITOS PARA MOCHILAS' },
          { label: 'Infantiles / Guardería', sub: 'MOCHILAS PEQUEÑAS INFANTIL Y GUARDERIA' },
        ],
      },
      {
        title: 'Estuches y Portatodos',
        items: [
          { label: 'Estuches Portatodos', sub: 'PORTATODOS y ESTUCHES' },
          { label: 'Estuches Equipados', sub: 'PORTATODOS CON CONTENIDO' },
          { label: 'Portaflautas', sub: 'PORTAFLAUTAS' },
          { label: 'Neceseres', sub: 'NECESER' },
        ],
      },
      {
        title: 'Marcas Premium',
        items: [
          { label: 'Totto', sub: 'TOTTO' },
          { label: 'Miquelrius', sub: 'MIQUELRIUS' },
          { label: 'Pepe Jeans', sub: 'PEPE JEANS' },
          { label: 'Anekke', sub: 'ANEKKE' },
        ],
      },
      {
        title: 'Otros',
        items: [
          { label: 'Maletas de Viaje', sub: 'MALETAS DE VIAJE' },
          { label: 'Maletines y Fundas Laptop', sub: 'MALETINES Y PORTADOCUMENTOS' },
          { label: 'Botellas y Taper Picnic', sub: 'PICNIC ESCOLAR Y TUPPERS' },
        ],
      },
    ],
  },
  {
    key: 'LIBRERIA',
    label: 'Libros',
    columns: [
      {
        title: 'Literatura Infantil y Juvenil',
        items: [
          { label: 'Libros Infantiles', sub: 'LIBROS INFANTILES' },
          { label: 'Libros Juveniles', sub: 'LIBROS JUVENILES' },
          { label: 'Young Adult', sub: 'LIBROS YOUNG ADULT' },
          { label: 'Cómics y Manga', sub: 'COMICS Y MANGA' },
        ],
      },
      {
        title: 'Fondo General',
        items: [
          { label: 'Fondo General', sub: 'LIBROS DE FONDO GENERAL' },
          { label: 'Libros de Bolsillo', sub: 'LIBROS DE BOLSILLO' },
          { label: 'Libros de Cocina', sub: 'LIBROS DE COCINA' },
          { label: 'Diccionarios y Guías', sub: 'DICCIONARIOS' },
        ],
      },
      {
        title: 'Cuadernos Didácticos',
        items: [
          { label: 'Rubio Escritura', sub: 'CUADERNILLOS RUBIO DE ESCRITURA' },
          { label: 'Rubio Operaciones', sub: 'CUADERNILLOS RUBIO OPERACIONES' },
          { label: 'Rubio Problemas', sub: 'CUADERNILLOS RUBIO PROBLEMAS' },
        ],
      },
      {
        title: 'Temáticos',
        items: [
          { label: 'Semana Santa', sub: 'LIBROS SEMANA SANTA' },
          { label: 'Mandalas / Colorear Adultos', sub: 'MANDALAS' },
          { label: 'Lettering', sub: 'LETTERING' },
        ],
      },
    ],
  },
  {
    key: 'MANUALIDADES Y BELLAS ART.',
    label: 'Manualidades',
    columns: [
      {
        title: 'Modelado',
        items: [
          { label: 'Plastilinas Pequeñas', sub: 'PLASTILINAS PEQUEÑAS' },
          { label: 'Plastilinas Medianas', sub: 'PLASTILINAS MEDIANAS' },
          { label: 'Plastilinas Grandes', sub: 'PLASTILINAS GRANDES' },
          { label: 'Moldes e Instrumentos', sub: 'ACCESORIOS PLASTILINA' },
        ],
      },
      {
        title: 'Pintura y Dibujo',
        items: [
          { label: 'Témperas y Pintura Dedos', sub: 'TEMPERAS' },
          { label: 'Acuarelas', sub: 'ACUARELAS' },
          { label: 'Pinturas Acrílicas y Óleos', sub: 'ACRILICOS' },
          { label: 'Pinceles y Paletas', sub: 'PINCELES' },
        ],
      },
      {
        title: 'Materiales Creativos',
        items: [
          { label: 'Goma Eva', sub: 'GOMA EVA PEQUEÑA' },
          { label: 'Fieltro', sub: 'FIELTRO' },
          { label: 'Purpurinas y Lentejuelas', sub: 'PURPURINA' },
          { label: 'Pan de Oro', sub: 'PAN DE ORO Y PLATA' },
        ],
      },
      {
        title: 'Papelería Artística',
        items: [
          { label: 'Blocs de Dibujo', sub: 'BLOC DE DIBUJO Y DE MANUALIDADES' },
          { label: 'Lienzos y Caballetes', sub: 'LIENZOS Y CABALLETES' },
          { label: 'Maquillaje de Disfraces', sub: 'MAQUILLAJE' },
        ],
      },
    ],
  },
  {
    key: 'JUGUETES',
    label: 'Juguetes',
    columns: [
      {
        title: 'Marcas Premium',
        items: [
          { label: 'Lego', sub: 'LEGO' },
          { label: 'Playmobil', sub: 'PLAYMOBIL' },
          { label: 'Barbie y Nenuco', sub: 'BARBIE' },
          { label: 'Harry Potter Licencias', sub: 'HARRY POTTER' },
        ],
      },
      {
        title: 'Juegos de Mesa y Educativos',
        items: [
          { label: 'Juegos de Mesa / Cayro', sub: 'JUEGOS DE MESA / CAYRO' },
          { label: 'Cubos de Rubik', sub: 'CUBOS DE RUBIK' },
          { label: 'Puzzles Infantiles', sub: 'PUZZLES DE 1 A 200 PIEZAS' },
          { label: 'Puzzles Adulto', sub: 'PUZZLES DE 201 A 10.000 PIEZAS' },
        ],
      },
      {
        title: 'Edades',
        items: [
          { label: 'De 0 a 3 años', sub: 'JUGUETES 0 a 3 AÑOS' },
          { label: 'De 4 a 9 años', sub: 'JUGUETES 4 a 9 AÑOS' },
          { label: 'Más de 10 años', sub: 'JUGUETES 10 AÑOS EN ADELANTE' },
        ],
      },
    ],
  },
  {
    key: 'ALGO PARA REGALAR',
    label: 'Regalos',
    columns: [
      {
        title: 'Por Precio',
        items: [
          { label: 'De 0 a 10 €', sub: 'REGALOS DE 0 A 10 EUROS' },
          { label: 'De 10 a 20 €', sub: 'REGALOS DE 10 A 20 EUROS' },
          { label: 'De 20 a 50 €', sub: 'REGALOS DE 20 A 50 EUROS' },
          { label: 'Más de 50 €', sub: 'REGALOS A PARTIR DE 50 EUROS' },
        ],
      },
      {
        title: 'Detalles con Mensaje',
        items: [
          { label: 'Tazas con Mensaje', sub: 'TAZAS CON MENSAJE' },
          { label: 'Velas Perfumadas', sub: 'VELAS CON MENSAJE' },
          { label: 'Cuadernos de Frases', sub: 'CUADERNOS CON FRASES' },
          { label: 'Legami Milano', sub: 'LEGAMI' },
        ],
      },
      {
        title: 'Accesorios de Regalo',
        items: [
          { label: 'Botellas Térmicas', sub: 'BOTELLAS Y TERMOS' },
          { label: 'Diarios con Llave', sub: 'DIARIOS' },
          { label: 'Joyeros y Cajas Fuertes', sub: 'JOYEROS' },
          { label: 'Detalles de Comunión', sub: 'MI PRIMERA COMUNION' },
        ],
      },
    ],
  },
  {
    key: 'INFORMATICA',
    label: 'Tecnología',
    columns: [
      {
        title: 'Consumibles',
        items: [
          { label: 'HP Originales', sub: 'HP ORIGINALES' },
          { label: 'Epson Originales', sub: 'EPSON ORIGINALES' },
          { label: 'Brother Originales', sub: 'BROTHER ORIGINALES' },
        ],
      },
      {
        title: 'Periféricos',
        items: [
          { label: 'Ratones y Alfombrillas', sub: 'RATONES' },
          { label: 'Teclados', sub: 'TECLADOS' },
          { label: 'Auriculares y Altavoces', sub: 'AURICULARES' },
        ],
      },
      {
        title: 'Almacenamiento',
        items: [
          { label: 'Memorias USB Pendrive', sub: 'MEMORIAS USB' },
          { label: 'Discos Duros', sub: 'DISCOS DUROS USB' },
          { label: 'Tarjetas SD/MicroSD', sub: 'TARJETAS DE MEMORIA' },
        ],
      },
    ],
  },
];

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
