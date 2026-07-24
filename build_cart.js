const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const headerEnd = indexHtml.indexOf('<!-- ==========================================') !== -1 
    ? indexHtml.indexOf('<!-- ==========================================\n         [PHẦN 2] HERO BANNER') 
    : indexHtml.indexOf('<main');
const footerStart = indexHtml.indexOf('<!-- ==========================================\n         [PHẦN 4] NEWSLETTER & FOOTER');

const header = indexHtml.substring(0, headerEnd);
const footer = indexHtml.substring(footerStart);

const mainContent = `
    <!-- ==========================================
         [PHẦN MAIN] CART PAGE
         ========================================== -->
    <main class="cart-page">
        <h1 class="cart-title">Your Bag</h1>

        <div class="cart-container">
            <!-- Cột Trái: Danh sách sản phẩm (65%) -->
            <div class="cart-items">
                <!-- Sản phẩm 1 -->
                <div class="cart-item">
                    <img src="images/4_c836596765f00ea79c068d00ff3c4e05.jpg" alt="Home Shirt" class="cart-item-img">
                    <div class="cart-item-details">
                        <a href="product.html?id=home-shirt" class="cart-item-title">Mens Manchester United Home Authentic Shirt 24/25</a>
                        <p class="cart-item-size">Size: L</p>
                        <div class="cart-item-actions">
                            <div class="cart-qty">
                                <button class="qty-btn minus">-</button>
                                <input type="text" value="1" class="qty-input" readonly>
                                <button class="qty-btn plus">+</button>
                            </div>
                            <button class="remove-btn" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>
                    <div class="cart-item-price">$90.00</div>
                </div>

                <!-- Sản phẩm 2 -->
                <div class="cart-item">
                    <img src="images/5_b42223866496c6fac690a48a9b121da5.jpg" alt="Away Shirt" class="cart-item-img">
                    <div class="cart-item-details">
                        <a href="product.html?id=away-shirt" class="cart-item-title">Mens Manchester United Away Shirt 24/25</a>
                        <p class="cart-item-size">Size: M</p>
                        <div class="cart-item-actions">
                            <div class="cart-qty">
                                <button class="qty-btn minus">-</button>
                                <input type="text" value="2" class="qty-input" readonly>
                                <button class="qty-btn plus">+</button>
                            </div>
                            <button class="remove-btn" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>
                    <div class="cart-item-price">$150.00</div>
                </div>
            </div>

            <!-- Cột Phải: Order Summary (35%) -->
            <div class="order-summary">
                <h2 class="summary-title">Order Summary</h2>
                
                <div class="summary-line">
                    <span>Subtotal</span>
                    <span>$240.00</span>
                </div>
                <div class="summary-line">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div class="summary-line">
                    <span>Taxes</span>
                    <span>$12.00</span>
                </div>
                
                <div class="summary-total">
                    <span>Total</span>
                    <span>$252.00</span>
                </div>

                <a href="checkout.html" style="text-decoration: none; display: block;">
                    <button class="checkout-btn" style="width: 100%;">CHECKOUT</button>
                </a>

                <div class="promo-section">
                    <p class="promo-title">Apply Promo Code</p>
                    <div class="promo-form">
                        <input type="text" placeholder="Enter code here" class="promo-input">
                        <button class="promo-btn">APPLY</button>
                    </div>
                </div>
            </div>
        </div>
    </main>

`;

fs.writeFileSync(path.join(__dirname, 'cart.html'), header + mainContent + footer, 'utf8');
console.log('Tạo cart.html thành công.');
