/* ==========================================
   APP SCRIPT - ISIDORO & IPAPEL REDESIGN
   ========================================== */

// 1. MOCK DATABASE
const PRODUCTS = [
  {
    id: "2349423",
    name: "Masilla Adhesiva 75g. UHU Blanca (Patafix)",
    ref: "UHU-75G-BL",
    price: 1.30,
    category: "PEGAMENTOS",
    parentCategory: "PAPELERIA",
    image: "https://images.unsplash.com/photo-1590244921250-d53fd3a92cd8?q=80&w=250&auto=format&fit=crop", // placeholder adhesive
    stock: "in-stock",
    featured: true,
    description: "Masilla adhesiva reposicionable y reutilizable para pegar de forma rápida y limpia objetos pequeños como fotos, pósters o dibujos en paredes, puertas o cristales. ¡La alternativa ideal a chinchetas y cintas adhesivas!"
  },
  {
    id: "2300891",
    name: "Bolígrafo Pilot Super Gel Negro 0.7mm",
    ref: "PILOT-SG-NE",
    price: 2.10,
    category: "BOLIGRAFOS DE TINTA LIQUIDA Y GEL",
    parentCategory: "ESCRITURA Y CORRECCION",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=250&auto=format&fit=crop", // placeholder pen
    stock: "in-stock",
    featured: true,
    description: "Bolígrafo de tinta de gel de alta calidad para una escritura suave y fluida. Grip de caucho antideslizante para reducir la fatiga al escribir. Punta de bola de 0.7mm."
  },
  {
    id: "2436030",
    name: "Mochila Escolar Totto Acuareles Adaptable",
    ref: "TOTTO-ACU-AD",
    price: 44.95,
    category: "MOCHILAS",
    parentCategory: "MOCHILAS Y PORTATODOS",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=250&auto=format&fit=crop", // placeholder backpack
    stock: "in-stock",
    featured: true,
    description: "Mochila escolar de alta resistencia con espalda ergonómica y tirantes anchos. Compartimento para portátil, bolsillo organizador de audio y llavero extraíble. Adaptable a carro escolar."
  },
  {
    id: "2309352",
    name: "Cuadernillo Rubio Operaciones N.1 (Suma)",
    ref: "RUBIO-OP-01",
    price: 1.90,
    category: "CUADERNILLOS RUBIO OPERACIONES",
    parentCategory: "LIBRERIA",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=250&auto=format&fit=crop", // placeholder book
    stock: "low-stock",
    featured: false,
    description: "Cuaderno didáctico de educación primaria para iniciar el aprendizaje de la suma sin llevar. Ayuda a desarrollar el cálculo mental de forma divertida y estructurada."
  },
  {
    id: "2406104",
    name: "Juego de Mesa Parchís y Oca de Madera - Cayro",
    ref: "CAYRO-PAR-OCA",
    price: 15.90,
    category: "JUEGOS DE MESA / CAYRO",
    parentCategory: "JUGUETES",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=250&auto=format&fit=crop", // placeholder board game
    stock: "in-stock",
    featured: true,
    description: "Tablero clásico reversible de madera con el Parchís por un lado y el juego de la Oca por el otro. Incluye todos los cubiletes, fichas y dados necesarios en madera pulida."
  },
  {
    id: "2313539",
    name: "LEGO Harry Potter Gran Comedor de Hogwarts",
    ref: "LEGO-HP-HOG",
    price: 129.90,
    category: "LEGO",
    parentCategory: "JUGUETES",
    image: "https://images.unsplash.com/photo-1566698621401-f57b75a3a4fd?q=80&w=250&auto=format&fit=crop", // placeholder lego
    stock: "low-stock",
    featured: true,
    description: "Construye el espectacular Gran Comedor de Hogwarts con este fantástico set de LEGO. Incluye 10 minifiguras icónicas de Harry Potter, criaturas mágicas y accesorios detallados."
  },
  {
    id: "2300256",
    name: "Goma de Borrar Milan 430 de Nata Blanca",
    ref: "MILAN-430-BL",
    price: 0.60,
    category: "CORRECTORES",
    parentCategory: "ESCRITURA Y CORRECCION",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=250&auto=format&fit=crop", // placeholder eraser
    stock: "in-stock",
    featured: false,
    description: "La clásica goma de borrar Milan de nata sintética suave. Ideal para borrar todo tipo de lápices de grafito sobre cualquier clase de papel."
  },
  {
    id: "2313739",
    name: "Bloc de Dibujo Canson A4 Esbozo 90g",
    ref: "CANSON-A4-90",
    price: 4.50,
    category: "BLOC DE DIBUJO Y DE MANUALIDADES",
    parentCategory: "MANUALIDADES Y BELLAS ART.",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=250&auto=format&fit=crop", // placeholder sketchpad
    stock: "out-of-stock",
    featured: false,
    description: "Bloc de dibujo para esbozo y croquis Canson. Contiene 80 hojas de papel blanco de 90g, de textura ligera y libre de ácidos."
  },
  {
    id: "2300858",
    name: "Rotulador Posca PC-5M Punta Cónica Negro",
    ref: "POSCA-PC5M-NE",
    price: 3.50,
    category: "ROTULADOR POSCA",
    parentCategory: "ESCRITURA Y CORRECCION",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=250&auto=format&fit=crop", // placeholder marker
    stock: "in-stock",
    featured: false,
    description: "Marcador de pintura acrílica con base de agua. Punta cónica mediana de 1.8mm a 2.5mm de grosor de trazo. Es permanente en superficies porosas y borrable en superficies lisas."
  }
];

