/**
 * MANUTD STORE - CART JS
 * Handles Slide-out Cart UI and LocalStorage logic
 */

let cart = JSON.parse(localStorage.getItem('vanilla_store_cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    initCartUI();
    renderCart();
    attachAddToCartListeners();
});

function initCartUI() {
    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const slideCart = document.getElementById('slide-cart');
    const overlay = document.getElementById('slide-cart-overlay');

    function openCart() {
        if(slideCart && overlay) {
            slideCart.style.right = '0';
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            renderCart();
        }
    }

    function closeCart() {
        if(slideCart && overlay) {
            slideCart.style.right = '-400px';
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (overlay) overlay.addEventListener('click', closeCart);
    
    // Global open cart function to be called from main.js or HTML if needed
    window.openSlideCart = openCart;
}

function saveCart() {
    localStorage.setItem('vanilla_store_cart', JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const counts = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    counts.forEach(count => {
        count.textContent = totalItems;
    });
}

function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('cart-total-price');
    if (!cartContainer || !totalPriceEl) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="text-align:center; color:#666; margin-top:50px;">Your cart is empty.</p>';
        totalPriceEl.textContent = '$0.00';
        updateCartBadge();
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        html += `
            <div class="cart-item" style="display:flex; gap:15px; margin-bottom:20px; padding-bottom:15px; border-bottom:1px solid #eee;">
                <img src="${item.image}" alt="${item.name}" style="width:80px; height:80px; object-fit:cover; background:#f5f5f5;">
                <div style="flex:1;">
                    <h5 style="font-size:0.9rem; margin-bottom:5px;">${item.name}</h5>
                    <p style="color:#666; font-size:0.8rem; margin-bottom:5px;">Size: ${item.size}</p>
                    <p style="font-weight:bold; margin-bottom:10px;">$${item.price.toFixed(2)}</p>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <div style="display:flex; border:1px solid #ccc; width:fit-content;">
                            <button onclick="updateQuantity('${item.id}', -1)" style="padding:2px 10px; cursor:pointer;">-</button>
                            <span style="padding:2px 10px; border-left:1px solid #ccc; border-right:1px solid #ccc;">${item.quantity}</span>
                            <button onclick="updateQuantity('${item.id}', 1)" style="padding:2px 10px; cursor:pointer;">+</button>
                        </div>
                        <button onclick="removeFromCart('${item.id}')" style="color:var(--color-primary); font-size:0.8rem; text-decoration:underline;">Remove</button>
                    </div>
                </div>
            </div>
        `;
    });

    cartContainer.innerHTML = html;
    totalPriceEl.textContent = '$' + total.toFixed(2);
    updateCartBadge();
}

function addToCart(product) {
    const existingIndex = cart.findIndex(item => item.id === product.id && item.size === product.size);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    saveCart();
    renderCart();
    if (window.showToast) {
        window.showToast(`${product.name} added to cart!`);
    } else if (window.openSlideCart) {
        window.openSlideCart();
    }
}

window.updateQuantity = function(id, change) {
    const index = cart.findIndex(item => item.id === id);
    if (index > -1) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        saveCart();
        renderCart();
    }
}

window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
}

// Attach event listeners to Add to Cart / Quick Add buttons dynamically
function attachAddToCartListeners() {
    // For Homepage / Category grids
    const quickAddBtns = document.querySelectorAll('.quick-add-btn');
    quickAddBtns.forEach(btn => {
        // Need to prevent binding multiple times if re-rendered
        btn.removeEventListener('click', handleQuickAdd);
        btn.addEventListener('click', handleQuickAdd);
    });

    // For Product Detail Page
    const pdpAddBtn = document.getElementById('add-to-cart-btn');
    if (pdpAddBtn) {
        pdpAddBtn.removeEventListener('click', handlePDPAdd);
        pdpAddBtn.addEventListener('click', handlePDPAdd);
    }
}

function handleQuickAdd(e) {
    e.preventDefault();
    const card = e.target.closest('.product-card');
    if (!card) return;

    const titleEl = card.querySelector('.product-title');
    const priceEl = card.querySelector('.product-price');
    const imgEl = card.querySelector('.product-img.primary');
    
    // Just mock a size M for quick add, or prompt user. We'll use 'M'.
    const product = {
        id: titleEl.textContent.trim().replace(/\s+/g, '-').toLowerCase(),
        name: titleEl.textContent.trim(),
        price: parseFloat(priceEl.textContent.replace('$', '')),
        image: imgEl.src,
        size: 'M'
    };

    addToCart(product);
}

function handlePDPAdd(e) {
    e.preventDefault();
    const titleEl = document.getElementById('pdp-title');
    const priceEl = document.getElementById('pdp-price');
    const imgEl = document.getElementById('main-product-image');
    
    // Get active size
    const activeSizeBtn = document.querySelector('.size-btn.active');
    const size = activeSizeBtn ? activeSizeBtn.textContent.trim() : 'M';

    const product = {
        id: titleEl.textContent.trim().replace(/\s+/g, '-').toLowerCase() + '-' + size.toLowerCase(),
        name: titleEl.textContent.trim(),
        price: parseFloat(priceEl.dataset.value || 0),
        image: imgEl.src,
        size: size
    };

    addToCart(product);
}
