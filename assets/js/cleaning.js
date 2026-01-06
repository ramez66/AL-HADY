// تهيئة صفحة المنظفات والمنزلية
document.addEventListener('DOMContentLoaded', function() {
    initCleaningPage();
    initCategoryCards();
    initSearchFilter();
    initViewToggle();
    initTipsTabs();
    initOffers();
    initFAQ();
    initSeasonalOffer();
    loadCleaningProducts();
});

// تهيئة الصفحة
function initCleaningPage() {
    // تحديث عدد العناصر في السلة
    if (typeof cart !== 'undefined') {
        cart.updateCartCount();
    }
    
    // إضافة أنماط للإشعارات إذا لم تكن موجودة
    addNotificationStyles();
}

// منتجات المنظفات
const cleaningProducts = [
    {
        id: 1,
        name: "مسحوق غسيل أريال",
        category: "laundry",
        brand: "أريال",
        description: "مسحوق غسيل أريال الأوتوماتيك، عبوة 5 كجم، ينظف بعمق ويحافظ على الألوان",
        price: 22000,
        oldPrice: 25000,
        size: "5 كجم",
        image: "../assets/images/cleaning/ariel.jpg",
        badge: "sale",
        badgeText: "خصم",
        eco: false,
        popular: true,
        stock: 45
    },
    {
        id: 2,
        name: "سائل غسيل الصحون",
        category: "kitchen",
        brand: "فيري",
        description: "سائل غسيل الصحون فيري، 5 لتر، يزيل الدهون بعمق وبنعومة",
        price: 18000,
        oldPrice: null,
        size: "5 لتر",
        image: "../assets/images/cleaning/fairy.jpg",
        badge: "bestseller",
        badgeText: "الأكثر مبيعاً",
        eco: false,
        popular: true,
        stock: 60
    },
    {
        id: 3,
        name: "منظف أرضيات لوكس",
        category: "floor",
        brand: "لوكس",
        description: "منظف أرضيات لوكس، 5 لتر، معطر برائحة الليمون المنعشة",
        price: 12000,
        oldPrice: null,
        size: "5 لتر",
        image: "../assets/images/cleaning/lux.jpg",
        badge: null,
        badgeText: "",
        eco: false,
        popular: true,
        stock: 35
    },
    {
        id: 4,
        name: "مطهر الحمام كلوركس",
        category: "bathroom",
        brand: "كلوركس",
        description: "مطهر الحمام كلوركس، 2 لتر، يقضي على الجراثيم والعفن",
        price: 8500,
        oldPrice: null,
        size: "2 لتر",
        image: "../assets/images/cleaning/clorox.jpg",
        badge: null,
        badgeText: "",
        eco: false,
        popular: true,
        stock: 50
    },
    {
        id: 5,
        name: "معطر جو جلاد",
        category: "air",
        brand: "جلاد",
        description: "معطر جو جلاد، رائحة الربيع، يدوم 30 يوماً",
        price: 6500,
        oldPrice: 7500,
        size: "250 مل",
        image: "../assets/images/cleaning/glade.jpg",
        badge: "sale",
        badgeText: "عرض",
        eco: false,
        popular: false,
        stock: 80
    },
    {
        id: 6,
        name: "منظف زجاج ونوافذ",
        category: "tools",
        brand: "ويندكس",
        description: "منظف زجاج ونوافذ ويندكس، 750 مل، يترك الزجاج لامعاً بدون خطوط",
        price: 5500,
        oldPrice: null,
        size: "750 مل",
        image: "../assets/images/cleaning/windex.jpg",
        badge: null,
        badgeText: "",
        eco: false,
        popular: false,
        stock: 40
    },
    {
        id: 7,
        name: "مسحوق غسيل عضوي",
        category: "laundry",
        brand: "إيكو",
        description: "مسحوق غسيل عضوي صديق للبيئة، 2 كجم، خالي من المواد الكيميائية الضارة",
        price: 15000,
        oldPrice: null,
        size: "2 كجم",
        image: "../assets/images/cleaning/eco-laundry.jpg",
        badge: "eco",
        badgeText: "عضوي",
        eco: true,
        popular: true,
        stock: 25
    },
    {
        id: 8,
        name: "سائل تنظيف أرضيات عضوي",
        category: "floor",
        brand: "ناتشرال",
        description: "سائل تنظيف أرضيات عضوي، 3 لتر، مصنوع من مكونات طبيعية",
        price: 11000,
        oldPrice: null,
        size: "3 لتر",
        image: "../assets/images/cleaning/eco-floor.jpg",
        badge: "eco",
        badgeText: "عضوي",
        eco: true,
        popular: false,
        stock: 30
    },
    {
        id: 9,
        name: "منعم أقمشة داوني",
        category: "laundry",
        brand: "داوني",
        description: "منعم أقمشة داوني، 3 لتر، يعطي نعومة فائقة ورائحة جميلة",
        price: 14000,
        oldPrice: null,
        size: "3 لتر",
        image: "../assets/images/cleaning/downy.jpg",
        badge: "new",
        badgeText: "جديد",
        eco: false,
        popular: true,
        stock: 55
    },
    {
        id: 10,
        name: "مجموعة أدوات تنظيف",
        category: "tools",
        brand: "كلين",
        description: "مجموعة أدوات تنظيف متكاملة: فرشاة، إسفنج، قفازات",
        price: 8500,
        oldPrice: null,
        size: "مجموعة",
        image: "../assets/images/cleaning/tools-kit.jpg",
        badge: null,
        badgeText: "",
        eco: false,
        popular: false,
        stock: 20
    },
    {
        id: 11,
        name: "مزيل شحوم المطبخ",
        category: "kitchen",
        brand: "ديتول",
        description: "مزيل شحوم المطبخ ديتول، 500 مل، فعال في إزالة الدهون العنيدة",
        price: 7500,
        oldPrice: null,
        size: "500 مل",
        image: "../assets/images/cleaning/degreaser.jpg",
        badge: null,
        badgeText: "",
        eco: false,
        popular: true,
        stock: 45
    },
    {
        id: 12,
        name: "بخاخ معطر جو عضوي",
        category: "air",
        brand: "أورجانيك",
        description: "بخاخ معطر جو عضوي، 400 مل، برائحة الخزامى الطبيعية",
        price: 6000,
        oldPrice: null,
        size: "400 مل",
        image: "../assets/images/cleaning/eco-air.jpg",
        badge: "eco",
        badgeText: "عضوي",
        eco: true,
        popular: true,
        stock: 35
    }
];

