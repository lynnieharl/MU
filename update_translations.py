import json

# Read i18n.js
with open('js/i18n.js', 'r', encoding='utf-8') as f:
    i18n_content = f.read()

# Add new translations
new_translations = {
    'join-vip': 'THAM GIA CÂU LẠC BỘ VIP',
    'newsletter-desc': 'Đăng ký nhận bản tin để cập nhật những mẫu áo giới hạn mới nhất và nhận ngay Voucher giảm giá 10% cho đơn hàng đầu tiên.',
    'shop-footer': 'MUA SẮM',
    'home-kits-footer': 'Áo đấu sân nhà',
    'away-kits-footer': 'Áo đấu sân khách',
    'training-footer': 'Đồ tập luyện',
    'souvenirs-footer': 'Quà lưu niệm',
    'support-footer': 'HỖ TRỢ',
    'track-order-footer': 'Tra cứu đơn hàng',
    'return-policy': 'Chính sách đổi trả',
    'size-guide': 'Hướng dẫn chọn size',
    'about-footer': 'VỀ CHÚNG TÔI',
    'brand-story': 'Câu chuyện thương hiệu',
    'careers': 'Tuyển dụng',
    'sustainability': 'Phát triển bền vững',
    'contact': 'Liên hệ',
    'store-desc': 'Cửa hàng trực tuyến chính thức của Manchester United tại Việt Nam. Nơi lan tỏa niềm đam mê và tự hào của bầy Quỷ Đỏ.',
    'reviews-desc': 'Đánh giá từ những cổ động viên nhiệt thành nhất toàn cầu.',
    'review-1': 'Chất vải thực sự ở một đẳng cấp khác. Tôi mặc đi đá banh suốt 2 tiếng mà không hề cảm thấy bí bách. Đáng từng xu!',
    'review-2': 'Giao hàng cực kỳ nhanh. Logo thêu nổi cực kỳ sắc nét, nhìn sang trọng hơn hẳn các mẫu năm trước. Glory Glory Man United!',
    'review-3': 'Món quà sinh nhật hoàn hảo cho con trai tôi. Form dáng rất chuẩn, mặc lên trông rất khỏe khoắn. Sẽ ủng hộ shop dài dài.'
}

# Find the dictionary in i18n.js and insert new translations
for key, vi_text in new_translations.items():
    if f"'{key}':" not in i18n_content and f'"{key}":' not in i18n_content:
        # Insert right after 'vi': {
        insert_str = f"\n        '{key}': '{vi_text}',"
        i18n_content = i18n_content.replace("'vi': {", "'vi': {" + insert_str)

with open('js/i18n.js', 'w', encoding='utf-8') as f:
    f.write(i18n_content)

# Process index.html to add data-i18n attributes and translate text to English
with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

replacements = {
    'THAM GIA CÂU LẠC BỘ VIP': '<span data-i18n="join-vip">JOIN VIP CLUB</span>',
    'Đăng ký nhận bản tin để cập nhật những mẫu áo giới hạn mới nhất và nhận ngay Voucher giảm giá 10% cho đơn hàng đầu tiên.': '<span data-i18n="newsletter-desc">Subscribe to our newsletter to get updates on limited edition shirts and receive a 10% discount voucher for your first order.</span>',
    'placeholder="Nhập email của bạn..."': 'placeholder="Enter your email..." data-i18n-placeholder="email-placeholder"', # wait, need to add email-placeholder to dict!
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
}

for old, new in replacements.items():
    index_html = index_html.replace(old, new)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_html)
