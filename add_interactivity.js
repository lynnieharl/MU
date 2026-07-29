const fs = require('fs');

// --- 1. APPEND CSS TO admin.css ---
const cssAdd = `
/* DROPDOWNS */
.dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 12px;
    background: var(--admin-white);
    border: 1px solid var(--admin-border);
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    min-width: 250px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.2s ease;
    z-index: 1000;
}

.dropdown-menu.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.dropdown-header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--admin-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dropdown-header h4 {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--admin-text-main);
}

.dropdown-action {
    font-size: 0.75rem;
    color: var(--admin-primary);
    cursor: pointer;
    font-weight: 600;
}
.dropdown-action:hover {
    text-decoration: underline;
}

.dropdown-content {
    max-height: 300px;
    overflow-y: auto;
}

.dropdown-item {
    padding: 12px 20px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    border-bottom: 1px solid var(--admin-border);
    cursor: pointer;
    transition: background 0.2s;
    text-decoration: none;
    color: var(--admin-text-main);
}
.dropdown-item:last-child {
    border-bottom: none;
}
.dropdown-item:hover {
    background: #F4F4F5;
}

.dropdown-item-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--admin-content-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--admin-primary);
    font-size: 0.85rem;
}

.dropdown-item-text {
    flex: 1;
}

.dropdown-item-text p {
    font-size: 0.85rem;
    font-weight: 500;
    margin-bottom: 4px;
    line-height: 1.3;
}

.dropdown-item-text span {
    font-size: 0.7rem;
    color: var(--admin-text-muted);
}
`;
fs.appendFileSync('admin.css', cssAdd);


// --- 2. UPDATE HTML FILES ---
const headerProfileHtml = `<div class="header-profile-section">
                        <div style="position: relative;">
                            <button class="notification-btn" id="notif-btn"><i class="far fa-bell"></i><span class="badge" id="notif-badge">5</span></button>
                            <div class="dropdown-menu" id="notif-dropdown">
                                <div class="dropdown-header">
                                    <h4>Notifications</h4>
                                    <span class="dropdown-action" id="mark-read-btn">Mark all as read</span>
                                </div>
                                <div class="dropdown-content">
                                    <div class="dropdown-item">
                                        <div class="dropdown-item-icon"><i class="fas fa-shopping-cart"></i></div>
                                        <div class="dropdown-item-text">
                                            <p>Có đơn hàng mới #1024</p>
                                            <span>2 mins ago</span>
                                        </div>
                                    </div>
                                    <div class="dropdown-item">
                                        <div class="dropdown-item-icon" style="color: #F59E0B; background: rgba(245,158,11,0.1);"><i class="fas fa-exclamation-triangle"></i></div>
                                        <div class="dropdown-item-text">
                                            <p>Sản phẩm 'Home Kit 24/25' sắp hết hàng</p>
                                            <span>1 hour ago</span>
                                        </div>
                                    </div>
                                    <div class="dropdown-item">
                                        <div class="dropdown-item-icon" style="color: #10B981; background: rgba(16,185,129,0.1);"><i class="fas fa-user-plus"></i></div>
                                        <div class="dropdown-item-text">
                                            <p>Khách hàng vừa đăng ký</p>
                                            <span>3 hours ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="avatar-wrapper" id="avatar-btn" style="cursor: pointer;">
                            <div class="avatar-img">A</div>
                            <div class="status-dot"></div>
                            <div class="avatar-info">
                                <span class="avatar-name">Admin</span>
                                <span class="avatar-role">Online</span>
                            </div>
                            <div class="dropdown-menu" id="profile-dropdown" style="min-width: 200px;">
                                <div class="dropdown-content">
                                    <a href="#" class="dropdown-item">
                                        <i class="fas fa-cog" style="width: 20px; color: var(--admin-text-muted);"></i>
                                        <span style="font-weight: 500; font-size: 0.85rem;">Profile Settings</span>
                                    </a>
                                    <a href="#" class="dropdown-item">
                                        <i class="fas fa-clipboard-list" style="width: 20px; color: var(--admin-text-muted);"></i>
                                        <span style="font-weight: 500; font-size: 0.85rem;">System Logs</span>
                                    </a>
                                    <div style="border-top: 1px solid var(--admin-border); margin: 4px 0;"></div>
                                    <a href="#" class="dropdown-item" id="dropdown-logout-btn">
                                        <i class="fas fa-sign-out-alt" style="width: 20px; color: var(--admin-danger);"></i>
                                        <span style="font-weight: 600; font-size: 0.85rem; color: var(--admin-danger);">Logout</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>`;

