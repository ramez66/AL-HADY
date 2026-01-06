// تهيئة صفحة المخبوزات الطازجة
document.addEventListener('DOMContentLoaded', function() {
    initBakeryPage();
    initTypeCards();
    initFilterButtons();
    initSortSelect();
    initOfferTimer();
    initPreOrderForm();
    initFAQ();
    initHotDelivery();
    loadBakeryProducts();
});

// تهيئة الصفحة
function initBakeryPage() {
    // تحديث عدد العناصر في السلة
    if (typeof cart !== 'undefined') {
        cart.updateCartCount();
    }
    
    // إضافة أنماط للإشعارات إذا لم تكن موجودة
    addNotificationStyles();
    
    // ضبط تاريخ الحد الأدنى للنموذج
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        dateInput.min = today;
        dateInput.value = today;
    }
}

// منتجات المخبوزات
const bakeryProducts = [
    {
        id: 1,
        name: "خبز عربي طازج",
        type: "bread",
        description: "خبز عربي رقيق وطري، مخبوز على الحجر",
        price: 1000,
        oldPrice: null,
        weight: "رغيف",
        image: "../assets/images/bakery/arabic-bread.jpg",
        badge: "hot",
        badgeText: "ساخن",
        freshness: "مخبوز منذ 30 دقيقة",
        popular: true,
        stock: 50
    },
    {
        id: 2,
        name: "خبز توست أبيض",
        type: "bread",
        description: "خبز توست أبيض طري، مثالي للإفطار",
        price: 2500,
        oldPrice: null,
        weight: "عبوة 500 جم",
        image: "../assets/images/bakery/toast-bread.jpg",
        badge: "fresh",
        badgeText: "طازج",
        freshness: "مخبوز منذ ساعة",
        popular: true,
        stock: 30
    },
    {
        id: 3,
        name: "كرواسان بالشوكولاتة",
        type: "pastry",
        description: "كرواسان فرنسي محشو بالشوكولاتة الذائبة",
        price: 1500,
        oldPrice: 1800,
        weight: "حبة",
        image: "../assets/images/bakery/croissant.jpg",
        badge: "special",
        badgeText: "خاص",
        freshness: "مخبوز منذ 45 دقيقة",
        popular: true,
        stock: 25
    },
    {
        id: 4,
        name: "دونات محلى",
        type: "sweets",
        description: "دونات طري محلى بالسكر والملونات",
        price: 1200,
        oldPrice: null,
        weight: "حبة",
        image: "../assets/images/bakery/donut.jpg",
        badge: "new",
        badgeText: "جديد",
        freshness: "مخبوز منذ ساعة",
        popular: false,
        stock: 40
    },
    {
        id: 5,
        name: "كيك الشوكولاتة",
        type: "cakes",
        description: "كيك شوكولاتة غني، مغطى بصلصة الشوكولاتة",
        price: 8000,
        oldPrice: 10000,
        weight: "كيك صغير",
        image: "../assets/images/bakery/chocolate-cake.jpg",
        badge: "fresh",
        badgeText: "طازج",
        freshness: "مخبوز منذ ساعتين",
        popular: true,
        stock: 10
    },
    {
        id: 6,
        name: "باجيت فرنسي",
        type: "bread",
        description: "خبز باجيت فرنسي طويل، مقرمش من الخارج وطري من الداخل",
        price: 2000,
        oldPrice: null,
        weight: "رغيف",
        image: "../assets/images/bakery/baguette.jpg",
        badge: "hot",
        badgeText: "ساخن",
        freshness: "مخبوز منذ 15 دقيقة",
        popular: true,
        stock: 20
    },
    {
        id: 7,
        name: "معمول بالتمر",
        type: "cakes",
        description: "معمول تقليدي محشو بالتمر والهيل",
        price: 3000,
        oldPrice: null,
        weight: "6 قطع",
        image: "../assets/images/bakery/maamoul.jpg",
        badge: "special",
        badgeText: "خاص",
        freshness: "مخبوز منذ 3 ساعات",
        popular: true,
        stock: 35
    },
    {
        id: 8,
        name: "فطيرة التفاح",
        type: "sweets",
        description: "فطيرة تفاح مع قشرة مقرمشة، محلاة بالقرفة",
        price: 4500,
        oldPrice: 5000,
        weight: "فطيرة متوسطة",
        image: "../assets/images/bakery/apple-pie.jpg",
        badge: "fresh",
        badgeText: "طازج",
        freshness: "مخبوز منذ ساعتين",
        popular: false,
        stock: 15
    },
    {
        id: 9,
        name: "خبز القمح الكامل",
        type: "bread",
        description: "خبز صحي من القمح الكامل، غني بالألياف",
        price: 3000,
        oldPrice: null,
        weight: "رغيف",
        image: "../assets/images/bakery/whole-wheat.jpg",
        badge: "fresh",
        badgeText: "طازج",
        freshness: "مخبوز منذ ساعة",
        popular: true,
        stock: 25
    },
    {
        id: 10,
        name: "ساندويتش رول",
        type: "special",
        description: "رول طري للساندويتش، مثالي للحفلات",
        price: 4000,
        oldPrice: null,
        weight: "8 قطع",
        image: "../assets/images/bakery/sandwich-roll.jpg",
        badge: "new",
        badgeText: "جديد",
        freshness: "مخبوز منذ 45 دقيقة",
        popular: true,
        stock: 20
    },
    {
        id: 11,
        name: "كيك الجبن",
        type: "cakes",
        description: "كيك جبن كريمي، مع طبقة من الفراولة",
        price: 12000,
        oldPrice: 15000,
        weight: "كيك كبير",
        image: "../assets/images/bakery/cheesecake.jpg",
        badge: "special",
        badgeText: "خاص",
        freshness: "مخبوز منذ 4 ساعات",
        popular: true,
        stock: 8
    },
    {
        id: 12,
        name: "بسكويت الزبدة",
        type: "sweets",
        description: "بسكويت زبدة مقرمش، مثالي مع الشاي",
        price: 2500,
        oldPrice: null,
        weight: "علبة 200 جم",
        image: "../assets/images/bakery/butter-cookies.jpg",
        badge: "fresh",
        badgeText: "طازج",
        freshness: "مخبوز منذ ساعتين",
        popular: false,
        stock: 30
    }
];

