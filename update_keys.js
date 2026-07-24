const fs = require('fs');

const url = 'https://suabbqtrggzwgchksenq.supabase.co';
const key = 'sb_publishable_E711W3fBxwZeRVYH3TOBAA_ZNoe_wps';

const files = ['admin-dashboard.html', 'new-in.html', 'register.html'];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        content = content.replace(/const _supabaseUrl\s*=\s*['"](.*?)['"];/g, `const _supabaseUrl = '${url}';`);
        content = content.replace(/const _supabaseKey\s*=\s*['"](.*?)['"];/g, `const _supabaseKey = '${key}';`);
        
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated ' + file);
    }
});