// Fallback images for placeholders if unsplash fails
const MOCK_FALLBACK_IMAGES = {
  "2349423": "https://placehold.co/250x250/3b82f6/ffffff?text=UHU+Masilla",
  "2300891": "https://placehold.co/250x250/10b981/ffffff?text=Pilot+Gel",
  "2436030": "https://placehold.co/250x250/ec4899/ffffff?text=Mochila+Totto",
  "2309352": "https://placehold.co/250x250/f59e0b/ffffff?text=Cuaderno+Rubio",
  "2406104": "https://placehold.co/250x250/6366f1/ffffff?text=Parchis+Cayro",
  "2313539": "https://placehold.co/250x250/ef4444/ffffff?text=LEGO+Hogwarts",
  "2300256": "https://placehold.co/250x250/14b8a6/ffffff?text=Milan+430",
  "2313739": "https://placehold.co/250x250/8b5cf6/ffffff?text=Bloc+Canson",
  "2300858": "https://placehold.co/250x250/0f172a/ffffff?text=Posca+Negro"
};

// Replace images with fallbacks if they are loaded incorrectly
PRODUCTS.forEach(p => {
  p.fallbackImage = MOCK_FALLBACK_IMAGES[p.id];
});

// SCHOOLS DATABASE
const SCHOOLS_DATA = {
  "sevilla": {
    schools: ["Colegio San Isidoro", "Colegio Santa María", "IES Fernando de Herrera"],
    courses: {
      "Colegio San Isidoro": ["1º de Primaria", "2º de Primaria", "3º de Primaria"],
      "Colegio Santa María": ["1º de Primaria", "2º de Primaria", "1º de ESO"],
      "IES Fernando de Herrera": ["1º de ESO", "2º de ESO"]
    }
  },
  "utrera": {
    schools: ["Colegio Salesianos", "Colegio Sagrada Familia"],
    courses: {
      "Colegio Salesianos": ["1º de Primaria", "2º de Primaria", "3º de Primaria"],
      "Colegio Sagrada Familia": ["1º de Primaria", "2º de Primaria"]
    }
  },
  "dos-hermanas": {
    schools: ["Colegio San Hermenegildo", "Colegio María Auxiliadora"],
    courses: {
      "Colegio San Hermenegildo": ["1º de Primaria", "1º de ESO"],
      "Colegio María Auxiliadora": ["1º de Primaria", "2º de Primaria"]
    }
  }
};

