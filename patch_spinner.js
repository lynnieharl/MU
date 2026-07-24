const fs = require('fs');

// 1. Patch register.html
let regHtml = fs.readFileSync('register.html', 'utf8');

const oldRegScriptRegex = /<!-- Nhúng Supabase -->[\s\S]*?<\/html>/;
const newRegScript = `<!-- Nhúng Supabase -->
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
                const btn = registerForm.querySelector('button[type="submit"]');

                if (password.length < 6) {
                    alert('Mật khẩu phải từ 6 ký tự trở lên!');
                    return;
                }

                const oldText = btn.innerHTML;
                btn.innerHTML = 'Đang xử lý...';
                btn.disabled = true;

                try {
                    const { error: authErr } = await supabase.auth.signUp({ email, password });
                    if (authErr) throw authErr;

                    const { error: dbErr } = await supabase.from('users').insert([{ email: email, role: 'user' }]);
                    if (dbErr) throw dbErr;

                    alert('Đăng ký tài khoản thành công!');
                    registerForm.reset();
                    window.location.href = 'login.html';
                } catch (err) {
                    alert('Lỗi đăng ký: ' + err.message);
                } finally {
                    btn.innerHTML = oldText;
                    btn.disabled = false;
                }
            });
        }
    });
</script>
</body>
</html>`;

if (oldRegScriptRegex.test(regHtml)) {
    regHtml = regHtml.replace(oldRegScriptRegex, newRegScript);
    fs.writeFileSync('register.html', regHtml, 'utf8');
    console.log('Patched register.html');
}

// 2. Patch admin-dashboard.html
let adminHtml = fs.readFileSync('admin-dashboard.html', 'utf8');

const oldAdminScriptRegex = /\/\/ 1\. XỬ LÝ ĐĂNG KÝ ADMIN TỰ ĐỘNG[\s\S]*?(\/\/ 2\. XỬ LÝ ĐĂNG NHẬP)/;
const newAdminScript = `// 1. XỬ LÝ ĐĂNG KÝ ADMIN TỰ ĐỘNG
        async function xuLyDangKy(e) {
            e.preventDefault();
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const btn = document.querySelector('#form-register button[type="submit"]');

            if (password.length < 6) {
                alert('Mật khẩu phải từ 6 ký tự trở lên!');
                return;
            }

            const oldText = btn.innerHTML;
            btn.innerHTML = 'Đang xử lý...';
            btn.disabled = true;

            try {
                const { data: authData, error: authErr } = await supabase.auth.signUp({ email, password });
                if (authErr) throw authErr;

                const { error: dbErr } = await supabase.from('users').insert([{ email: email, role: 'admin' }]);
                if (dbErr) throw dbErr;

                alert("🎉 Tạo tài khoản Admin thành công! Giờ ông có thể Đăng Nhập.");
                switchTab('login');
                document.getElementById('login-email').value = email;
            } catch (err) {
                alert("❌ Lỗi Đăng Ký: " + err.message);
            } finally {
                btn.innerHTML = oldText;
                btn.disabled = false;
            }
        }

        $1`;

if (oldAdminScriptRegex.test(adminHtml)) {
    adminHtml = adminHtml.replace(oldAdminScriptRegex, newAdminScript);
    fs.writeFileSync('admin-dashboard.html', adminHtml, 'utf8');
    console.log('Patched admin-dashboard.html');
}
