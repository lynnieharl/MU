/**
 * MANUTD STORE - CART JS
 * Handles Slide-out Cart UI and LocalStorage
 */

document.addEventListener('DOMContentLoaded', () => {
    initCartUI();
});

function initCartUI() {
    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const slideCart = document.getElementById('slide-cart');
    const overlay = document.getElementById('slide-cart-overlay');

    function openCart() {
        slideCart.style.right = '0';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeCart() {
        slideCart.style.right = '-400px';
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    if (cartToggleBtn) {
        cartToggleBtn.addEventListener('click', openCart);
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }

    if (overlay) {
        overlay.addEventListener('click', closeCart);
    }
}
