// إدارة سلة التسوق
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.name === product.name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.save();
        this.updateCartCount();
    }

    removeItem(productName) {
        this.items = this.items.filter(item => item.name !== productName);
        this.save();
        this.updateCartCount();
    }

    updateQuantity(productName, quantity) {
        const item = this.items.find(item => item.name === productName);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productName);
            } else {
                this.save();
                this.updateCartCount();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    clear() {
        this.items = [];
        this.save();
        this.updateCartCount();
    }

    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const countElements = document.querySelectorAll('.cart-count');
        const count = this.getItemCount();
        
        countElements.forEach(element => {
            element.textContent = count;
            element.style.display = count > 0 ? 'flex' : 'none';
        });
    }
}

// تهيئة سلة التسوق
const cart = new Cart();

// إضافة المنتج إلى السلة
function addToCart(product) {
    cart.addItem(product);
}

// التصدير للاستخدام في الصفحات الأخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Cart, cart };
}