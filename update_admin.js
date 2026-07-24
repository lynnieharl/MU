const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, 'admin-dashboard.html'), 'utf8');

// Thêm id cho tbody
html = html.replace('<tbody>', '<tbody id="product-table-body">');
html = html.replace('<button class="btn-primary"><i class="fa-solid fa-plus"></i> ADD NEW PRODUCT</button>', \`<button class="btn-primary" id="btn-add-product" onclick="document.getElementById('addProductModal').style.display='flex'"><i class="fa-solid fa-plus"></i> ADD NEW PRODUCT</button>\`);

// Thêm modal HTML trước thẻ đóng body
const modalHTML = \`
<!-- ADD PRODUCT MODAL -->
<div id="addProductModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:9999; justify-content:center; align-items:center;">
    <div style="background:#fff; padding:30px; border-radius:8px; width:400px; max-width:90%;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
            <h3 style="margin:0;">Add New Product</h3>
            <button onclick="document.getElementById('addProductModal').style.display='none'" style="background:none; border:none; font-size:1.5rem; cursor:pointer;">&times;</button>
        </div>
        <form id="add-product-form">
            <div style="margin-bottom:15px;">
                <label style="display:block; margin-bottom:5px; font-weight:600; font-size:0.9rem;">Product Name</label>
                <input type="text" id="prod-name" required style="width:100%; padding:10px; border:1px solid #ddd; border-radius:4px;">
            </div>
            <div style="margin-bottom:15px;">
                <label style="display:block; margin-bottom:5px; font-weight:600; font-size:0.9rem;">Price</label>
                <input type="text" id="prod-price" required style="width:100%; padding:10px; border:1px solid #ddd; border-radius:4px;">
            </div>
            <div style="margin-bottom:20px;">
                <label style="display:block; margin-bottom:5px; font-weight:600; font-size:0.9rem;">Image URL</label>
                <input type="text" id="prod-image" required style="width:100%; padding:10px; border:1px solid #ddd; border-radius:4px;">
            </div>
            <button type="submit" class="btn-primary" style="width:100%; justify-content:center; padding:12px;">SAVE PRODUCT</button>
        </form>
    </div>
</div>

<!-- SUPABASE ADMIN SCRIPT -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
    const _supabaseUrl = '';
    const _supabaseKey = '';
    
    let supabase = null;
    if (_supabaseUrl && _supabaseKey) {
        supabase = supabase.createClient(_supabaseUrl, _supabaseKey);
    }

    // 1. Hàm Đọc (Read): fetchProducts
    async function fetchProducts() {
        if (!supabase) return;
        
        try {
            const { data, error } = await supabase.from('products').select('*');
            if (error) throw error;

            const tbody = document.getElementById('product-table-body');
            if (!tbody) return;
            
            tbody.innerHTML = ''; // Xóa sạch dữ liệu cũ
            
            data.forEach(product => {
                const tr = document.createElement('tr');
                tr.innerHTML = \`
                    <td><img src="\${product.image_url}" alt="\${product.name}" class="table-img" onerror="this.src='images/placeholder.jpg'"></td>
                    <td>\${product.name}</td>
                    <td>(N/A)</td>
                    <td>\${product.price}</td>
                    <td><span class="status-badge success">In Stock</span></td>
                    <td class="action-cell">
                        <button class="btn-edit" onclick="alert('Tính năng Edit đang phát triển!')"><i class="fa-solid fa-pen"></i> Edit</button>
                        <button class="btn-delete" onclick="deleteProduct('\${product.id}')"><i class="fa-solid fa-trash"></i> Delete</button>
                    </td>
                \`;
                tbody.appendChild(tr);
            });
        } catch (error) {
            alert('Lỗi tải dữ liệu: ' + error.message);
        }
    }

    // 2. Hàm Xóa (Delete): deleteProduct
    async function deleteProduct(id) {
        if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
        
        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            
            alert('Xóa sản phẩm thành công!');
            fetchProducts(); // Tải lại danh sách
        } catch (error) {
            alert('Lỗi xóa sản phẩm: ' + error.message);
        }
    }

    // Khởi tạo các sự kiện khi trang đã tải xong
    document.addEventListener('DOMContentLoaded', () => {
        // Tải danh sách ngay khi vào trang
        fetchProducts();

        // 3. Hàm Thêm (Create): Bắt sự kiện submit form
        const addForm = document.getElementById('add-product-form');
        if (addForm) {
            addForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                if (!supabase) {
                    alert('Chưa kết nối Supabase!');
                    return;
                }

                const name = document.getElementById('prod-name').value;
                const price = document.getElementById('prod-price').value;
                const image_url = document.getElementById('prod-image').value;

                try {
                    const { error } = await supabase.from('products').insert([
                        { name: name, price: price, image_url: image_url }
                    ]);

                    if (error) throw error;

                    alert('Thêm sản phẩm thành công!');
                    
                    // Ẩn modal và reset form
                    document.getElementById('addProductModal').style.display = 'none';
                    addForm.reset();
                    
                    // Tải lại bảng dữ liệu
                    fetchProducts();
                } catch (error) {
                    alert('Lỗi thêm sản phẩm: ' + error.message);
                }
            });
        }
    });
</script>
</body>\`;

html = html.replace('</body>', modalHTML);

fs.writeFileSync(path.join(__dirname, 'admin-dashboard.html'), html, 'utf8');
console.log('Update admin-dashboard.html success');
