const fs = require('fs');

let html = fs.readFileSync('manage-products.html', 'utf8');

// Find and remove the mockProducts array
const mockProductsRegex = /const mockProducts = \[[\s\S]*?\];/;
html = html.replace(mockProductsRegex, '');

// Find loadProducts function and remove the fallback logic
const loadProductsRegex = /async function loadProducts\(\) \{[\s\S]*?function renderProducts/m;

const newLoadProducts = `async function loadProducts() {
            try {
                const { data: products, error } = await supabaseClient
                    .from('products')
                    .select('*')
                    .order('id', { ascending: false });

                if (error) {
                    console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
                    document.getElementById('prd-table-body').innerHTML = createEmptyState("Không thể kết nối đến cơ sở dữ liệu.");
                    return;
                }

                if (!products || products.length === 0) {
                    document.getElementById('prd-table-body').innerHTML = createEmptyState("Chưa có sản phẩm nào trong cửa hàng.");
                    
                    // Reset stats
                    document.getElementById('stat-total').textContent = '0';
                    document.getElementById('stat-jerseys').textContent = '0';
                    document.getElementById('stat-training').textContent = '0';
                    document.getElementById('stat-other').textContent = '0';
                    return;
                }

                allProducts = products;
                renderProducts(products);

                // Update Stats dynamically
                document.getElementById('stat-total').textContent = products.length;
                document.getElementById('stat-jerseys').textContent = products.filter(p => p.category === 'Jerseys' || p.category === 'Áo đấu').length;
                document.getElementById('stat-training').textContent = products.filter(p => p.category === 'Training' || p.category === 'Tập luyện').length;
                document.getElementById('stat-other').textContent = products.filter(p => p.category !== 'Jerseys' && p.category !== 'Áo đấu' && p.category !== 'Training' && p.category !== 'Tập luyện').length;

            } catch (err) {
                console.error('Lỗi ngoại lệ khi load products:', err);
                document.getElementById('prd-table-body').innerHTML = createEmptyState("Đã xảy ra lỗi khi tải dữ liệu.");
            }
        }
        function renderProducts`;

html = html.replace(loadProductsRegex, newLoadProducts);

fs.writeFileSync('manage-products.html', html);
console.log('Refactored manage-products.html to strictly use database.');
