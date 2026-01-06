// تهيئة صفحة المواد التموينية
document.addEventListener('DOMContentLoaded', function() {
    initGroceriesPage();
    initSearchFilter();
    initSubcategoryLinks();
    initOffersSlider();
    initPackageSelection();
    initFAQ();
    initWholesaleForm();
    initLoadMore();
});

// تهيئة الصفحة
function initGroceriesPage() {
    // تحميل منتجات المواد التموينية
    loadGroceriesProducts();
    
    // تحديث عدد العناصر في السلة
    if (typeof cart !== 'undefined') {
        cart.updateCartCount();
    }
    
    // إضافة أنماط للإشعارات إذا لم تكن موجودة
    addNotificationStyles();
}

// منتجات المواد التموينية
const groceriesProducts = [
    {
        id: 1,
        name: "أرز بسمتي هندي",
        category: "rice",
        brand: "رافان",
        description: "أرز بسمتي هندي طويل الحبة، أعلى جودة",
        price: 25000,
        oldPrice: 28000,
        weight: "5 كجم",
        image: "../assets/images/groceries/rice-basmati.jpg",
        badge: "offer",
        badgeText: "خصم",
        origin: "الهند",
        popular: true,
        stock: 50
    },
    {
        id: 2,
        name: "زيت زيتون بكر ممتاز",
        category: "oil",
        brand: "زيتون",
        description: "زيت زيتون بكر ممتاز، إسباني المنشأ",
        price: 20000,
        oldPrice: null,
        weight: "2 لتر",
        image: "../assets/images/groceries/olive-oil.jpg",
        badge: "bestseller",
        badgeText: "الأكثر مبيعاً",
        origin: "إسبانيا",
        popular: true,
        stock: 30
    },
    {
        id: 3,
        name: "سكر أبيض ناعم",
        category: "sugar",
        brand: "سكر",
        description: "سكر أبيض ناعم، مثالي للشاي والحلويات",
        price: 15000,
        oldPrice: null,
        weight: "5 كجم",
        image: "../assets/images/groceries/sugar.jpg",
        badge: null,
        badgeText: "",
        origin: "السعودية",
        popular: true,
        stock: 100
    },
    {
        id: 4,
        name: "دقيق أبيض فاخر",
        category: "flour",
        brand: "الدقيق",
        description: "دقيق أبيض فاخر، مناسب لجميع المخبوزات",
        price: 12000,
        oldPrice: null,
        weight: "5 كجم",
        image: "../assets/images/groceries/flour.jpg",
        badge: null,
        badgeText: "",
        origin: "اليمن",
        popular: false,
        stock: 80
    },
    {
        id: 5,
        name: "معجون طماطم",
        category: "canned",
        brand: "مرة واحدة",
        description: "معجون طماطم مركز، عبوة 400 جرام",
        price: 3500,
        oldPrice: 4000,
        weight: "400 جرام",
        image: "../assets/images/groceries/tomato-paste.jpg",
        badge: "offer",
        badgeText: "عرض",
        origin: "مصر",
        popular: true,
        stock: 200
    },
    {
        id: 6,
        name: "مكرونة سباغيتي",
        category: "pasta",
        brand: "مكرونة",
        description: "مكرونة سباغيتي إيطالية، عبوة 500 جرام",
        price: 4500,
        oldPrice: null,
        weight: "500 جرام",
        image: "../assets/images/groceries/spaghetti.jpg",
        badge: "new",
        badgeText: "جديد",
        origin: "إيطاليا",
        popular: true,
        stock: 150
    },
    {
        id: 7,
        name: "شاي سيلاني",
        category: "sugar",
        brand: "الشاي",
        description: "شاي سيلاني أحمر، كيس 250 جرام",
        price: 8000,
        oldPrice: null,
        weight: "250 جرام",
        image: "../assets/images/groceries/tea.jpg",
        badge: null,
        badgeText: "",
        origin: "سريلانكا",
        popular: true,
        stock: 120
    },
    {
        id: 8,
        name: "قهوة تركية",
        category: "sugar",
        brand: "قهوة",
        description: "قهوة تركية محمصة، عبوة 500 جرام",
        price: 12000,
        oldPrice: null,
        weight: "500 جرام",
        image: "../assets/images/groceries/coffee.jpg",
        badge: "bestseller",
        badgeText: "مطلوب",
        origin: "اليمن",
        popular: true,
        stock: 90
    },
    {
        id: 9,
        name: "زيت نباتي",
        category: "oil",
        brand: "الزيت",
        description: "زيت نباتي للقلي والخبز، 5 لتر",
        price: 18000,
        oldPrice: null,
        weight: "5 لتر",
        image: "../assets/images/groceries/vegetable-oil.jpg",
        badge: null,
        badgeText: "",
        origin: "الإمارات",
        popular: false,
        stock: 60
    },
    {
        id: 10,
        name: "عدس أصفر",
        category: "spices",
        brand: "العدس",
        description: "عدس أصفر ناعم، عبوة 1 كجم",
        price: 6000,
        oldPrice: null,
        weight: "1 كجم",
        image: "../assets/images/groceries/lentils.jpg",
        badge: null,
        badgeText: "",
        origin: "تركيا",
        popular: false,
        stock: 110
    },
    {
        id: 11,
        name: "فاصوليا بيضاء",
        category: "spices",
        brand: "الفاصوليا",
        description: "فاصوليا بيضاء، عبوة 1 كجم",
        price: 5500,
        oldPrice: null,
        weight: "1 كجم",
        image: "../assets/images/groceries/beans.jpg",
        badge: null,
        badgeText: "",
        origin: "مصر",
        popular: false,
        stock: 85
    },
    {
        id: 12,
        name: "بهارات مشكلة",
        category: "spices",
        brand: "البهارات",
        description: "خلطة بهارات مميزة، علبة 200 جرام",
        price: 4500,
        oldPrice: null,
        weight: "200 جرام",
        image: "../assets/images/groceries/spices.jpg",
        badge: "new",
        badgeText: "جديد",
        origin: "الهند",
        popular: true,
        stock: 95
    }
];

