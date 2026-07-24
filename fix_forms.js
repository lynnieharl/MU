const fs = require('fs');
const path = require('path');

const fixFile = (fileName, formId) => {
    const filePath = path.join(__dirname, fileName);
    if (!fs.existsSync(filePath)) return;
    
    let html = fs.readFileSync(filePath, 'utf8');

    // Remove action="#" method="POST" from .sso-form and add the specific ID
    html = html.replace(/<form action="#" method="POST" class="sso-form">/g, \`<form id="\${formId}" class="sso-form">\`);
    
    // Also fix the JS block that was injected previously
    // The previous block used document.querySelector('.sso-form')
    // We will replace the script completely with a more robust version
    
    const scriptStart = html.indexOf('<!-- SUPABASE AUTH SCRIPT -->');
    if (scriptStart !== -1) {
        html = html.substring(0, scriptStart);
    }
    
    const scriptStr = \`
<!-- SUPABASE AUTH SCRIPT -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
    const _supabaseUrl = 'https://suabbqtrggzwgchksenq.supabase.co';
    const _supabaseKey = 'sb_publishable_E711W3fBxwZeRVYH3TOBAA_ZNoe_wps';
    const supabase = supabase.createClient(_supabaseUrl, _supabaseKey);

    document.addEventListener('DOMContentLoaded', () => {
        // Logic cho ĐĂNG NHẬP
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const inputs = loginForm.querySelectorAll('.sso-input');
                let email = '';
                let password = '';
                
                inputs.forEach(input => {
                    if(input.type === 'email' || input.placeholder.toLowerCase().includes('email')) {
                        email = input.value;
                    }
                    if(input.type === 'password' || input.placeholder.toLowerCase().includes('password')) {
                        password = input.value;
                    }
                });

                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
                });

                if (error) {
                    alert('Sai email hoặc mật khẩu! (' + error.message + ')');
                } else {
                    window.location.href = 'index.html';
                }
            });
        }

        // Logic cho ĐĂNG KÝ
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const inputs = registerForm.querySelectorAll('.sso-input');
                let email = '';
                let password = '';
                
                inputs.forEach(input => {
                    if(input.type === 'email' || input.placeholder.toLowerCase().includes('email')) {
                        email = input.value;
                    }
                    if(input.type === 'password' || input.placeholder.toLowerCase().includes('password')) {
                        password = input.value;
                    }
                });

                const { data, error } = await supabase.auth.signUp({
                    email: email,
                    password: password,
                });

                if (error) {
                    alert('Đăng ký thất bại: ' + error.message);
                } else {
                    alert('Đăng ký thành công! Bạn có thể đăng nhập ngay.');
                    inputs.forEach(input => input.value = ''); 
                }
            });
        }
    });
</script>
</body>\`;

    html = html.replace('</body>', scriptStr);
    
    fs.writeFileSync(filePath, html, 'utf8');
    console.log("Đã fix lỗi 405 cho " + fileName);
};

fixFile('login.html', 'login-form');
fixFile('register.html', 'register-form');
