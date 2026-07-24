const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, 'register.html'), 'utf8');

// Thêm id cho email
html = html.replace(
    '<label class="sso-label">Email Address</label>\\r\\n                    <input type="email" class="sso-input" required>',
    '<label class="sso-label">Email Address</label>\\n                    <input type="email" id="register-email" class="sso-input" required>'
);
html = html.replace(
    '<label class="sso-label">Email Address</label>\\n                    <input type="email" class="sso-input" required>',
    '<label class="sso-label">Email Address</label>\\n                    <input type="email" id="register-email" class="sso-input" required>'
);


// Thêm id cho password
html = html.replace(
    '<label class="sso-label">Password</label>\\r\\n                    <input type="password" class="sso-input" required>',
    '<label class="sso-label">Password</label>\\n                    <input type="password" id="register-password" class="sso-input" required>'
);
html = html.replace(
    '<label class="sso-label">Password</label>\\n                    <input type="password" class="sso-input" required>',
    '<label class="sso-label">Password</label>\\n                    <input type="password" id="register-password" class="sso-input" required>'
);


// Cắt bỏ script cũ và chèn script mới
const scriptStart = html.indexOf('<!-- SUPABASE AUTH SCRIPT -->');
if (scriptStart !== -1) {
    html = html.substring(0, scriptStart);
}

const newScript = \`<!-- SUPABASE AUTH SCRIPT -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
    const _supabaseUrl = '';
    const _supabaseKey = '';
    
    // Khởi tạo Supabase client (Chỉ khởi tạo khi có URL và Key)
    let supabase = null;
    if (_supabaseUrl && _supabaseKey) {
        supabase = supabase.createClient(_supabaseUrl, _supabaseKey);
    }

    document.addEventListener('DOMContentLoaded', () => {
        const registerForm = document.getElementById('register-form');
        
        if (registerForm) {
            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault(); // CHẶN reload trang bắt buộc
                
                if (!supabase) {
                    alert('Lỗi: Chưa điền _supabaseUrl và _supabaseKey!');
                    return;
                }

                const emailInput = document.getElementById('register-email');
                const passwordInput = document.getElementById('register-password');
                
                if (!emailInput || !passwordInput) {
                    alert('Lỗi: Không tìm thấy ô nhập email hoặc password!');
                    return;
                }

                const email = emailInput.value;
                const password = passwordInput.value;

                try {
                    // Bước 1: Gọi hàm signUp của Supabase Auth
                    const { data: authData, error: authError } = await supabase.auth.signUp({
                        email: email,
                        password: password,
                    });

                    if (authError) {
                        throw authError; // Ném lỗi ra catch
                    }

                    // Bước 2: Lưu vào bảng users trong Database
                    const { error: dbError } = await supabase.from('users').insert([
                        { email: email, role: 'user', created_at: new Date().toISOString() }
                    ]);

                    if (dbError) {
                        throw dbError; // Ném lỗi Database ra catch
                    }

                    // Bước 3: Đăng ký & lưu DB thành công
                    alert('Đăng ký thành công! Đã lưu vào Database.');
                    registerForm.reset();

                } catch (error) {
                    // Bắt mọi lỗi xảy ra ở Bước 1 hoặc Bước 2
                    alert('Lỗi: ' + error.message);
                }
            });
        }
    });
</script>
</body>\`;

html = html.replace('</body>', newScript);

fs.writeFileSync(path.join(__dirname, 'register.html'), html, 'utf8');
console.log('Update register.html success');
