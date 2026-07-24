const fs = require('fs');

const htmlFile = 'new-in.html';
let content = fs.readFileSync(htmlFile, 'utf8');

const startMarker = '<div class="category-product-grid grid-4-cols" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;">';
const endMarker = '</div>\\r\\n        </div>\\r\\n    </main>';

const startIdx = content.indexOf(startMarker);
if (startIdx !== -1) {
    const endIdx = content.indexOf(endMarker, startIdx);
    if (endIdx !== -1) {
        const before = content.substring(0, startIdx);
        const after = content.substring(endIdx);
        
        let newGrid = '<div id="product-grid" class="category-product-grid grid-4-cols" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;">\\n';
        newGrid += '                <!-- Supabase sẽ render tại đây -->\\n';
        newGrid += '            ';
        
        content = before + newGrid + after;
    }
}

// Prepare script array to join
const lines = [
    '<!-- SUPABASE SCRIPT -->',
    '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>',
    '<script>',
    'const _supabaseUrl = "";',
    'const _supabaseKey = "";',
    'let supabase = null;',
    'if (_supabaseUrl && _supabaseKey) { supabase = supabase.createClient(_supabaseUrl, _supabaseKey); }',
    'async function loadProducts() {',
    '  const grid = document.getElementById("product-grid");',
    '  if (!grid) return;',
    '  if (!supabase) { grid.innerHTML = "<p style=\\"grid-column:1/-1;text-align:center;\\">Chưa cấu hình Supabase!</p>"; return; }',
    '  grid.innerHTML = "<p style=\\"grid-column:1/-1;text-align:center;\\">Đang tải dữ liệu...</p>";',
    '  try {',
    '    const { data, error } = await supabase.from("products").select("*");',
    '    if (error) throw error;',
    '    grid.innerHTML = "";',
    '    if (!data || data.length === 0) { grid.innerHTML = "<p style=\\"grid-column:1/-1;text-align:center;\\">Không có sản phẩm.</p>"; return; }',
    '    data.forEach(p => {',
    '      let h = "<div class=\\"product-card\\">";',
    '      h += "<div class=\\"product-image-container image-swap\\">";',
    '      h += "<span class=\\"badge-new-product\\">New</span>";',
    '      h += "<a href=\\"product.html?id=" + p.id + "\\">";',
    '      h += "<img src=\\"" + p.image_url + "\\" alt=\\"" + p.name + "\\" class=\\"product-img img-front\\">";',
    '      h += "<img src=\\"" + p.image_url + "\\" class=\\"product-img img-back\\">";',
    '      h += "</a>";',
    '      h += "<button class=\\"quick-view-btn\\">Quick View</button>";',
    '      h += "</div>";',
    '      h += "<div class=\\"product-info\\">";',
    '      h += "<a href=\\"product.html?id=" + p.id + "\\" class=\\"product-title\\">" + p.name + "</a>";',
    '      h += "<p class=\\"product-price\\">$" + p.price + "</p>";',
    '      h += "</div></div>";',
    '      grid.innerHTML += h;',
    '    });',
    '  } catch(e) { grid.innerHTML = "<p style=\\"grid-column:1/-1;text-align:center;color:red;\\">Lỗi: " + e.message + "</p>"; }',
    '}',
    'document.addEventListener("DOMContentLoaded", loadProducts);',
    '</script>',
    '</body>'
];

content = content.replace('</body>', lines.join('\\n'));
fs.writeFileSync(htmlFile, content, 'utf8');
console.log('Done!');
