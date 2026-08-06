// cart-logic.js
// Handles localStorage cart state and updates UI

document.addEventListener('DOMContentLoaded', () => {
    window.cartManager = {
        getCart() {
            try {
                return JSON.parse(localStorage.getItem('cart_items')) || [];
            } catch (e) {
                return [];
            }
        },

        saveCart(cart) {
            localStorage.setItem('cart_items', JSON.stringify(cart));
            this.updateBadge();
        },

        addToCart(product) {
            const cart = this.getCart();
            // product = { id, name, price, image, size, quantity }
            const existingItem = cart.find(item => item.id === product.id && item.size === product.size);
            
            if (existingItem) {
                existingItem.quantity += (product.quantity || 1);
            } else {
                cart.push({
                    ...product,
                    quantity: product.quantity || 1
                });
            }
            this.saveCart(cart);
            this.showToast(`Đã thêm ${product.name} vào giỏ hàng!`);
        },

        removeFromCart(index) {
            const cart = this.getCart();
            if (index >= 0 && index < cart.length) {
                cart.splice(index, 1);
                this.saveCart(cart);
            }
        },

        updateQuantity(index, newQty) {
            const cart = this.getCart();
            if (index >= 0 && index < cart.length && newQty > 0) {
                cart[index].quantity = newQty;
                this.saveCart(cart);
            }
        },

        clearCart() {
            localStorage.removeItem('cart_items');
            this.updateBadge();
        },

        getTotalCount() {
            return this.getCart().reduce((sum, item) => sum + (item.quantity || 1), 0);
        },
        
        getTotalAmount() {
            return this.getCart().reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
        },

        updateBadge() {
            const badges = document.querySelectorAll('.cart-btn .badge');
            const total = this.getTotalCount();
            badges.forEach(badge => {
                badge.textContent = total;
                // Add tiny animation
                badge.style.transform = 'scale(1.2)';
                setTimeout(() => badge.style.transform = 'scale(1)', 200);
            });
        },

        showToast(message) {
            // Simple toast notification
            let toast = document.getElementById('cart-toast');
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'cart-toast';
                Object.assign(toast.style, {
                    position: 'fixed',
                    bottom: '20px',
                    left: '20px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: '10000',
                    transition: 'all 0.3s',
                    transform: 'translateY(100px)',
                    opacity: '0',
                    fontWeight: '500'
                });
                document.body.appendChild(toast);
            }
            toast.textContent = message;
            
            // Trigger animation
            setTimeout(() => {
                toast.style.transform = 'translateY(0)';
                toast.style.opacity = '1';
            }, 10);
            
            setTimeout(() => {
                toast.style.transform = 'translateY(100px)';
                toast.style.opacity = '0';
            }, 3000);
        }
    };

    // Initialize badge on load
    window.cartManager.updateBadge();

    // Attach to product page "Add to Cart" button if it exists
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const title = document.querySelector('.product-title-large').textContent;
            const priceStr = document.querySelector('.product-price-large').textContent;
            const price = parseInt(priceStr.replace(/[^0-9]/g, ''));
            const image = document.querySelector('.main-product-img').src;
            const activeSize = document.querySelector('.size-btn.active');
            const size = activeSize ? activeSize.textContent : 'L';
            const qtyStr = document.querySelector('.qty-input').value;
            const quantity = parseInt(qtyStr) || 1;

            const product = {
                id: Date.now(), // Random ID for now, since we don't have DB IDs in product.html
                name: title,
                price: price,
                image: image,
                size: size,
                quantity: quantity
            };

            window.cartManager.addToCart(product);
        });
    }

    // Attach qty buttons if they exist
    const qtyMinus = document.querySelector('.qty-btn.minus');
    const qtyPlus = document.querySelector('.qty-btn.plus');
    const qtyInput = document.querySelector('.qty-input');
    if (qtyMinus && qtyPlus && qtyInput) {
        qtyMinus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val > 1) qtyInput.value = val - 1;
        });
        qtyPlus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            qtyInput.value = val + 1;
        });
    }

    // Attach size buttons if they exist
    const sizeBtns = document.querySelectorAll('.size-btn');
    if (sizeBtns.length > 0) {
        sizeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                sizeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    // ==========================================
    // CART PAGE RENDERING
    // ==========================================
    function formatCurrency(val) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
    }

    const cartContainer = document.querySelector('.cart-items');
    if (cartContainer) {
        function renderCartPage() {
            const cart = window.cartManager.getCart();
            
            if (cart.length === 0) {
                cartContainer.innerHTML = `
                    <div style="text-align:center; padding: 40px;">
                        <h3>Giỏ hàng của bạn đang trống</h3>
                        <a href="jerseys.html" style="display:inline-block; margin-top:20px; padding:10px 20px; background:#6366f1; color:white; text-decoration:none; border-radius:4px;">Tiếp tục mua sắm</a>
                    </div>
                `;
                updateSummary(0);
                return;
            }

            cartContainer.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <a href="#" class="cart-item-title">${item.name}</a>
                        <p class="cart-item-size">Size: ${item.size}</p>
                        <div class="cart-item-actions">
                            <div class="cart-qty">
                                <button class="qty-btn minus" onclick="window.updateCartQty(${index}, -1)">-</button>
                                <input type="text" value="${item.quantity}" class="qty-input" readonly>
                                <button class="qty-btn plus" onclick="window.updateCartQty(${index}, 1)">+</button>
                            </div>
                            <button class="remove-btn" onclick="window.removeCartItem(${index})" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>
                    <div class="cart-item-price">${formatCurrency(item.price * item.quantity)}</div>
                </div>
            `).join('');

            updateSummary(window.cartManager.getTotalAmount());
        }

        function updateSummary(subtotal) {
            const sumSubtotal = document.querySelector('.summary-line:nth-child(2) span:last-child');
            const sumTotal = document.querySelector('.summary-total span:last-child');
            if (sumSubtotal && sumTotal) {
                sumSubtotal.textContent = formatCurrency(subtotal);
                // Free shipping, no taxes for now
                sumTotal.textContent = formatCurrency(subtotal);
            }
        }

        window.updateCartQty = function(index, delta) {
            const cart = window.cartManager.getCart();
            const newQty = cart[index].quantity + delta;
            if (newQty > 0) {
                window.cartManager.updateQuantity(index, newQty);
                renderCartPage();
            }
        };

        window.removeCartItem = function(index) {
            if (confirm('Xóa sản phẩm này khỏi giỏ hàng?')) {
                window.cartManager.removeFromCart(index);
                renderCartPage();
            }
        };

        // Initial render
        renderCartPage();
    }
});
