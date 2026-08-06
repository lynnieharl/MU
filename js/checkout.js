// checkout.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Render Checkout Summary
    const summaryContainer = document.querySelector('.summary-items');
    
    function formatCurrency(val) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
    }

    if (summaryContainer && window.cartManager) {
        const cart = window.cartManager.getCart();
        
        if (cart.length === 0) {
            alert('Giỏ hàng của bạn đang trống! Vui lòng thêm sản phẩm trước khi thanh toán.');
            window.location.href = 'index.html';
            return;
        }

        summaryContainer.innerHTML = cart.map(item => `
            <div class="summary-item">
                <div class="summary-item-img-wrapper">
                    <img src="${item.image}" alt="${item.name}">
                    <span class="summary-item-qty">${item.quantity}</span>
                </div>
                <div class="summary-item-info">
                    <h4>${item.name}</h4>
                    <p>Size: ${item.size}</p>
                </div>
                <div class="summary-item-price">${formatCurrency(item.price * item.quantity)}</div>
            </div>
        `).join('');

        const subtotal = window.cartManager.getTotalAmount();
        
        const sumSubtotal = document.querySelector('.totals-row:nth-child(1) span:last-child');
        const sumTotal = document.querySelector('.total-final .total-price');
        
        if (sumSubtotal) sumSubtotal.textContent = formatCurrency(subtotal);
        if (sumTotal) sumTotal.textContent = formatCurrency(subtotal);
    }

    // 2. Handle Payment
    const payBtn = document.querySelector('.pay-now-btn');
    if (payBtn) {
        payBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            // Basic validation
            const emailInput = document.querySelector('.checkout-input[type="email"]');
            const firstName = document.querySelector('.checkout-row input[placeholder="First Name"]');
            
            if (!emailInput.value) {
                alert('Vui lòng nhập Email để đặt hàng!');
                emailInput.focus();
                return;
            }

            payBtn.disabled = true;
            payBtn.textContent = 'Processing...';

            try {
                let userEmail = emailInput.value;
                // Nếu đã đăng nhập, lấy email từ supabase
                if (window.supabaseClient) {
                    const { data: { session } } = await window.supabaseClient.auth.getSession();
                    if (session && session.user) {
                        userEmail = session.user.email;
                    }
                }

                const cart = window.cartManager.getCart();
                const totalAmount = window.cartManager.getTotalAmount();

                // Insert into Supabase Orders table
                if (window.supabaseClient) {
                    const { data, error } = await window.supabaseClient
                        .from('orders')
                        .insert([
                            {
                                user_email: userEmail,
                                total_amount: totalAmount,
                                items: JSON.stringify(cart),
                                status: 'Pending'
                            }
                        ]);

                    if (error) throw error;
                }

                // Success
                window.cartManager.clearCart();
                window.location.href = 'success.html';

            } catch (err) {
                console.error('Lỗi khi đặt hàng:', err);
                alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
                payBtn.disabled = false;
                payBtn.textContent = 'Pay Now';
            }
        });
    }
});
