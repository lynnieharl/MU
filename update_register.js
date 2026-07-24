const fs = require('fs');

const htmlFile = 'register.html';
let content = fs.readFileSync(htmlFile, 'utf8');

// Replace email input
content = content.replace(
    '<label class="sso-label">Email Address</label>\\r\\n                    <input type="email" class="sso-input" required>',
    '<label class="sso-label">Email Address</label>\\r\\n                    <input type="email" id="register-email" class="sso-input" required>'
);

// Replace password input (the first one)
content = content.replace(
    '<label class="sso-label">Password</label>\\r\\n                    <input type="password" class="sso-input" required>',
    '<label class="sso-label">Password</label>\\r\\n                    <input type="password" id="register-password" class="sso-input" required>'
);

// Append script to the end of the file
const scriptLines = [
    '<!-- SCRIPT XỬ LÝ ĐĂNG KÝ -->',
    '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>',
    '<script>',
    '    const _supabaseUrl = "";',
    '    const _supabaseKey = "";',
    '    let supabase = null;',
    '    if (_supabaseUrl && _supabaseKey) { supabase = supabase.createClient(_supabaseUrl, _supabaseKey); }',
    '',
    '    document.addEventListener("DOMContentLoaded", () => {',
    '        const form = document.getElementById("register-form");',
    '        if (form) {',
    '            form.addEventListener("submit", async (e) => {',
    '                e.preventDefault();',
    '                if (!supabase) {',
    '                    alert("Chưa cấu hình kết nối Supabase!");',
    '                    return;',
    '                }',
    '',
    '                const emailInput = document.getElementById("register-email");',
    '                const passwordInput = document.getElementById("register-password");',
    '',
    '                if (!emailInput || !passwordInput) {',
    '                    alert("Lỗi: Không tìm thấy ô nhập Email hoặc Password!");',
    '                    return;',
    '                }',
    '',
    '                const email = emailInput.value;',
    '                const password = passwordInput.value;',
    '',
    '                try {',
    '                    // 1. Đăng ký user Auth',
    '                    const { data: authData, error: authError } = await supabase.auth.signUp({',
    '                        email: email,',
    '                        password: password',
    '                    });',
    '',
    '                    if (authError) throw authError;',
    '',
    '                    // 2. Thêm vào bảng users',
    '                    const { error: dbError } = await supabase.from("users").insert([',
    '                        { email: email, role: "user" }',
    '                    ]);',
    '',
    '                    if (dbError) throw dbError;',
    '',
    '                    // Thành công cả 2 bước',
    '                    alert("Đăng ký thành công! Hãy dùng tài khoản này để đăng nhập.");',
    '                    form.reset();',
    '                    // Chuyển hướng sang trang đăng nhập',
    '                    window.location.href = "login.html";',
    '                } catch (error) {',
    '                    console.error("Lỗi đăng ký:", error);',
    '                    alert("Lỗi: " + error.message);',
    '                }',
    '            });',
    '        }',
    '    });',
    '</script>',
    '</body>',
    '</html>'
];

// In case the file already has </body>, replace it, otherwise append.
if (content.includes('</body>')) {
    content = content.replace('</body>\\r\\n</html>', scriptLines.join('\\n'));
    content = content.replace('</body>\\n</html>', scriptLines.join('\\n'));
    content = content.replace('</body>', scriptLines.join('\\n'));
} else {
    content += '\\n' + scriptLines.join('\\n');
}

fs.writeFileSync(htmlFile, content, 'utf8');
console.log('Update register.html successfully.');
