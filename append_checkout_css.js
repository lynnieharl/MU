const fs = require('fs');
const path = require('path');

const css = `
/* ==========================================================================
   CHECKOUT PAGE
   ========================================================================== */
.checkout-page {
    background-color: #f9f9f9;
    padding: 40px 20px;
    min-height: 100vh;
}

.checkout-container {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
}

.checkout-left {
    flex: 1;
    min-width: 300px;
}

.checkout-right {
    width: 400px;
}

.checkout-title {
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 30px;
    color: var(--color-black);
}

.checkout-section {
    background-color: var(--color-white);
    padding: 25px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.checkout-section-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 15px;
}

.checkout-section h2 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 15px;
    color: var(--color-black);
}

.checkout-section-header a {
    color: var(--color-primary);
    text-decoration: underline;
    font-size: 0.9rem;
}

.checkout-input {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid var(--color-gray-border);
    border-radius: 4px;
    margin-bottom: 15px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;
}

.checkout-input:focus {
    border-color: var(--color-black);
}

.checkout-row {
    display: flex;
    gap: 15px;
}

.checkout-checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.95rem;
    color: var(--color-black);
    cursor: pointer;
}

.checkout-checkbox input[type="checkbox"] {
    accent-color: var(--color-primary);
    width: 16px;
    height: 16px;
}

.checkout-methods {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.checkout-method-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border: 1px solid var(--color-gray-border);
    border-radius: 4px;
    cursor: pointer;
    transition: border-color 0.2s;
}

.checkout-method-box.active {
    border-color: var(--color-primary);
    background-color: #fafafa;
}

.method-info {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.95rem;
    font-weight: bold;
}

.method-info input[type="radio"] {
    accent-color: var(--color-primary);
    width: 16px;
    height: 16px;
}

.method-price {
    font-weight: bold;
}

.payment-form {
    background-color: #fafafa;
    border: 1px solid var(--color-gray-border);
    border-top: none;
    padding: 20px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -10px; /* pull up to connect with active tab */
    margin-bottom: 10px;
}

.payment-box.active {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

.pay-now-btn {
    width: 100%;
    padding: 18px;
    background-color: var(--color-primary);
    color: var(--color-white);
    font-size: 1.2rem;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
}

.pay-now-btn:hover {
    background-color: #a81c12;
}

/* Order Summary */
.order-summary-box {
    background-color: var(--color-white);
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    position: sticky;
    top: 20px;
}

.order-summary-box h2 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: var(--color-black);
    padding-bottom: 15px;
    border-bottom: 1px solid var(--color-gray-border);
}

.summary-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 25px;
}

.summary-item {
    display: flex;
    align-items: center;
    gap: 15px;
}

.summary-item-img-wrapper {
    position: relative;
    width: 65px;
    height: 65px;
    border: 1px solid var(--color-gray-border);
    border-radius: 8px;
    background-color: var(--color-gray-light);
}

.summary-item-img-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
}

.summary-item-qty {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: var(--color-gray-dark);
    color: var(--color-white);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: bold;
}

.summary-item-info {
    flex: 1;
}

.summary-item-info h4 {
    font-size: 0.9rem;
    font-weight: bold;
    margin-bottom: 5px;
    color: var(--color-black);
}

.summary-item-info p {
    font-size: 0.8rem;
    color: var(--color-gray-dark);
}

.summary-item-price {
    font-weight: bold;
    font-size: 0.95rem;
}

.discount-code-box {
    display: flex;
    gap: 10px;
    margin-bottom: 25px;
    padding-bottom: 25px;
    border-bottom: 1px solid var(--color-gray-border);
}

.discount-code-box .checkout-input {
    margin-bottom: 0;
}

.discount-code-box .apply-btn {
    padding: 0 20px;
    background-color: var(--color-gray-light);
    border: 1px solid var(--color-gray-border);
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
}

.discount-code-box .apply-btn:hover {
    background-color: var(--color-gray-border);
}

.summary-totals {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.totals-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.95rem;
    color: var(--color-black);
}

.totals-row.total-final {
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 10px;
    padding-top: 15px;
    border-top: 1px solid var(--color-gray-border);
}

.total-price {
    font-size: 1.5rem;
}

@media (max-width: 900px) {
    .checkout-right {
        width: 100%;
        order: -1; /* Đưa tổng kết lên trên ở mobile */
    }
    .order-summary-box {
        position: static;
    }
}
`;

fs.appendFileSync(path.join(__dirname, 'style.css'), css, 'utf8');
console.log('Appended Checkout CSS successfully.');
