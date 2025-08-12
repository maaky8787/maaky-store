// Mock products data (fallback)
const mockProducts = [
    {
        id: 1,
        name: "سماعات لاسلكية عالية الجودة",
        price: 299,
        originalPrice: 399,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        rating: 4.5,
        reviewCount: 128,
        category: "electronics",
        isNew: true,
        isSale: true
    },
    {
        id: 2,
        name: "قميص قطني كلاسيكي",
        price: 89,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
        rating: 4.2,
        reviewCount: 45,
        category: "clothing"
    },
    {
        id: 3,
        name: "كتاب البرمجة المتقدمة",
        price: 65,
        originalPrice: 85,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
        rating: 4.8,
        reviewCount: 89,
        category: "books",
        isSale: true
    },
    {
        id: 4,
        name: "كرة قدم احترافية",
        price: 120,
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
        rating: 4.6,
        reviewCount: 67,
        category: "sports",
        isNew: true
    },
    {
        id: 5,
        name: "مجموعة أواني طبخ",
        price: 245,
        originalPrice: 320,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        rating: 4.3,
        reviewCount: 156,
        category: "home",
        isSale: true
    },
    {
        id: 6,
        name: "كريم مرطب للوجه",
        price: 78,
        image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=300&fit=crop",
        rating: 4.4,
        reviewCount: 203,
        category: "beauty"
    },
    {
        id: 7,
        name: "لابتوب عالي الأداء",
        price: 2199,
        originalPrice: 2499,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
        rating: 4.7,
        reviewCount: 94,
        category: "electronics",
        isSale: true
    },
    {
        id: 8,
        name: "فستان صيفي أنيق",
        price: 155,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
        rating: 4.1,
        reviewCount: 78,
        category: "clothing",
        isNew: true
    },
    {
        id: 9,
        name: "مكنسة كهربائية ذكية",
        price: 899,
        originalPrice: 1099,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        rating: 4.5,
        reviewCount: 112,
        category: "home",
        isSale: true
    },
    {
        id: 10,
        name: "عطر فاخر للرجال",
        price: 289,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop",
        rating: 4.6,
        reviewCount: 167,
        category: "beauty"
    },
    {
        id: 11,
        name: "كتاب تطوير الذات",
        price: 45,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        rating: 4.7,
        reviewCount: 145,
        category: "books",
        isNew: true
    },
    {
        id: 12,
        name: "حذاء رياضي مريح",
        price: 189,
        originalPrice: 230,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        rating: 4.4,
        reviewCount: 89,
        category: "sports",
        isSale: true
    }
];

// Live products loaded from API
let products = [];

// Categories data
const categories = [
    { id: 'all', name: 'جميع المنتجات', icon: '🛍️' },
    { id: 'electronics', name: 'إلكترونيات', icon: '📱' },
    { id: 'clothing', name: 'ملابس', icon: '👕' },
    { id: 'home', name: 'منزل ومطبخ', icon: '🏠' },
    { id: 'books', name: 'كتب', icon: '📚' },
    { id: 'sports', name: 'رياضة', icon: '⚽' },
    { id: 'beauty', name: 'جمال وعناية', icon: '💄' }
];

// Application state
let state = {
    searchQuery: '',
    selectedCategory: 'all',
    cartItems: [],
    isCartOpen: false,
    selectedProduct: null
};

// DOM elements
const elements = {
    searchInput: document.getElementById('search-input'),
    mobileSearchInput: document.getElementById('mobile-search-input'),
    cartButton: document.getElementById('cart-button'),
    cartCount: document.getElementById('cart-count'),
    categoriesContainer: document.getElementById('categories-container'),
    resultsCount: document.getElementById('results-count'),
    categoryTitle: document.getElementById('category-title'),
    productsGrid: document.getElementById('products-grid'),
    noResults: document.getElementById('no-results'),
    cartSidebar: document.getElementById('cart-sidebar'),
    cartOverlay: document.getElementById('cart-overlay'),
    cartContent: document.getElementById('cart-content'),
    closeCart: document.getElementById('close-cart'),
    cartItems: document.getElementById('cart-items'),
    cartTotal: document.getElementById('cart-total'),
    continueShopping: document.getElementById('continue-shopping'),
    checkoutButton: document.getElementById('checkout-button'),
    productModal: document.getElementById('product-modal'),
    modalOverlay: document.getElementById('modal-overlay'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body'),
    closeModal: document.getElementById('close-modal'),
    toastContainer: document.getElementById('toast-container')
};

// Utility functions
function createSVGIcon(pathData, className = '') {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.className = className;
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('d', pathData);
    
    svg.appendChild(path);
    return svg;
}

function createStarIcon(filled = false) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.className = 'star';
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z');
    
    if (filled) {
        svg.setAttribute('fill', 'currentColor');
    } else {
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
    }
    
    svg.appendChild(path);
    return svg;
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    elements.toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function formatPrice(price) {
    return `${price.toFixed(2)} ر.س`;
}

function calculateDiscount(originalPrice, currentPrice) {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

// Filter functions
function filterProducts() {
    return products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(state.searchQuery.toLowerCase());
        const matchesCategory = state.selectedCategory === 'all' || product.category === state.selectedCategory;
        return matchesSearch && matchesCategory;
    });
}

