const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, 'new-in.html'), 'utf8');

// The start grid string to search
const startGridStr = '<div class="category-product-grid grid-4-cols" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;">';
const endGridMarker = '</div>\\r\\n        </div>\\r\\n    </main>';

const startIdx = html.indexOf(startGridStr);
if (startIdx !== -1) {
    const endIdx = html.indexOf(endGridMarker, startIdx);
    if (endIdx !== -1) {
        const before = html.substring(0, startIdx);
        const after = html.substring(endIdx);
        
        // This is safe string concatenation
        let newGrid = '<div id="product-grid" class="category-product-grid grid-4-cols" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;">\\n';
        newGrid += '    <!-- Supabase data will be rendered here -->\\n';
        newGrid += '            ';
        
        html = before + newGrid + after;
    }
}

// Add the script at the end
const scriptLines = [
    '<!-- SUPABASE CLIENT SCRIPT CHO TRANG NEW IN -->',
    '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>',
    '<script>',
    '    const _supabaseUrl = "";',
    '    const _supabaseKey = "";',
    '    let supabase = null;',
    '    if (_supabaseUrl && _supabaseKey) { supabase = supabase.createClient(_supabaseUrl, _supabaseKey); }',
    '    async function loadProducts() {',
    '        const grid = document.getElementById("product-grid");',
    '        if (!grid) return;',
    '        if (!supabase) { grid.innerHTML = "<p style=\\"grid-column: 1 / -1; text-align: center; padding: 50px 0; font-size: 1.1rem; color: var(--color-gray-dark);\\">Chưa cấu hình Supabase Client!</p>"; return; }',
    '        grid.innerHTML = "<p style=\\"grid-column: 1 / -1; text-align: center; padding: 50px 0; font-size: 1.1rem; color: var(--color-gray-dark);\\">Đang tải dữ liệu từ kho...</p>";',
    '        try {',
    '            const { data, error } = await supabase.from("products").select("*");',
    '            if (error) throw error;',
    '            grid.innerHTML = "";',
    '            if (!data || data.length === 0) { grid.innerHTML = "<p style=\\"grid-column: 1 / -1; text-align: center; padding: 50px 0; font-size: 1.1rem; color: var(--color-gray-dark);\\">Hiện chưa có sản phẩm nào.</p>"; return; }',
    '            data.forEach(product => {',
    '                let cardHtml = "<div class=\\"product-card\\">";',
    '                cardHtml += "  <div class=\\"product-image-container image-swap\\">";',
    '                cardHtml += "    <span class=\\"badge-new-product\\">New</span>";',
    '                cardHtml += "    <a href=\\"product.html?id=" + product.id + "\\">";',
    '                cardHtml += "      <img src=\\"" + product.image_url + "\\" alt=\\"" + product.name + "\\" class=\\"product-img img-front\\" onerror=\\"this.src=\\'images/placeholder.jpg\\'\\">";',
    '                cardHtml += "      <img src=\\"" + product.image_url + "\\" alt=\\"" + product.name + " Back\\" class=\\"product-img img-back\\" onerror=\\"this.src=\\'images/placeholder.jpg\\'\\">";',
    '                cardHtml += "    </a>";',
    '                cardHtml += "    <button class=\\"quick-view-btn\\">Quick View</button>";',
    '                cardHtml += "  </div>";',
    '                cardHtml += "  <div class=\\"product-info\\">";',
    '                cardHtml += "    <a href=\\"product.html?id=" + product.id + "\\" class=\\"product-title\\">" + product.name + "</a>";',
    '                cardHtml += "    <p class=\\"product-price\\">$" + product.price + "</p>";',
    '                cardHtml += "  </div>";',
    '                cardHtml += "</div>";',
    '                grid.innerHTML += cardHtml;',
    '            });',
    '        } catch (error) {',
    '            console.error("Lỗi tải sản phẩm từ Supabase:", error);',
    '            grid.innerHTML = "<p style=\\"grid-column: 1 / -1; text-align: center; padding: 50px 0; font-size: 1.1rem; color: red;\\">Lỗi tải dữ liệu: " + error.message + "</p>";',
    '        }',
    '    }',
    '    document.addEventListener("DOMContentLoaded", () => { loadProducts(); });',
    '</script>',
    '</body>'
];

html = html.replace('</body>', scriptLines.join('\\n'));
fs.writeFileSync(path.join(__dirname, 'new-in.html'), html, 'utf8');
console.log('Update new-in.html successfully.');
