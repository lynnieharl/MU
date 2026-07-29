const fs = require('fs');

let html = fs.readFileSync('admin-customers.html', 'utf8');

// Replace the table body
const tbodyRegex = /<tbody>[\s\S]*?<\/tbody>/m;
const newTbody = `<tbody id="customers-table-body">
    <tr><td colspan="7" style="text-align: center; padding: 30px;">Đang tải dữ liệu...</td></tr>
</tbody>`;
html = html.replace(tbodyRegex, newTbody);

// Inject script
const scriptContent = `<script>
document.addEventListener('DOMContentLoaded', async () => {
    try {
        if (!supabaseClient) return;
        const tbody = document.getElementById('customers-table-body');
        
        const { data: users, error } = await supabaseClient.from('users').select('*').order('id', { ascending: true });
        
        if (error) {
            tbody.innerHTML = createEmptyState("Lỗi khi tải danh sách khách hàng.");
            return;
        }
        
        if (!users || users.length === 0) {
            tbody.innerHTML = createEmptyState("Chưa có khách hàng nào.");
            return;
        }

        tbody.innerHTML = users.map(u => {
            const isBlocked = false; // Mock blocked logic if you want
            const initial = u.email ? u.email.substring(0, 2).toUpperCase() : 'US';
            const roleStr = u.role === 'admin' ? '<span class="status-badge" style="background:#6366f1;color:#fff;">Admin</span>' : '<span class="status-badge success">Active</span>';

            return \`
                <tr>
                    <td><div class="avatar-img" style="width: 32px; height: 32px; font-size: 0.8rem; background: #DA020E;">\${initial}</div></td>
                    <td style="font-weight: 600;">\${u.email.split('@')[0]}</td>
                    <td style="color: #666;">\${u.email}</td>
                    <td style="text-align: center; font-weight: 600;">-</td>
                    <td style="font-weight: 700; color: var(--admin-primary);">-</td>
                    <td>\${roleStr}</td>
                    <td style="text-align: right;"><button class="btn-action-icon"><i class="fas fa-eye"></i></button></td>
                </tr>
            \`;
        }).join('');

    } catch (e) {
        console.error(e);
    }
});
</script>`;

if (!html.includes('customers-table-body')) {
    html = html.replace('</body>', scriptContent + '\n</body>');
} else {
    // If we've already injected script, just replace
    html = html.replace(/<script>\ndocument\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>/, scriptContent);
}

fs.writeFileSync('admin-customers.html', html);
console.log('Refactored admin-customers.html');
