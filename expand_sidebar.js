const fs = require('fs');

// 1. ADD CSS FOR SECTION TITLES
const cssAdd = `
.sidebar-section-title {
    font-size: 0.7rem;
    font-weight: 700;
    color: #71717A;
    letter-spacing: 0.1em;
    margin: 20px 16px 8px 16px;
    text-transform: uppercase;
}
.sidebar-nav {
    overflow-y: auto;
}
.sidebar-nav::-webkit-scrollbar {
    width: 4px;
}
.sidebar-nav::-webkit-scrollbar-thumb {
    background-color: var(--admin-sidebar-border);
    border-radius: 4px;
}
`;
fs.appendFileSync('admin.css', cssAdd);


// 2. HTML STRUCTURES
const sidebarHTML = (activePage) => {
    return `<nav class="sidebar-nav">
                <!-- MAIN / OVERVIEW -->
                <div class="sidebar-section-title" style="margin-top: 10px;">OVERVIEW</div>
                <ul>
                    <li><a href="#" class="dev-feature"><i class="fas fa-chart-pie"></i> Dashboard Overview</a></li>
                </ul>

                <!-- STORE MANAGEMENT -->
                <div class="sidebar-section-title">MANAGEMENT</div>
                <ul>
                    <li class="\${activePage === 'crm' ? 'active' : ''}"><a href="admin-crm.html"><i class="fas fa-chart-line"></i> CRM & Orders</a></li>
                    <li class="\${activePage === 'products' ? 'active' : ''}"><a href="manage-products.html"><i class="fas fa-box"></i> Products Management</a></li>
                    <li><a href="#" class="dev-feature"><i class="fas fa-users"></i> Customers List</a></li>
                    <li><a href="#" class="dev-feature"><i class="fas fa-tags"></i> Categories & Inventory</a></li>
                </ul>

                <!-- MARKETING & ANALYTICS -->
                <div class="sidebar-section-title">MARKETING</div>
                <ul>
                    <li><a href="#" class="dev-feature"><i class="fas fa-ticket-alt"></i> Discounts & Coupons</a></li>
                    <li><a href="#" class="dev-feature"><i class="fas fa-chart-bar"></i> Analytics & Reports</a></li>
                </ul>

                <!-- SYSTEM -->
                <div class="sidebar-section-title">SYSTEM</div>
                <ul>
                    <li><a href="#" class="dev-feature"><i class="fas fa-cog"></i> Store Settings</a></li>
                </ul>
            </nav>`;
};


function updateSidebar(filePath, activePage) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace <nav class="sidebar-nav"> ... </nav>
    const regex = /<nav class="sidebar-nav">[\s\S]*?<\/nav>/;
    
    // Check if we already replaced it or if it exists
    if (regex.test(content)) {
        content = content.replace(regex, sidebarHTML(activePage));
    }
    
    // Inject JS logic for dev-feature alerts
    const devFeatureJS = `
            const devFeatures = document.querySelectorAll('.dev-feature');
            devFeatures.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    alert('Tính năng đang phát triển!');
                });
            });
    `;
    
    // Find where to inject the JS (in the DOMContentLoaded of the interactivity block)
    if (!content.includes('Tính năng đang phát triển')) {
        content = content.replace('// Close on outside click', devFeatureJS + '\n            // Close on outside click');
    }

    fs.writeFileSync(filePath, content);
}

// Update files
updateSidebar('admin-crm.html', 'crm');
updateSidebar('manage-products.html', 'products');

console.log('Sidebar updated successfully with full enterprise navigation.');