const COURSE_MATERIALS = {
  "1º de Primaria": ["2349423", "2300256", "2309352"], // UHU, Goma Milan, Rubio Sumas
  "2º de Primaria": ["2300891", "2300256", "2436030"], // Pilot, Goma Milan, Mochila Totto
  "3º de Primaria": ["2349423", "2300891", "2300858"], // UHU, Pilot, Rotulador Posca
  "1º de ESO": ["2436030", "2300891", "2300858"],      // Mochila, Pilot, Posca
  "2º de ESO": ["2436030", "2300891", "2313739"]       // Mochila, Pilot, Bloc Canson
};

// 2. STATE VARIABLES
let cart = JSON.parse(localStorage.getItem('isidoro_cart')) || [];
let currentView = 'home'; // 'home', 'catalog', 'detail'
let viewHistory = ['home'];
let activeProduct = null;
let currentSearchQuery = "";
let activeCategory = "";
let activeSubcategory = "";
let currentSchoolFilter = null; // {town, school, course}

// DOM ELEMENTS
const homeView = document.getElementById('home-view');
const catalogView = document.getElementById('catalog-view');
const detailView = document.getElementById('detail-view');
const searchInput = document.getElementById('search-input');
const searchSuggestions = document.getElementById('search-suggestions');
const searchForm = document.getElementById('search-form');
const featuredProductsGrid = document.getElementById('featured-products-grid');
const catalogProductsGrid = document.getElementById('catalog-products-grid');
const catalogTitle = document.getElementById('catalog-title');
const catalogCount = document.getElementById('catalog-count');
const catalogSortSelect = document.getElementById('catalog-sort-select');

// Cart Elements
const cartToggleBtn = document.getElementById('cart-toggle-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartBackdrop = document.getElementById('cart-backdrop');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalValue = document.getElementById('cart-total-value');
const cartBadge = document.getElementById('cart-badge');

// School Finder Elements
const finderTown = document.getElementById('finder-town');
const finderSchool = document.getElementById('finder-school');
const finderCourse = document.getElementById('finder-course');
const finderSubmitBtn = document.getElementById('finder-submit-btn');

// Detail View Elements
const detailProductImg = document.getElementById('detail-product-img');
const detailProductRef = document.getElementById('detail-product-ref');
const detailProductTitle = document.getElementById('detail-product-title');
const detailProductStatus = document.getElementById('detail-product-status');
const detailProductPrice = document.getElementById('detail-product-price');
const detailProductPriceBase = document.getElementById('detail-product-price-base');
const detailProductDesc = document.getElementById('detail-product-desc');
const detailAddCartBtn = document.getElementById('detail-add-cart-btn');
const qtyMinus = document.getElementById('qty-minus');
const qtyPlus = document.getElementById('qty-plus');
const qtyVal = document.getElementById('qty-val');
const detailBackBtn = document.getElementById('detail-back-btn');

// ==========================================
// 3. INITIALIZATION & ROUTING (VIEW TRANSITIONS)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  updateCartBadge();
  renderFeaturedProducts();
  setupEventListeners();
  setupSchoolFinder();
}

// Router with View Transitions
function navigateTo(viewName, callback = null) {
  if (currentView === viewName && !callback) return;

  viewHistory.push(viewName);
  currentView = viewName;

  // SPA update DOM wrapper
  const updateDOM = () => {
    // Hide all views
    homeView.classList.remove('active');
    catalogView.classList.remove('active');
    detailView.classList.remove('active');

    // Execute custom page render callbacks
    if (callback) callback();

    // Show target view
    if (viewName === 'home') {
      homeView.classList.add('active');
      window.scrollTo(0, 0);
    } else if (viewName === 'catalog') {
      catalogView.classList.add('active');
      window.scrollTo(0, 0);
    } else if (viewName === 'detail') {
      detailView.classList.add('active');
      window.scrollTo(0, 0);
    }

    // Programmatic Accessibility focus routing
    let headingToFocus = null;
    if (viewName === 'home') {
      headingToFocus = document.querySelector('#home-view h2');
    } else if (viewName === 'catalog') {
      headingToFocus = document.getElementById('catalog-title');
    } else if (viewName === 'detail') {
      headingToFocus = document.getElementById('detail-product-title');
    }
    if (headingToFocus) {
      headingToFocus.setAttribute('tabindex', '-1');
      headingToFocus.focus();
    }
  };

  // Check browser support for View Transitions API
  if (!document.startViewTransition) {
    updateDOM();
    return;
  }

  // Run transition
  document.startViewTransition(updateDOM);
}

