const fs = require('fs');

let html = fs.readFileSync('admin-crm.html', 'utf8');

// 1. Update Fonts
html = html.replace(
    '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">',
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@500;600;700;800&display=swap" rel="stylesheet">'
);

// 2. Update Top Bar (Header actions)
const oldHeaderActions = `<div class="header-actions">
                    <form class="search-bar" id="crm-search-form">
                        <i class="fas fa-search"></i>
                        <input type="text" id="crm-search-input" placeholder="Search orders or users...">
                    </form>
                    <button class="notification-btn"><i class="far fa-bell"></i><span class="badge">5</span></button>
                </div>`;
const newHeaderActions = `<div class="header-actions">
                    <form class="search-bar" id="crm-search-form">
                        <i class="fas fa-search"></i>
                        <input type="text" id="crm-search-input" placeholder="Search orders or users...">
                    </form>
                    <div class="header-profile-section">
                        <button class="notification-btn"><i class="far fa-bell"></i><span class="badge">5</span></button>
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
html = html.replace(
    `<div class="metric-value" id="stat-customers">0</div>
                        </div>`,
    `<div class="metric-value" id="stat-customers">0</div>
                            <div class="metric-growth"><span class="growth-up"><i class="fas fa-arrow-up"></i> 8.4%</span> <span class="growth-text">vs last week</span></div>
                        </div>`
);
html = html.replace(
    `<div class="metric-value" id="stat-orders">0</div>
                        </div>`,
    `<div class="metric-value" id="stat-orders">0</div>
                            <div class="metric-growth"><span class="growth-up"><i class="fas fa-arrow-up"></i> 12.1%</span> <span class="growth-text">vs last week</span></div>
                        </div>`
);
html = html.replace(
    `<div class="metric-value" id="stat-revenue">0 ₫</div>
                        </div>`,
    `<div class="metric-value" id="stat-revenue">0 ₫</div>
                            <div class="metric-growth"><span class="growth-up"><i class="fas fa-arrow-up"></i> 24.5%</span> <span class="growth-text">vs last week</span></div>
                        </div>`
);
html = html.replace(
    `<div class="metric-value" id="stat-pending">0</div>
                        </div>`,
    `<div class="metric-value" id="stat-pending">0</div>
                            <div class="metric-growth"><span class="growth-down"><i class="fas fa-arrow-down"></i> 3.2%</span> <span class="growth-text">vs last week</span></div>
                        </div>`
);

// 4. Update JS Action Buttons in renderUsersTable
html = html.replace(
    `<button class="btn-edit" onclick="promoteToAdmin(\${u.id}, '\${u.email}')" title="Nâng quyền thành Admin">
                                    <i class="fa-solid fa-arrow-up"></i> Make Admin
                                </button>`,
    `<button class="btn-action-icon" onclick="promoteToAdmin(\${u.id}, '\${u.email}')" title="Nâng quyền thành Admin">
                                    <i class="fa-solid fa-arrow-up"></i>
                                </button>`
);

// 5. Update JS Action Buttons in renderProductsPreview
html = html.replace(
    `<a href="manage-products.html" class="btn-edit">
                                <i class="fa-solid fa-eye"></i> View
                            </a>`,
    `<a href="manage-products.html" class="btn-action-icon" title="View details">
                                <i class="fa-solid fa-eye"></i>
                            </a>`
);

fs.writeFileSync('admin-crm.html', html);
console.log('admin-crm.html updated for Executive Dashboard');
