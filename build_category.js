const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf8');

const headerEndIndex = indexHtml.indexOf('</header>') + '</header>'.length;
const footerStartIndex = indexHtml.indexOf('<footer');

const headerPart = indexHtml.substring(0, headerEndIndex);
const footerPart = indexHtml.substring(footerStartIndex);

const categoryBody = `
    <!-- BREADCRUMBS -->
    <div class="breadcrumbs container" style="margin-top: 20px;">
        <a href="index.html">Trang Chủ</a> &gt; <span id="cat-breadcrumb" style="font-weight: bold; color: #d31145;">Danh Mục</span>
    </div>

    <!-- MAIN CONTENT AREA -->
    <main class="container category-layout" style="margin-top: 30px; margin-bottom: 60px;">
        
        <div class="category-header flex justify-between items-center" style="margin-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px;">
            <h2 style="font-size: 28px; font-weight: 800; color: #fff;" id="cat-page-title">SẢN PHẨM</h2>
            <div class="sort-box">
                <label for="sort-select" style="color: #aaa; margin-right: 10px;">Sắp xếp:</label>
                <select id="sort-select" style="background: #111; color: #fff; border: 1px solid #333; padding: 5px 10px; border-radius: 4px;">
                    <option value="newest">Mới nhất</option>
                    <option value="price-asc">Giá: Thấp đến Cao</option>
                    <option value="price-desc">Giá: Cao đến Thấp</option>
                </select>
            </div>
        </div>

        <!-- Grid -->
        <div class="product-grid" id="cat-product-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 30px;">
            <div style="width: 100%; text-align: center; padding: 40px; color: #888; grid-column: 1 / -1;">
                <i class="fa-solid fa-spinner fa-spin" style="font-size: 32px; margin-bottom: 10px;"></i>
                <p>Đang tải dữ liệu sản phẩm từ hệ thống...</p>
            </div>
        </div>
        
    </main>

    <!-- Supabase Logic -->
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const catType = urlParams.get('type') || 'All';
            
            document.title = (catType === 'All' ? 'Tất Cả Sản Phẩm' : catType) + ' - United Store';
            document.getElementById('cat-breadcrumb').innerText = catType === 'All' ? 'Tất Cả' : catType;
            document.getElementById('cat-page-title').innerText = (catType === 'All' ? 'TẤT CẢ SẢN PHẨM' : 'DANH MỤC: ' + catType.toUpperCase());

            const grid = document.getElementById('cat-product-grid');
            if (!window.supabaseClient) {
                grid.innerHTML = '<div style="width: 100%; text-align: center; padding: 40px; color: #ff4d4d; grid-column: 1 / -1;">Lỗi kết nối máy chủ Supabase!</div>';
                return;
            }

            try {
                let query = window.supabaseClient.from('products').select('*');
                if (catType !== 'All') {
                    query = query.eq('category', catType);
                }
                
                const { data: products, error } = await query.order('id', { ascending: false });

                if (error) {
                    if (error.code === 'PGRST205') {
                        grid.innerHTML = '<div style="width: 100%; text-align: center; padding: 40px; color: #888; grid-column: 1 / -1;">Bảng products chưa tồn tại.</div>';
                    } else {
                        throw error;
                    }
                    return;
                }

                if (!products || products.length === 0) {
                    grid.innerHTML = \`
                        <div style="width: 100%; text-align: center; padding: 50px; color: #888; grid-column: 1 / -1; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.1);">
                            <i class="fa-solid fa-box-open" style="font-size: 48px; margin-bottom: 15px; color: #444;"></i>
                            <h3 style="color: #fff; font-size: 20px; margin-bottom: 8px;">Mục này đang trống</h3>
                            <p>Hiện chưa có sản phẩm nào trong mục \${catType === 'All' ? 'này' : '"' + catType + '"'}. Vui lòng quay lại sau!</p>
                            <a href="index.html" class="btn-primary" style="display: inline-block; margin-top: 20px; text-decoration: none;">Về Trang Chủ</a>
                        </div>
                    \`;
                    return;
                }

                // Render dữ liệu
                grid.innerHTML = products.map(p => {
                    const imgUrl = p.image_url || 'https://images.unsplash.com/photo-1577003833758-c0b93e8784ac?auto=format&fit=crop&w=400&q=80';
                    const priceFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price || 0);
                    const catTag = p.category ? \`<span style="position:absolute; top:10px; left:10px; background:rgba(0,0,0,0.7); color:#fff; padding:4px 10px; font-size:11px; font-weight:bold; border-radius:4px; border:1px solid #333; z-index:10;">\${p.category}</span>\` : '';
                    
                    return \`
                    <div class="product-card grid-item" style="position: relative;">
                        \${catTag}
                        <div class="product-image-container">
                            <img src="\${imgUrl}" class="product-img" alt="\${p.name || ''}" onerror="this.src='https://images.unsplash.com/photo-1577003833758-c0b93e8784ac?auto=format&fit=crop&w=400&q=80'">
                        </div>
                        <div class="product-info">
                            <a href="product.html?id=\${p.id}" class="product-title" style="display: block; font-weight: 600; margin-bottom: 8px; color: #fff; text-decoration: none; font-size: 14px;">\${p.name || 'Sản phẩm mới'}</a>
                            <p class="product-price" style="color: #d31145; font-weight: 800; font-size: 16px;">\${priceFormatted}</p>
                        </div>
                    </div>
                    \`;
                }).join('');

            } catch (err) {
                console.error('Lỗi tải sản phẩm:', err);
                grid.innerHTML = '<div style="width: 100%; text-align: center; padding: 40px; color: #ff4d4d; grid-column: 1 / -1;">Không thể tải sản phẩm.</div>';
            }
        });
    </script>
`;

const newCategoryHtml = headerPart + categoryBody + footerPart;
fs.writeFileSync('category.html', newCategoryHtml, 'utf8');
console.log('category.html successfully rewritten!');
