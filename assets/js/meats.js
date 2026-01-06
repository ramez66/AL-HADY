// تهيئة صفحة اللحوم
document.addEventListener('DOMContentLoaded', function() {
    initMeatsPage();
    initMeatsFilter();
    initMeatFAQs();
    initQuickOrder();
    initMeatsTable();
});

// تهيئة الصفحة
function initMeatsPage() {
    // تحميل منتجات اللحوم
    loadMeatsProducts();
    
    // تحديث عدد العناصر في السلة
    if (typeof cart !== 'undefined') {
        cart.updateCartCount();
    }
}

// منتجات اللحوم
const meatsProducts = [
    {
        id: 1,
        name: "لحم بقري مشوي",
        type: "beef",
        description: "قطع لحم بقري مخصصة للشوي، طازجة وذبيحة يومية",
        price: 38000,
        unit: "كيلو",
        image: "../assets/images/meats/beef-steak.jpg",
        badge: "الأكثر مبيعاً",
        available: true,
        cutting: ["عادي", "للشوي", "فرم"]
    },
    {
        id: 2,
        name: "لحم ضأن أسترالي",
        type: "lamb",
        description: "لحم ضأن أسترالي مستورد، طري وذو نكهة مميزة",
        price: 45000,
        unit: "كيلو",
        image: "../assets/images/meats/lamb.jpg",
        badge: "مستورد",
        available: true,
        cutting: ["عادي", "قطع صغيرة", "مكعبات"]
    },
    {
        id: 3,
        name: "دجاج طازج كامل",
        type: "chicken",
        description: "دجاج طازج نظيف، مذبوح حسب الشريعة الإسلامية",
        price: 18000,
        unit: "كيلو",
        image: "../assets/images/meats/chicken.jpg",
        badge: "طازج",
        available: true,
        cutting: ["كامل", "قطع", "شرائح"]
    },
    {
        id: 4,
        name: "لحم مفروم ناعم",
        type: "beef",
        description: "لحم بقري مفروم ناعم، مناسب للبرغر والكفتة",
        price: 35000,
        unit: "كيلو",
        image: "../assets/images/meats/minced-beef.jpg",
        badge: "جاهز",
        available: true,
        cutting: []
    },
    {
        id: 5,
        name: "سمك ناجل طازج",
        type: "fish",
        description: "سمك ناجل طازج من البحر الأحمر، نظيف ومجهز",
        price: 25000,
        unit: "كيلو",
        image: "../assets/images/meats/fish.jpg",
        badge: "من البحر",
        available: false,
        cutting: ["كامل", "شرائح", "مكعبات"]
    },
    {
        id: 6,
        name: "سجق حلال",
        type: "processed",
        description: "سجق حلال مصنع من أجود اللحوم، معتمد من الجهات الإسلامية",
        price: 28000,
        unit: "كيلو",
        image: "../assets/images/meats/sausage.jpg",
        badge: "حلال",
        available: true,
        cutting: []
    },
    {
        id: 7,
        name: "لحم عجل كندي",
        type: "beef",
        description: "لحم عجل كندي مستورد، معتق لفترة مناسبة",
        price: 52000,
        unit: "كيلو",
        image: "../assets/images/meats/veal.jpg",
        badge: "ممتاز",
        available: true,
        cutting: ["عادي", "للشوي", "قطع ستيك"]
    },
    {
        id: 8,
        name: "كبد دجاج طازج",
        type: "chicken",
        description: "كبد دجاج طازج، نظيف ومغسل وجاهز للطبخ",
        price: 12000,
        unit: "كيلو",
        image: "../assets/images/meats/chicken-liver.jpg",
        badge: "صحي",
        available: true,
        cutting: []
    }
];