// تحميل منتجات المنظفات
function loadCleaningProducts(category = 'all', brand = 'all', size = 'all', search = '') {
    const container = document.getElementById('productsContainer');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const noProducts = document.getElementById('noProducts');
    const productsCount = document.getElementById('productsCount');
    
    if (!container) return;
    
    // إظهار مؤشر التحميل
    container.innerHTML = '';
    loadingSpinner.classList.add('active');
    noProducts.style.display = 'none';
    
    // محاكاة تأخير الشبكة
    setTimeout(() => {
        loadingSpinner.classList.remove('active');
        
        // تصفية المنتجات
        let filteredProducts = cleaningProducts;
        
        // التصفية حسب القسم
        if (category !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === category);
        }
        
        // التصفية حسب الماركة
        if (brand !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.brand.toLowerCase().includes(brand));
        }
        
        // التصفية حسب الحجم
        if (size !== 'all') {
            filteredProducts = filteredProducts.filter(product => {
                if (size === 'small') return product.size.includes('مل') || product.size.includes('كجم') && parseInt(product.size) <= 1;
                if (size === 'medium') return product.size.includes('لتر') && parseInt(product.size) <= 3;
                if (size === 'large') return product.size.includes('لتر') && parseInt(product.size) > 3;
                if (size === 'family') return product.size.includes('5') || product.size.includes('كجم');
                return true;
            });
        }
        
        // التصفية حسب البحث
        if (search.trim() !== '') {
            const searchTerm = search.toLowerCase();
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.brand.toLowerCase().includes(searchTerm)
            );
        }
        
        // تحديث العداد
        if (productsCount) {
            productsCount.textContent = filteredProducts.length;
        }
        
        // تحديث عداد العروض
        const offersCount = document.getElementById('offersCount');
        if (offersCount) {
            const offerProducts = filteredProducts.filter(p => p.oldPrice !== null);
            offersCount.textContent = offerProducts.length;
        }
        
        if (filteredProducts.length === 0) {
            noProducts.style.display = 'block';
            return;
        }
        
        // عرض المنتجات
        filteredProducts.forEach(product => {
            const card = createCleaningProductCard(product);
            container.appendChild(card);
        });
        
        // إضافة مستمعين للأحداث
        addCleaningEventListeners();
        
    }, 500);
}

