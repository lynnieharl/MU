const fs = require('fs');

// 1. UPDATE REGISTER.HTML
let registerHtml = fs.readFileSync('register.html', 'utf8');

// The original script content in register.html we want to replace
const registerOriginalBlock = `                const email = document.getElementById('register-email').value;
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
                }`;

const registerNewBlock = `                const email = document.getElementById('register-email').value;
                const password = document.getElementById('register-password').value;

                if (password.length < 6) {
                    alert('Mật khẩu phải từ 6 ký tự trở lên!');
                    return;
                }

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
                }`;

registerHtml = registerHtml.replace(registerOriginalBlock, registerNewBlock);
fs.writeFileSync('register.html', registerHtml, 'utf8');

// 2. UPDATE ADMIN-DASHBOARD.HTML
let adminHtml = fs.readFileSync('admin-dashboard.html', 'utf8');

const adminOriginalBlock = `            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const btn = document.getElementById('btn-submit-register');

            btn.innerHTML = 'Đang xử lý...';
            btn.disabled = true;

            try {
                // Đăng ký qua Auth
                const { data, error: authError } = await supabase.auth.signUp({ email, password });
                if (authError) throw authError;

                // Ghi vào bảng users với role mặc định là 'user'
                const { error: dbError } = await supabase.from('users').insert([{ email: email, role: 'user' }]);
                if (dbError) throw dbError;

                alert("Đăng ký thành công! Vui lòng nhờ Super Admin nâng cấp quyền lên 'admin' trong Database để đăng nhập.");`;

const adminNewBlock = `            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const btn = document.getElementById('btn-submit-register');

            if (password.length < 6) {
                alert('Mật khẩu phải từ 6 ký tự trở lên!');
                return;
            }

            btn.innerHTML = 'Đang xử lý...';
            btn.disabled = true;

            try {
                // Đăng ký qua Auth
                const { data, error: authError } = await supabase.auth.signUp({ email, password });
                if (authError) throw authError;

                // Ghi vào bảng users với role là 'admin'
                const { error: dbError } = await supabase.from('users').insert([{ email: email, role: 'admin' }]);
                if (dbError) throw dbError;

                alert("Đã khởi tạo tài khoản Admin thành công! Hãy chuyển sang tab Đăng nhập.");`;

adminHtml = adminHtml.replace(adminOriginalBlock, adminNewBlock);
fs.writeFileSync('admin-dashboard.html', adminHtml, 'utf8');

console.log('Update successful.');
