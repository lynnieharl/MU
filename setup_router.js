const fs = require('fs');
const path = require('path');

// Ensure js dir exists
if (!fs.existsSync('js')) fs.mkdirSync('js');

// 1. Create sidebar-router.js
const sidebarRouterCode = `
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'admin-dashboard.html';

    const sidebarLinks = document.querySelectorAll('.sidebar-nav ul li a');
    
    // First, remove active from all li
    document.querySelectorAll('.sidebar-nav ul li').forEach(li => li.classList.remove('active'));

    // Highlight the one matching current URL
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href === pageName) {
            link.parentElement.classList.add('active');
        }
    });
});
`;
fs.writeFileSync('js/sidebar-router.js', sidebarRouterCode);

// 2. Update existing sidebars
const newSidebarHTML = `<nav class="sidebar-nav">
                <!-- MAIN / OVERVIEW -->
                <div class="sidebar-section-title" style="margin-top: 10px;">OVERVIEW</div>
                <ul>
                    <li><a href="admin-dashboard.html"><i class="fas fa-chart-pie"></i> Dashboard Overview</a></li>
                </ul>

                <!-- STORE MANAGEMENT -->
                <div class="sidebar-section-title">MANAGEMENT</div>
                <ul>
                    <li><a href="admin-crm.html"><i class="fas fa-chart-line"></i> CRM & Orders</a></li>
                    <li><a href="manage-products.html"><i class="fas fa-box"></i> Products Management</a></li>
                    <li><a href="admin-customers.html"><i class="fas fa-users"></i> Customers List</a></li>
                    <li><a href="admin-inventory.html"><i class="fas fa-tags"></i> Categories & Inventory</a></li>
                </ul>

                <!-- MARKETING & ANALYTICS -->
                <div class="sidebar-section-title">MARKETING</div>
                <ul>
                    <li><a href="admin-discounts.html"><i class="fas fa-ticket-alt"></i> Discounts & Coupons</a></li>
                    <li><a href="admin-analytics.html"><i class="fas fa-chart-bar"></i> Analytics & Reports</a></li>
                </ul>

                <!-- SYSTEM -->
                <div class="sidebar-section-title">SYSTEM</div>
                <ul>
                    <li><a href="admin-settings.html"><i class="fas fa-cog"></i> Store Settings</a></li>
                </ul>
            </nav>`;

function updateFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the old nav
    const regex = /<nav class="sidebar-nav">[\s\S]*?<\/nav>/;
    if (regex.test(content)) {
        content = content.replace(regex, newSidebarHTML);
    }
    
    // Inject script if not present
    if (!content.includes('sidebar-router.js')) {
        content = content.replace('</body>', '    <script src="js/sidebar-router.js"></script>\n</body>');
    }
    
    fs.writeFileSync(filePath, content);
}

updateFile('admin-crm.html');
updateFile('manage-products.html');
console.log('Sidebar Router created and existing files updated.');
