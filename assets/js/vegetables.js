// تهيئة صفحة الخضروات والفواكه
document.addEventListener('DOMContentLoaded', function() {
    initVegetablesPage();
    initFilters();
    initSeasonalCategories();
    initBenefitsTabs();
    initFAQ();
    initWeeklyBasket();
    initSpecialOffers();
});

// تهيئة الصفحة
function initVegetablesPage() {
    // تحميل منتجات الخضروات والفواكه
    loadVegetablesProducts();
    
    // تحديث عدد العناصر في السلة
    if (typeof cart !== 'undefined') {
        cart.updateCartCount();
    }
    
    // إضافة أنماط للإشعارات إذا لم تكن موجودة
    addNotificationStyles();
}

// منتجات الخضروات والفواكه
const vegetablesProducts = [
    {
        id: 1,
        name: "طماطم صنعاء",
        type: "vegetables",
        season: "summer",
        description: "طماطم حمراء طازجة من مزارع صنعاء، غنية بالفيتامينات",
        price: 1200,
        unit: "كيلو",
        image: "../assets/images/vegetables/tomatoes.jpg",
        badge: "organic",
        badgeText: "عضوي",
        origin: "صنعاء",
        popular: true,
        benefits: ["vitamins", "antioxidants"]
    },
    {
        id: 2,
        name: "خيار محلي",
        type: "vegetables",
        season: "summer",
        description: "خيار أخضر طازج، مقرمش ومنعش",
        price: 1500,
        unit: "كيلو",
        image: "../assets/images/vegetables/cucumber.jpg",
        badge: "new",
        badgeText: "جديد",
        origin: "ذمار",
        popular: true,
        benefits: ["vitamins", "fiber"]
    },
    {
        id: 3,
        name: "بصل أحمر",
        type: "vegetables",
        season: "all",
        description: "بصل أحمر محلي، نكهة قوية ومميزة",
        price: 1800,
        unit: "كيلو",
        image: "../assets/images/vegetables/onion.jpg",
        badge: "popular",
        badgeText: "مطلوب",
        origin: "صعدة",
        popular: true,
        benefits: ["antioxidants", "minerals"]
    },
    {
        id: 4,
        name: "جزر يمني",
        type: "vegetables",
        season: "winter",
        description: "جزر حلو وطازج، غني بفيتامين أ",
        price: 2000,
        unit: "كيلو",
        image: "../assets/images/vegetables/carrots.jpg",
        badge: "organic",
        badgeText: "عضوي",
        origin: "إب",
        popular: false,
        benefits: ["vitamins", "antioxidants"]
    },
    {
        id: 5,
        name: "تفاح فرنسي",
        type: "fruits",
        season: "autumn",
        description: "تفاح أحمر فرنسي، مقرمش وحلو",
        price: 3500,
        unit: "كيلو",
        image: "../assets/images/vegetables/apples.jpg",
        badge: "sale",
        badgeText: "خصم",
        origin: "فرنسا",
        popular: true,
        benefits: ["vitamins", "fiber"]
    },
    {
        id: 6,
        name: "موز حلو",
        type: "fruits",
        season: "summer",
        description: "موز أصفر ناضج، مصدر طبيعي للطاقة",
        price: 1800,
        unit: "كيلو",
        image: "../assets/images/vegetables/bananas.jpg",
        badge: null,
        badgeText: "",
        origin: "الصومال",
        popular: true,
        benefits: ["minerals", "fiber"]
    },
    {
        id: 7,
        name: "فراولة عضوية",
        type: "fruits",
        season: "spring",
        description: "فراولة حمراء عضوية، حلوة ومنعشة",
        price: 2500,
        unit: "250 جرام",
        image: "../assets/images/vegetables/strawberries.jpg",
        badge: "organic",
        badgeText: "عضوي",
        origin: "صنعاء",
        popular: true,
        benefits: ["vitamins", "antioxidants"]
    },
    {
        id: 8,
        name: "ليمون يمني",
        type: "fruits",
        season: "all",
        description: "ليمون أصفر يمني، غني بفيتامين ج",
        price: 1200,
        unit: "كيلو",
        image: "../assets/images/vegetables/lemons.jpg",
        badge: null,
        badgeText: "",
        origin: "تعز",
        popular: false,
        benefits: ["vitamins", "antioxidants"]
    },
    {
        id: 9,
        name: "بطاطس محلية",
        type: "vegetables",
        season: "all",
        description: "بطاطس محلية طازجة، مثالية للطبخ",
        price: 1400,
        unit: "كيلو",
        image: "../assets/images/vegetables/potatoes.jpg",
        badge: null,
        badgeText: "",
        origin: "صعدة",
        popular: true,
        benefits: ["minerals", "fiber"]
    },
    {
        id: 10,
        name: "خس أخضر",
        type: "vegetables",
        season: "spring",
        description: "خس أخضر طازج، مقرمش ومنعش",
        price: 1600,
        unit: "حبة",
        image: "../assets/images/vegetables/lettuce.jpg",
        badge: "organic",
        badgeText: "عضوي",
        origin: "ذمار",
        popular: false,
        benefits: ["vitamins", "fiber"]
    },
    {
        id: 11,
        name: "فلفل ألوان",
        type: "vegetables",
        season: "summer",
        description: "فلفل ملون، غني بالفيتامينات",
        price: 2200,
        unit: "كيلو",
        image: "../assets/images/vegetables/peppers.jpg",
        badge: null,
        badgeText: "",
        origin: "صنعاء",
        popular: false,
        benefits: ["vitamins", "antioxidants"]
    },
    {
        id: 12,
        name: "عنب أسود",
        type: "fruits",
        season: "summer",
        description: "عنب أسود حلو، غني بمضادات الأكسدة",
        price: 2800,
        unit: "كيلو",
        image: "../assets/images/vegetables/grapes.jpg",
        badge: "new",
        badgeText: "جديد",
        origin: "تعز",
        popular: true,
        benefits: ["antioxidants", "minerals"]
    },
    {
        id: 13,
        name: "كزبرة طازجة",
        type: "herbs",
        season: "all",
        description: "كزبرة خضراء طازجة، رائحة ونكهة مميزة",
        price: 800,
        unit: "حزمة",
        image: "../assets/images/vegetables/coriander.jpg",
        badge: null,
        badgeText: "",
        origin: "صنعاء",
        popular: false,
        benefits: ["vitamins", "antioxidants"]
    },
    {
        id: 14,
        name: "نعناع يمني",
        type: "herbs",
        season: "spring",
        description: "نعناع يمني طازج، رائحة منعشة",
        price: 700,
        unit: "حزمة",
        image: "../assets/images/vegetables/mint.jpg",
        badge: "organic",
        badgeText: "عضوي",
        origin: "إب",
        popular: true,
        benefits: ["antioxidants"]
    },
    {
        id: 15,
        name: "برتقال يمني",
        type: "fruits",
        season: "winter",
        description: "برتقال يمني حلو، غني بفيتامين ج",
        price: 1900,
        unit: "كيلو",
        image: "../assets/images/vegetables/oranges.jpg",
        badge: null,
        badgeText: "",
        origin: "تعز",
        popular: true,
        benefits: ["vitamins", "antioxidants"]
    }
];

