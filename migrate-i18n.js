const fs = require('fs');
const path = require('path');

const htmlFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

const langDropdownHTML = `
            <div class="lang-dropdown" style="position: relative; display: inline-block;">
                <button class="top-bar-btn" id="lang-toggle" style="background: none; border: none; color: inherit; font: inherit; cursor: pointer; display: flex; align-items: center; gap: 5px;"><i class="fa-solid fa-globe"></i> <span id="current-lang" data-i18n="lang-btn">English - US$</span> <i class="fa-solid fa-chevron-down" style="font-size: 0.8em;"></i></button>
                <div class="lang-menu" id="lang-menu" style="display: none; position: absolute; top: 100%; left: 0; background: #fff; color: #000; min-width: 150px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border-radius: 4px; z-index: 1000; overflow: hidden; margin-top: 5px;">
                    <a href="#" data-lang="en" style="display: block; padding: 10px 15px; text-decoration: none; color: #333; font-weight: 500; font-size: 13px; border-bottom: 1px solid #eee;">English</a>
                    <a href="#" data-lang="vi" style="display: block; padding: 10px 15px; text-decoration: none; color: #333; font-weight: 500; font-size: 13px;">Tiếng Việt</a>
                </div>
            </div>
`;

// Simple replacements for English translation and data-i18n injection for index.html
const indexReplacements = [
    {
        from: /<h1 class="lux-hero-title">CHIẾN GIÁP QUỶ ĐỎ<br>— MÙA GIẢI 2024\/25<\/h1>/g,
        to: '<h1 class="lux-hero-title" data-i18n="hero-title">THE RED DEVILS ARMOR<br>— 2024/25 SEASON</h1>'
    },
    {
        from: /<h1 class="lux-hero-title">THE RED DEVILS ARMOR<br>— 2024\/25 SEASON<\/h1>/g,
        to: '<h1 class="lux-hero-title" data-i18n="hero-title">THE RED DEVILS ARMOR<br>— 2024/25 SEASON</h1>'
    },
    {
        from: /<p class="lux-hero-subtitle">Khoác lên mình kiệt tác lịch sử của Nhà hát của những giấc mơ\.<\/p>/g,
        to: '<p class="lux-hero-subtitle" data-i18n="hero-subtitle">Don the historic masterpiece of the Theatre of Dreams.</p>'
    },
    {
        from: /<a href="kits-home.html" class="lux-btn-primary"><i class="fas fa-shopping-bag"><\/i> Khám Phá Bộ Đấu<\/a>/g,
        to: '<a href="kits-home.html" class="lux-btn-primary"><i class="fas fa-shopping-bag"></i> <span data-i18n="explore-kits">Explore Kits</span></a>'
    },
    {
        from: /<a href="#" class="lux-btn-secondary" onclick="alert\('Tính năng đang phát triển!'\)"><i class="fas fa-play"><\/i> Xem Trailer 3D<\/a>/g,
        to: '<a href="#" class="lux-btn-secondary" onclick="alert(\'Coming soon!\')"><i class="fas fa-play"></i> <span data-i18n="watch-trailer">Watch 3D Trailer</span></a>'
    },
    {
        from: /<span style="font-weight: 500; font-size: 0.95rem;">Hơn 10,000\+ CĐV đã sở hữu trong tuần này<\/span>/g,
        to: '<span style="font-weight: 500; font-size: 0.95rem;" data-i18n="social-proof">Over 10,000+ fans got theirs this week</span>'
    },
    {
        from: /<h2 class="lux-section-title title-design">BẢN THIẾT KẾ VĨ ĐẠI<\/h2>/g,
        to: '<h2 class="lux-section-title title-design" data-i18n="design-title">THE GREAT BLUEPRINT</h2>'
    },
    {
        from: /<p class="lux-section-subtitle">Sự kết hợp hoàn hảo giữa công nghệ hiện đại và di sản trăm năm\.<\/p>/g,
        to: '<p class="lux-section-subtitle" data-i18n="design-subtitle">A perfect blend of modern technology and a century of heritage.</p>'
    },
    {
        from: /<h3 class="lux-feature-title">Công nghệ HEAT\.RDY<\/h3>/g,
        to: '<h3 class="lux-feature-title" data-i18n="design-heat-rdy">HEAT.RDY Technology</h3>'
    },
    {
        from: /<p class="lux-feature-desc">Hệ thống luân chuyển khí tiên tiến, giữ cơ thể luôn mát mẻ trong mọi khoảnh khắc bùng nổ\.<\/p>/g,
        to: '<p class="lux-feature-desc" data-i18n="design-heat-desc">Advanced air circulation system, keeps you cool in every explosive moment.</p>'
    },
    {
        from: /<h3 class="lux-feature-title">Chi Tiết Nguyên Bản<\/h3>/g,
        to: '<h3 class="lux-feature-title" data-i18n="design-authentic">Authentic Details</h3>'
    },
    {
        from: /<p class="lux-feature-desc">Các đường vân chìm đan xen lấy cảm hứng từ kiến trúc sân Old Trafford\.<\/p>/g,
        to: '<p class="lux-feature-desc" data-i18n="design-authentic-desc">Subtle interwoven patterns inspired by Old Trafford architecture.</p>'
    },
    {
        from: /<h3 class="lux-feature-title">Chất Liệu Xanh<\/h3>/g,
        to: '<h3 class="lux-feature-title" data-i18n="design-eco">Eco-Friendly Material</h3>'
    },
    {
        from: /<p class="lux-feature-desc">Sản xuất từ 100% polyester tái chế, chung tay bảo vệ môi trường trái đất\.<\/p>/g,
        to: '<p class="lux-feature-desc" data-i18n="design-eco-desc">Made from 100% recycled polyester, protecting the planet.</p>'
    },
    {
        from: /<h2 class="lux-section-title title-collection">THE COLLECTION<\/h2>/g,
        to: '<h2 class="lux-section-title title-collection" data-i18n="collection-title">THE COLLECTION</h2>'
    },
    {
        from: /<p class="lux-section-subtitle">Lựa chọn bộ trang phục hoàn hảo cho mọi trận đấu của bạn\.<\/p>/g,
        to: '<p class="lux-section-subtitle" data-i18n="collection-subtitle">Choose the perfect kit for every match.</p>'
    },
    {
        from: /<div class="lux-vip-badge">AUTHENTIC EDITION 24\/25<\/div>/g,
        to: '<div class="lux-vip-badge" data-i18n="authentic-edition">AUTHENTIC EDITION 24/25</div>'
    },
    {
        from: /<p class="lux-bento-subtitle">Thêu tên\/số áo tùy chọn theo yêu cầu<\/p>/g,
        to: '<p class="lux-bento-subtitle" data-i18n="home-desc">Custom name/number embroidery on request</p>'
    },
    {
        from: />Khám Phá Chi Tiết<\/button>/g,
        to: ' data-i18n="explore-details">Explore Details</button>'
    },
    {
        from: />Đặt May Áo Đấu<\/button>/g,
        to: ' data-i18n="order-kit">Order Kit</button>'
    },
    {
        from: />Khám Phá<\/button>/g,
        to: ' data-i18n="explore">Explore</button>'
    },
    {
        from: /<div class="about-subtitle">BUILT ON PASSION\. DRIVEN BY UNITY\.<\/div>/g,
        to: '<div class="about-subtitle" data-i18n="about-subtitle">BUILT ON PASSION. DRIVEN BY UNITY.</div>'
    },
    {
        from: /<h2 class="about-title">BUILT ON\. DRIVEN BY<br>UNITY\. <span class="highlight-outline">PASSION\.<\/span><br>GLORY\.<\/h2>/g,
        to: '<h2 class="about-title" data-i18n="about-title">BUILT ON. DRIVEN BY<br>UNITY. <span class="highlight-outline">PASSION.</span><br>GLORY.</h2>'
    },
    {
        from: /<p class="about-desc">\s*FOUNDED WITH THE SPIRIT OF TEAMWORK AND DEDICATION, OUR FOOTBALL CLUB HAS GROWN INTO A SYMBOL OF PRIDE, UNITY, AND EXCELLENCE\. WE'RE COMMITTED TO DEVELOPING TALENT, INSPIRING FANS, AND CONQUERING EVERY CHALLENGE\.\s*<\/p>/g,
        to: '<p class="about-desc" data-i18n="about-desc">FOUNDED WITH THE SPIRIT OF TEAMWORK AND DEDICATION, OUR FOOTBALL CLUB HAS GROWN INTO A SYMBOL OF PRIDE, UNITY, AND EXCELLENCE. WE\'RE COMMITTED TO DEVELOPING TALENT, INSPIRING FANS, AND CONQUERING EVERY CHALLENGE.</p>'
    },
    {
        from: />\s*YOUTH DEVELOPMENT PROGRAMS\s*<\/div>/g,
        to: '><span data-i18n="about-youth">YOUTH DEVELOPMENT PROGRAMS</span></div>'
    },
    {
        from: />\s*AWARD-WINNING COACHING STAFF\s*<\/div>/g,
        to: '><span data-i18n="about-coaching">AWARD-WINNING COACHING STAFF</span></div>'
    },
    {
        from: />\s*GLOBAL FANBASE CONNECTION\s*<\/div>/g,
        to: '><span data-i18n="about-fanbase">GLOBAL FANBASE CONNECTION</span></div>'
    },
    {
        from: />\s*STATE-OF-THE-ART TRAINING\s*<\/div>/g,
        to: '><span data-i18n="about-training">STATE-OF-THE-ART TRAINING</span></div>'
    },
    {
        from: /MORE ABOUT US <i class="fas fa-arrow-right"><\/i>/g,
        to: '<span data-i18n="more-about-us">MORE ABOUT US</span> <i class="fas fa-arrow-right"></i>'
    },
    {
        from: /<h2 class="lux-honours-title">HONOURS & ACHIEVEMENTS<\/h2>/g,
        to: '<h2 class="lux-honours-title" data-i18n="honours-title">HONOURS & ACHIEVEMENTS</h2>'
    },
    {
        from: /<div class="lux-award-desc">Kỷ lục vô địch giải đấu cao nhất nước Anh<\/div>/g,
        to: '<div class="lux-award-desc" data-i18n="pl-desc">Record top-flight English titles</div>'
    },
    {
        from: /<div class="lux-award-desc">Đỉnh cao châu Âu \(1968, 1999, 2008\)<\/div>/g,
        to: '<div class="lux-award-desc" data-i18n="ucl-desc">European Pinnacle (1968, 1999, 2008)</div>'
    },
    {
        from: /<div class="lux-award-desc">Di sản lâu đời bậc nhất xứ sở sương mù<\/div>/g,
        to: '<div class="lux-award-desc" data-i18n="fa-desc">Oldest heritage in England</div>'
    },
    {
        from: /<div class="lux-award-desc">Nhà vô địch thế giới cấp câu lạc bộ<\/div>/g,
        to: '<div class="lux-award-desc" data-i18n="cwc-desc">Club World Champions</div>'
    },
    {
        from: /<div class="lux-award-desc">Cú ăn ba huyền thoại vĩ đại<\/div>/g,
        to: '<div class="lux-award-desc" data-i18n="treble-desc">The legendary great treble</div>'
    },
    {
        from: /<div class="lux-award-desc">Giải thưởng do người hâm mộ bình chọn<\/div>/g,
        to: '<div class="lux-award-desc" data-i18n="fans-desc">Fans voted award</div>'
    },
    {
        from: /<h2 class="newsletter-title">GIA NHẬP ĐẠI GIA ĐÌNH UNITED<\/h2>/g,
        to: '<h2 class="newsletter-title" data-i18n="newsletter-title">JOIN UNITED FAMILY</h2>'
    },
    {
        from: /<p class="newsletter-desc">Đăng ký nhận bản tin để cập nhật những mẫu áo giới hạn mới nhất và nhận ngay Voucher giảm giá 10% cho đơn hàng đầu tiên\.<\/p>/g,
        to: '<p class="newsletter-desc" data-i18n="newsletter-desc">Subscribe to our newsletter to get the latest limited edition shirts and receive a 10% discount voucher for your first order.</p>'
    },
    {
        from: /placeholder="Nhập địa chỉ email của bạn"/g,
        to: 'placeholder="Enter your email address" data-i18n-placeholder="newsletter-placeholder"'
    },
    {
        from: /<button type="submit" class="newsletter-btn">ĐĂNG KÝ NGAY<\/button>/g,
        to: '<button type="submit" class="newsletter-btn" data-i18n="newsletter-btn">SUBSCRIBE NOW</button>'
    },
    {
        from: /<span class="checkbox-text">Tôi đồng ý nhận email marketing từ Manchester United\.<\/span>/g,
        to: '<span class="checkbox-text" data-i18n="newsletter-agree">I agree to receive marketing emails from Manchester United.</span>'
    },
    {
        from: /<button class="top-bar-btn"><i class="fa-solid fa-globe"><\/i> English - US\$<\/button>/g,
        to: langDropdownHTML
    }
];

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. Inject i18n script if missing
    if (!content.includes('i18n.js')) {
        content = content.replace('</body>', '    <script defer src="js/i18n.js"></script>\n</body>');
    }

    // 2. Add some styles for lang menu dynamically or inline in HTML? 
    // We already added inline styles for the dropdown to avoid touching CSS which is safer for this script.

    // 3. Replace Button with Dropdown (across all files)
    content = content.replace(/<button class="top-bar-btn"><i class="fa-solid fa-globe"><\/i> English - US\$<\/button>/g, langDropdownHTML);

    // 4. In index.html specifically, do the heavy translations
    if (file === 'index.html' || file === 'jerseys.html') {
        indexReplacements.forEach(rep => {
            content = content.replace(rep.from, rep.to);
        });
    }

    fs.writeFileSync(file, content);
    console.log(`Processed ${file}`);
});
