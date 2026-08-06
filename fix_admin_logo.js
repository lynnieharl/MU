const fs = require('fs');
const path = require('path');

const dir = __dirname;
const regex = /<div class="sidebar-header">/g;
const replacement = '<div class="sidebar-header" style="cursor: pointer;" onclick="window.location.href=\'index.html\'">';

fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html') && file.startsWith('admin-') || file === 'manage-products.html' || file === 'new_crm_layout.html') {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        if (content.includes('<div class="sidebar-header">')) {
            content = content.replace(regex, replacement);
            fs.writeFileSync(filePath, content);
            console.log('Fixed logo link in', file);
        }
    }
});
console.log('Done!');
