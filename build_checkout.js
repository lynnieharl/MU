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
         [PHẦN MAIN] CHECKOUT PAGE
         ========================================== -->
    <main class="checkout-page">
        <div class="checkout-container">
            
            <!-- CỘT TRÁI: THÔNG TIN THANH TOÁN & GIAO HÀNG -->
            <div class="checkout-left">
                <h1 class="checkout-title">Checkout</h1>
                
                <!-- Contact Info -->
                <div class="checkout-section">
                    <div class="checkout-section-header">
                        <h2>1. Contact Information</h2>
                        <a href="login.html">Log in</a>
                    </div>
                    <input type="email" class="checkout-input" placeholder="Email Address" required>
                    <label class="checkout-checkbox">
                        <input type="checkbox" checked> Email me with news and offers
                    </label>
                </div>

                <!-- Delivery Info -->
                <div class="checkout-section">
                    <h2>2. Delivery Address</h2>
                    <select class="checkout-input">
                        <option value="VN">Vietnam</option>
                        <option value="UK">United Kingdom</option>
                        <option value="US">United States</option>
                    </select>
                    
                    <div class="checkout-row">
                        <input type="text" class="checkout-input" placeholder="First Name" required>
                        <input type="text" class="checkout-input" placeholder="Last Name" required>
                    </div>
                    
                    <input type="text" class="checkout-input" placeholder="Address" required>
                    <input type="text" class="checkout-input" placeholder="Apartment, suite, etc. (optional)">
                    
                    <div class="checkout-row">
                        <input type="text" class="checkout-input" placeholder="City" required>
                        <input type="text" class="checkout-input" placeholder="Postal Code" required>
                    </div>
                    <input type="tel" class="checkout-input" placeholder="Phone" required>
                </div>

                <!-- Shipping Method -->
                <div class="checkout-section">
                    <h2>3. Shipping Method</h2>
                    <div class="checkout-methods">
                        <label class="checkout-method-box active">
                            <div class="method-info">
                                <input type="radio" name="shipping" checked>
                                <span>Standard Delivery (3-5 Business Days)</span>
                            </div>
                            <span class="method-price">Free</span>
                        </label>
                        <label class="checkout-method-box">
                            <div class="method-info">
                                <input type="radio" name="shipping">
                                <span>Express Delivery (1-2 Business Days)</span>
                            </div>
                            <span class="method-price">$15.00</span>
                        </label>
                    </div>
                </div>

                <!-- Payment -->
                <div class="checkout-section">
                    <h2>4. Payment</h2>
                    <p style="color: var(--color-gray-dark); margin-bottom: 15px; font-size: 0.9rem;">All transactions are secure and encrypted.</p>
                    
                    <div class="checkout-methods payment-methods">
                        <!-- Credit Card -->
                        <label class="checkout-method-box active payment-box">
                            <div class="method-info">
                                <input type="radio" name="payment" checked>
                                <span>Credit Card</span>
                            </div>
                            <div class="payment-icons">
                                <i class="fa-brands fa-cc-visa" style="color: #1a1f71; font-size: 1.5rem;"></i>
                                <i class="fa-brands fa-cc-mastercard" style="color: #eb001b; font-size: 1.5rem;"></i>
                                <i class="fa-brands fa-cc-amex" style="color: #002663; font-size: 1.5rem;"></i>
                            </div>
                        </label>
                        <div class="payment-form" style="display: block;">
                            <input type="text" class="checkout-input" placeholder="Card Number" required>
                            <input type="text" class="checkout-input" placeholder="Name on Card" required>
                            <div class="checkout-row">
                                <input type="text" class="checkout-input" placeholder="Expiration Date (MM/YY)" required>
                                <input type="text" class="checkout-input" placeholder="Security Code" required>
                            </div>
                        </div>

                        <!-- PayPal -->
                        <label class="checkout-method-box payment-box">
                            <div class="method-info">
                                <input type="radio" name="payment">
                                <span>PayPal</span>
                            </div>
                            <i class="fa-brands fa-paypal" style="color: #003087; font-size: 1.5rem;"></i>
                        </label>
                    </div>
                </div>

                <button class="pay-now-btn">Pay Now</button>
            </div>

            <!-- CỘT PHẢI: TÓM TẮT ĐƠN HÀNG -->
            <div class="checkout-right">
                <div class="order-summary-box">
                    <h2>Order Summary</h2>
                    
                    <!-- Items -->
                    <div class="summary-items">
                        <div class="summary-item">
                            <div class="summary-item-img-wrapper">
                                <img src="images/4_c836596765f00ea79c068d00ff3c4e05.jpg" alt="Home Shirt">
                                <span class="summary-item-qty">1</span>
                            </div>
                            <div class="summary-item-info">
                                <h4>Manchester United Home Shirt 24/25</h4>
                                <p>Size: M</p>
                            </div>
                            <div class="summary-item-price">$100.00</div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-item-img-wrapper">
                                <img src="images/6_2ed2651297cac6ec9750f6581a0940e2.jpg" alt="Training Top">
                                <span class="summary-item-qty">2</span>
                            </div>
                            <div class="summary-item-info">
                                <h4>Manchester United Training Top</h4>
                                <p>Size: L</p>
                            </div>
                            <div class="summary-item-price">$140.00</div>
                        </div>
                    </div>

                    <!-- Discount Code -->
                    <div class="discount-code-box">
                        <input type="text" class="checkout-input" placeholder="Discount code or gift card">
                        <button class="apply-btn">Apply</button>
                    </div>

                    <!-- Totals -->
                    <div class="summary-totals">
                        <div class="totals-row">
                            <span>Subtotal</span>
                            <span>$240.00</span>
                        </div>
                        <div class="totals-row">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div class="totals-row">
                            <span>Taxes</span>
                            <span>$24.00</span>
                        </div>
                        <div class="totals-row total-final">
                            <span>Total</span>
                            <span class="total-price">$264.00</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </main>

`;

fs.writeFileSync(path.join(__dirname, 'checkout.html'), header + mainContent + footer, 'utf8');
console.log('Tạo checkout.html thành công.');