// إنشاء بطاقة منتج منظفات
function createCleaningProductCard(product) {
    const container = document.getElementById('productsContainer');
    const isGridView = container.classList.contains('grid-view');
    
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    card.setAttribute('data-id', product.id);
    
    const badgeClass = getCleaningBadgeClass(product.badge);
    const badgeHTML = product.badge 
        ? `<div class="product-badge ${badgeClass}">${product.badgeText}</div>` 
        : '';
    
    const priceHTML = product.oldPrice 
        ? `<div class="current-price">${product.price.toLocaleString()} ريال</div>
           <div class="old-price">${product.oldPrice.toLocaleString()} ريال</div>`
        : `<div class="current-price">${product.price.toLocaleString()} ريال</div>`;
    
    if (isGridView) {
        card.innerHTML = `
            ${badgeHTML}
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-content">
                <div class="product-header">
                    <div>
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-brand">${product.brand}</div>
                    </div>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-details">
                    <div class="product-size">${product.size}</div>
                    <div class="product-price">
                        ${priceHTML}
                    </div>
                </div>
                <div class="product-actions">
                    <div class="quantity-control">
                        <button class="qty-btn minus" data-id="${product.id}">-</button>
                        <input type="number" class="qty-input" value="1" min="1" max="10" data-id="${product.id}">
                        <button class="qty-btn plus" data-id="${product.id}">+</button>
                    </div>
                    <button class="btn-add-cart" data-product='${JSON.stringify(product)}'>
                        <i class="fas fa-cart-plus"></i>
                        أضف للسلة
                    </button>
                </div>
            </div>
        `;
    } else {
        // عرض القائمة
        card.innerHTML = `
            ${badgeHTML}
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-content">
                <div class="product-header">
                    <div>
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-brand">${product.brand}</div>
                        <div class="product-size">${product.size}</div>
                    </div>
                    <div class="product-price">
                        ${priceHTML}
                    </div>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-actions">
                    <div class="quantity-control">
                        <button class="qty-btn minus" data-id="${product.id}">-</button>
                        <input type="number" class="qty-input" value="1" min="1" max="10" data-id="${product.id}">
                        <button class="qty-btn plus" data-id="${product.id}">+</button>
                    </div>
                    <button class="btn-add-cart" data-product='${JSON.stringify(product)}'>
                        <i class="fas fa-cart-plus"></i>
                        أضف للسلة
                    </button>
                </div>
            </div>
        `;
    }
    
    return card;
}

// الحصول على فئة البادجة للمنظفات
function getCleaningBadgeClass(badgeType) {
    const classes = {
        'eco': 'badge-eco',
        'new': 'badge-new',
        'sale': 'badge-sale',
        'bestseller': 'badge-bestseller'
    };
    return classes[badgeType] || '';
}