const sharedJSToggle = `
        // INTERACTIVITY FOR DROPDOWNS
        document.addEventListener('DOMContentLoaded', () => {
            const notifBtn = document.getElementById('notif-btn');
            const notifDropdown = document.getElementById('notif-dropdown');
            const avatarBtn = document.getElementById('avatar-btn');
            const profileDropdown = document.getElementById('profile-dropdown');
            const markReadBtn = document.getElementById('mark-read-btn');
            const notifBadge = document.getElementById('notif-badge');
            const dropdownLogoutBtn = document.getElementById('dropdown-logout-btn');

            if (notifBtn && notifDropdown) {
                notifBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    notifDropdown.classList.toggle('active');
                    if(profileDropdown) profileDropdown.classList.remove('active');
                });
            }

            if (avatarBtn && profileDropdown) {
                avatarBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    profileDropdown.classList.toggle('active');
                    if(notifDropdown) notifDropdown.classList.remove('active');
                });
            }

            if (markReadBtn && notifBadge) {
                markReadBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    notifBadge.style.display = 'none';
                    // Optional: could empty the content or change styling to read
                });
            }

            if (dropdownLogoutBtn) {
                dropdownLogoutBtn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    if (supabaseClient) {
                        await supabaseClient.auth.signOut();
                    }
                    window.location.href = 'index.html#login';
                });
            }

            // Close on outside click
            document.addEventListener('click', (e) => {
                if (notifDropdown && !notifDropdown.contains(e.target) && !notifBtn.contains(e.target)) {
                    notifDropdown.classList.remove('active');
                }
                if (profileDropdown && !profileDropdown.contains(e.target) && !avatarBtn.contains(e.target)) {
                    profileDropdown.classList.remove('active');
                }
            });
        });
`;

// Helper to replace the header profile section
function updateHeaderProfile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const oldHeaderStart = content.indexOf('<div class="header-profile-section">');
    if (oldHeaderStart !== -1) {
        // Simple search for the end of this div, it ends exactly before </div>\n                </div>\n            </div>
        // Let's use a regex that captures everything from <div class="header-profile-section"> to the closing </div> of that section
        const regex = /<div class="header-profile-section">[\s\S]*?<button class="notification-btn"><i class="far fa-bell"><\/i><span class="badge">5<\/span><\/button>[\s\S]*?<\/div>\s*<\/div>/;
        content = content.replace(regex, headerProfileHtml);
    }
    
    // Add shared JS to the end before </body>
    // Make sure we only add it once
    if (!content.includes('INTERACTIVITY FOR DROPDOWNS')) {
        content = content.replace('</body>', sharedJSToggle + '\n</body>');
    }
    
    fs.writeFileSync(filePath, content);
}

// Update admin-crm.html
updateHeaderProfile('admin-crm.html');
updateHeaderProfile('manage-products.html');

// --- 3. FILTER PILLS LOGIC FOR CRM ---
let crmContent = fs.readFileSync('admin-crm.html', 'utf8');
const filterLogic = `
        let currentOrderFilter = 'All Orders';
        
        document.addEventListener('DOMContentLoaded', () => {
            const pills = document.querySelectorAll('.filter-pill');
            pills.forEach(pill => {
                pill.addEventListener('click', () => {
                    // Remove active from all
                    pills.forEach(p => p.classList.remove('active'));
                    // Add active to clicked
                    pill.classList.add('active');
                    
                    currentOrderFilter = pill.textContent.trim();
                    // In CRM, orders are mocked with products, so we re-render the products preview
                    if (allProductsData && allProductsData.length > 0) {
                        let filtered = allProductsData;
                        if (currentOrderFilter === 'Completed') {
                            filtered = allProductsData.filter(p => p.id % 2 === 0); // Mock logic for demo
                        } else if (currentOrderFilter === 'Pending') {
                            filtered = allProductsData.filter(p => p.id % 2 !== 0); // Mock logic for demo
                        }
                        renderProductsPreview(filtered);
                    }
                });
            });
        });
`;

if (!crmContent.includes('currentOrderFilter =')) {
    // Add logic at the very end of script
    crmContent = crmContent.replace('</script>\n    <script src="js/auth-modal.js"></script>', filterLogic + '\n</script>\n    <script src="js/auth-modal.js"></script>');
    
    // In CRM, the original code always rendered status-badge success for Completed.
    // Let's update renderProductsPreview in admin-crm.html to dynamically render Completed/Pending based on the mock logic.
    crmContent = crmContent.replace(
        /<td><span class="status-badge success">Completed<\/span><\/td>/g,
        "<td><span class=\"status-badge ${p.id % 2 === 0 ? 'success' : 'warning'}\">${p.id % 2 === 0 ? 'Completed' : 'Pending'}</span></td>"
    );
    
    fs.writeFileSync('admin-crm.html', crmContent);
}

console.log('Successfully added interactivity (Dropdowns, Filters).');