// Cart functions
function addToCart(product, quantity = 1) {
    const existingItem = state.cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        state.cartItems.push({ product, quantity });
    }
    
    updateCartUI();
    showToast(`تم إضافة ${product.name} إلى عربة التسوق`);
}

function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = state.cartItems.find(item => item.product.id === productId);
    if (item) {
        item.quantity = quantity;
        updateCartUI();
    }
}

function removeFromCart(productId) {
    state.cartItems = state.cartItems.filter(item => item.product.id !== productId);
    updateCartUI();
    showToast('تم حذف المنتج من عربة التسوق');
}

function getCartItemsCount() {
    return state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
    return state.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
}

// UI update functions
function updateCartUI() {
    const itemsCount = getCartItemsCount();
    const total = getCartTotal();
    
    // Update cart count badge
    if (itemsCount > 0) {
        elements.cartCount.textContent = itemsCount;
        elements.cartCount.classList.remove('hidden');
    } else {
        elements.cartCount.classList.add('hidden');
    }
    
    // Update cart total
    elements.cartTotal.textContent = formatPrice(total);
    
    // Update cart items
    renderCartItems();
}

function renderCategories() {
    elements.categoriesContainer.innerHTML = '';
    
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = `category-btn ${state.selectedCategory === category.id ? 'active' : ''}`;
        button.onclick = () => selectCategory(category.id);
        
        button.innerHTML = `
            <span class="category-icon">${category.icon}</span>
            <span>${category.name}</span>
        `;
        
        elements.categoriesContainer.appendChild(button);
    });
}

function renderProducts() {
    const filteredProducts = filterProducts();
    
    // Update results count and category title
    elements.resultsCount.textContent = `${filteredProducts.length} منتج`;
    const selectedCategoryData = categories.find(cat => cat.id === state.selectedCategory);
    elements.categoryTitle.textContent = selectedCategoryData ? selectedCategoryData.name : 'المنتجات';
    
    // Clear products grid
    elements.productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        elements.noResults.classList.remove('hidden');
        elements.productsGrid.classList.add('hidden');
    } else {
        elements.noResults.classList.add('hidden');
        elements.productsGrid.classList.remove('hidden');
        
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            elements.productsGrid.appendChild(productCard);
        });
    }
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const discountPercentage = product.originalPrice ? calculateDiscount(product.originalPrice, product.price) : 0;
    
    card.innerHTML = `
        <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4='">
            <div class="product-badges">
                ${product.isNew ? '<span class="badge badge-new">جديد</span>' : ''}
                ${product.isSale && discountPercentage > 0 ? `<span class="badge badge-sale">خصم ${discountPercentage}%</span>` : ''}
            </div>
        </div>
        <div class="product-content">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-meta">
                <div class="product-rating">
                    ${createStarIcon(true).outerHTML}
                    <span>${product.rating} (${product.reviewCount})</span>
                </div>
                <span class="product-category">${product.category}</span>
            </div>
        </div>
        <div class="product-footer">
            <button class="add-to-cart-btn" onclick="handleAddToCart(${product.id})">
                ${createSVGIcon('M12 5v14m7-7H5').outerHTML}
                أضف للعربة
            </button>
            <div class="product-price">
                <span class="price-current">${formatPrice(product.price)}</span>
                ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
            </div>
        </div>
    `;
    
    // Add click event to open product detail
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.add-to-cart-btn')) {
            openProductDetail(product);
        }
    });
    
    return card;
}

// Expose a safe handler for inline button
function handleAddToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        addToCart(product);
    }
}