// بطاقات الأقسام
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // تحديث فلتر القسم
            const categoryFilter = document.getElementById('categoryFilter');
            if (categoryFilter) {
                categoryFilter.value = category;
                applyCleaningFilters();
            }
            
            // إضافة تأثير مرئي
            categoryCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // التمرير إلى المنتجات
            window.scrollTo({
                top: document.querySelector('.cleaning-products').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
}

// البحث والتصفية
function initSearchFilter() {
    const searchInput = document.getElementById('searchCleaning');
    const searchBtn = document.querySelector('.search-btn');
    const categoryFilter = document.getElementById('categoryFilter');
    const brandFilter = document.getElementById('brandFilter');
    const sizeFilter = document.getElementById('sizeFilter');
    const resetBtn = document.getElementById('resetFilters');
    
    // البحث
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performCleaningSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performCleaningSearch();
            }
        });
    }
    
    // التصفية
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyCleaningFilters);
    }
    
    if (brandFilter) {
        brandFilter.addEventListener('change', applyCleaningFilters);
    }
    
    if (sizeFilter) {
        sizeFilter.addEventListener('change', applyCleaningFilters);
    }
    
    // إعادة التعيين
    if (resetBtn) {
        resetBtn.addEventListener('click', resetCleaningFilters);
    }
}

function performCleaningSearch() {
    const searchInput = document.getElementById('searchCleaning');
    const categoryFilter = document.getElementById('categoryFilter');
    const brandFilter = document.getElementById('brandFilter');
    const sizeFilter = document.getElementById('sizeFilter');
    
    const searchTerm = searchInput ? searchInput.value : '';
    const category = categoryFilter ? categoryFilter.value : 'all';
    const brand = brandFilter ? brandFilter.value : 'all';
    const size = sizeFilter ? sizeFilter.value : 'all';
    
    loadCleaningProducts(category, brand, size, searchTerm);
}

function applyCleaningFilters() {
    const searchInput = document.getElementById('searchCleaning');
    const categoryFilter = document.getElementById('categoryFilter');
    const brandFilter = document.getElementById('brandFilter');
    const sizeFilter = document.getElementById('sizeFilter');
    
    const searchTerm = searchInput ? searchInput.value : '';
    const category = categoryFilter ? categoryFilter.value : 'all';
    const brand = brandFilter ? brandFilter.value : 'all';
    const size = sizeFilter ? sizeFilter.value : 'all';
    
    loadCleaningProducts(category, brand, size, searchTerm);
}

function resetCleaningFilters() {
    const searchInput = document.getElementById('searchCleaning');
    const categoryFilter = document.getElementById('categoryFilter');
    const brandFilter = document.getElementById('brandFilter');
    const sizeFilter = document.getElementById('sizeFilter');
    const categoryCards = document.querySelectorAll('.category-card');
    
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = 'all';
    if (brandFilter) brandFilter.value = 'all';
    if (sizeFilter) sizeFilter.value = 'all';
    
    categoryCards.forEach(card => card.classList.remove('active'));
    
    loadCleaningProducts();
}

// تبديل طريقة العرض
function initViewToggle() {
    const viewToggles = document.querySelectorAll('.view-toggle');
    const container = document.getElementById('productsContainer');
    
    viewToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // تحديث الأزرار
            viewToggles.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // تحديث العرض
            container.classList.remove('grid-view', 'list-view');
            container.classList.add(`${view}-view`);
            
            // إعادة تحميل المنتجات بنفس الفلاتر
            applyCleaningFilters();
        });
    });
}

