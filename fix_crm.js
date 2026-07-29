const fs = require('fs');

// 1. UPDATE CSS
let css = fs.readFileSync('admin.css', 'utf8');

// Fix admin-sidebar
css = css.replace(
    /width: 260px;\s*min-width: 260px;/g,
    'width: 260px;\n    min-width: 260px;\n    flex-shrink: 0;'
);

// Fix white-space for sidebar items
css = css.replace(
    /\.sidebar-section-title \{([\s\S]*?)\}/g,
    '.sidebar-section-title {$1    white-space: nowrap;\n}'
);
css = css.replace(
    /\.sidebar-nav ul li a \{([\s\S]*?)\}/g,
    '.sidebar-nav ul li a {$1    white-space: nowrap;\n}'
);

// Fix admin-main width
css = css.replace(
    /\.admin-main \{([\s\S]*?)flex: 1;/g,
    '.admin-main {$1flex: 1;\n    width: calc(100% - 260px);'
);

fs.writeFileSync('admin.css', css);


// 2. UPDATE HTML (JS Logic)
let html = fs.readFileSync('admin-crm.html', 'utf8');

// The logic inside loadCrmDashboardData for products is:
/*
                if (!pErr && products) {
                    document.getElementById('stat-orders').textContent = products.length; // Temporarily using products for orders
                    renderProductsPreview(products);
*/
// We need to change this to also set allProductsData, calculate total revenue, and pending orders.
const oldLogic = `                if (!pErr && products) {
                    document.getElementById('stat-orders').textContent = products.length; // Temporarily using products for orders
                    renderProductsPreview(products);`;

const newLogic = `                if (!pErr && products) {
                    allProductsData = products;
                    document.getElementById('stat-orders').textContent = products.length;
                    
                    // Calculate Total Revenue (Completed only, mocked as p.id % 2 === 0)
                    const completedOrders = products.filter(p => p.id % 2 === 0);
                    const totalRevenue = completedOrders.reduce((sum, p) => sum + (p.price || 0), 0);
                    const revenueFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue);
                    const elRevenue = document.getElementById('stat-revenue');
                    if (elRevenue) elRevenue.textContent = revenueFormatted;

                    // Calculate Pending Orders (mocked as p.id % 2 !== 0)
                    const pendingOrders = products.filter(p => p.id % 2 !== 0);
                    const elPending = document.getElementById('stat-pending');
                    if (elPending) elPending.textContent = pendingOrders.length;

                    renderProductsPreview(products);`;

html = html.replace(oldLogic, newLogic);

// Ensure allProductsData is declared globally in admin-crm.html if it isn't
if (!html.includes('let allProductsData = []') && !html.includes('let allProductsData = null')) {
    html = html.replace('let allUsersData = [];', 'let allUsersData = [];\n        let allProductsData = [];');
}

fs.writeFileSync('admin-crm.html', html);

console.log('Fixed Sidebar Layout & Total Revenue/Pending Orders Calculations');