function renderCartItems() {
    if (state.cartItems.length === 0) {
        elements.cartItems.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <h3 class="cart-empty-title">عربة التسوق فارغة</h3>
                <p class="cart-empty-text">ابدأ بإضافة بعض المنتجات الرائعة</p>
            </div>
        `;
    } else {
        elements.cartItems.innerHTML = '';
        
        state.cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            cartItem.innerHTML = `
                <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4='">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.product.name}</h4>
                    <p class="cart-item-price">${formatPrice(item.product.price)}</p>
                    <div class="cart-item-actions">
                        <button class="remove-btn" onclick="removeFromCart(${item.product.id})">
                            ${createSVGIcon('M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16').outerHTML}
                        </button>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.product.id}, ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>
                                ${createSVGIcon('M5 12h14').outerHTML}
                            </button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.product.id}, ${item.quantity + 1})">
                                ${createSVGIcon('M12 5v14m7-7H5').outerHTML}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            elements.cartItems.appendChild(cartItem);
        });
    }
}

// Modal functions
function openProductDetail(product) {
    state.selectedProduct = product;
    
    const discountPercentage = product.originalPrice ? calculateDiscount(product.originalPrice, product.price) : 0;
    
    elements.modalTitle.textContent = product.name;
    elements.modalBody.innerHTML = `
        <div class="product-detail-grid">
            <div>
                <img src="${product.image}" alt="${product.name}" class="product-detail-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4='">
                <div class="product-badges">
                    ${product.isNew ? '<span class="badge badge-new">جديد</span>' : ''}
                    ${product.isSale && discountPercentage > 0 ? `<span class="badge badge-sale">خصم ${discountPercentage}%</span>` : ''}
                </div>
            </div>
            <div class="product-detail-info">
                <h1 class="product-detail-name">${product.name}</h1>
                <span class="product-category">${product.category}</span>
                
                <div class="product-detail-rating">
                    <span>(${product.reviewCount} تقييم)</span>
                    <span>${product.rating}</span>
                    <div style="display: flex;">
                        ${Array.from({length: 5}, (_, i) => 
                            createStarIcon(i < product.rating).outerHTML
                        ).join('')}
                    </div>
                </div>
                
                <div class="product-detail-price">
                    <span class="price-large">${formatPrice(product.price)}</span>
                    ${product.originalPrice ? `<span class="price-original" style="font-size: 1.125rem;">${formatPrice(product.originalPrice)}</span>` : ''}
                </div>
                
                <div class="product-description">
                    <h3>وصف المنتج</h3>
                    <p>هذا منتج عالي الجودة مصمم لتلبية احتياجاتك. يتميز بالمتانة والأناقة ويأتي مع ضمان الجودة. مناسب للاستخدام اليومي ويوفر قيمة ممتازة مقابل السعر. المنتج متوفر الآن مع إمكانية التوصيل السريع لجميع أنحاء المملكة.</p>
                </div>
                
                <div class="quantity-selector">
                    <div class="quantity-row">
                        <div class="quantity-input-group">
                            <button class="quantity-btn" onclick="decreaseModalQuantity()">
                                ${createSVGIcon('M5 12h14').outerHTML}
                            </button>
                            <span class="quantity-display" id="modal-quantity">1</span>
                            <button class="quantity-btn" onclick="increaseModalQuantity()">
                                ${createSVGIcon('M12 5v14m7-7H5').outerHTML}
                            </button>
                        </div>
                        <span class="quantity-label">الكمية:</span>
                    </div>
                    
                    <button class="btn btn-primary btn-full" onclick="addToCartFromModal()">
                        ${createSVGIcon('M12 5v14m7-7H5').outerHTML}
                        أضف <span id="modal-quantity-text">1</span> للعربة
                    </button>
                </div>
                
                <div class="product-features">
                    <div class="feature-item">
                        <span>توصيل مجاني للطلبات أكثر من 200 ر.س</span>
                        <span>🚚</span>
                    </div>
                    <div class="feature-item">
                        <span>إمكانية الإرجاع خلال 14 يوم</span>
                        <span>↩️</span>
                    </div>
                    <div class="feature-item">
                        <span>ضمان الجودة</span>
                        <span>✅</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    elements.productModal.classList.remove('hidden');
}

function closeProductDetail() {
    state.selectedProduct = null;
    elements.productModal.classList.add('hidden');
}

// Modal quantity functions
let modalQuantity = 1;

function increaseModalQuantity() {
    modalQuantity++;
    updateModalQuantityDisplay();
}

function decreaseModalQuantity() {
    if (modalQuantity > 1) {
        modalQuantity--;
        updateModalQuantityDisplay();
    }
}

function updateModalQuantityDisplay() {
    const quantityDisplay = document.getElementById('modal-quantity');
    const quantityText = document.getElementById('modal-quantity-text');
    
    if (quantityDisplay) quantityDisplay.textContent = modalQuantity;
    if (quantityText) quantityText.textContent = modalQuantity;
}

function addToCartFromModal() {
    if (state.selectedProduct) {
        addToCart(state.selectedProduct, modalQuantity);
        modalQuantity = 1;
        closeProductDetail();
    }
}

// Cart functions
function openCart() {
    state.isCartOpen = true;
    elements.cartSidebar.classList.remove('hidden');
    elements.cartSidebar.classList.add('open');
}

function closeCart() {
    state.isCartOpen = false;
    elements.cartSidebar.classList.remove('open');
    setTimeout(() => {
        elements.cartSidebar.classList.add('hidden');
    }, 300);
}

// Search and filter functions
function handleSearch(query) {
    state.searchQuery = query;
    renderProducts();
}

function selectCategory(categoryId) {
    state.selectedCategory = categoryId;
    renderCategories();
    renderProducts();
}

// Event listeners
function setupEventListeners() {
    // Search inputs
    elements.searchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
        elements.mobileSearchInput.value = e.target.value;
    });
    
    elements.mobileSearchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
        elements.searchInput.value = e.target.value;
    });
    
    // Cart button
    elements.cartButton.addEventListener('click', openCart);
    
    // Cart close buttons
    elements.closeCart.addEventListener('click', closeCart);
    elements.cartOverlay.addEventListener('click', closeCart);
    elements.continueShopping.addEventListener('click', closeCart);

    // Checkout
    if (elements.checkoutButton) {
        elements.checkoutButton.addEventListener('click', submitOrder);
    }
    
    // Modal close buttons
    elements.closeModal.addEventListener('click', closeProductDetail);
    elements.modalOverlay.addEventListener('click', closeProductDetail);
    
    // Keyboard events
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (state.selectedProduct) {
                closeProductDetail();
            } else if (state.isCartOpen) {
                closeCart();
            }
        }
    });
}

// Initialize application
async function init() {
    setupEventListeners();
    renderCategories();
    await loadProductsFromAPI();
    renderProducts();
    updateCartUI();
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Fetch products from server API, fallback to local mock data on failure
async function loadProductsFromAPI() {
    try {
        const params = new URLSearchParams();
        // initial load without filters; client-side filters will be applied
        const res = await fetch(`/api/products?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        products = Array.isArray(json.products) ? json.products : [];
        if (products.length === 0) {
            products = mockProducts;
        }
    } catch (e) {
        products = mockProducts;
    }
}

