const fs = require('fs');

let html = fs.readFileSync('admin-crm.html', 'utf8');

// Replace loadCrmDashboardData with proper order fetching
const oldLoadCrmDashboardDataRegex = /async function loadCrmDashboardData\(\) \{[\s\S]*?function renderUsersTable/m;

const newLoadCrmDashboardData = `async function loadCrmDashboardData() {
            try {
                // Fetch Users
                const { data: users, error: uErr } = await supabaseClient
                    .from('users')
                    .select('*')
                    .order('id', { ascending: true });
                    
                if (!uErr && users && users.length > 0) {
                    allUsersData = users;
                    document.getElementById('stat-customers').textContent = users.length;
                    renderUsersTable(users);
                } else {
                    document.getElementById('stat-customers').textContent = '0';
                    document.getElementById('crm-users-body').innerHTML = createEmptyState("Chưa có khách hàng nào.");
                }

                // Fetch Orders
                const { data: orders, error: oErr } = await supabaseClient
                    .from('orders')
                    .select('*, users(email)');

                if (!oErr && orders && orders.length > 0) {
                    allProductsData = orders; // Temporarily keeping the variable name for compatibility
                    document.getElementById('stat-orders').textContent = orders.length;
                    
                    const completedOrders = orders.filter(o => o.status === 'Completed' || o.status === 'Đã giao');
                    const totalRevenue = completedOrders.reduce((sum, o) => sum + (o.total_value || o.price || 0), 0);
                    const elRevenue = document.getElementById('stat-revenue');
                    if (elRevenue) elRevenue.textContent = formatCurrency(totalRevenue);

                    const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Chờ xử lý');
                    const elPending = document.getElementById('stat-pending');
                    if (elPending) elPending.textContent = pendingOrders.length;
                    
                    renderProductsPreview(orders);
                } else {
                    document.getElementById('stat-orders').textContent = '0';
                    document.getElementById('stat-revenue').textContent = '0 ₫';
                    document.getElementById('stat-pending').textContent = '0';
                    document.getElementById('crm-orders-body').innerHTML = createEmptyState("Chưa có đơn hàng nào trong hệ thống.");
                }
            } catch (ex) {
                console.error('Lỗi tải dữ liệu CRM:', ex);
            }
        }
        function renderUsersTable`;

html = html.replace(oldLoadCrmDashboardDataRegex, newLoadCrmDashboardData);

// Replace renderProductsPreview to handle actual order fields
const oldRenderProductsPreviewRegex = /function renderProductsPreview\(list\) \{[\s\S]*?function handleUserSearch/m;

const newRenderProductsPreview = `function renderProductsPreview(list) {
            const tbody = document.getElementById('crm-orders-body');
            if (!tbody) return;
            if (!list || list.length === 0) {
                tbody.innerHTML = createEmptyState("Chưa có đơn hàng nào.");
                return;
            }
            tbody.innerHTML = list.map(o => {
                const total = o.total_value || o.price || 0;
                const status = o.status || 'Pending';
                const statusClass = (status === 'Completed' || status === 'Đã giao') ? 'success' : 'warning';
                const dateStr = o.created_at ? new Date(o.created_at).toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN');
                const customer = o.users?.email || o.customer_email || 'Khách vãng lai';
                
                return \`
                    <tr>
                        <td style="font-weight: 600; color: var(--admin-text-muted);">#ORD-\${o.id || '-'}</td>
                        <td style="font-weight: 600; color: var(--admin-text-main);">\${customer}</td>
                        <td style="color: var(--admin-text-main); font-weight: 700;">\${formatCurrency(total)}</td>
                        <td><span class="status-badge \${statusClass}">\${status}</span></td>
                        <td style="color: var(--admin-text-muted); font-size: 13px;">\${dateStr}</td>
                        <td style="text-align: right;">
                            <button class="btn-action-icon" title="View details"><i class="fa-solid fa-eye"></i></button>
                        </td>
                    </tr>
                \`;
            }).join('');
        }
        function handleUserSearch`;

html = html.replace(oldRenderProductsPreviewRegex, newRenderProductsPreview);

// Update filter pill logic for real orders
const oldFilterRegex = /if \(currentOrderFilter === 'Completed'\) \{[\s\S]*?renderProductsPreview\(filtered\);/m;

const newFilterLogic = `if (currentOrderFilter === 'Completed') {
                            filtered = allProductsData.filter(o => o.status === 'Completed' || o.status === 'Đã giao');
                        } else if (currentOrderFilter === 'Pending') {
                            filtered = allProductsData.filter(o => o.status === 'Pending' || o.status === 'Chờ xử lý');
                        }
                        renderProductsPreview(filtered);`;

html = html.replace(oldFilterRegex, newFilterLogic);

fs.writeFileSync('admin-crm.html', html);
console.log('Refactored admin-crm.html to fetch from orders table.');