// تحميل منتجات المواد التموينية
function loadGroceriesProducts(category = 'all', brand = 'all', search = '') {
    const grid = document.getElementById('productsGrid');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const noProducts = document.getElementById('noProducts');
    const productsCount = document.getElementById('productsCount');
    
    if (!grid) return;
    
    // إظهار مؤشر التحميل
    grid.innerHTML = '';
    loadingSpinner.classList.add('active');
    noProducts.style.display = 'none';
    
    // محاكاة تأخير الشبكة
    setTimeout(() => {
        loadingSpinner.classList.remove('active');
        
        // تصفية المنتجات
        let filteredProducts = groceriesProducts;
        
        // التصفية حسب القسم
        if (category !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === category);
        }
        
        // التصفية حسب الماركة
        if (brand !== 'all') {
            // هذا مثال مبسط، يمكن توسيعه حسب احتياجاتك
            filteredProducts = filteredProducts.filter(product => {
                if (brand === 'local') return product.origin === 'اليمن';
                if (brand === 'saudi') return product.origin === 'السعودية';
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
        
        // تطبيق الترتيب
        applyGroceriesSorting(filteredProducts);
        
        // تحديث العداد
        if (productsCount) {
            productsCount.textContent = filteredProducts.length;
        }
        
        if (filteredProducts.length === 0) {
            noProducts.style.display = 'block';
            return;
        }
        
        // عرض المنتجات (الحد الأولي 6 منتجات)
        const initialProducts = filteredProducts.slice(0, 6);
        currentDisplayed = initialProducts;
        remainingProducts = filteredProducts.slice(6);
        
        initialProducts.forEach(product => {
            const card = createGroceriesProductCard(product);
            grid.appendChild(card);
        });
        
        // تحديث زر تحميل المزيد
        updateLoadMoreButton();
        
        // إضافة مستمعين للأحداث
        addGroceriesEventListeners();
        
    }, 500);
}

// إنشاء بطاقة منتج تمويني
function createGroceriesProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    card.setAttribute('data-id', product.id);
    
    const badgeClass = getGroceriesBadgeClass(product.badge);
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
            <h3 class="product-title">${product.name}</h3>
            <div class="product-brand">${product.brand}</div>
            <p class="product-description">${product.description}</p>
            <div class="product-details">
                <div class="product-price">
                    ${priceHTML}
                </div>
                <div class="product-weight">${product.weight}</div>
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

// الحصول على فئة البادجة للمواد التموينية
function getGroceriesBadgeClass(badgeType) {
    const classes = {
        'offer': 'badge-offer',
        'new': 'badge-new',
        'bestseller': 'badge-bestseller'
    };
    return classes[badgeType] || '';
}

// البحث والتصفية
function initSearchFilter() {
    const searchInput = document.getElementById('searchGroceries');
    const searchBtn = document.querySelector('.search-btn');
    const categoryFilter = document.getElementById('categoryFilter');
    const brandFilter = document.getElementById('brandFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    // البحث
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // التصفية
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (brandFilter) {
        brandFilter.addEventListener('change', applyFilters);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchGroceries');
    const categoryFilter = document.getElementById('categoryFilter');
    const brandFilter = document.getElementById('brandFilter');
    
    const searchTerm = searchInput ? searchInput.value : '';
    const category = categoryFilter ? categoryFilter.value : 'all';
    const brand = brandFilter ? brandFilter.value : 'all';
    
    loadGroceriesProducts(category, brand, searchTerm);
}

function applyFilters() {
    const searchInput = document.getElementById('searchGroceries');
    const categoryFilter = document.getElementById('categoryFilter');
    const brandFilter = document.getElementById('brandFilter');
    
    const searchTerm = searchInput ? searchInput.value : '';
    const category = categoryFilter ? categoryFilter.value : 'all';
    const brand = brandFilter ? brandFilter.value : 'all';
    
    loadGroceriesProducts(category, brand, searchTerm);
}

// تطبيق الترتيب على المنتجات
function applyGroceriesSorting(products) {
    const sortFilter = document.getElementById('sortFilter');
    if (!sortFilter) return products;
    
    const sortValue = sortFilter.value;
    
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

// روابط الأقسام الفرعية
function initSubcategoryLinks() {
    const subcategoryCards = document.querySelectorAll('.subcategory-card');
    
    subcategoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const category = href.replace('#', '');
            
            // تحديث فلتر القسم
            const categoryFilter = document.getElementById('categoryFilter');
            if (categoryFilter) {
                categoryFilter.value = category;
                applyFilters();
            }
            
            // التمرير إلى الأعلى
            window.scrollTo({
                top: document.querySelector('.search-filter-section').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
}

// متغيرات للعروض المتحركة
let currentSlide = 0;
const slidesPerView = 3;

// العروض الأسبوعية
const weeklyOffers = [
    {
        id: 1,
        name: "أرز بسمتي هندي",
        description: "خصم 15% على أرز بسمتي هندي 5 كجم",
        originalPrice: 28000,
        discountedPrice: 23800,
        discount: "15%",
        image: "../assets/images/groceries/offer-rice.jpg"
    },
    {
        id: 2,
        name: "زيت زيتون إسباني",
        description: "اشتري 2 لتر واحصل على لتر مجاناً",
        originalPrice: 30000,
        discountedPrice: 20000,
        discount: "33%",
        image: "../assets/images/groceries/offer-olive-oil.jpg"
    },
    {
        id: 3,
        name: "سكر أبيض ناعم",
        description: "خصم 20% على سكر 5 كجم",
        originalPrice: 18000,
        discountedPrice: 14400,
        discount: "20%",
        image: "../assets/images/groceries/offer-sugar.jpg"
    },
    {
        id: 4,
        name: "معجون طماطم",
        description: "اشتري 3 علب واحصل على علبة مجاناً",
        originalPrice: 16000,
        discountedPrice: 12000,
        discount: "25%",
        image: "../assets/images/groceries/offer-tomato-paste.jpg"
    },
    {
        id: 5,
        name: "قهوة تركية",
        description: "خصم 10% على قهوة تركية 500 جرام",
        originalPrice: 13000,
        discountedPrice: 11700,
        discount: "10%",
        image: "../assets/images/groceries/offer-coffee.jpg"
    }
];

// تهيئة سلايدر العروض
function initOffersSlider() {
    const sliderContainer = document.getElementById('offersSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!sliderContainer) return;
    
    // إنشاء الشرائح
    weeklyOffers.forEach(offer => {
        const slide = document.createElement('div');
        slide.className = 'offer-slide';
        slide.innerHTML = `
            <img src="${offer.image}" alt="${offer.name}">
            <div class="offer-content">
                <h3>${offer.name}</h3>
                <p>${offer.description}</p>
                <div class="offer-price">
                    <span class="discount-badge">خصم ${offer.discount}</span>
                    <div>
                        <span class="original-price">${offer.originalPrice.toLocaleString()} ريال</span>
                        <span class="discounted-price">${offer.discountedPrice.toLocaleString()} ريال</span>
                    </div>
                </div>
                <button class="btn-add-cart" data-offer='${JSON.stringify(offer)}'>
                    <i class="fas fa-cart-plus"></i>
                    أضف للسلة
                </button>
            </div>
        `;
        sliderContainer.appendChild(slide);
    });
    
    // أزرار التنقل
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSliderPosition();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentSlide < weeklyOffers.length - slidesPerView) {
                currentSlide++;
                updateSliderPosition();
            }
        });
    }
    
    // تحديث موضع السلايدر
    function updateSliderPosition() {
        const slideWidth = 100 / slidesPerView;
        const translateX = -currentSlide * slideWidth;
        sliderContainer.style.transform = `translateX(${translateX}%)`;
    }
    
    // إضافة مستمعين لأزرار إضافة العروض
    sliderContainer.addEventListener('click', function(e) {
        if (e.target.closest('.btn-add-cart')) {
            const button = e.target.closest('.btn-add-cart');
            const offerData = button.getAttribute('data-offer');
            if (offerData) {
                const offer = JSON.parse(offerData);
                const product = groceriesProducts.find(p => p.name.includes(offer.name.split(' ')[0]));
                if (product) {
                    addToCart({
                        ...product,
                        price: offer.discountedPrice
                    });
                    showNotification(`تم إضافة عرض ${offer.name} إلى السلة`);
                }
            }
        }
    });
}

// اختيار الباقات
function initPackageSelection() {
    const packageButtons = document.querySelectorAll('.btn-package');
    
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageType = this.getAttribute('data-package');
            showPackageModal(packageType);
        });
    });
}

