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
});
