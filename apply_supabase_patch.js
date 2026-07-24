const fs = require('fs');

// 1. UPDATE REGISTER.HTML
let registerHtml = fs.readFileSync('register.html', 'utf8');

registerHtml = registerHtml.replace('<form onsubmit="xuLyDangKy(event)">', '<form id="register-form">');
registerHtml = registerHtml.replace('id="email-dang-ky"', 'id="register-email"');
registerHtml = registerHtml.replace('id="pass-dang-ky"', 'id="register-password"');

const registerScriptMatch = registerHtml.match(/<!-- Nhúng Supabase -->[\s\S]*?<\/html>/);
if (registerScriptMatch) {
    const newRegisterScript = `<!-- Nhúng Supabase -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
    const _supabaseUrl = 'https://suabbqtrggzwgchksenq.supabase.co';
    const _supabaseKey = 'sb_publishable_E711W3fBxwZeRVYH3TOBAA_ZNoe_wps';
    const supabase = window.supabase.createClient(_supabaseUrl, _supabaseKey);

    document.addEventListener('DOMContentLoaded', () => {
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('register-email').value;
                const password = document.getElementById('register-password').value;

                try {
                    const { error: authErr } = await supabase.auth.signUp({ email, password });
                    if (authErr) throw authErr;

                    const { error: dbErr } = await supabase.from('users').insert([{ email: email, role: 'user' }]);
                    if (dbErr) throw dbErr;

                    alert('Đăng ký thành công!');
                    registerForm.reset();
                    window.location.href = 'login.html';
                } catch (err) {
                    alert('Lỗi đăng ký: ' + err.message);
                }
            });
        }
    });
</script>
</body>
</html>`;
    registerHtml = registerHtml.replace(registerScriptMatch[0], newRegisterScript);
    fs.writeFileSync('register.html', registerHtml, 'utf8');
}


// 2. UPDATE LOGIN.HTML
let loginHtml = fs.readFileSync('login.html', 'utf8');
const loginScriptMatch = loginHtml.match(/<!-- SCRIPT XỬ LÝ SUPABASE ĐĂNG NHẬP -->[\s\S]*?<\/html>/);
if (loginScriptMatch) {
    const newLoginScript = `<!-- SCRIPT XỬ LÝ SUPABASE ĐĂNG NHẬP -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
    const _supabaseUrl = 'https://suabbqtrggzwgchksenq.supabase.co';
    const _supabaseKey = 'sb_publishable_E711W3fBxwZeRVYH3TOBAA_ZNoe_wps';
    const supabase = window.supabase.createClient(_supabaseUrl, _supabaseKey);

    document.addEventListener('DOMContentLoaded', () => {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;

                try {
                    const { error } = await supabase.auth.signInWithPassword({ email, password });
                    if (error) throw error;
                    
                    window.location.href = 'index.html';
                } catch (err) {
                    alert('Đăng nhập thất bại: ' + err.message);
                }
            });
        }
    });
</script>
<script src="main.js"></script>
</body>
</html>`;
    loginHtml = loginHtml.replace(loginScriptMatch[0], newLoginScript);
    fs.writeFileSync('login.html', loginHtml, 'utf8');
}


// 3. UPDATE ADMIN-DASHBOARD.HTML
let adminHtml = fs.readFileSync('admin-dashboard.html', 'utf8');
adminHtml = adminHtml.replace("const _supabaseUrl = '';", "const _supabaseUrl = 'https://suabbqtrggzwgchksenq.supabase.co';");
adminHtml = adminHtml.replace("const _supabaseKey = '';", "const _supabaseKey = 'sb_publishable_E711W3fBxwZeRVYH3TOBAA_ZNoe_wps';");

// Ensure error handling is try-catch with alerts everywhere
fs.writeFileSync('admin-dashboard.html', adminHtml, 'utf8');

console.log('Patch complete.');
