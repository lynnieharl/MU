const fs = require('fs');

const loginPath = 'login.html';
let content = fs.readFileSync(loginPath, 'utf8');

// Thêm ID vào email input
content = content.replace(
    '<input type="text" placeholder="Email or Supporter ID" class="sso-input" required>',
    '<input type="text" id="login-email" placeholder="Email or Supporter ID" class="sso-input" required>'
);

// Thêm ID vào password input
content = content.replace(
    '<input type="password" placeholder="Password" class="sso-input" required>',
    '<input type="password" id="login-password" placeholder="Password" class="sso-input" required>'
);

// Chuẩn bị script Supabase
const supabaseScript = `
    <!-- SCRIPT XỬ LÝ SUPABASE ĐĂNG NHẬP -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script>
        const _supabaseUrl = 'https://suabbqtrggzwgchksenq.supabase.co';
        const _supabaseKey = 'sb_publishable_E711W3fBxwZeRVYH3TOBAA_ZNoe_wps';
        
        let supabase = null;
        if (_supabaseUrl && _supabaseKey) {
            supabase = window.supabase.createClient(_supabaseUrl, _supabaseKey);
        }

        document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('login-form');
            if (form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    if (!supabase) return alert('Chưa kết nối Supabase!');

                    const email = document.getElementById('login-email').value;
                    const pass = document.getElementById('login-password').value;
                    
                    const btn = form.querySelector('button[type="submit"]');
                    const originalText = btn.innerHTML;
                    btn.innerHTML = 'Đang xử lý...';
                    btn.disabled = true;

                    try {
                        const { data, error } = await supabase.auth.signInWithPassword({
                            email: email,
                            password: pass
                        });

                        if (error) throw error;
                        
                        // Check role for redirection
                        const { data: userData } = await supabase.from('users').select('role').eq('email', email).single();
                        
                        let role = userData ? userData.role : 'user';
                        
                        // Redirect based on role
                        if (role === 'admin') {
                            window.location.href = 'admin-dashboard.html';
                        } else {
                            window.location.href = 'index.html'; 
                        }

                    } catch (err) {
                        console.error('Lỗi đăng nhập:', err);
                        alert('Sai email hoặc mật khẩu! Vui lòng thử lại.');
                    } finally {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                    }
                });
            }
        });
    </script>
    <script src="main.js"></script>
`;

content = content.replace('<script src="main.js"></script>', supabaseScript);

fs.writeFileSync(loginPath, content, 'utf8');
console.log("Reverted and injected logic successfully.");
