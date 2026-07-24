const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

const authScript = `
<!-- Nhúng Supabase JS & Logic Cập nhật Header -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
    const SUPABASE_URL = 'https://suabbqtrggzwgchksenq.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_E711W3fBxwZeRVYH3TOBAA_ZNoe_wps';
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const accountMenu = document.querySelector('.account-menu');
            
            if (session && accountMenu) {
                // Người dùng đã đăng nhập
                const email = session.user.email;
                accountMenu.innerHTML = \`
                    <p style="padding: 10px 15px; color: #888; font-size: 13px; font-weight: bold;">\${email}</p>
                    <a href="#" class="account-menu-link" onclick="handleLogout(event)">Log Out</a>
                \`;
            }
        } catch (err) {
            console.error('Lỗi kiểm tra session:', err);
        }
    });

    async function handleLogout(e) {
        e.preventDefault();
        await supabase.auth.signOut();
        window.location.reload();
    }
</script>
`;

if (!indexHtml.includes('<!-- Nhúng Supabase JS & Logic Cập nhật Header -->')) {
    indexHtml = indexHtml.replace('</body>', authScript + '\n</body>');
    fs.writeFileSync('index.html', indexHtml, 'utf8');
    console.log('Patched index.html');
} else {
    console.log('index.html already patched');
}
