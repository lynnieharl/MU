const fs = require('fs');
const file = 'register.html';
let content = fs.readFileSync(file, 'utf8');

// The string "\\n" was literally inserted into the file. Let's fix that.
// But first, let's just strip everything after <!-- Script JS --> and add it properly.
const scriptStart = content.indexOf('<!-- Script JS -->');
if (scriptStart !== -1) {
    content = content.substring(0, scriptStart);
}

const correctScript = `
    <!-- Script JS -->
    <script src="main.js"></script>

<!-- Nhúng Supabase -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
    const _supabaseUrl = 'https://suabbqtrggzwgchksenq.supabase.co';
    const _supabaseKey = 'sb_publishable_E711W3fBxwZeRVYH3TOBAA_ZNoe_wps';
    const supabase = window.supabase.createClient(_supabaseUrl, _supabaseKey);

    async function xuLyDangKy(event) {
        event.preventDefault(); 
        
        const emailInput = document.getElementById("email-dang-ky").value;
        const passInput = document.getElementById("pass-dang-ky").value;

        console.log("Đang xử lý đăng ký cho:", emailInput);
        alert("Đang gửi yêu cầu đăng ký...");

        try {
            const { data: authData, error: authErr } = await supabase.auth.signUp({
                email: emailInput,
                password: passInput
            });
            
            if (authErr) throw authErr;

            const { error: dbErr } = await supabase
                .from("users")
                .insert([{ email: emailInput, role: "user" }]);

            if (dbErr) throw dbErr;
            
            alert("ĐĂNG KÝ THÀNH CÔNG! Đã bay thẳng vào Supabase.");
            window.location.href = "login.html";
        } catch (loi) {
            alert("LỖI RỒI: " + loi.message);
            console.error(loi);
        }
    }
</script>
</body>
</html>
`;

content = content + correctScript;
fs.writeFileSync(file, content, 'utf8');
console.log('Fixed literal backslash-n in register.html');
