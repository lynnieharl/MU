const fs = require('fs');
const path = require('path');

const htmlFile = path.join(__dirname, 'admin-dashboard.html');
const txtFile = path.join(__dirname, 'script_rbac.txt');

let html = fs.readFileSync(htmlFile, 'utf8');
const scriptText = fs.readFileSync(txtFile, 'utf8');

const startMarker = '<!-- SUPABASE ADMIN SCRIPT -->';
const startIdx = html.indexOf(startMarker);

if (startIdx !== -1) {
    html = html.substring(0, startIdx) + scriptText;
} else {
    // If not found, replace body
    html = html.replace('</body>', scriptText);
}

fs.writeFileSync(htmlFile, html, 'utf8');
console.log('Update admin-dashboard.html with RBAC script successfully');
