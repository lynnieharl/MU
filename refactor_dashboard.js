const fs = require('fs');

let html = fs.readFileSync('admin-dashboard.html', 'utf8');

// Replace the hardcoded HTML with dynamic containers
const metricsGridRegex = /<div class="metrics-grid">[\s\S]*?<\/div>\n<div style="display: flex/m;
const newMetricsGrid = `<div class="metrics-grid" id="dashboard-metrics">
    <!-- Rendered dynamically -->
</div>
<div style="display: flex`;
html = html.replace(metricsGridRegex, newMetricsGrid);

const topProductsRegex = /<ul style="list-style: none; padding: 0; margin: 0;">[\s\S]*?<\/ul>/m;
const newTopProducts = `<ul id="top-products-list" style="list-style: none; padding: 0; margin: 0;">
    <!-- Rendered dynamically -->
</ul>`;
html = html.replace(topProductsRegex, newTopProducts);

// Add the fetching JS
const oldJsRegex = /<script>document.addEventListener\('DOMContentLoaded', \(\) => {[\s\S]*?<\/script>/m;

const newJs = `<script>
document.addEventListener('DOMContentLoaded', async () => {
    const canvas = document.getElementById('revenueChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#DA020E';
        ctx.font = '16px Inter';
        ctx.fillText('Biểu đồ doanh thu đang được cập nhật...', 50, 150);
    }

    try {
        if (!supabaseClient) return;

        // Fetch Orders
        const { data: orders, error: oErr } = await supabaseClient.from('orders').select('*');
        // Fetch Users
        const { data: users, error: uErr } = await supabaseClient.from('users').select('*');
        // Fetch Products
        const { data: products, error: pErr } = await supabaseClient.from('products').select('*');

        const metricsContainer = document.getElementById('dashboard-metrics');
        let totalRevenue = 0;
        let todayRevenue = 0;
        let newOrdersCount = 0;
        let activeUsersCount = users ? users.length : 0;
        let lowStockCount = 0;

        if (orders) {
            totalRevenue = orders.filter(o => o.status === 'Completed' || o.status === 'Đã giao').reduce((sum, o) => sum + (o.total_value || o.price || 0), 0);
            newOrdersCount = orders.length;
        }

        if (products) {
            lowStockCount = products.filter(p => p.stock < 10).length;
        }

        if (metricsContainer) {
            metricsContainer.innerHTML = \`
                <div class="metric-card">
                    <div class="metric-icon revenue-icon"><i class="fas fa-money-bill-wave"></i></div>
                    <div class="metric-data">
                        <h4>Total Revenue</h4>
                        <div class="metric-value">\${formatCurrency(totalRevenue)}</div>
                        <div class="metric-growth"><span class="growth-up"><i class="fas fa-arrow-up"></i> Tăng trưởng</span></div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon product-icon"><i class="fas fa-shopping-cart"></i></div>
                    <div class="metric-data">
                        <h4>Total Orders</h4>
                        <div class="metric-value">\${newOrdersCount}</div>
                        <div class="metric-growth"><span class="growth-up"><i class="fas fa-arrow-up"></i> Đơn hàng</span></div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon user-icon"><i class="fas fa-users"></i></div>
                    <div class="metric-data">
                        <h4>Active Users</h4>
                        <div class="metric-value">\${activeUsersCount}</div>
                        <div class="metric-growth"><span class="growth-up"><i class="fas fa-arrow-up"></i> Khách hàng</span></div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon" style="background: rgba(220, 38, 38, 0.1); color: #DC2626;"><i class="fas fa-exclamation-triangle"></i></div>
                    <div class="metric-data">
                        <h4>Low Stock Items</h4>
                        <div class="metric-value">\${lowStockCount}</div>
                        <div class="metric-growth"><span class="\${lowStockCount > 0 ? 'growth-down' : 'growth-up'}"><i class="fas \${lowStockCount > 0 ? 'fa-arrow-down' : 'fa-check'}"></i> \${lowStockCount > 0 ? 'Needs attention' : 'Kho ổn định'}</span></div>
                    </div>
                </div>
            \`;
        }

        // Render Top Products
        const topProductsList = document.getElementById('top-products-list');
        if (topProductsList) {
            if (products && products.length > 0) {
                // Just mock "top selling" by grabbing first 3 products for now since we don't have order_items analytics
                const top3 = products.slice(0, 3);
                topProductsList.innerHTML = top3.map(p => \`
                    <li style="display: flex; align-items: center; gap: 15px; padding: 12px 0; border-bottom: 1px solid #eee;">
                        <img src="\${p.image_url || 'images/placeholder.jpg'}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 8px;">
                        <div style="flex: 1;">
                            <h4 style="font-size: 0.85rem; margin-bottom: 4px; color: #333;">\${p.name}</h4>
                            <span style="font-size: 0.75rem; color: #888;">\${p.stock} in stock</span>
                        </div>
                        <div style="font-weight: 700; font-size: 0.9rem; color: #DA020E;">\${formatCurrency(p.price)}</div>
                    </li>
                \`).join('');
            } else {
                topProductsList.innerHTML = \`<li style="padding: 20px; text-align: center; color: #888;">Chưa có sản phẩm nào</li>\`;
            }
        }

    } catch (e) {
        console.error('Dashboard load error', e);
    }
});
</script>`;

html = html.replace(oldJsRegex, newJs);

fs.writeFileSync('admin-dashboard.html', html);
console.log('Refactored admin-dashboard.html to fetch from database.');
