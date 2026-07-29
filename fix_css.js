const fs = require('fs');

let css = fs.readFileSync('admin.css', 'utf8');

// Update .main-header
css = css.replace(
    /\.main-header \{([\s\S]*?)align-items: center;/g,
    '.main-header {$1align-items: center;\n    width: 100%;\n    margin-bottom: 24px;'
);

// Update .metrics-grid
css = css.replace(
    /\.metrics-grid \{([\s\S]*?)margin-bottom: 40px;/g,
    '.metrics-grid {$1width: 100%;\n    margin-bottom: 28px;'
);
css = css.replace(
    /gap: 24px;/g,
    'gap: 20px;'
);

// Fix .dashboard-section .section-header to ensure it is flex space-between
if (!css.includes('.section-header {')) {
    css += `\n.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }`;
}

// Ensure .table-responsive has width 100%
if (!css.includes('.table-responsive {')) {
    css += `\n.table-responsive { width: 100%; overflow-x: auto; }`;
} else {
    css = css.replace(/\.table-responsive \{/g, '.table-responsive {\n    width: 100%;');
}

fs.writeFileSync('admin.css', css);
console.log('Fixed CSS layout properties to perfectly match the requested styling.');