// ==========================================
// 4. EVENT LISTENERS SETUP
// ==========================================

function setupEventListeners() {
  // Logo home click
  document.getElementById('header-logo').addEventListener('click', (e) => {
    e.preventDefault();
    currentSearchQuery = "";
    activeCategory = "";
    activeSubcategory = "";
    currentSchoolFilter = null;
    searchInput.value = "";
    navigateTo('home');
  });

  // Search input typing (autocomplete)
  searchInput.addEventListener('input', (e) => {
    handleSearchInput(e.target.value.trim());
  });

  // Close autocomplete on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      searchSuggestions.classList.remove('active');
    }
  });

  // Search form submit
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      triggerSearch(query);
    }
  });

  // Category Mega-Menu trigger
  document.querySelectorAll('.cat-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = trigger.getAttribute('data-category');
      activeCategory = cat;
      activeSubcategory = "";
      currentSearchQuery = "";
      currentSchoolFilter = null;
      triggerSearchCategory();
    });
  });

  // Subcategory Mega-Menu trigger
  document.querySelectorAll('.sub-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const sub = trigger.getAttribute('data-sub');
      const cat = trigger.closest('.nav-item').querySelector('.cat-trigger').getAttribute('data-category');
      activeCategory = cat;
      activeSubcategory = sub;
      currentSearchQuery = "";
      currentSchoolFilter = null;
      triggerSearchCategory();
    });
  });

  // Quick category grid triggers (on home page)
  document.querySelectorAll('.category-quick-card').forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.getAttribute('data-category');
      activeCategory = cat;
      activeSubcategory = "";
      currentSearchQuery = "";
      currentSchoolFilter = null;
      triggerSearchCategory();
    });
  });

  // Special school list finder navigation link in header
  document.getElementById('nav-school-finder-trigger').addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('home', () => {
      // Scroll to material finder on home page
      setTimeout(() => {
        document.getElementById('material-finder').scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });
  });

  // Featured Product Cards click (event delegation)
  featuredProductsGrid.addEventListener('click', handleProductClick);
  catalogProductsGrid.addEventListener('click', handleProductClick);

  // Detail view Back button
  detailBackBtn.addEventListener('click', () => {
    if (viewHistory.length > 1) {
      viewHistory.pop(); // Remove current detail view
      const prevView = viewHistory.pop() || 'home';
      navigateTo(prevView);
    } else {
      navigateTo('home');
    }
  });

  // Detail Quantity selector
  qtyMinus.addEventListener('click', () => {
    let val = parseInt(qtyVal.value) || 1;
    if (val > 1) {
      qtyVal.value = val - 1;
    }
  });

  qtyPlus.addEventListener('click', () => {
    let val = parseInt(qtyVal.value) || 1;
    qtyVal.value = val + 1;
  });

  // Add to cart from details page
  detailAddCartBtn.addEventListener('click', () => {
    if (activeProduct && activeProduct.stock !== 'out-of-stock') {
      const qty = parseInt(qtyVal.value) || 1;
      addToCart(activeProduct, qty);
      openCartPanel();
    }
  });

  // Cart slide-out controls
  cartToggleBtn.addEventListener('click', openCartPanel);
  closeCartBtn.addEventListener('click', closeCartPanel);
  cartBackdrop.addEventListener('click', (e) => {
    if (e.target === cartBackdrop) {
      closeCartPanel();
    }
  });

  // Catalog page Sort Select change
  catalogSortSelect.addEventListener('change', () => {
    renderCatalogGrid();
  });

  // Catalog page sidebar checkboxes
  document.querySelectorAll('.filter-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      renderCatalogGrid();
    });
  });
  
  // Checkout button simulation
  document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) return;
    alert("¡Pedido Tramitado!\n(Simulación de checkout para el cliente Isidoro)");
    cart = [];
    saveCart();
    updateCartBadge();
    closeCartPanel();
  });
}