function showPackageModal(packageType) {
    // محاكاة عرض نافذة اختيار الباقة
    showNotification(`تم اختيار الباقة ${getPackageName(packageType)}. سنتصل بك خلال 24 ساعة لتأكيد التفاصيل.`);
}

function getPackageName(packageType) {
    const packages = {
        'basic': 'الأساسية',
        'premium': 'المميزة',
        'deluxe': 'الفاخرة'
    };
    return packages[packageType] || packageType;
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

// نموذج طلب الجملة
function initWholesaleForm() {
    const wholesaleForm = document.getElementById('wholesaleForm');
    const wholesaleBtn = document.getElementById('wholesaleBtn');
    
    if (wholesaleBtn) {
        wholesaleBtn.addEventListener('click', function() {
            window.scrollTo({
                top: document.querySelector('.wholesale-form').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    }
    
    if (wholesaleForm) {
        wholesaleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // محاكاة إرسال النموذج
            showNotification('شكراً لتقديم طلب عرض السعر للجملة! سنتواصل معك خلال 48 ساعة.');
            
            // إعادة تعيين النموذج
            this.reset();
        });
    }
}

// متغيرات لتحميل المزيد
let currentDisplayed = [];
let remainingProducts = [];

// تحميل المزيد من المنتجات
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.btn-load-more');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            if (remainingProducts.length === 0) {
                showNotification('لا توجد منتجات إضافية للعرض');
                return;
            }
            
            const nextProducts = remainingProducts.slice(0, 6);
            const grid = document.getElementById('productsGrid');
            
            nextProducts.forEach(product => {
                const card = createGroceriesProductCard(product);
                grid.appendChild(card);
            });
            
            currentDisplayed = [...currentDisplayed, ...nextProducts];
            remainingProducts = remainingProducts.slice(6);
            
            // تحديث أزرار التحكم
            addGroceriesEventListeners();
            
            // تحديث زر تحميل المزيد
            updateLoadMoreButton();
            
            // إشعار بصري
            this.innerHTML = '<i class="fas fa-check"></i> تم التحميل';
            this.style.background = '#43A047';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-sync-alt"></i> تحميل المزيد';
                this.style.background = '';
            }, 2000);
        });
    }
}

function updateLoadMoreButton() {
    const loadMoreBtn = document.querySelector('.btn-load-more');
    if (loadMoreBtn) {
        if (remainingProducts.length === 0) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }
}

// إضافة مستمعين للأحداث للمنتجات
function addGroceriesEventListeners() {
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
        if (!button.hasAttribute('data-offer')) {
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
        }
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
        background: #8B4513;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(139, 69, 19, 0.3);
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