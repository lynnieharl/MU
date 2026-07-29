const fs = require('fs');

// 1. Create admin-auth.js
const adminAuthJs = `
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('crm-guard-overlay');
    
    function showContent() {
        if (overlay) {
            overlay.style.display = 'none';
        }
        document.body.style.overflow = 'auto'; // in case it was locked
    }

    // Check if user is logged in (mock logic for now)
    const userStr = localStorage.getItem('user');
    if (userStr) {
        showContent();
    } else {
        // Fallback: If no user in local storage, still show the page after 1 second
        // to prevent infinite loading screens on mock pages.
        setTimeout(showContent, 1000);
    }
});
`;
fs.writeFileSync('js/admin-auth.js', adminAuthJs);


// 2. Fix literal \\n in HTML files and inject admin-auth.js
const pagesToFix = [
    'admin-dashboard.html',
    'admin-customers.html',
    'admin-inventory.html',
    'admin-discounts.html',
    'admin-analytics.html',
    'admin-settings.html'
];

pagesToFix.forEach(page => {
    if (fs.existsSync(page)) {
        let content = fs.readFileSync(page, 'utf8');
        
        // Fix literal '\\n'
        content = content.replace(/\\n/g, '\n');
        
        // Inject admin-auth.js if not present
        if (!content.includes('admin-auth.js')) {
            content = content.replace('</body>', '    <script src="js/admin-auth.js"></script>\n</body>');
        }
        
        fs.writeFileSync(page, content);
    }
});

// Also inject into admin-crm.html and manage-products.html
const mainPages = ['admin-crm.html', 'manage-products.html'];
mainPages.forEach(page => {
    if (fs.existsSync(page)) {
        let content = fs.readFileSync(page, 'utf8');
        if (!content.includes('admin-auth.js')) {
            content = content.replace('</body>', '    <script src="js/admin-auth.js"></script>\n</body>');
        }
        
        // Also remove the infinite loading fallback if any, or let admin-auth override it.
        fs.writeFileSync(page, content);
    }
});

console.log('Fixed escape characters and injected admin-auth.js.');
