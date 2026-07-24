const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, 'new-in.html'), 'utf8');

// Thay the product grid
const startGridStr = '<div class="category-product-grid grid-4-cols" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;">';
// The end of the grid is before </div></div></main>
// We can just use regular expression to replace everything between startGridStr and the end of the grid
const gridStartIdx = html.indexOf(startGridStr);

if (gridStartIdx !== -1) {
    // Find the end of this div. Let's just find the first '</div>\\r\\n        </div>\\r\\n    </main>'
    const mainEndIdx = html.indexOf('</main>', gridStartIdx);
    if (mainEndIdx !== -1) {
        // the grid ends right before the closing of the container div
        const beforeMain = html.substring(0, gridStartIdx);
        const afterMain = html.substring(mainEndIdx);
        
        const newGridHtml = `<div id="product-grid" class="category-product-grid grid-4-cols" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;">
                <!-- Dữ liệu sẽ được render bằng JS qua Supabase -->
            </div>
        </div>
    `;
        
        html = beforeMain + newGridHtml + afterMain;
    }
}

// Append script before </body>
const scriptHtml = `<!-- SUPABASE CLIENT SCRIPT CHO TRANG NEW IN -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
    const _supabaseUrl = '';
    const _supabaseKey = '';
    
    let supabase = null;
    if (_supabaseUrl && _supabaseKey) {
        supabase = supabase.createClient(_supabaseUrl, _supabaseKey);
    }

    async function loadProducts() {
        const grid = document.getElementById('product-grid');
        if (!grid) return;
        
        if (!supabase) {
            grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--color-gray-dark);">Chưa cấu hình Supabase Client!</p>';
            return;
        }

        grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--color-gray-dark);">Đang tải dữ liệu từ kho...</p>';
        
        try {
            const { data, error } = await supabase.from('products').select('*');
            if (error) throw error;
            
            grid.innerHTML = ''; 
            
            if (data.length === 0) {
                grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--color-gray-dark);">Hiện chưa có sản phẩm nào.</p>';
                return;
            }

            data.forEach(product => {
                const cardHtml = `
                    <div class="product-card">
                        <div class="product-image-container image-swap">
                            <span class="badge-new-product">New</span>
                            <a href="product.html?id=${product.id}">
                                <img src="${product.image_url}" alt="${product.name}" class="product-img img-front" onerror="this.src='images/placeholder.jpg'">
                                <img src="${product.image_url}" alt="${product.name} Back" class="product-img img-back" onerror="this.src='images/placeholder.jpg'">
                            </a>
                            <button class="quick-view-btn">Quick View</button>
                        </div>
                        <div class="product-info">
                            <a href="product.html?id=${product.id}" class="product-title">${product.name}</a>
                            <p class="product-price">$${product.price}</p>
                        </div>
                    </div>
                `;
                grid.innerHTML += cardHtml;
            });
        } catch (error) {
            console.error('Lỗi tải sản phẩm từ Supabase:', error);
            grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: red;">Lỗi tải dữ liệu. Vui lòng thử lại sau.</p>';
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadProducts();
    });
</script>
</body>`;

html = html.replace('</body>', scriptHtml);

fs.writeFileSync(path.join(__dirname, 'new-in.html'), html, 'utf8');
console.log('Update new-in.html success');
