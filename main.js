document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // TRENDING NOW CAROUSEL LOGIC
    // ==========================================
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.getElementById('trending-prev');
    const nextBtn = document.getElementById('trending-next');
    
    if (track && prevBtn && nextBtn) {
        // Trong trường hợp này có 4 sản phẩm, đang hiển thị 4 cột
        // Nếu muốn hiệu ứng trượt mượt mà khi có nhiều sản phẩm hơn,
        // chúng ta sẽ tính toán width và dịch chuyển.
        
        let currentIndex = 0;
        
        // Mặc định hiện tại có 4 sản phẩm, nên không cần trượt.
        // Tuy nhiên, logic dưới đây sẵn sàng cho trường hợp thêm sản phẩm vào HTML.
        const updateCarousel = () => {
            const cards = document.querySelectorAll('.product-card');
            if(cards.length === 0) return;
            
            // Tính chiều rộng của 1 card cộng với khoảng cách (gap)
            // Lấy kích thước thực tế từ DOM
            const cardWidth = cards[0].offsetWidth;
            const gap = 20; // 20px gap như trong CSS
            
            const moveAmount = (cardWidth + gap) * currentIndex;
            track.style.transform = `translateX(-${moveAmount}px)`;
        };

        nextBtn.addEventListener('click', () => {
            const cards = document.querySelectorAll('.product-card');
            const maxIndex = Math.max(0, cards.length - 4); // Hiển thị 4 item mỗi lần
            
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            } else {
                // Quay lại đầu nếu đã đến cuối (tùy chọn)
                currentIndex = 0;
                updateCarousel();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        // Cập nhật lại khi resize cửa sổ
        window.addEventListener('resize', updateCarousel);
    }

    // ==========================================
    // PRODUCT DETAIL PAGE (PDP) LOGIC
    // ==========================================
    // 1. Thumbnail Image Switcher
    const thumbnails = document.querySelectorAll('.thumb-img');
    const mainImg = document.querySelector('.main-product-img');

    if (thumbnails.length > 0 && mainImg) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Xóa active class của tất cả
                thumbnails.forEach(t => t.classList.remove('active'));
                // Thêm active class cho ảnh được click
                this.classList.add('active');
                // Đổi src ảnh to
                mainImg.src = this.src;
            });
        });
    }

    // 2. Quantity Selector
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    const qtyInput = document.querySelector('.qty-input');

    if (minusBtn && plusBtn && qtyInput) {
        minusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            if (val > 1) {
                qtyInput.value = val - 1;
            }
        });
        
        plusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            if (val < 99) {
                qtyInput.value = val + 1;
            }
        });
    }
    
    // 3. Size Selector
    const sizeBtns = document.querySelectorAll('.size-btn');
    if (sizeBtns.length > 0) {
        sizeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                sizeBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
});
