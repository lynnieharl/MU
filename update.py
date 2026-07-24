import os

html_path = "new-in.html"

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

start_marker = '<div class="category-product-grid grid-4-cols" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;">'
end_marker = '</div>\n        </div>\n    </main>'

start_idx = html.find(start_marker)
if start_idx != -1:
    end_idx = html.find(end_marker, start_idx)
    if end_idx != -1:
        before = html[:start_idx]
        after = html[end_idx:]
        
        new_grid = '''<div id="product-grid" class="category-product-grid grid-4-cols" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;">
                <!-- Dữ liệu Supabase sẽ được render tại đây -->
            '''
        
        html = before + new_grid + after

script = '''<!-- SUPABASE CLIENT SCRIPT CHO TRANG NEW IN -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
    const _supabaseUrl = "";
    const _supabaseKey = "";
    let supabase = null;
    if (_supabaseUrl && _supabaseKey) { supabase = supabase.createClient(_supabaseUrl, _supabaseKey); }
    async function loadProducts() {
        const grid = document.getElementById("product-grid");
        if (!grid) return;
        if (!supabase) { grid.innerHTML = "<p style='grid-column: 1 / -1; text-align: center; padding: 50px 0; font-size: 1.1rem; color: var(--color-gray-dark);'>Chưa cấu hình Supabase Client!</p>"; return; }
        grid.innerHTML = "<p style='grid-column: 1 / -1; text-align: center; padding: 50px 0; font-size: 1.1rem; color: var(--color-gray-dark);'>Đang tải dữ liệu từ kho...</p>";
        try {
            const { data, error } = await supabase.from("products").select("*");
            if (error) throw error;
            grid.innerHTML = "";
            if (!data || data.length === 0) { grid.innerHTML = "<p style='grid-column: 1 / -1; text-align: center; padding: 50px 0; font-size: 1.1rem; color: var(--color-gray-dark);'>Hiện chưa có sản phẩm nào.</p>"; return; }
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
            console.error("Lỗi tải sản phẩm từ Supabase:", error);
            grid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; padding: 50px 0; font-size: 1.1rem; color: red;">Lỗi tải dữ liệu: ${error.message}</p>`;
        }
    }
    document.addEventListener("DOMContentLoaded", () => { loadProducts(); });
</script>
</body>'''

html = html.replace('</body>', script)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)
