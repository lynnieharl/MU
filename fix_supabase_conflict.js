const fs = require('fs');

const files = ['admin-dashboard.html', 'register.html', 'login.html', 'index.html'];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Thay thế const supabase = window.supabase...
        content = content.replace(/const supabase = window\.supabase\.createClient/g, 'const supabaseClient = window.supabase.createClient');
        
        // Thay thế các lời gọi supabase.auth... supabase.from...
        // Tuy nhiên, phải cẩn thận không thay thế "window.supabase"
        // Dùng Regex thay thế toàn bộ từ khóa "supabase." thành "supabaseClient."
        // (ngoại trừ khi nó đứng sau "window.")
        content = content.replace(/(?<!window\.)\bsupabase\./g, 'supabaseClient.');
        
        fs.writeFileSync(file, content, 'utf8');
        console.log(\`Fixed \${file}\`);
    }
});
