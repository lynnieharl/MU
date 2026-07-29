const fs = require('fs');

const files = [
    'admin-crm.html',
    'manage-products.html',
    'admin-dashboard.html',
    'admin-customers.html',
    'admin-inventory.html',
    'admin-discounts.html',
    'admin-analytics.html',
    'admin-settings.html'
];

const supabaseScripts = `
    <!-- Supabase Core & Config -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="js/supabase-config.js"></script>
`;

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    // 1. Inject Supabase in HEAD if not present
    if (!html.includes('js/supabase-config.js')) {
        // Find </title> and insert right after it
        html = html.replace('</title>', '</title>\n' + supabaseScripts);
    }
    
    // 2. Remove any old inline Supabase config (from admin-crm and manage-products)
    html = html.replace(/const SUPABASE_URL = .*?;/g, '');
    html = html.replace(/const SUPABASE_KEY = .*?;/g, '');
    html = html.replace(/let supabaseClient = null;/g, '');
    html = html.replace(/if \(window\.supabase\) {[\s\S]*?}/g, '');
    html = html.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/@supabase\/supabase-js@2"><\/script>/g, '');
    
    // Clean up empty lines left by removal
    html = html.replace(/\n\s*\n/g, '\n');

    fs.writeFileSync(file, html);
});

console.log('Injected centralized Supabase config to all files.');
