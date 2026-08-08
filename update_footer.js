const fs = require('fs');

let index_html = fs.readFileSync('index.html', 'utf8');

const replacements = {
    '<h3>Tham gia câu lạc bộ VIP</h3>': '<h3 data-i18n="join-vip">JOIN VIP CLUB</h3>',
    '<h4>Mua Sắm</h4>': '<h4 data-i18n="shop-footer">SHOP</h4>',
    '<h4>Hỗ Trợ</h4>': '<h4 data-i18n="support-footer">SUPPORT</h4>',
    '<h4>Về Chúng Tôi</h4>': '<h4 data-i18n="about-footer">ABOUT US</h4>'
};

for (const [oldStr, newStr] of Object.entries(replacements)) {
    index_html = index_html.replace(oldStr, newStr);
}

fs.writeFileSync('index.html', index_html);
