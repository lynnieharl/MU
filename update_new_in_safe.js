const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, 'new-in.html'), 'utf8');

// The exact start string
const startGridStr = '<div class="category-product-grid grid-4-cols" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;">';

const gridStartIdx = html.indexOf(startGridStr);

if (gridStartIdx !== -1) {
    const endGridMarker = '</div>\\r\\n        </div>\\r\\n    </main>';
    const endGridIdx = html.indexOf(endGridMarker, gridStartIdx);
    
    if (endGridIdx !== -1) {
        const beforeGrid = html.substring(0, gridStartIdx);
        const afterGrid = html.substring(endGridIdx);
        
        const newGrid = '<div id="product-grid" class="category-product-grid grid-4-cols" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;">\\n' +
                        '                <!-- Dữ liệu Supabase sẽ được render tại đây -->\\n' +
                        '            ';
        
        html = beforeGrid + newGrid + afterGrid;
    }
}

const scriptStr = 
'<!-- SUPABASE CLIENT SCRIPT CHO TRANG NEW IN -->\\n' +
'<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>\\n' +
'<script>\\n' +
'    const _supabaseUrl = "";\\n' +
'    const _supabaseKey = "";\\n' +
'    \\n' +
'    let supabase = null;\\n' +
'    if (_supabaseUrl && _supabaseKey) {\\n' +
'        supabase = supabase.createClient(_supabaseUrl, _supabaseKey);\\n' +
'    }\\n' +
'\\n' +
'    async function loadProducts() {\\n' +
'        const grid = document.getElementById("product-grid");\\n' +
'        if (!grid) return;\\n' +
'        \\n' +
'        if (!supabase) {\\n' +
'            grid.innerHTML = "<p style=\\"grid-column: 1 / -1; text-align: center; padding: 50px 0; font-size: 1.1rem; color: var(--color-gray-dark);\\">Chưa điền Supabase URL và Key!</p>";\\n' +
'            return;\\n' +
'        }\\n' +
'\\n' +
'        grid.innerHTML = "<p style=\\"grid-column: 1 / -1; text-align: center; padding: 50px 0; font-size: 1.1rem; color: var(--color-gray-dark);\\">Đang tải dữ liệu từ kho...</p>";\\n' +
'        \\n' +
'        try {\\n' +
'            const { data, error } = await supabase.from("products").select("*");\\n' +
'            \\n' +
'            if (error) throw error;\\n' +
'            \\n' +
'            grid.innerHTML = "";\\n' +
'            \\n' +
'            if (!data || data.length === 0) {\\n' +
'                grid.innerHTML = "<p style=\\"grid-column: 1 / -1; text-align: center; padding: 50px 0; font-size: 1.1rem; color: var(--color-gray-dark);\\">Hiện chưa có sản phẩm nào.</p>";\\n' +
'                return;\\n' +
'            }\\n' +
'\\n' +
'            data.forEach(product => {\\n' +
'                const cardHtml = `\\n' +
'                    <div class="product-card">\\n' +
'                        <div class="product-image-container image-swap">\\n' +
'                            <span class="badge-new-product">New</span>\\n' +
'                            <a href="product.html?id=${product.id}">\\n' +
'                                <img src="${product.image_url}" alt="${product.name}" class="product-img img-front" onerror="this.src=\\'images/placeholder.jpg\\'">\\n' +
'                                <img src="${product.image_url}" alt="${product.name} Back" class="product-img img-back" onerror="this.src=\\'images/placeholder.jpg\\'">\\n' +
'                            </a>\\n' +
'                            <button class="quick-view-btn">Quick View</button>\\n' +
'                        </div>\\n' +
'                        <div class="product-info">\\n' +
'                            <a href="product.html?id=${product.id}" class="product-title">${product.name}</a>\\n' +
'                            <p class="product-price">$${product.price}</p>\\n' +
'                        </div>\\n' +
'                    </div>\\n' +
'                `;\\n' +
'                grid.innerHTML += cardHtml;\\n' +
'            });\\n' +
'\\n' +
'        } catch (error) {\\n' +
'            console.error("Lỗi tải sản phẩm từ Supabase:", error);\\n' +
'            grid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; padding: 50px 0; font-size: 1.1rem; color: red;">Lỗi tải dữ liệu: ${error.message}</p>`;\\n' +
'        }\\n' +
'    }\\n' +
'\\n' +
'    document.addEventListener("DOMContentLoaded", () => {\\n' +
'        loadProducts();\\n' +
'    });\\n' +
'</script>\\n' +
'</body>';

html = html.replace('</body>', scriptStr);

fs.writeFileSync(path.join(__dirname, 'new-in.html'), html, 'utf8');
console.log('Update new-in.html via string concatenation success');