// ==========================================
// 5. SHOPPING CART ENGINE
// ==========================================

function addToCart(product, quantity = 1) {
  const existing = cart.find(item => item.product.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  saveCart();
  updateCartBadge();
}

function updateCartQty(productId, delta) {
  const item = cart.find(item => item.product.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(item => item.product.id !== productId);
    }
    saveCart();
    updateCartBadge();
    renderCartItems();
  }
}

function removeCartItem(productId) {
  cart = cart.filter(item => item.product.id !== productId);
  saveCart();
  updateCartBadge();
  renderCartItems();
}

function saveCart() {
  localStorage.setItem('isidoro_cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartBadge.textContent = totalItems;
}

function openCartPanel() {
  renderCartItems();
  cartBackdrop.classList.add('active');
}

function closeCartPanel() {
  cartBackdrop.classList.remove('active');
}

function renderCartItems() {
  cartItemsContainer.innerHTML = '';
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart-state">
        <i class="fa-solid fa-basket-shopping"></i>
        <p>Tu cesta está vacía.<br>Agrega productos para comenzar.</p>
      </div>
    `;
    cartTotalValue.textContent = '0.00 €';
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.product.price * item.quantity;
    total += itemTotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img" onerror="this.onerror=null; this.src='${item.product.fallbackImage}';">
      <div class="cart-item-details">
        <span class="cart-item-name">${item.product.name}</span>
        <div class="cart-item-price-row">
          <span class="cart-item-price">${itemTotal.toFixed(2)} €</span>
          
          <div class="cart-item-qty-selector">
            <button class="cart-qty-btn cart-qty-minus-btn" data-id="${item.product.id}"><i class="fa-solid fa-minus" style="font-size: 8px;"></i></button>
            <span class="cart-qty-input">${item.quantity}</span>
            <button class="cart-qty-btn cart-qty-plus-btn" data-id="${item.product.id}"><i class="fa-solid fa-plus" style="font-size: 8px;"></i></button>
          </div>
        </div>
      </div>
      <button class="remove-item-btn" data-id="${item.product.id}"><i class="fa-solid fa-trash-can"></i></button>
    `;

    cartItemsContainer.appendChild(div);
  });

  cartTotalValue.textContent = `${total.toFixed(2)} €`;

  // Bind cart item actions
  cartItemsContainer.querySelectorAll('.cart-qty-minus-btn').forEach(btn => {
    btn.addEventListener('click', () => updateCartQty(btn.getAttribute('data-id'), -1));
  });
  cartItemsContainer.querySelectorAll('.cart-qty-plus-btn').forEach(btn => {
    btn.addEventListener('click', () => updateCartQty(btn.getAttribute('data-id'), 1));
  });
  cartItemsContainer.querySelectorAll('.remove-item-btn').forEach(btn => {
    btn.addEventListener('click', () => removeCartItem(btn.getAttribute('data-id')));
  });
}

// ==========================================
// 6. PRODUCT CLICKS & DETAIL PAGE
// ==========================================

function handleProductClick(e) {
  // If clicked add to cart icon
  const addBtn = e.target.closest('.add-cart-btn');
  if (addBtn) {
    e.stopPropagation();
    const pid = addBtn.getAttribute('data-id');
    const prod = PRODUCTS.find(p => p.id === pid);
    if (prod && prod.stock !== 'out-of-stock') {
      addToCart(prod, 1);
      openCartPanel();
    }
    return;
  }

  // If clicked product card title or image to view details
  const card = e.target.closest('.product-card');
  if (card) {
    const pid = card.getAttribute('data-id');
    const prod = PRODUCTS.find(p => p.id === pid);
    if (prod) {
      // Setup thumbnail for View Transition morph
      const img = card.querySelector('.product-card-img');
      img.classList.add('selected-transition-img');

      navigateTo('detail', () => {
        renderProductDetail(prod);
      });
      
      // Cleanup transition class after execution
      setTimeout(() => {
        img.classList.remove('selected-transition-img');
      }, 300);
    }
  }
}

