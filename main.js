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

    // 4. Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    if (accordionHeaders.length > 0) {
        // Mở sẵn tab đầu tiên
        accordionHeaders[0].parentElement.classList.add('active');
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const item = this.parentElement;
                
                // Toggle trạng thái của tab hiện tại
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                } else {
                    // Tùy chọn: Đóng các tab khác
                    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                }
            });
        });
    }

    // 5. Dynamic Product Loading (Xử lý bấm sản phẩm nào ra sản phẩm đó)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // Database ảo bằng Javascript thuần
    const productDatabase = {
        'home-shirt': {
            title: 'Mens Manchester United Home Authentic Shirt 24/25',
            price: '$90.00',
            img: 'images/4_c836596765f00ea79c068d00ff3c4e05.jpg'
        },
        'away-shirt': {
            title: 'Mens Manchester United Away Shirt 24/25',
            price: '$75.00',
            img: 'images/5_b42223866496c6fac690a48a9b121da5.jpg'
        },
        'third-shirt': {
            title: 'Mens Manchester United Third Shirt 24/25',
            price: '$90.00',
            img: 'images/10_557b882a41d5bc6a7934615bbc14b842.jpg'
        },
        'gk-shirt': {
            title: 'Mens Manchester United Goalkeeper Shirt 24/25',
            price: '$95.00',
            img: 'https://mufc-live.cdn.scayle.cloud/images/b08cc3092b199551aacc2528c7b4c45b.jpg'
        },
        'training-top': {
            title: 'Mens Manchester United Training Top 24/25',
            price: '$65.00',
            img: 'images/6_2ed2651297cac6ec9750f6581a0940e2.jpg'
        },
        'anthem-jacket': {
            title: 'Mens Manchester United Anthem Jacket 24/25',
            price: '$110.00',
            img: 'images/7_066d2c004e6666a7d1316d9eb103a421.jpg'
        }
    };

    if (productId && productDatabase[productId] && document.querySelector('.product-page')) {
        const pd = productDatabase[productId];
        document.querySelector('.product-title-large').innerText = pd.title;
        document.querySelector('.product-price-large').innerText = pd.price;
        
        // Cập nhật ảnh to
        document.querySelector('.main-product-img').src = pd.img;
        
        // Cập nhật thumbnail (tạm thời lặp lại ảnh chính để mô phỏng)
        const thumbs = document.querySelectorAll('.thumb-img');
        if(thumbs.length > 0) {
            thumbs.forEach(t => t.src = pd.img);
        }
        
        // Cập nhật Breadcrumb
        const breadcrumbSpan = document.querySelector('.breadcrumb span');
        if(breadcrumbSpan) breadcrumbSpan.innerText = pd.title;
    }

    // ==========================================
    // CART PAGE LOGIC
    // ==========================================
    const cartQtyMinus = document.querySelectorAll('.cart-qty .qty-btn.minus');
    const cartQtyPlus = document.querySelectorAll('.cart-qty .qty-btn.plus');

    cartQtyMinus.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.nextElementSibling;
            let val = parseInt(input.value);
            if (val > 1) {
                input.value = val - 1;
                // Có thể thêm hàm tính lại Total ở đây
            }
        });
    });

    cartQtyPlus.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            let val = parseInt(input.value);
            if (val < 99) {
                input.value = val + 1;
                // Có thể thêm hàm tính lại Total ở đây
            }
        });
    });

    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Xóa phần tử cart-item khỏi DOM
            const item = this.closest('.cart-item');
            if (item) {
                item.remove();
                // Có thể thêm hàm tính lại Total ở đây
            }
        });
    });
});
