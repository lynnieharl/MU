const fs = require('fs');
const path = require('path');

const scriptStr = `
<!-- SUPABASE AUTH SCRIPT -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
    const _supabaseUrl = 'https://suabbqtrggzwgchksenq.supabase.co';
    const _supabaseKey = 'sb_publishable_E711W3fBxwZeRVYH3TOBAA_ZNoe_wps';
    const supabase = supabase.createClient(_supabaseUrl, _supabaseKey);

    document.addEventListener('DOMContentLoaded', () => {
        const form = document.querySelector('.sso-form');
        
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Form lấy email (hoặc username) và password.
                // Note: File giao diện gốc có type="text" nhưng ở đây ta cần email.
                const inputs = form.querySelectorAll('.sso-input');
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

                // Kiểm tra xem đây là trang đăng nhập hay đăng ký dựa vào nội dung nút submit
                const btn = form.querySelector('.sso-btn');
                const isLogin = btn && btn.innerText.toUpperCase().includes('LOG IN');

                if (isLogin) {
                    // Xử lý ĐĂNG NHẬP
                    const { data, error } = await supabase.auth.signInWithPassword({
                        email: email,
                        password: password,
                    });

                    if (error) {
                        alert('Sai email hoặc mật khẩu! (' + error.message + ')');
                    } else {
                        window.location.href = 'index.html';
                    }
                } else {
                    // Xử lý ĐĂNG KÝ
                    const { data, error } = await supabase.auth.signUp({
                        email: email,
                        password: password,
                    });

                    if (error) {
                        alert('Đăng ký thất bại: ' + error.message);
                    } else {
                        alert('Đăng ký thành công! Bạn có thể đăng nhập ngay.');
                        inputs.forEach(input => input.value = ''); // Xóa rỗng form
                    }
                }
            });
        }
    });
</script>
`;

['login.html', 'register.html'].forEach(file => {
    const filePath = path.join(__dirname, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    if (!html.includes('SUPABASE AUTH SCRIPT')) {
        // Chèn script trước thẻ </body>
        html = html.replace('</body>', scriptStr + '\n</body>');
        fs.writeFileSync(filePath, html, 'utf8');
        console.log("Đã tiêm Script vào " + file);
    }
});