// تحميل منتجات المخبوزات
function loadBakeryProducts(type = 'all', filter = 'all', sort = 'default') {
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
        
        // تصفية المنتجات حسب النوع
        let filteredProducts = bakeryProducts;
        
        if (type !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.type === type);
        }
        
        // تطبيق الفلاتر الإضافية
        if (filter !== 'all') {
            switch(filter) {
                case 'fresh':
                    filteredProducts = filteredProducts.filter(p => p.freshness.includes('دقيقة') || p.freshness.includes('ساعة'));
                    break;
                case 'popular':
                    filteredProducts = filteredProducts.filter(p => p.popular);
                    break;
                case 'discount':
                    filteredProducts = filteredProducts.filter(p => p.oldPrice !== null);
                    break;
                case 'new':
                    filteredProducts = filteredProducts.filter(p => p.badge === 'new');
                    break;
            }
        }
        
        // تطبيق الترتيب
        filteredProducts = sortBakeryProducts(filteredProducts, sort);
        
        if (filteredProducts.length === 0) {
            noProducts.style.display = 'block';
            return;
        }
        
        // عرض المنتجات
        filteredProducts.forEach(product => {
            const card = createBakeryProductCard(product);
            grid.appendChild(card);
        });
        
        // إضافة مستمعين للأحداث
        addBakeryEventListeners();
        
    }, 500);
}

