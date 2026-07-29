const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Add AOS CSS and luxury.css to head
if (!content.includes('luxury.css')) {
    content = content.replace('</head>', 
`    <!-- AOS CSS & Luxury Mode -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <link rel="stylesheet" href="luxury.css">
</head>`);
}

// 2. Add luxury-mode class to body
if (!content.includes('<body class="luxury-mode">')) {
    content = content.replace('<body>', '<body class="luxury-mode">');
}

// 3. Replace body content
const startMarker = '    <section class="hero-carousel-section">';
const endMarker = '    </footer>';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker) + endMarker.length;

if (startIdx !== -1 && endIdx !== -1) {
    const luxuryHTML = `
    <!-- ==========================================
         [LUXURY] 1. CINEMATIC HERO SECTION
         ========================================== -->
    <section class="lux-hero" data-aos="fade-in">
        <img src="images/3_mt-gp-1-hero-banner-desktop.jpg" alt="Home Kit Banner" class="lux-hero-bg">
        <div class="lux-hero-overlay"></div>
        <div class="lux-hero-content" data-aos="fade-up" data-aos-delay="200">
            <h1 class="lux-hero-title">THE RED DEVILS ARMOR<br>— 2024/25 SEASON</h1>
            <p class="lux-hero-subtitle">Khoác lên mình kiệt tác lịch sử của Nhà hát của những giấc mơ.</p>
            <div class="lux-hero-actions">
                <a href="kits-home.html" class="lux-btn-primary"><i class="fas fa-shopping-bag"></i> Khám Phá Bộ Đấu</a>
                <a href="#" class="lux-btn-secondary" onclick="alert('Tính năng đang phát triển!')"><i class="fas fa-play"></i> Xem Trailer 3D</a>
            </div>
        </div>
        
        <div class="lux-social-proof" data-aos="fade-right" data-aos-delay="500">
            <i class="fas fa-bolt" style="color: #ffbe00; font-size: 1.2rem;"></i>
            <span style="font-weight: 500; font-size: 0.95rem;">Hơn 10,000+ CĐV đã sở hữu trong tuần này</span>
        </div>
    </section>

    <!-- ==========================================
         [LUXURY] 2. 3D FEATURE HIGHLIGHTS
         ========================================== -->
    <section class="lux-section">
        <div class="lux-section-header" data-aos="fade-up">
            <h2 class="lux-section-title">BẢN THIẾT KẾ VĨ ĐẠI</h2>
            <p class="lux-section-subtitle">Sự kết hợp hoàn hảo giữa công nghệ hiện đại và di sản trăm năm.</p>
        </div>
        
        <div class="lux-features-grid">
            <div class="lux-feature-card" data-aos="fade-up" data-aos-delay="100">
                <i class="fas fa-wind lux-feature-icon"></i>
                <h3>HEAT.RDY Technology</h3>
                <p>Chất liệu vải dệt kim siêu nhẹ, tối ưu hóa luồng khí, giữ cho các cầu thủ luôn mát mẻ và khô ráo dưới mọi áp lực.</p>
            </div>
            <div class="lux-feature-card" data-aos="fade-up" data-aos-delay="200">
                <i class="fas fa-shield-alt lux-feature-icon"></i>
                <h3>Authentic Crest</h3>
                <p>Logo Manchester United được thêu nổi 3D tinh xảo trên ngực trái, biểu tượng của niềm tự hào bất diệt.</p>
            </div>
            <div class="lux-feature-card" data-aos="fade-up" data-aos-delay="300">
                <i class="fas fa-leaf lux-feature-icon"></i>
                <h3>Sustainable Fabric</h3>
                <p>Được dệt hoàn toàn từ 100% nhựa tái chế đại dương Parley, cam kết bảo vệ môi trường toàn cầu.</p>
            </div>
        </div>
    </section>

    <!-- ==========================================
         [LUXURY] 3. BENTO GRID COLLECTION
         ========================================== -->
    <section class="lux-section">
        <div class="lux-section-header" data-aos="fade-up">
            <h2 class="lux-section-title">THE COLLECTION</h2>
            <p class="lux-section-subtitle">Lựa chọn bộ trang phục hoàn hảo cho mọi trận đấu của bạn.</p>
        </div>
        
        <div class="lux-bento-grid">
            <!-- Home Kit (Large) -->
            <div class="lux-bento-item lux-bento-large" data-aos="fade-up">
                <img src="images/8_4c77739191924bede382dbf20ab1a413.jpg" alt="Home Kit">
                <div class="lux-bento-content">
                    <h3>Home Shirt 24/25</h3>
                    <div class="lux-bento-price">$120.00</div>
                    <button class="lux-quick-add" onclick="window.location.href='kits-home.html'">Quick Add to Cart</button>
                </div>
            </div>
            
            <!-- Away Kit (Medium) -->
            <div class="lux-bento-item lux-bento-medium" data-aos="fade-left" data-aos-delay="100">
                <img src="images/9_bebbf6efd4d3e67fa7281f6bdf8429a6.jpg" alt="Away Kit">
                <div class="lux-bento-content">
                    <h3>Away Shirt 24/25</h3>
                    <div class="lux-bento-price">$110.00</div>
                    <button class="lux-quick-add" onclick="window.location.href='kits-away.html'">Quick Add</button>
                </div>
            </div>
            
            <!-- Third Kit (Small) -->
            <div class="lux-bento-item lux-bento-small" data-aos="fade-up" data-aos-delay="200">
                <img src="images/10_557b882a41d5bc6a7934615bbc14b842.jpg" alt="Third Kit">
                <div class="lux-bento-content">
                    <h3>Third Kit</h3>
                    <div class="lux-bento-price">$110.00</div>
                    <button class="lux-quick-add" onclick="window.location.href='kits-third.html'">Quick Add</button>
                </div>
            </div>
            
            <!-- Training (Small) -->
            <div class="lux-bento-item lux-bento-small" data-aos="fade-up" data-aos-delay="300">
                <img src="images/19_c09dd81f09a6c8db0ef921ae63aaf881.jpg" alt="Training">
                <div class="lux-bento-content">
                    <h3>Training</h3>
                    <div class="lux-bento-price">$65.00</div>
                    <button class="lux-quick-add" onclick="window.location.href='category.html?type=Training'">Explore</button>
                </div>
            </div>
        </div>
    </section>

    <!-- ==========================================
         [LUXURY] 4. HERITAGE TIMELINE
         ========================================== -->
    <section class="lux-heritage">
        <div class="lux-heritage-content" data-aos="zoom-in">
            <h2 class="lux-quote">"Tôi không bao giờ chơi để hòa. Sự vĩ đại của Manchester United là luôn tìm cách chiến thắng."</h2>
            <div class="lux-quote-author">— Sir Alex Ferguson</div>
            
            <div class="lux-timeline">
                <div class="lux-time-node" data-aos="fade-up" data-aos-delay="100">
                    <div class="lux-time-dot">99</div>
                    <div class="lux-time-title">Treble Winners</div>
                    <div class="lux-time-desc">Mùa giải ăn ba lịch sử với thiết kế khóa kéo huyền thoại.</div>
                </div>
                <div class="lux-time-node" data-aos="fade-up" data-aos-delay="200">
                    <div class="lux-time-dot">08</div>
                    <div class="lux-time-title">Moscow Kings</div>
                    <div class="lux-time-desc">Lên đỉnh Châu Âu với sọc trắng ở lưng kinh điển.</div>
                </div>
                <div class="lux-time-node" data-aos="fade-up" data-aos-delay="300">
                    <div class="lux-time-dot">24</div>
                    <div class="lux-time-title">New Era</div>
                    <div class="lux-time-desc">Sự tái sinh với áo đấu tích hợp công nghệ tương lai.</div>
                </div>
            </div>
        </div>
    </section>

    <!-- ==========================================
         [LUXURY] 5. VIP TESTIMONIALS
         ========================================== -->
    <section class="lux-section lux-testimonials">
        <div class="lux-section-header" data-aos="fade-up">
            <h2 class="lux-section-title">THE RED ARMY</h2>
            <p class="lux-section-subtitle">Đánh giá từ những cổ động viên nhiệt thành nhất toàn cầu.</p>
        </div>
        
        <div class="lux-testi-grid">
            <div class="lux-testi-card" data-aos="fade-left" data-aos-delay="100">
                <div class="lux-testi-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                <p class="lux-testi-text">"Chất vải thực sự ở một đẳng cấp khác. Tôi mặc đi đá banh suốt 2 tiếng mà không hề cảm thấy bí bách. Đáng từng xu!"</p>
                <div class="lux-testi-user">
                    <img src="images/bruno.jpg" alt="Fan" class="lux-testi-avatar" onerror="this.src='images/0_Manchester_United_FC_crest.svg'">
                    <div>
                        <div class="lux-testi-name">Hoàng Nguyễn</div>
                        <div class="lux-testi-badge"><i class="fas fa-check-circle"></i> Verified Buyer</div>
                    </div>
                </div>
            </div>
            
            <div class="lux-testi-card" data-aos="fade-left" data-aos-delay="200">
                <div class="lux-testi-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                <p class="lux-testi-text">"Giao hàng cực kỳ nhanh. Logo thêu nổi cực kỳ sắc nét, nhìn sang trọng hơn hẳn các mẫu năm trước. Glory Glory Man United!"</p>
                <div class="lux-testi-user">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" alt="Fan" class="lux-testi-avatar" crossorigin="anonymous">
                    <div>
                        <div class="lux-testi-name">David Tran</div>
                        <div class="lux-testi-badge"><i class="fas fa-check-circle"></i> Verified Buyer</div>
                    </div>
                </div>
            </div>
            
            <div class="lux-testi-card" data-aos="fade-left" data-aos-delay="300">
                <div class="lux-testi-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></div>
                <p class="lux-testi-text">"Món quà sinh nhật hoàn hảo cho con trai tôi. Form dáng rất chuẩn, mặc lên trông rất khỏe khoắn. Sẽ ủng hộ shop dài dài."</p>
                <div class="lux-testi-user">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop" alt="Fan" class="lux-testi-avatar" crossorigin="anonymous">
                    <div>
                        <div class="lux-testi-name">Thùy Linh</div>
                        <div class="lux-testi-badge"><i class="fas fa-check-circle"></i> Verified Buyer</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ==========================================
         [LUXURY] 6. GLOBAL FOOTER
         ========================================== -->
    <footer class="lux-footer">
        <div class="lux-footer-top">
            <div class="lux-newsletter" data-aos="fade-up">
                <h3>Tham gia câu lạc bộ VIP</h3>
                <p>Đăng ký nhận bản tin để cập nhật những mẫu áo giới hạn mới nhất và nhận ngay Voucher giảm giá 10% cho đơn hàng đầu tiên.</p>
                <form class="lux-news-form" onsubmit="event.preventDefault(); alert('Cảm ơn bạn đã đăng ký!');">
                    <input type="email" class="lux-news-input" placeholder="Nhập email của bạn..." required>
                    <button type="submit" class="lux-btn-primary" style="padding: 15px 25px;"><i class="fas fa-paper-plane"></i></button>
                </form>
            </div>
            
            <div class="lux-payments" data-aos="fade-up" data-aos-delay="100">
                <i class="fab fa-cc-visa"></i>
                <i class="fab fa-cc-mastercard"></i>
                <i class="fab fa-cc-paypal"></i>
                <i class="fab fa-cc-apple-pay"></i>
                <img src="images/22_PayPal.svg" alt="Paypal" style="height: 24px;">
            </div>
        </div>
        
        <div class="lux-footer-main">
            <div class="lux-footer-brand" data-aos="fade-up">
                <img src="images/0_Manchester_United_FC_crest.svg" alt="MU Logo" style="width: 60px; margin-bottom: 20px;">
                <h3 style="color: white; margin-bottom: 10px;">UNITED STORE</h3>
                <p>Cửa hàng trực tuyến chính thức của Manchester United tại Việt Nam. Nơi lan tỏa niềm đam mê và tự hào của bầy Quỷ Đỏ.</p>
            </div>
            
            <div class="lux-footer-links" data-aos="fade-up" data-aos-delay="100">
                <h4>Mua Sắm</h4>
                <ul>
                    <li><a href="kits-home.html">Áo đấu sân nhà</a></li>
                    <li><a href="kits-away.html">Áo đấu sân khách</a></li>
                    <li><a href="category.html?type=Training">Đồ tập luyện</a></li>
                    <li><a href="gifts.html">Quà lưu niệm</a></li>
                </ul>
            </div>
            
            <div class="lux-footer-links" data-aos="fade-up" data-aos-delay="200">
                <h4>Hỗ Trợ</h4>
                <ul>
                    <li><a href="track-order.html">Tra cứu đơn hàng</a></li>
                    <li><a href="#">Chính sách đổi trả</a></li>
                    <li><a href="#">Hướng dẫn chọn size</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </div>
            
            <div class="lux-footer-links" data-aos="fade-up" data-aos-delay="300">
                <h4>Về Chúng Tôi</h4>
                <ul>
                    <li><a href="#">Câu chuyện thương hiệu</a></li>
                    <li><a href="#">Tuyển dụng</a></li>
                    <li><a href="#">Phát triển bền vững</a></li>
                    <li><a href="#">Liên hệ</a></li>
                </ul>
            </div>
        </div>
        
        <div class="lux-footer-bottom">
            <div class="copyright">&copy; 2026 Manchester United Store Vietnam. All rights reserved.</div>
            <div class="lux-socials">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-tiktok"></i></a>
                <a href="#"><i class="fab fa-youtube"></i></a>
            </div>
            <div>
                <img src="https://luatbaoson.vn/wp-content/uploads/2021/04/104192233_136154144729117_5471923055374465548_n-1-1024x388.png" alt="BCT" style="height: 35px; opacity: 0.8;">
            </div>
        </div>
    </footer>`;

    content = content.substring(0, startIdx) + luxuryHTML + content.substring(endIdx);
    
    // Add AOS JS initialization
    if (!content.includes('aos.js')) {
        content = content.replace('</body>', 
`    <!-- AOS JS for Scroll Animations -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });

        // Sticky Header Effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header-wave-bg');
            if (window.scrollY > 50) {
                header.classList.add('lux-scrolled');
            } else {
                header.classList.remove('lux-scrolled');
            }
        });
    </script>
</body>`);
    }

    fs.writeFileSync('index.html', content);
    console.log("Successfully rebuilt index.html for Luxury Mode.");
} else {
    console.log("Could not find the start or end markers to replace content.", startIdx, endIdx);
}