// تحميل منتجات الخضروات والفواكه
function loadVegetablesProducts(type = 'all', season = 'all') {
    const grid = document.getElementById('productsGrid');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const noProducts = document.getElementById('noProducts');
    
    if (!grid) return;
    
    // إظهار مؤشر التحميل
    grid.innerHTML = '';
    loadingSpinner.classList.add('active');
    noProducts.style.display = 'none';
    
    // محاكاة تأخير الشبكة
    setTimeout(() => {
        loadingSpinner.classList.remove('active');
        
        // تصفية المنتجات
        let filteredProducts = vegetablesProducts;
        
        if (type !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.type === type);
        }
        
        if (season !== 'all') {
            filteredProducts = filteredProducts.filter(product => 
                product.season === season || product.season === 'all'
            );
        }
        
        // تطبيق الترتيب
        applySorting(filteredProducts);
        
        if (filteredProducts.length === 0) {
            noProducts.style.display = 'block';
            return;
        }
        
        // عرض المنتجات
        filteredProducts.forEach(product => {
            const card = createProductCard(product);
            grid.appendChild(card);
        });
        
        // إضافة مستمعين للأحداث
        addProductEventListeners();
        
    }, 500);
}

// إنشاء بطاقة المنتج
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-type', product.type);
    card.setAttribute('data-season', product.season);
    card.setAttribute('data-id', product.id);
    
    const badgeClass = getBadgeClass(product.badge);
    const badgeHTML = product.badge 
        ? `<div class="product-badge ${badgeClass}">${product.badgeText}</div>` 
        : '';
    
    card.innerHTML = `
        ${badgeHTML}
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-content">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-details">
                <div>
                    <div class="product-price">${product.price.toLocaleString()} ريال</div>
                    <div class="product-unit">${product.unit}</div>
                </div>
                <div class="product-origin">${product.origin}</div>
            </div>
            <div class="product-actions">
                <div class="quantity-selector">
                    <button class="qty-btn minus" data-id="${product.id}">-</button>
                    <input type="number" class="qty-input" value="1" min="1" max="10" data-id="${product.id}">
                    <button class="qty-btn plus" data-id="${product.id}">+</button>
                </div>
                <button class="btn-add-to-cart" data-product='${JSON.stringify(product)}'>
                    <i class="fas fa-cart-plus"></i>
                    أضف للسلة
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// الحصول على فئة البادجة
function getBadgeClass(badgeType) {
    const classes = {
        'organic': 'badge-organic',
        'new': 'badge-new',
        'sale': 'badge-sale',
        'popular': 'badge-popular'
    };
    return classes[badgeType] || '';
}

// تصفية المنتجات
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sortProducts');
    
    // تصفية حسب النوع
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشط من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // إضافة النشط للزر المحدد
            this.classList.add('active');
            
            // تحميل المنتجات حسب النوع
            const type = this.getAttribute('data-type');
            const activeSeason = document.querySelector('.seasonal-category.active');
            const season = activeSeason ? activeSeason.getAttribute('data-season') : 'all';
            
            loadVegetablesProducts(type, season);
        });
    });
    
    // الترتيب
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const activeFilter = document.querySelector('.filter-btn.active');
            const type = activeFilter ? activeFilter.getAttribute('data-type') : 'all';
            const activeSeason = document.querySelector('.seasonal-category.active');
            const season = activeSeason ? activeSeason.getAttribute('data-season') : 'all';
            
            loadVegetablesProducts(type, season);
        });
    }
}

// تطبيق الترتيب
function applySorting(products) {
    const sortSelect = document.getElementById('sortProducts');
    if (!sortSelect) return products;
    
    const sortValue = sortSelect.value;
    
    switch(sortValue) {
        case 'price-low':
            return products.sort((a, b) => a.price - b.price);
        case 'price-high':
            return products.sort((a, b) => b.price - a.price);
        case 'name':
            return products.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
        case 'popular':
            return products.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        default:
            return products;
    }
}

// الفئات الموسمية
function initSeasonalCategories() {
    const categories = document.querySelectorAll('.seasonal-category');
    
    categories.forEach(category => {
        category.addEventListener('click', function() {
            // إزالة النشط من جميع الفئات
            categories.forEach(cat => cat.classList.remove('active'));
            
            // إضافة النشط للفئة المحددة
            this.classList.add('active');
            
            // تحميل المنتجات حسب الموسم
            const season = this.getAttribute('data-season');
            const activeFilter = document.querySelector('.filter-btn.active');
            const type = activeFilter ? activeFilter.getAttribute('data-type') : 'all';
            
            loadVegetablesProducts(type, season);
        });
    });
}

// إضافة مستمعين للأحداث للمنتجات
function addProductEventListeners() {
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
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
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
                
                showNotification(`تم إضافة ${quantity} ${product.unit} من ${product.name} إلى السلة`);
            }
        });
    });
}

// فوائد المنتجات
function initBenefitsTabs() {
    const tabs = document.querySelectorAll('.benefits-tab');
    const items = document.querySelectorAll('.benefit-item');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // إزالة النشط من جميع الألسنة
            tabs.forEach(t => t.classList.remove('active'));
            
            // إضافة النشط للسان المحدد
            this.classList.add('active');
            
            // إظهار المحتوى المناسب
            const benefitType = this.getAttribute('data-benefit');
            
            items.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-benefit') === benefitType || benefitType === 'all') {
                    item.classList.add('active');
                }
            });
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

// الباقة الأسبوعية
function initWeeklyBasket() {
    const subscribeBtn = document.getElementById('subscribeBasket');
    
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function() {
            // محاكاة عملية الاشتراك
            showNotification('شكراً لاشتراكك في الباقة الأسبوعية! سنتصل بك خلال 24 ساعة لتأكيد التفاصيل.');
            
            // هنا يمكن إضافة كود الاشتراك الفعلي
            setTimeout(() => {
                showNotification('تم تأكيد اشتراكك في الباقة الأسبوعية. ستستلم أول باقة غداً.');
            }, 2000);
        });
    }
}

// العروض الخاصة
function initSpecialOffers() {
    const specialButtons = document.querySelectorAll('.btn-special');
    
    specialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.special-card');
            const productName = card.querySelector('h3').textContent;
            
            // محاكاة إضافة الطلب
            showNotification(`تم إضافة طلب ${productName} إلى سلة الطلبات الخاصة. سنتصل بك خلال ساعة للتأكيد.`);
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
        background: #2e7d32;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(46, 125, 50, 0.3);
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