// إنشاء بطاقة منتج مخبوزات
function createBakeryProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-type', product.type);
    card.setAttribute('data-id', product.id);
    
    const badgeClass = getBakeryBadgeClass(product.badge);
    const badgeHTML = product.badge 
        ? `<div class="product-badge ${badgeClass}">${product.badgeText}</div>` 
        : '';
    
    const priceHTML = product.oldPrice 
        ? `<div class="current-price">${product.price.toLocaleString()} ريال</div>
           <div class="old-price">${product.oldPrice.toLocaleString()} ريال</div>`
        : `<div class="current-price">${product.price.toLocaleString()} ريال</div>`;
    
    card.innerHTML = `
        ${badgeHTML}
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-content">
            <div class="product-header">
                <div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-type">${getTypeName(product.type)}</div>
                </div>
                <div class="product-freshness">
                    <i class="fas fa-clock"></i>
                    <span>${product.freshness}</span>
                </div>
            </div>
            <p class="product-description">${product.description}</p>
            <div class="product-details">
                <div class="product-weight">${product.weight}</div>
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
    
    return card;
}

// الحصول على اسم النوع
function getTypeName(type) {
    const types = {
        'bread': 'خبز',
        'pastry': 'معجنات',
        'sweets': 'حلويات',
        'cakes': 'كيك ومعمول',
        'special': 'خاص'
    };
    return types[type] || type;
}

// الحصول على فئة البادجة للمخبوزات
function getBakeryBadgeClass(badgeType) {
    const classes = {
        'fresh': 'badge-fresh',
        'hot': 'badge-hot',
        'new': 'badge-new',
        'special': 'badge-special'
    };
    return classes[badgeType] || '';
}

// بطاقات الأنواع
function initTypeCards() {
    const typeCards = document.querySelectorAll('.type-card');
    
    typeCards.forEach(card => {
        card.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            
            // تحديث الأزرار
            typeCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // تحديث الفلاتر
            const activeFilter = document.querySelector('.filter-btn.active');
            const filter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
            const sortSelect = document.getElementById('sortBakery');
            const sort = sortSelect ? sortSelect.value : 'default';
            
            loadBakeryProducts(type, filter, sort);
        });
    });
}

// أزرار الفلاتر
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // تحديث الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // تحديث الأنواع
            const activeType = document.querySelector('.type-card.active');
            const type = activeType ? activeType.getAttribute('data-type') : 'all';
            const sortSelect = document.getElementById('sortBakery');
            const sort = sortSelect ? sortSelect.value : 'default';
            
            loadBakeryProducts(type, filter, sort);
        });
    });
}

// ترتيب المنتجات
function initSortSelect() {
    const sortSelect = document.getElementById('sortBakery');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sort = this.value;
            const activeType = document.querySelector('.type-card.active');
            const type = activeType ? activeType.getAttribute('data-type') : 'all';
            const activeFilter = document.querySelector('.filter-btn.active');
            const filter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
            
            loadBakeryProducts(type, filter, sort);
        });
    }
}

// ترتيب المنتجات حسب المعيار
function sortBakeryProducts(products, sort) {
    switch(sort) {
        case 'price-low':
            return products.sort((a, b) => a.price - b.price);
        case 'price-high':
            return products.sort((a, b) => b.price - a.price);
        case 'name':
            return products.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
        case 'freshness':
            return products.sort((a, b) => {
                const aTime = getFreshnessMinutes(a.freshness);
                const bTime = getFreshnessMinutes(b.freshness);
                return aTime - bTime;
            });
        default:
            // الترتيب الافتراضي: الأكثر طزاجة أولاً
            return products.sort((a, b) => {
                const aTime = getFreshnessMinutes(a.freshness);
                const bTime = getFreshnessMinutes(b.freshness);
                return aTime - bTime;
            });
    }
}

// تحليل وقت الطزاجة إلى دقائق
function getFreshnessMinutes(freshness) {
    if (freshness.includes('دقيقة')) {
        return parseInt(freshness.match(/\d+/)[0]);
    } else if (freshness.includes('ساعة')) {
        const hours = parseInt(freshness.match(/\d+/)[0]);
        return hours * 60;
    } else if (freshness.includes('ساعات')) {
        const hours = parseInt(freshness.match(/\d+/)[0]);
        return hours * 60;
    }
    return 1000; // قيمة كبيرة للمنتجات القديمة
}

// عداد العرض الترويجي
function initOfferTimer() {
    const timerElement = document.getElementById('offerTimer');
    if (!timerElement) return;
    
    let timeLeft = 4 * 3600 + 32 * 60 + 15; // 4 ساعات، 32 دقيقة، 15 ثانية
    
    function updateTimer() {
        if (timeLeft <= 0) {
            timerElement.textContent = "انتهى العرض";
            return;
        }
        
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        timerElement.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        timeLeft--;
    }
    
    // تحديث العداد كل ثانية
    updateTimer();
    setInterval(updateTimer, 1000);
    
    // أزرار العروض
    const offerButtons = document.querySelectorAll('.btn-offer');
    
    offerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.offer-card');
            const offerTitle = card.querySelector('h3').textContent;
            
            showNotification(`تم اختيار ${offerTitle}. سيتم إضافته إلى سلة الطلبات الخاصة.`);
        });
    });
}

// نموذج الطلب المسبق
function initPreOrderForm() {
    const preOrderForm = document.getElementById('preOrderForm');
    
    if (preOrderForm) {
        preOrderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // محاكاة إرسال الطلب
            showNotification('تم إرسال طلبك المسبق بنجاح! سنتواصل معك خلال 24 ساعة لتأكيد التفاصيل.');
            
            // إعادة تعيين النموذج
            this.reset();
            
            // ضبط التاريخ لليوم
            const today = new Date().toISOString().split('T')[0];
            const dateInput = this.querySelector('input[type="date"]');
            if (dateInput) {
                dateInput.min = today;
                dateInput.value = today;
            }
        });
    }
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

// التوصيل الساخن
function initHotDelivery() {
    const hotDeliveryBtn = document.getElementById('orderHot');
    
    if (hotDeliveryBtn) {
        hotDeliveryBtn.addEventListener('click', function() {
            // محاكاة طلب التوصيل الساخن
            showNotification('تم طلب التوصيل الساخن للمخبوزات! سيتصل بك مندوبنا خلال 5 دقائق لتأكيد الطلب.');
            
            // هنا يمكن إضافة كود الطلب الفعلي
            setTimeout(() => {
                showNotification('مندوب التوصيل في الطريق! رقم الطلب: #BAK2026-001');
            }, 2000);
        });
    }
}

// إضافة مستمعين للأحداث للمنتجات
function addBakeryEventListeners() {
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
                
                showNotification(`تم إضافة ${quantity} ${product.weight} من ${product.name} إلى السلة`);
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
        background: #d4a574;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(212, 165, 116, 0.3);
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