// تحميل منتجات اللحوم
function loadMeatsProducts(filter = 'all') {
    const grid = document.getElementById('meatsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? meatsProducts 
        : meatsProducts.filter(product => product.type === filter);
    
    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'meat-card';
        card.setAttribute('data-type', product.type);
        
        const badgeHTML = product.badge 
            ? `<div class="meat-badge">${product.badge}</div>` 
            : '';
        
        const availableHTML = product.available 
            ? `<span class="status-available">● متوفر</span>` 
            : `<span style="color: #f44336">● غير متوفر</span>`;
        
        card.innerHTML = `
            ${badgeHTML}
            <img src="${product.image}" alt="${product.name}" class="meat-image">
            <div class="meat-info">
                <h3>${product.name}</h3>
                <p class="description">${product.description}</p>
                <div class="meat-details">
                    <div>
                        <div class="meat-price">${product.price.toLocaleString()} ريال</div>
                        <div class="meat-unit">لكل ${product.unit}</div>
                    </div>
                    <div>${availableHTML}</div>
                </div>
                <div class="meat-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-id="${product.id}">-</button>
                        <input type="number" class="quantity-input" value="1" min="1" max="10" data-id="${product.id}">
                        <button class="quantity-btn plus" data-id="${product.id}">+</button>
                    </div>
                    <button class="add-to-cart-meat" data-product='${JSON.stringify(product)}' ${!product.available ? 'disabled' : ''}>
                        ${product.available ? 'أضف إلى السلة' : 'غير متوفر'}
                    </button>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    // إضافة مستمعين للأزرار
    addMeatEventListeners();
}

// تصفية منتجات اللحوم
function initMeatsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشط من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // إضافة النشط للزر المحدد
            this.classList.add('active');
            
            // تحميل المنتجات حسب النوع
            const type = this.getAttribute('data-type');
            loadMeatsProducts(type);
        });
    });
}

// إضافة مستمعين لأزرار منتجات اللحوم
function addMeatEventListeners() {
    // أزرار زيادة وتقليل الكمية
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const input = document.querySelector(`.quantity-input[data-id="${id}"]`);
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
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) this.value = 1;
            if (value > 10) this.value = 10;
        });
    });
    
    // إضافة إلى السلة
    document.querySelectorAll('.add-to-cart-meat').forEach(button => {
        button.addEventListener('click', function() {
            if (this.disabled) return;
            
            const productData = this.getAttribute('data-product');
            if (productData) {
                const product = JSON.parse(productData);
                const id = product.id;
                const quantityInput = document.querySelector(`.quantity-input[data-id="${id}"]`);
                const quantity = parseInt(quantityInput.value);
                
                // إضافة الكمية المطلوبة
                for (let i = 0; i < quantity; i++) {
                    addToCart(product);
                }
                
                showNotification(`تم إضافة ${quantity} كيلو من ${product.name} إلى السلة`);
            }
        });
    });
}

// الأسئلة الشائعة للحوم
function initMeatFAQs() {
    document.querySelectorAll('.meat-faq .faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const isActive = item.classList.contains('active');
            
            // إغلاق جميع العناصر
            document.querySelectorAll('.meat-faq .faq-item').forEach(faq => {
                faq.classList.remove('active');
            });
            
            // فتح العنصر الحالي إذا لم يكن مفتوحاً
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// جدول أسعار اللحوم
function initMeatsTable() {
    const tableBody = document.getElementById('priceTableBody');
    if (!tableBody) return;
    
    const meatsForTable = [
        { name: "لحم بقري مشوي", description: "قطع للشوي عالية الجودة", price: 38000, status: "متوفر" },
        { name: "لحم ضأن أسترالي", description: "مستورد، طري وذو نكهة", price: 45000, status: "متوفر" },
        { name: "لحم عجل كندي", description: "معتق، مناسب للستيك", price: 52000, status: "متوفر" },
        { name: "لحم مفروم ناعم", description: "جاهز للبرغر والكفتة", price: 35000, status: "متوفر" },
        { name: "لحم مفروم خشن", description: "للطبخ والمحاشي", price: 34000, status: "متوفر" },
        { name: "دجاج كامل", description: "طازج، مذبوح إسلامياً", price: 18000, status: "متوفر" },
        { name: "صدور دجاج", description: "منزوعة العظم والجلد", price: 22000, status: "متوفر" },
        { name: "أفخاذ دجاج", description: "طازجة، نظيفة", price: 19000, status: "متوفر" },
        { name: "كبد دجاج", description: "طازج، مغسل", price: 12000, status: "متوفر" },
        { name: "سمك ناجل", description: "طازج من البحر الأحمر", price: 25000, status: "قليل" },
        { name: "سمك سلطان إبراهيم", description: "طازج، نظيف", price: 22000, status: "متوفر" },
        { name: "سجق حلال", description: "مصنع من لحوم حلال", price: 28000, status: "متوفر" },
        { name: "مرتديلا", description: "أنواع مختلفة", price: 26000, status: "متوفر" },
        { name: "لحم بقري عضوي", description: "من مزارع عضوية، بدون هرمونات", price: 58000, status: "متوفر" }
    ];
    
    meatsForTable.forEach(meat => {
        const row = document.createElement('tr');
        
        const statusClass = meat.status === "متوفر" ? "status-available" : 
                          meat.status === "قليل" ? "status-limited" : "";
        
        row.innerHTML = `
            <td>${meat.name}</td>
            <td>${meat.description}</td>
            <td class="price-cell">${meat.price.toLocaleString()} ريال</td>
            <td class="status-cell ${statusClass}">${meat.status}</td>
            <td class="action-cell">
                <button class="order-btn" onclick="orderFromTable('${meat.name}')">طلب</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// طلب من الجدول
function orderFromTable(meatName) {
    const meat = meatsProducts.find(m => m.name === meatName);
    if (meat) {
        addToCart(meat);
        showNotification(`تم طلب ${meatName}، سيتم إضافته إلى سلة التسوق`);
    } else {
        showNotification(`المنتج غير موجود، سيتم التواصل معك لتأكيد الطلب`);
    }
}

// الطلب السريع
function initQuickOrder() {
    const form = document.getElementById('quickOrderForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = form.querySelector('input[type="text"]').value;
        const phone = form.querySelector('input[type="tel"]').value;
        const type = form.querySelector('select').value;
        const quantity = form.querySelector('input[type="number"]').value;
        
        // هنا يمكن إضافة كود إرسال الطلب إلى الخادم
        showNotification(`شكراً ${name}، تم استلام طلبك للحم ${getMeatTypeName(type)} بمقدار ${quantity} كجم. سنتصل بك على ${phone} خلال دقائق.`);
        
        form.reset();
    });
}

// الحصول على اسم نوع اللحم
function getMeatTypeName(type) {
    const types = {
        'beef': 'لحم بقر',
        'lamb': 'لحم ضأن',
        'chicken': 'دجاج',
        'fish': 'أسماك'
    };
    return types[type] || 'لحم';
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
        background: #8b0000;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(139, 0, 0, 0.3);
        z-index: 10000;
        animation: slideDown 0.3s ease;
        max-width: 90%;
        text-align: center;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// إضافة أنماط للإشعارات إذا لم تكن موجودة
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