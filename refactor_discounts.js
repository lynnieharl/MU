const fs = require('fs');

let html = fs.readFileSync('admin-discounts.html', 'utf8');

const tbodyRegex = /<tbody>[\s\S]*?<\/tbody>/m;
const newTbody = `<tbody id="coupons-table-body">
    <tr><td colspan="5" style="text-align: center; padding: 30px;">Đang tải dữ liệu...</td></tr>
</tbody>`;
html = html.replace(tbodyRegex, newTbody);

const scriptContent = `<script>
document.addEventListener('DOMContentLoaded', async () => {
    try {
        if (!supabaseClient) return;
        const tbody = document.getElementById('coupons-table-body');
        
        const { data: coupons, error } = await supabaseClient.from('coupons').select('*');
        
        if (error) {
            tbody.innerHTML = createEmptyState("Lỗi khi tải mã giảm giá (Hoặc bảng coupons chưa được tạo).");
            return;
        }
        
        if (!coupons || coupons.length === 0) {
            tbody.innerHTML = createEmptyState("Chưa có mã giảm giá nào.");
            return;
        }

        tbody.innerHTML = coupons.map(c => {
            const isExpired = c.expiry_date && new Date(c.expiry_date) < new Date();
            const statusBadge = isExpired 
                ? '<span class="status-badge" style="background: #f1f5f9; color: #64748b;">Expired</span>'
                : '<span class="status-badge success">Active</span>';
            const valueColor = isExpired ? '#999' : 'var(--admin-primary)';
            
            return \`
                <tr>
                    <td><span style="font-family: monospace; font-size: 1rem; font-weight: 700; background: #f3f4f6; padding: 4px 8px; border-radius: 4px; letter-spacing: 2px;">\${c.code}</span></td>
                    <td style="font-weight: 700; color: \${valueColor};">-\${c.discount_percent}%</td>
                    <td style="color: \${isExpired ? '#999' : '#666'};">\${new Date(c.expiry_date).toLocaleDateString('vi-VN')}</td>
                    <td>\${statusBadge}</td>
                    <td style="text-align: right;"><button class="btn-action-icon danger"><i class="fas fa-trash"></i></button></td>
                </tr>
            \`;
        }).join('');

    } catch (e) {
        console.error(e);
    }
});
</script>`;

if (!html.includes('coupons-table-body')) {
    html = html.replace('</body>', scriptContent + '\n</body>');
} else {
    html = html.replace(/<script>\ndocument\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>/, scriptContent);
}

fs.writeFileSync('admin-discounts.html', html);
console.log('Refactored admin-discounts.html');
