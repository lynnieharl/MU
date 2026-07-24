const fs = require('fs');
const path = require('path');

const url = 'https://suabbqtrggzwgchksenq.supabase.co';
const key = 'sb_publishable_E711W3fBxwZeRVYH3TOBAA_ZNoe_wps';

const htmlFile = path.join(__dirname, 'register.html');
let content = fs.readFileSync(htmlFile, 'utf8');

// Replace form tag
content = content.replace(/<form id="register-form"[^>]*>/g, '<form onsubmit="xuLyDangKy(event)">');
content = content.replace(/<form class="sso-form"[^>]*>/g, '<form onsubmit="xuLyDangKy(event)">');

// Replace Email Input
content = content.replace(
    '<input type="email" id="register-email" class="sso-input" required>',
    '<input type="email" id="email-dang-ky" class="sso-input" required>'
);
// In case the old replace didn't work previously (e.g. they reverted it)
content = content.replace(
    '<input type="email" class="sso-input" required>',
    '<input type="email" id="email-dang-ky" class="sso-input" required>'
);

// Replace Password Input
content = content.replace(
    '<input type="password" id="register-password" class="sso-input" required>',
    '<input type="password" id="pass-dang-ky" class="sso-input" required>'
);
content = content.replace(
    '<input type="password" class="sso-input" required>',
    '<input type="password" id="pass-dang-ky" class="sso-input" required>'
);

// We want to replace everything from <!-- SCRIPT XỬ LÝ ĐĂNG KÝ --> (or whatever it is) to </html>
const startMarker1 = '<!-- SCRIPT XỬ LÝ ĐĂNG KÝ -->';
const startMarker2 = '<!-- SCRIPT X? LY DANG KY -->'; // encoded versions

let startIdx = content.indexOf(startMarker1);
if (startIdx === -1) startIdx = content.indexOf(startMarker2);

if (startIdx !== -1) {
    content = content.substring(0, startIdx);
} else {
    // If we can't find it, replace from <!-- Nhúng Supabase --> if it exists
    const supMarker = '<!-- Nhúng Supabase -->';
    const supIdx = content.indexOf(supMarker);
    if (supIdx !== -1) content = content.substring(0, supIdx);
    else {
        content = content.replace('</body>', '');
        content = content.replace('</html>', '');
    }
}

const scriptStr = [
    '<!-- Nhúng Supabase -->',
    '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>',
    '<script>',
    `    const _supabaseUrl = '${url}';`,
    `    const _supabaseKey = '${key}';`,
    '    const supabase = window.supabase.createClient(_supabaseUrl, _supabaseKey);',
    '',
    '    async function xuLyDangKy(event) {',
    '        event.preventDefault(); ',
    '        ',
    '        const emailInput = document.getElementById("email-dang-ky").value;',
    '        const passInput = document.getElementById("pass-dang-ky").value;',
    '',
    '        console.log("Đang xử lý đăng ký cho:", emailInput);',
    '        alert("Đang gửi yêu cầu đăng ký...");',
    '',
    '        try {',
    '            const { data: authData, error: authErr } = await supabase.auth.signUp({',
    '                email: emailInput,',
    '                password: passInput',
    '            });',
    '            ',
    '            if (authErr) throw authErr;',
    '',
    '            const { error: dbErr } = await supabase',
    '                .from("users")',
    '                .insert([{ email: emailInput, role: "user" }]);',
    '',
    '            if (dbErr) throw dbErr;',
    '            ',
    '            alert("ĐĂNG KÝ THÀNH CÔNG! Đã bay thẳng vào Supabase.");',
    '            window.location.href = "login.html";',
    '        } catch (loi) {',
    '            alert("LỖI RỒI: " + loi.message);',
    '            console.error(loi);',
    '        }',
    '    }',
    '</script>',
    '</body>',
    '</html>'
].join('\\n');

content += '\\n' + scriptStr;
fs.writeFileSync(htmlFile, content, 'utf8');
console.log('Update register.html successfully.');