function renderProductDetail(product) {
  activeProduct = product;
  
  detailProductImg.src = product.image;
  detailProductImg.alt = product.name;
  // Setup onerror for image loading issues
  detailProductImg.onerror = () => {
    detailProductImg.src = product.fallbackImage;
  };
  
  detailProductRef.textContent = `REF: ${product.ref} | ID: ${product.id}`;
  detailProductTitle.textContent = product.name;
  
  // Render Availability Badges
  let statusHtml = '';
  if (product.stock === 'in-stock') {
    statusHtml = `<span class="product-status-row status-in-stock"><span class="status-dot"></span> En Stock (Entrega en 24h)</span>`;
    detailAddCartBtn.classList.remove('disabled');
    detailAddCartBtn.innerHTML = `<i class="fa-solid fa-cart-plus"></i> Añadir al Carrito`;
  } else if (product.stock === 'low-stock') {
    statusHtml = `<span class="product-status-row status-low-stock"><span class="status-dot"></span> ¡Últimas Unidades disponibles!</span>`;
    detailAddCartBtn.classList.remove('disabled');
    detailAddCartBtn.innerHTML = `<i class="fa-solid fa-cart-plus"></i> Añadir al Carrito`;
  } else {
    statusHtml = `<span class="product-status-row status-out-stock"><span class="status-dot"></span> Temporalmente Agotado / Bajo Pedido</span>`;
    detailAddCartBtn.classList.add('disabled');
    detailAddCartBtn.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Agotado`;
  }
  detailProductStatus.innerHTML = statusHtml;
  
  detailProductPrice.textContent = `${product.price.toFixed(2)} €`;
  // Calc price without VAT (21% default)
  const basePrice = product.price / 1.21;
  detailProductPriceBase.textContent = `Precio base: ${basePrice.toFixed(2)} € + IVA (21%)`;
  
  detailProductDesc.textContent = product.description;
  qtyVal.value = 1; // Reset quantity selector
}

// ==========================================
// 7. SMART SEARCH & AUTOCOMPLETE
// ==========================================

function handleSearchInput(query) {
  if (!query) {
    searchSuggestions.classList.remove('active');
    return;
  }

  // Filter products by query
  const matches = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.ref.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  // Build autocomplete content
  searchSuggestions.innerHTML = '';

  if (matches.length === 0) {
    searchSuggestions.innerHTML = `
      <div class="dropdown-section">
        <div class="dropdown-section-title">Resultados de búsqueda</div>
        <div style="padding: 10px 20px; font-size: 13px; color: var(--neutral-body);">No se encontraron artículos</div>
      </div>
    `;
    searchSuggestions.classList.add('active');
    return;
  }

  // Add suggestions limit to 5 items
  const displayMatches = matches.slice(0, 5);

  const section = document.createElement('div');
  section.className = 'dropdown-section';
  section.innerHTML = `<div class="dropdown-section-title">Productos Recomendados</div>`;

  displayMatches.forEach(prod => {
    const item = document.createElement('div');
    item.className = 'autocomplete-item';
    item.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}" onerror="this.onerror=null; this.src='${prod.fallbackImage}';">
      <div class="autocomplete-item-info">
        <span class="autocomplete-item-name">${prod.name}</span>
        <span class="autocomplete-item-price">${prod.price.toFixed(2)} €</span>
      </div>
    `;
    item.addEventListener('click', () => {
      searchSuggestions.classList.remove('active');
      searchInput.value = prod.name;
      navigateTo('detail', () => {
        renderProductDetail(prod);
      });
    });
    section.appendChild(item);
  });

  searchSuggestions.appendChild(section);
  searchSuggestions.classList.add('active');
}

