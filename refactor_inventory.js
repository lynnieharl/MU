const fs = require('fs');

let html = fs.readFileSync('admin-inventory.html', 'utf8');

const tbodyRegex = /<tbody>[\s\S]*?<\/tbody>/m;
const newTbody = `<tbody id="inventory-table-body">
    <tr><td colspan="6" style="text-align: center; padding: 30px;">Đang tải dữ liệu...</td></tr>
</tbody>`;
html = html.replace(tbodyRegex, newTbody);

const scriptContent = `<script>
document.addEventListener('DOMContentLoaded', async () => {
    try {
        if (!supabaseClient) return;
        const tbody = document.getElementById('inventory-table-body');
        
        const { data: products, error } = await supabaseClient.from('products').select('*').order('id', { ascending: false });
        
        if (error) {
            tbody.innerHTML = createEmptyState("Lỗi khi tải dữ liệu kho hàng.");
            return;
        }
        
        if (!products || products.length === 0) {
            tbody.innerHTML = createEmptyState("Kho chưa có sản phẩm nào.");
            return;
        }

        tbody.innerHTML = products.map(p => {
            const stock = p.stock || 0;
            let stockBadge = '';
            let stockStyle = '';
            
            if (stock === 0) {
                stockBadge = '<span class="status-badge" style="background: #f1f5f9; color: #64748b;">Out of Stock</span>';
                stockStyle = 'color: #999;';
            } else if (stock < 10) {
                stockBadge = '<span class="status-badge danger" style="background: rgba(220,38,38,0.1); color: #dc2626;">Low Stock</span>';
                stockStyle = 'color: #dc2626;';
            } else {
                stockBadge = '<span class="status-badge success">In Stock</span>';
            }

            return \`
                <tr>
                    <td style="color: #888; font-weight: 500;">SKU-PRD-\${p.id}</td>
                    <td style="font-weight: 600;">\${p.name}</td>
                    <td>\${p.category || 'N/A'}</td>
                    <td style="text-align: center; font-weight: 700; \${stockStyle}">\${stock}</td>
                    <td>\${stockBadge}</td>
                    <td style="text-align: right;"><button class="btn-action-icon"><i class="fas fa-edit"></i></button></td>
                </tr>
            \`;
        }).join('');

    } catch (e) {
        console.error(e);
    }
});
</script>`;

if (!html.includes('inventory-table-body')) {
    html = html.replace('</body>', scriptContent + '\n</body>');
} else {
    html = html.replace(/<script>\ndocument\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>/, scriptContent);
}

fs.writeFileSync('admin-inventory.html', html);
console.log('Refactored admin-inventory.html');
