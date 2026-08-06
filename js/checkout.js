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
                
                // Show Success Popup
                showSuccessPopup();

            } catch (err) {
                console.error('Lỗi khi đặt hàng:', err);
                alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
                payBtn.disabled = false;
                payBtn.textContent = 'Pay Now';
            }
        });
    }

    function showSuccessPopup() {
        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: '99999',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(5px)'
        });
        
        const orderNumber = '#MU-' + Math.floor(Math.random() * 1000000);

        const popup = document.createElement('div');
        Object.assign(popup.style, {
            backgroundColor: '#fff',
            padding: '40px',
            borderRadius: '16px',
            textAlign: 'center',
            maxWidth: '400px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            transform: 'scale(0.8)',
            opacity: '0',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });

        popup.innerHTML = `
            <div style="width: 80px; height: 80px; background-color: #22c55e; color: white; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 40px; margin: 0 auto 20px;">
                <i class="fa-solid fa-check"></i>
            </div>
            <h2 style="margin: 0 0 10px; color: #1f2937; font-size: 28px; font-weight: 800; text-transform: uppercase;">THANK YOU!</h2>
            <p style="color: #6b7280; font-size: 15px; margin-bottom: 25px; line-height: 1.5;">Your order has been placed successfully.<br>Order Number: <strong style="color: #1f2937;">${orderNumber}</strong></p>
            <button id="success-continue-btn" style="background-color: #da291c; color: white; border: none; padding: 14px 28px; font-weight: 700; border-radius: 4px; cursor: pointer; transition: background-color 0.2s; width: 100%; text-transform: uppercase; letter-spacing: 1px;">CONTINUE SHOPPING</button>
        `;

        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        // Animate in
        setTimeout(() => {
            popup.style.transform = 'scale(1)';
            popup.style.opacity = '1';
        }, 10);

        const btn = document.getElementById('success-continue-btn');
        btn.addEventListener('mouseover', () => btn.style.backgroundColor = '#b91c14');
        btn.addEventListener('mouseout', () => btn.style.backgroundColor = '#da291c');
        btn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});