function triggerSearch(query) {
  currentSearchQuery = query;
  activeCategory = "";
  activeSubcategory = "";
  currentSchoolFilter = null;
  searchSuggestions.classList.remove('active');
  
  navigateTo('catalog', () => {
    renderCatalogGrid();
  });
}

function triggerSearchCategory() {
  searchSuggestions.classList.remove('active');
  searchInput.value = "";
  navigateTo('catalog', () => {
    renderCatalogGrid();
  });
}

// ==========================================
// 8. SCHOOL FINDER MECHANICS
// ==========================================

function setupSchoolFinder() {
  // Town selection changes
  finderTown.addEventListener('change', (e) => {
    const town = e.target.value;
    
    // Reset secondary dropdowns
    finderSchool.innerHTML = '<option value="">Selecciona Colegio</option>';
    finderCourse.innerHTML = '<option value="">Selecciona Curso</option>';
    finderSchool.disabled = true;
    finderCourse.disabled = true;
    finderSubmitBtn.disabled = true;
    
    if (town && SCHOOLS_DATA[town]) {
      const schools = SCHOOLS_DATA[town].schools;
      schools.forEach(school => {
        const opt = document.createElement('option');
        opt.value = school;
        opt.textContent = school;
        finderSchool.appendChild(opt);
      });
      finderSchool.disabled = false;
    }
  });

  // School selection changes
  finderSchool.addEventListener('change', (e) => {
    const school = e.target.value;
    const town = finderTown.value;
    
    // Reset course dropdown
    finderCourse.innerHTML = '<option value="">Selecciona Curso</option>';
    finderCourse.disabled = true;
    finderSubmitBtn.disabled = true;
    
    if (school && town && SCHOOLS_DATA[town].courses[school]) {
      const courses = SCHOOLS_DATA[town].courses[school];
      courses.forEach(course => {
        const opt = document.createElement('option');
        opt.value = course;
        opt.textContent = course;
        finderCourse.appendChild(opt);
      });
      finderCourse.disabled = false;
    }
  });

  // Course selection changes
  finderCourse.addEventListener('change', (e) => {
    const course = e.target.value;
    finderSubmitBtn.disabled = !course;
  });

  // Submit school materials finder search
  finderSubmitBtn.addEventListener('click', () => {
    const town = finderTown.value;
    const school = finderSchool.value;
    const course = finderCourse.value;

    if (town && school && course) {
      currentSchoolFilter = { town, school, course };
      currentSearchQuery = "";
      activeCategory = "";
      activeSubcategory = "";
      
      navigateTo('catalog', () => {
        renderCatalogGrid();
      });
    }
  });
}

// ==========================================
// 9. RENDERING & DATA BINDING
// ==========================================

// Render 4 products as featured items on home page
function renderFeaturedProducts() {
  featuredProductsGrid.innerHTML = '';
  
  const featured = PRODUCTS.filter(p => p.featured).slice(0, 4);
  featured.forEach(prod => {
    const card = createProductCard(prod);
    featuredProductsGrid.appendChild(card);
  });
}

// Create a Product Card HTML Element
function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.setAttribute('data-id', product.id);
  
  // Stock Badge
  let badgeHtml = '';
  if (product.stock === 'low-stock') {
    badgeHtml = `<span class="product-badge" style="background-color: var(--warning);">Últimas uds.</span>`;
  } else if (product.stock === 'out-of-stock') {
    badgeHtml = `<span class="product-badge out-of-stock">Agotado</span>`;
  }

  // Stock status text
  let statusHtml = '';
  if (product.stock === 'in-stock') {
    statusHtml = `<span class="product-status-row status-in-stock"><span class="status-dot"></span> En Stock</span>`;
  } else if (product.stock === 'low-stock') {
    statusHtml = `<span class="product-status-row status-low-stock"><span class="status-dot"></span> Stock Bajo</span>`;
  } else {
    statusHtml = `<span class="product-status-row status-out-stock"><span class="status-dot"></span> Agotado</span>`;
  }

  // Add cart disabled state
  const isOut = product.stock === 'out-of-stock' ? 'disabled' : '';

  card.innerHTML = `
    ${badgeHtml}
    <div class="product-card-img-wrapper">
      <img src="${product.image}" alt="${product.name}" class="product-card-img" onerror="this.onerror=null; this.src='${product.fallbackImage}';">
    </div>
    <div class="product-card-content">
      <span class="product-ref">REF: ${product.ref}</span>
      <h4 class="product-title">${product.name}</h4>
      ${statusHtml}
      <div class="product-price-row">
        <div class="product-price-container">
          <span class="price-main">${product.price.toFixed(2)} €</span>
          <span class="price-iva">con IVA</span>
        </div>
        <button class="add-cart-btn ${isOut}" data-id="${product.id}" title="Añadir a la cesta">
          <i class="fa-solid fa-cart-plus"></i>
        </button>
      </div>
    </div>
  `;
  return card;
}