// نصائح التنظيف
function initTipsTabs() {
    const tipTabs = document.querySelectorAll('.tip-tab');
    const tipContents = document.querySelectorAll('.tip-content');
    
    tipTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tipId = this.getAttribute('data-tip');
            
            // تحدير الألسنة
            tipTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // إظهار المحتوى المناسب
            tipContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tipId}-tip`) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// العروض
function initOffers() {
    const offerButtons = document.querySelectorAll('.btn-offer');
    
    offerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.offer-card');
            const offerTitle = card.querySelector('h3').textContent;
            
            showNotification(`تم اختيار ${offerTitle}. سنتصل بك خلال 24 ساعة لتأكيد التفاصيل.`);
        });
    });
}

// الأسئلة الشائعة
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const isActive = item.classList.contains('active');
            
            // إغلاق جميع العناصر
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
            });
            
            // فتح العنصر الحالي إذا لم يكن مفتوحاً
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// العرض الموسمي
function initSeasonalOffer() {
    const seasonalBtn = document.querySelector('.btn-seasonal');
    
    if (seasonalBtn) {
        seasonalBtn.addEventListener('click', function() {
            // محاكاة طلب الباقة الموسمية
            showNotification('تم طلب باقة التنظيف الربيعي بنجاح! سعر الباقة: 59,500 ريال. سيتم التوصيل خلال 48 ساعة.');
            
            // هنا يمكن إضافة كود الطلب الفعلي
            setTimeout(() => {
                showNotification('تم تأكيد طلبك. رقم الطلب: #CLN2026-001');
            }, 1500);
        });
    }
}

// إضافة مستمعين للأحداث للمنتجات
function addCleaningEventListeners() {
    // أزرار زيادة وتقليل الكمية
    document.querySelectorAll('.qty-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const input = document.querySelector(`.qty-input[data-id="${id}"]`);
            let value = parseInt(input.value);
            
            if (this.classList.contains('plus')) {
                if (value < 10) {
                    input.value = value + 1;
                }
            } else if (this.classList.contains('minus')) {
                if (value > 1) {
                    input.value = value - 1;
                }
            }
        });
    });
    
    // تحديث الكمية يدوياً
    document.querySelectorAll('.qty-input').forEach(input => {
        input.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) this.value = 1;
            if (value > 10) this.value = 10;
        });
    });
    
    // إضافة إلى السلة
    document.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productData = this.getAttribute('data-product');
            if (productData) {
                const product = JSON.parse(productData);
                const id = product.id;
                const quantityInput = document.querySelector(`.qty-input[data-id="${id}"]`);
                const quantity = parseInt(quantityInput.value);
                
                // إضافة الكمية المطلوبة
                for (let i = 0; i < quantity; i++) {
                    addToCart(product);
                }
                
                showNotification(`تم إضافة ${quantity} ${product.size} من ${product.name} إلى السلة`);
            }
        });
    });
}

// إضافة إلى السلة (دالة مساعدة)
function addToCart(product) {
    if (typeof cart !== 'undefined') {
        cart.addItem(product);
    }
}

// عرض الإشعارات
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #0077b6;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 119, 182, 0.3);
        z-index: 10000;
        animation: slideDown 0.3s ease;
        max-width: 90%;
        text-align: center;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// إضافة أنماط للإشعارات
function addNotificationStyles() {
    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            @keyframes slideDown {
                from { top: -100px; opacity: 0; }
                to { top: 20px; opacity: 1; }
            }
            @keyframes slideUp {
                from { top: 20px; opacity: 1; }
                to { top: -100px; opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// تحميل المنتجات الصديقة للبيئة
function loadEcoProducts() {
    const ecoGrid = document.getElementById('ecoProducts');
    if (!ecoGrid) return;
    
    const ecoProducts = cleaningProducts.filter(product => product.eco);
    
    ecoProducts.forEach(product => {
        const productCard = createCleaningProductCard(product);
        ecoGrid.appendChild(productCard);
    });
    
    // إعادة إضافة مستمعين الأحداث للمنتجات الإيكولوجية
    setTimeout(() => {
        addCleaningEventListeners();
    }, 100);
}

// تحميل المنتجات الإيكولوجية عند الحاجة
if (document.getElementById('ecoProducts')) {
    loadEcoProducts();
}