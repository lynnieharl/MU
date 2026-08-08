// i18n.js - Simple Internationalization Engine

const translations = {
    'en': {
        // We don't need to specify English if English is the default HTML content,
        // but it's good practice to have it in case we need to switch back from Vietnamese.
        'lang-btn': 'English - US$',
        'new-in': 'NEW IN',
        'jerseys': 'JERSEYS',
        'trainingwear': 'TRAININGWEAR',
        'fashion': 'FASHION',
        'accessories': 'ACCESSORIES',
        'gifts': 'GIFTS',
        'auctions': 'AUCTIONS',
        'outlet': 'OUTLET',
        'track-order': 'Track Order',
        'help': 'Help',
        'all-bookmarks': 'All Bookmarks',
        'search-placeholder': 'Search for products, players...',
        
        // Homepage specific
        'hero-title': 'THE RED DEVILS ARMOR<br>— 2024/25 SEASON',
        'hero-subtitle': 'Don the historic masterpiece of the Theatre of Dreams.',
        'explore-kits': 'Explore Kits',
        'watch-trailer': 'Watch 3D Trailer',
        'social-proof': 'Over 10,000+ fans got theirs this week',
        'marquee-friendly': 'CLUB FRIENDLY',
        
        'match-last': 'LAST MATCH',
        'match-next': 'NEXT MATCH',
        'match-upcoming': 'UPCOMING MATCH',
        'btn-highlights': 'HIGHLIGHTS',
        'btn-match-center': 'MATCH CENTER',
        'btn-buy-ticket': 'BUY TICKET',
        'btn-streaming': 'STREAMING',
        
        'design-title': 'THE GREAT BLUEPRINT',
        'design-subtitle': 'A perfect blend of modern technology and a century of heritage.',
        'design-heat-rdy': 'HEAT.RDY Technology',
        'design-heat-desc': 'Advanced air circulation system, keeps you cool in every explosive moment.',
        'design-authentic': 'Authentic Details',
        'design-authentic-desc': 'Subtle interwoven patterns inspired by Old Trafford architecture.',
        'design-eco': 'Eco-Friendly Material',
        'design-eco-desc': 'Made from 100% recycled polyester, protecting the planet.',
        
        'collection-title': 'THE COLLECTION',
        'collection-subtitle': 'Choose the perfect kit for every match.',
        'authentic-edition': 'AUTHENTIC EDITION 24/25',
        'home-shirt': 'Home Shirt 24/25',
        'home-desc': 'Custom name/number embroidery on request',
        'explore-details': 'Explore Details',
        'away-shirt': 'Away Shirt 24/25',
        'order-kit': 'Order Kit',
        'third-kit': 'Third Kit',
        'explore': 'Explore',
        'training': 'Training',
        
        'about-subtitle': 'BUILT ON PASSION. DRIVEN BY UNITY.',
        'about-title': 'BUILT ON. DRIVEN BY<br>UNITY. <span class="highlight-outline">PASSION.</span><br>GLORY.',
        'about-desc': 'FOUNDED WITH THE SPIRIT OF TEAMWORK AND DEDICATION, OUR FOOTBALL CLUB HAS GROWN INTO A SYMBOL OF PRIDE, UNITY, AND EXCELLENCE. WE\'RE COMMITTED TO DEVELOPING TALENT, INSPIRING FANS, AND CONQUERING EVERY CHALLENGE.',
        'about-youth': 'YOUTH DEVELOPMENT PROGRAMS',
        'about-coaching': 'AWARD-WINNING COACHING STAFF',
        'about-fanbase': 'GLOBAL FANBASE CONNECTION',
        'about-training': 'STATE-OF-THE-ART TRAINING',
        'more-about-us': 'MORE ABOUT US',
        
        'honours-title': 'HONOURS & ACHIEVEMENTS',
        'pl-desc': 'Record top-flight English titles',
        'ucl-desc': 'European Pinnacle (1968, 1999, 2008)',
        'fa-desc': 'Oldest heritage in England',
        'cwc-desc': 'Club World Champions',
        'treble-desc': 'The legendary great treble',
        'fans-desc': 'Fans voted award',
        
        'newsletter-title': 'JOIN UNITED FAMILY',
        'newsletter-desc': 'Subscribe to our newsletter to get the latest limited edition shirts and receive a 10% discount voucher for your first order.',
        'newsletter-placeholder': 'Enter your email address',
        'newsletter-btn': 'SUBSCRIBE NOW',
        'newsletter-agree': 'I agree to receive marketing emails from Manchester United.',
        'footer-shop': 'SHOP',
        'footer-support': 'SUPPORT',
        'footer-about': 'ABOUT US',
        'footer-rights': '© 2026 Manchester United Ltd. All rights reserved.',

        // Generic
        'no-products': 'No products in this category.',
        'load-error': 'Unable to load products.',
        'loading': 'Loading data from the system...',
        'all-products': 'ALL PRODUCTS'
    },
    'vi': {
        'lang-btn': 'Tiếng Việt - VNĐ',
        'new-in': 'HÀNG MỚI',
        'jerseys': 'ÁO ĐẤU',
        'trainingwear': 'ĐỒ TẬP',
        'fashion': 'THỜI TRANG',
        'accessories': 'PHỤ KIỆN',
        'gifts': 'QUÀ TẶNG',
        'auctions': 'ĐẤU GIÁ',
        'outlet': 'GIẢM GIÁ',
        'track-order': 'Theo dõi đơn hàng',
        'help': 'Trợ giúp',
        'all-bookmarks': 'Đã lưu',
        'search-placeholder': 'Tìm kiếm sản phẩm, cầu thủ...',
        
        'hero-title': 'CHIẾN GIÁP QUỶ ĐỎ<br>— MÙA GIẢI 2024/25',
        'hero-subtitle': 'Khoác lên mình kiệt tác lịch sử của Nhà hát của những giấc mơ.',
        'explore-kits': 'Khám Phá Bộ Đấu',
        'watch-trailer': 'Xem Trailer 3D',
        'social-proof': 'Hơn 10,000+ CĐV đã sở hữu trong tuần này',
        'marquee-friendly': 'GIAO HỮU CLB',
        
        'match-last': 'TRẬN VỪA QUA',
        'match-next': 'TRẬN TIẾP THEO',
        'match-upcoming': 'TRẬN SẮP TỚI',
        'btn-highlights': 'XEM LẠI',
        'btn-match-center': 'TRUNG TÂM TRẬN ĐẤU',
        'btn-buy-ticket': 'MUA VÉ',
        'btn-streaming': 'XEM TRỰC TIẾP',

        'design-title': 'BẢN THIẾT KẾ VĨ ĐẠI',
        'design-subtitle': 'Sự kết hợp hoàn hảo giữa công nghệ hiện đại và di sản trăm năm.',
        'design-heat-rdy': 'Công nghệ HEAT.RDY',
        'design-heat-desc': 'Hệ thống luân chuyển khí tiên tiến, giữ cơ thể luôn mát mẻ trong mọi khoảnh khắc bùng nổ.',
        'design-authentic': 'Chi Tiết Nguyên Bản',
        'design-authentic-desc': 'Các đường vân chìm đan xen lấy cảm hứng từ kiến trúc sân Old Trafford.',
        'design-eco': 'Chất Liệu Xanh',
        'design-eco-desc': 'Sản xuất từ 100% polyester tái chế, chung tay bảo vệ môi trường trái đất.',

        'collection-title': 'BỘ SƯU TẬP',
        'collection-subtitle': 'Lựa chọn bộ trang phục hoàn hảo cho mọi trận đấu của bạn.',
        'authentic-edition': 'BẢN CHÍNH THỨC 24/25',
        'home-shirt': 'Áo Sân Nhà 24/25',
        'home-desc': 'Thêu tên/số áo tùy chọn theo yêu cầu',
        'explore-details': 'Khám Phá Chi Tiết',
        'away-shirt': 'Áo Sân Khách 24/25',
        'order-kit': 'Đặt May Áo Đấu',
        'third-kit': 'Áo Đấu Thứ Ba',
        'explore': 'Khám Phá',
        'training': 'Đồ Tập',

        'about-subtitle': 'XÂY DỰNG TỪ ĐAM MÊ. DẪN DẮT BỞI SỰ ĐOÀN KẾT.',
        'about-title': 'XÂY DỰNG. DẪN DẮT BỞI<br>ĐOÀN KẾT. <span class="highlight-outline">ĐAM MÊ.</span><br>VINH QUANG.',
        'about-desc': 'ĐƯỢC THÀNH LẬP VỚI TINH THẦN ĐỒNG ĐỘI VÀ SỰ TẬN TÂM, CÂU LẠC BỘ BÓNG ĐÁ CỦA CHÚNG TÔI ĐÃ PHÁT TRIỂN THÀNH BIỂU TƯỢNG CỦA NIỀM TỰ HÀO, SỰ ĐOÀN KẾT VÀ XUẤT SẮC. CHÚNG TÔI CAM KẾT PHÁT TRIỂN TÀI NĂNG, TRUYỀN CẢM HỨNG CHO NGƯỜI HÂM MỘ VÀ CHINH PHỤC MỌI THỬ THÁCH.',
        'about-youth': 'CHƯƠNG TRÌNH PHÁT TRIỂN TRẺ',
        'about-coaching': 'ĐỘI NGŨ HUẤN LUYỆN VIÊN ĐẠT GIẢI',
        'about-fanbase': 'KẾT NỐI FAN TOÀN CẦU',
        'about-training': 'CƠ SỞ TẬP LUYỆN HIỆN ĐẠI',
        'more-about-us': 'TÌM HIỂU THÊM VỀ CHÚNG TÔI',

        'honours-title': 'DANH HIỆU & THÀNH TỰU',
        'pl-desc': 'Kỷ lục vô địch giải đấu cao nhất nước Anh',
        'ucl-desc': 'Đỉnh cao châu Âu (1968, 1999, 2008)',
        'fa-desc': 'Di sản lâu đời bậc nhất xứ sở sương mù',
        'cwc-desc': 'Nhà vô địch thế giới cấp câu lạc bộ',
        'treble-desc': 'Cú ăn ba huyền thoại vĩ đại',
        'fans-desc': 'Giải thưởng do người hâm mộ bình chọn',
        
        'newsletter-title': 'GIA NHẬP ĐẠI GIA ĐÌNH UNITED',
        'newsletter-desc': 'Đăng ký nhận bản tin để cập nhật những mẫu áo giới hạn mới nhất và nhận ngay Voucher giảm giá 10% cho đơn hàng đầu tiên.',
        'newsletter-placeholder': 'Nhập địa chỉ email của bạn',
        'newsletter-btn': 'ĐĂNG KÝ NGAY',
        'newsletter-agree': 'Tôi đồng ý nhận email marketing từ Manchester United.',
        'footer-shop': 'MUA SẮM',
        'footer-support': 'HỖ TRỢ',
        'footer-about': 'VỀ CHÚNG TÔI',
        'footer-rights': '© 2026 Manchester United Ltd. Bảo lưu mọi quyền.',

        'no-products': 'Hiện chưa có sản phẩm nào thuộc mục này.',
        'load-error': 'Không thể tải sản phẩm.',
        'loading': 'Đang tải dữ liệu sản phẩm từ hệ thống...',
        'all-products': 'TẤT CẢ SẢN PHẨM'
    }
};