// Render Products Grid on Catalog page (Search results, Category lists, or School lists)
function renderCatalogGrid() {
  catalogProductsGrid.innerHTML = '';
  
  let results = [...PRODUCTS];

  // Title setting
  if (currentSchoolFilter) {
    catalogTitle.innerHTML = `<i class="fa-solid fa-school-flag" style="color: var(--secondary); margin-right: 10px;"></i> Material: ${currentSchoolFilter.course}`;
    catalogCount.innerHTML = `Lista para <strong>${currentSchoolFilter.school}</strong> (${currentSchoolFilter.course})`;
    
    // Filter products mapping to course
    const materialIds = COURSE_MATERIALS[currentSchoolFilter.course] || [];
    results = results.filter(p => materialIds.includes(p.id));
  } else if (currentSearchQuery) {
    catalogTitle.textContent = `Búsqueda: "${currentSearchQuery}"`;
    results = results.filter(p => 
      p.name.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
      p.ref.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(currentSearchQuery.toLowerCase())
    );
  } else if (activeCategory) {
    if (activeSubcategory) {
      catalogTitle.textContent = activeSubcategory;
      results = results.filter(p => p.category === activeSubcategory);
    } else {
      catalogTitle.textContent = activeCategory;
      results = results.filter(p => p.parentCategory === activeCategory);
    }
  } else {
    catalogTitle.textContent = "Todos los productos";
  }

  // Apply Sidebar Filters
  // 1. Stock Filter
  const allowedStock = Array.from(document.querySelectorAll('.filter-stock-opt:checked')).map(cb => cb.value);
  results = results.filter(p => {
    if (p.stock === 'in-stock' || p.stock === 'low-stock') {
      return allowedStock.includes('in-stock');
    } else {
      return allowedStock.includes('out-of-stock');
    }
  });

  // 2. Price Brackets Filter
  const priceBrackets = Array.from(document.querySelectorAll('.filter-price-opt:checked')).map(cb => cb.value);
  if (priceBrackets.length > 0) {
    results = results.filter(p => {
      return priceBrackets.some(bracket => {
        if (bracket === '0-10') return p.price <= 10;
        if (bracket === '10-20') return p.price > 10 && p.price <= 20;
        if (bracket === '20-50') return p.price > 20 && p.price <= 50;
        if (bracket === '50+') return p.price > 50;
        return false;
      });
    });
  }

  // Apply Sorting
  const sortVal = catalogSortSelect.value;
  if (sortVal === 'price-asc') {
    results.sort((a, b) => a.price - b.price);
  } else if (sortVal === 'price-desc') {
    results.sort((a, b) => b.price - a.price);
  }

  // Render count
  if (!currentSchoolFilter) {
    catalogCount.textContent = `Mostrando ${results.length} artículo(s)`;
  }

  if (results.length === 0) {
    catalogProductsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 0; color: var(--neutral-body);">
        <i class="fa-solid fa-circle-question" style="font-size: 48px; color: hsl(220, 15%, 80%); margin-bottom: 16px;"></i>
        <p>No se encontraron productos que coincidan con los filtros aplicados.</p>
      </div>
    `;
    return;
  }

  results.forEach(prod => {
    const card = createProductCard(prod);
    catalogProductsGrid.appendChild(card);
  });
}