// Submit order to backend
async function submitOrder() {
    if (state.cartItems.length === 0) {
        showToast('عربة التسوق فارغة', 'error');
        return;
    }
    // جمع بيانات العميل من الفورم
    const form = document.getElementById('checkout-form');
    if (!form) {
        showToast('حدث خطأ في الفورم', 'error');
        return;
    }
    const formData = new FormData(form);
    const customer = {
        name: formData.get('customer_name') || '',
        phone: formData.get('customer_phone') || '',
        email: formData.get('customer_email') || '',
        address: formData.get('customer_address') || '',
        state: formData.get('customer_state') || '',
        city: formData.get('customer_city') || '',
        notes: formData.get('customer_notes') || ''
    };
    // تحقق من الحقول المطلوبة
    if (!customer.name || !customer.phone || !customer.email || !customer.address || !customer.state || !customer.city) {
        showToast('يرجى تعبئة جميع الحقول المطلوبة', 'error');
        return;
    }
    try {
        const items = state.cartItems.map(ci => ({
            product_id: ci.product.id,
            quantity: ci.quantity,
            unit_price: ci.product.price
        }));
        const payload = {
            customer,
            items,
            shipping_fee: 0
        };
        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'فشل إنشاء الطلب');
        showToast(`تم إنشاء الطلب ${json.order.order_number}`);
        // reset cart
        state.cartItems = [];
        updateCartUI();
        closeCart();
        // إعادة تعيين الفورم
        form.reset();
    } catch (e) {
        showToast(e.message || 'خطأ أثناء إنشاء الطلب', 'error');
    }
}