function translatePage(lang) {
    if (!translations[lang]) return;
    
    // Update active lang toggle text
    const currentLangText = document.getElementById('current-lang');
    if (currentLangText) {
        currentLangText.textContent = translations[lang]['lang-btn'];
    }

    // Replace all placeholder attributes that have data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    // Replace all text elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            // Check if element contains HTML tags inside the translation string
            if (translations[lang][key].includes('<')) {
                el.innerHTML = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
}

function setLanguage(lang) {
    localStorage.setItem('preferredLang', lang);
    translatePage(lang);
}

// Setup Event Listeners
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    translatePage(savedLang);

    // Lang toggle logic
    document.body.addEventListener('click', (e) => {
        const langDropdown = e.target.closest('.lang-dropdown');
        const langMenu = document.getElementById('lang-menu');
        
        if (langDropdown) {
            langMenu.classList.toggle('active');
        } else if (langMenu && langMenu.classList.contains('active')) {
            langMenu.classList.remove('active');
        }
    });

    // Lang select logic
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('[data-lang]')) {
            e.preventDefault();
            const lang = e.target.getAttribute('data-lang');
            setLanguage(lang);
            const langMenu = document.getElementById('lang-menu');
            if (langMenu) langMenu.classList.remove('active');
        }
    });
});
