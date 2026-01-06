        // تهيئة التطبيق
        document.addEventListener('DOMContentLoaded', function() {
            initMobileMenu();
            initScrollProgress();
            initBackToTop();
            initFAQ();
            initTestimonials();
            initProducts();
            initNewsletter();
            initCategories();
        });

        // قائمة الجوال
        function initMobileMenu() {
            const mobileBtn = document.getElementById('mobileMenuBtn');
            const nav = document.getElementById('mainNav');
            
            if (!mobileBtn || !nav) return;
            
            mobileBtn.addEventListener('click', () => {
                const open = nav.classList.toggle('active');
                mobileBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
                
                const icon = mobileBtn.querySelector('i');
                if (open) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });

            nav.querySelectorAll('a').forEach(a => {
                a.addEventListener('click', () => {
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        mobileBtn.setAttribute('aria-expanded', 'false');
                        const icon = mobileBtn.querySelector('i');
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars');
                    }
                });
            });
        }

        // شريط التقدم
        function initScrollProgress() {
            const progress = document.getElementById('scrollProgress');
            if (!progress) return;

            function updateProgress() {
                const doc = document.documentElement;
                const scrollTop = window.scrollY || doc.scrollTop;
                const height = doc.scrollHeight - window.innerHeight;
                const pct = height > 0 ? (scrollTop / height) * 100 : 0;
                progress.style.width = pct + '%';
            }

            window.addEventListener('scroll', updateProgress, { passive: true });
            updateProgress();
        }

        // زر العودة للأعلى
        function initBackToTop() {
            const backToTop = document.getElementById('backToTop');
            if (!backToTop) return;

            function toggleBackToTop() {
                if (window.scrollY > 300) {
                    backToTop.classList.add('active');
                } else {
                    backToTop.classList.remove('active');
                }
            }

            window.addEventListener('scroll', toggleBackToTop, { passive: true });
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            toggleBackToTop();
        }

        // الأسئلة الشائعة
        function initFAQ() {
            document.querySelectorAll('.faq-item .faq-question').forEach(q => {
                q.addEventListener('click', () => {
                    const item = q.parentElement;
                    const isActive = item.classList.contains('active');
                    
                    document.querySelectorAll('.faq-item').forEach(faq => {
                        faq.classList.remove('active');
                    });
                    
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            });
        }

        // التوصيات
        function initTestimonials() {
            const testimonials = [
                {
                    name: "أحمد العزي",
                    image: "https://randomuser.me/api/portraits/men/32.jpg",
                    rating: 5,
                    text: "أفضل سوبر ماركت في صنعاء من حيث النظافة والتنظيم. الأسعار معقولة والمنتجات طازجة دائماً."
                },
                {
                    name: "فاطمة محمد",
                    image: "https://randomuser.me/api/portraits/women/44.jpg",
                    rating: 4.5,
                    text: "الخدمة ممتازة والتوصيل سريع. منتجاتهم أصلية وموثوقة."
                },
                {
                    name: "يوسف عبدالله",
                    image: "https://randomuser.me/api/portraits/men/65.jpg",
                    rating: 5,
                    text: "التنوع في المنتجات رائع، تجد كل ما تحتاجه في مكان واحد. الموظفون مهذبون والمكان نظيف جداً."
                },
                {
                    name: "سارة القاضي",
                    image: "https://randomuser.me/api/portraits/women/68.jpg",
                    rating: 4,
                    text: "أشتري منهم بشكل دائم، الجودة ممتازة والأسعار مناسبة مقارنة بالجودة المقدمة."
                }
            ];

            const container = document.querySelector('.testimonials-container');
            if (!container) return;

            testimonials.forEach(testimonial => {
                const stars = '★'.repeat(Math.floor(testimonial.rating)) + 
                            (testimonial.rating % 1 >= 0.5 ? '½' : '');
                
                const card = document.createElement('div');
                card.className = 'testimonial-card';
                card.innerHTML = `
                    <img src="${testimonial.image}" class="client-img" alt="${testimonial.name}">
                    <div class="client-name">${testimonial.name}</div>
                    <div class="client-rating">${'★'.repeat(5)}</div>
                    <p class="testimonial-text">${testimonial.text}</p>
                `;
                container.appendChild(card);
            });
        }

        // المنتجات
        function initProducts() {
            const products = [
                {
                    name: "زيت زيتون بكر ممتاز",
                    description: "عبوة 2 لتر - إسباني",
                    price: 20000,
                    oldPrice: 25000,
                    image: "assets/images/products/olive-oil.jpg",
                    badge: "خصم 20%",
                    badgeClass: "offer-badge discount"
                },
                {
                    name: "أرز بسمتي هندي",
                    description: "كيس 5 كجم - أعلى جودة",
                    price: 12500,
                    oldPrice: 15000,
                    image: "assets/images/products/rice.jpg",
                    badge: "عرض خاص",
                    badgeClass: "offer-badge special"
                },
                {
                    name: "قهوة تركية ممتازة",
                    description: "عبوة 500 جرام - محمصة حديثاً",
                    price: 9500,
                    oldPrice: null,
                    image: "assets/images/products/coffee.jpg",
                    badge: "جديد",
                    badgeClass: "offer-badge new"
                },
                {
                    name: "تمور خلاص سكري",
                    description: "كيلو - طازجة من المزرعة",
                    price: 8000,
                    oldPrice: null,
                    image: "assets/images/products/dates.jpg",
                    badge: "الأكثر مبيعاً",
                    badgeClass: "offer-badge bestseller"
                }
            ];

            const container = document.querySelector('.offers-container');
            if (!container) return;

            products.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                
                const priceHTML = product.oldPrice 
                    ? `<div class="product-price">
                        <span class="old-price">${product.oldPrice.toLocaleString()} ريال</span>
                        <span>${product.price.toLocaleString()} ريال</span>
                    </div>`
                    : `<div class="product-price">${product.price.toLocaleString()} ريال</div>`;
                
                card.innerHTML = `
                    <div class="${product.badgeClass}">${product.badge}</div>
                    <img src="${product.image}" class="product-img" alt="${product.name}">
                    <div class="product-content">
                        <h3 class="product-title">${product.name}</h3>
                        <p>${product.description}</p>
                        ${priceHTML}
                        <button class="add-to-cart" data-product='${JSON.stringify(product)}'>
                            أضف إلى السلة
                        </button>
                    </div>
                `;
                
                container.appendChild(card);
            });

            // إضافة المنتجات إلى السلة
            document.addEventListener('click', function(e) {
                if (e.target.classList.contains('add-to-cart')) {
                    const productData = e.target.getAttribute('data-product');
                    if (productData) {
                        const product = JSON.parse(productData);
                        addToCart(product);
                        showNotification('تم إضافة المنتج إلى السلة بنجاح!');
                    }
                }
            });
        }

        // النشرة البريدية
        function initNewsletter() {
            const form = document.getElementById('newsletterForm');
            if (!form) return;

            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = form.querySelector('.newsletter-input').value;
                
                if (email) {
                    // هنا يمكن إضافة كود الإرسال إلى الخادم
                    showNotification('شكراً للاشتراك في نشرتنا البريدية!');
                    form.reset();
                }
            });
        }

        // الأقسام
        function initCategories() {
            document.querySelectorAll('.category-card').forEach(card => {
                card.addEventListener('click', function() {
                    const category = this.querySelector('h3').textContent;
                    window.location.href = `pages/products.html?category=${encodeURIComponent(category)}`;
                });
            });
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
                background: var(--primary);
                color: white;
                padding: 1rem 2rem;
                border-radius: var(--radius);
                box-shadow: var(--shadow);
                z-index: 10000;
                animation: slideDown 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideUp 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

        // إضافة أنماط للرسوم المتحركة
        const style = document.createElement('style');
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