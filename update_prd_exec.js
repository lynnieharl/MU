const fs = require('fs');

let html = fs.readFileSync('manage-products.html', 'utf8');

// 1. Update Fonts
html = html.replace(
    '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">',
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@500;600;700;800&display=swap" rel="stylesheet">'
);

// 2. Update Top Bar (Header actions)
const oldHeaderActions = `<div class="header-actions">
                    <form class="search-bar" id="prd-search-form">
                        <i class="fas fa-search"></i>
                        <input type="text" id="prd-search-input" placeholder="Search products by name...">
                    </form>
                    <button class="btn-create" onclick="openCreateModal()">
                        <i class="fas fa-plus"></i> Add New Product
                    </button>
                </div>`;
const newHeaderActions = `<div class="header-actions">
                    <form class="search-bar" id="prd-search-form">
                        <i class="fas fa-search"></i>
                        <input type="text" id="prd-search-input" placeholder="Search products by name...">
                    </form>
                    <button class="btn-create" onclick="openCreateModal()">
                        <i class="fas fa-plus"></i> Add New Product
                    </button>
                    <div class="header-profile-section">
                        <button class="notification-btn"><i class="far fa-bell"></i><span class="badge">3</span></button>
                        <div class="avatar-wrapper">
                            <div class="avatar-img">A</div>
                            <div class="status-dot"></div>
                            <div class="avatar-info">
                                <span class="avatar-name">Admin</span>
                                <span class="avatar-role">Online</span>
                            </div>
                        </div>
                    </div>
                </div>`;
html = html.replace(oldHeaderActions, newHeaderActions);

// 3. Update KPI Metrics to add Growth Indicators
// Product KPI
html = html.replace(
    `<div class="metric-value" id="stat-total">0</div>
                        </div>`,
    `<div class="metric-value" id="stat-total">0</div>
                            <div class="metric-growth"><span class="growth-up"><i class="fas fa-arrow-up"></i> 12.5%</span> <span class="growth-text">vs last week</span></div>
                        </div>`
);
// Jerseys KPI
html = html.replace(
    `<div class="metric-value" id="stat-jerseys">0</div>
                        </div>`,
    `<div class="metric-value" id="stat-jerseys">0</div>
                            <div class="metric-growth"><span class="growth-up"><i class="fas fa-arrow-up"></i> 5.2%</span> <span class="growth-text">vs last week</span></div>
                        </div>`
);
// Training KPI
html = html.replace(
    `<div class="metric-value" id="stat-training">0</div>
                        </div>`,
    `<div class="metric-value" id="stat-training">0</div>
                            <div class="metric-growth"><span class="growth-down"><i class="fas fa-arrow-down"></i> 1.1%</span> <span class="growth-text">vs last week</span></div>
                        </div>`
);
// Other KPI
html = html.replace(
    `<div class="metric-value" id="stat-other">0</div>
                        </div>`,
    `<div class="metric-value" id="stat-other">0</div>
                            <div class="metric-growth"><span class="growth-up"><i class="fas fa-arrow-up"></i> 2.4%</span> <span class="growth-text">vs last week</span></div>
                        </div>`
);

// 4. Update JS Action Buttons in renderProductsTable
// Replace .btn-edit and .btn-delete with .btn-action-icon
html = html.replace(
    `<button class="btn-edit" onclick="openEditModal(\${p.id})" title="Chỉnh sửa sản phẩm">
                                <i class="fa-solid fa-pen"></i> Sửa
                            </button>
                            <button class="btn-delete" onclick="handleDeleteProduct(\${p.id}, '\${p.name ? p.name.replace(/'/g, "\\\\'") : ''}')" title="Xóa sản phẩm">
                                <i class="fa-solid fa-trash"></i> Xóa
                            </button>`,
    `<button class="btn-action-icon" onclick="openEditModal(\${p.id})" title="Chỉnh sửa sản phẩm">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button class="btn-action-icon danger" onclick="handleDeleteProduct(\${p.id}, '\${p.name ? p.name.replace(/'/g, "\\\\'") : ''}')" title="Xóa sản phẩm">
                                <i class="fa-solid fa-trash"></i>
                            </button>`
);

fs.writeFileSync('manage-products.html', html);
console.log('manage-products.html updated for Executive Dashboard');
