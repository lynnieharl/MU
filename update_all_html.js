const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const replacements = {
    'THAM GIA CÂU LẠC BỘ VIP': '<span data-i18n="join-vip">JOIN VIP CLUB</span>',
    'Đăng ký nhận bản tin để cập nhật những mẫu áo giới hạn mới nhất và nhận ngay Voucher giảm giá 10% cho đơn hàng đầu tiên.': '<span data-i18n="newsletter-desc">Subscribe to our newsletter to get updates on limited edition shirts and receive a 10% discount voucher for your first order.</span>',
    'placeholder="Nhập email của bạn..."': 'placeholder="Enter your email..." data-i18n-placeholder="email-placeholder"',
    'MUA SẮM': '<span data-i18n="shop-footer">SHOP</span>',
    '>Áo đấu sân nhà<': ' data-i18n="home-kits-footer">Home Kits<',
    '>Áo đấu sân khách<': ' data-i18n="away-kits-footer">Away Kits<',
    '>Đồ tập luyện<': ' data-i18n="training-footer">Training Wear<',
    '>Quà lưu niệm<': ' data-i18n="souvenirs-footer">Souvenirs<',
    'HỖ TRỢ': '<span data-i18n="support-footer">SUPPORT</span>',
    '>Tra cứu đơn hàng<': ' data-i18n="track-order-footer">Track Order<',
    '>Chính sách đổi trả<': ' data-i18n="return-policy">Return Policy<',
    '>Hướng dẫn chọn size<': ' data-i18n="size-guide">Size Guide<',
    'VỀ CHÚNG TÔI': '<span data-i18n="about-footer">ABOUT US</span>',
    '>Câu chuyện thương hiệu<': ' data-i18n="brand-story">Brand Story<',
    '>Tuyển dụng<': ' data-i18n="careers">Careers<',
    '>Phát triển bền vững<': ' data-i18n="sustainability">Sustainability<',
    '>Liên hệ<': ' data-i18n="contact">Contact<',
    'Cửa hàng trực tuyến chính thức của Manchester United tại Việt Nam. Nơi lan tỏa niềm đam mê và tự hào của bầy Quỷ Đỏ.': '<span data-i18n="store-desc">Official Manchester United Online Store in Vietnam. The place to spread the passion and pride of the Red Devils.</span>',
    'Đánh giá từ những cổ động viên nhiệt thành nhất toàn cầu.': '<span data-i18n="reviews-desc">Reviews from the most passionate fans worldwide.</span>',
    '"Chất vải thực sự ở một đẳng cấp khác. Tôi mặc đi đá banh suốt 2 tiếng mà không hề cảm thấy bí bách. Đáng từng xu!"': '"<span data-i18n="review-1">The fabric quality is on another level. I played football for 2 hours and didn\'t feel stuffy at all. Worth every penny!</span>"',
    '"Giao hàng cực kỳ nhanh. Logo thêu nổi cực kỳ sắc nét, nhìn sang trọng hơn hẳn các mẫu năm trước. Glory Glory Man United!"': '"<span data-i18n="review-2">Extremely fast delivery. The embroidered logo is very sharp and looks much more luxurious than previous models. Glory Glory Man United!</span>"',
    '"Món quà sinh nhật hoàn hảo cho con trai tôi. Form dáng rất chuẩn, mặc lên trông rất khỏe khoắn. Sẽ ủng hộ shop dài dài."': '"<span data-i18n="review-3">The perfect birthday gift for my son. The form fits perfectly and looks very sporty. Will support the shop for a long time.</span>"'
};

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let hasChanges = false;
    for (const [oldStr, newStr] of Object.entries(replacements)) {
        if (content.includes(oldStr)) {
            content = content.replace(oldStr, newStr);
            hasChanges = true;
        }
    }
    if (hasChanges) {
        fs.writeFileSync(file, content);
        console.log('Updated ' + file);
    }
}
