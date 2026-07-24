const fs = require('fs');

const loginPath = 'login.html';
const content = fs.readFileSync(loginPath, 'utf8');

// Phân tách file an toàn
const startMarker = '<!-- ==========================================\\r\\n         [PHẦN MAIN] NEW LOGIN PAGE (SSO)';
const startMarkerAlt = '<!-- ==========================================\\n         [PHẦN MAIN] NEW LOGIN PAGE (SSO)';
const endMarker = '<!-- ==========================================\\r\\n         [PHẦN 4] NEWSLETTER & FOOTER';
const endMarkerAlt = '<!-- ==========================================\\n         [PHẦN 4] NEWSLETTER & FOOTER';

let headerIndex = content.indexOf(startMarker);
if (headerIndex === -1) headerIndex = content.indexOf(startMarkerAlt);
if (headerIndex === -1) headerIndex = content.indexOf('<main class="sso-auth-page">');

let footerIndex = content.indexOf(endMarker);
if (footerIndex === -1) footerIndex = content.indexOf(endMarkerAlt);

if (headerIndex !== -1 && footerIndex !== -1) {
    const header = content.substring(0, headerIndex);
    const footerAndBeyond = content.substring(footerIndex);

    let cleanFooter = footerAndBeyond;
    const scriptStart = cleanFooter.indexOf('<!-- Script JS -->');
    if (scriptStart !== -1) {
        cleanFooter = cleanFooter.substring(0, scriptStart);
    }
    cleanFooter = cleanFooter.replace('</body>', '').replace('</html>', '');
    cleanFooter = cleanFooter.replace('<script src="main.js"></script>', '');

    const newMain = `
    <!-- ==========================================
         [PHẦN MAIN] PREMIUM LOGIN PAGE
         ========================================== -->
    <style>
        .premium-login-container {
            min-height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('images/bruno_fernandes_banner_1783089680400.jpg') center/cover no-repeat fixed;
            padding: 40px 20px;
            font-family: 'Inter', sans-serif;
            position: relative;
        }

        .premium-login-card {
            background: rgba(20, 20, 20, 0.65);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 50px 40px;
            width: 100%;
            max-width: 450px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.5);
            text-align: center;
            position: relative;
            overflow: hidden;
            animation: formFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .premium-login-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 4px;
            background: linear-gradient(90deg, #c70101, #ff4444, #c70101);
        }

        @keyframes formFadeIn {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
        }

        .login-logo {
            width: 90px;
            margin-bottom: 25px;
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
        }

        .login-title {
            color: #fff;
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
            letter-spacing: -0.5px;
        }

        .login-subtitle {
            color: #a0a0a0;
            font-size: 15px;
            margin-bottom: 35px;
        }

        .login-subtitle a {
            color: #ff4444;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s;
        }

        .login-subtitle a:hover {
            color: #ff7777;
        }

        .premium-input-group {
            margin-bottom: 25px;
            text-align: left;
            position: relative;
        }

        .premium-input-group label {
            display: block;
            color: #e0e0e0;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 8px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }

        .premium-input-group input {
            width: 100%;
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 15px 20px;
            color: white;
            border-radius: 10px;
            font-size: 15px;
            transition: all 0.3s ease;
        }

        .premium-input-group input:focus {
            outline: none;
            border-color: #ff4444;
            background: rgba(0, 0, 0, 0.6);
            box-shadow: 0 0 0 4px rgba(255, 68, 68, 0.1);
        }

        .premium-input-group i {
            position: absolute;
            right: 20px;
            top: 42px;
            color: #a0a0a0;
            cursor: pointer;
            transition: color 0.3s;
        }

        .premium-input-group i:hover {
            color: #fff;
        }

        .premium-btn {
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, #c70101, #a00000);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            margin-top: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .premium-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(199, 1, 1, 0.4);
        }
        
        .premium-btn:active {
            transform: translateY(1px);
        }

        .login-links {
            display: flex;
            justify-content: space-between;
            margin-top: 25px;
            font-size: 14px;
        }

        .login-links a {
            color: #a0a0a0;
            text-decoration: none;
            transition: color 0.3s;
        }

        .login-links a:hover {
            color: #fff;
        }

        .premium-loader {
            border: 3px solid rgba(255,255,255,0.2);
            border-top: 3px solid white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            display: none;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    </style>

    <main class="premium-login-container">
        <div class="premium-login-card">
            <img src="images/mu-logo.png" alt="MU Logo" class="login-logo" onerror="this.src='https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png'">
            
            <h1 class="login-title">Welcome Back</h1>
            <p class="login-subtitle">New to United Store? <a href="register.html">Create an account</a></p>
            
            <form id="premium-login-form">
                <div class="premium-input-group">
                    <label>Email Address</label>
                    <input type="email" id="login-email" required placeholder="Enter your email">
                </div>
                
                <div class="premium-input-group">
                    <label>Password</label>
                    <input type="password" id="login-password" required placeholder="••••••••">
                    <i class="fa-regular fa-eye-slash" onclick="togglePassword()"></i>
                </div>
                
                <button type="submit" class="premium-btn" id="login-btn">
                    <span id="login-btn-text">SIGN IN TO YOUR ACCOUNT</span>
                    <div id="login-spinner" class="premium-loader"></div>
                </button>
                
                <div class="login-links">
                    <a href="#">Forgot password?</a>
                    <a href="help.html">Need help?</a>
                </div>
            </form>
        </div>
    </main>

    <script>
        function togglePassword() {
            const passInput = document.getElementById('login-password');
            const icon = document.querySelector('.premium-input-group i');
            if (passInput.type === 'password') {
                passInput.type = 'text';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                passInput.type = 'password';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        }
    </script>
`;

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
            const form = document.getElementById('premium-login-form');
            if (form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    if (!supabase) return alert('Chưa kết nối Supabase!');

                    const email = document.getElementById('login-email').value;
                    const pass = document.getElementById('login-password').value;
                    
                    const btnText = document.getElementById('login-btn-text');
                    const spinner = document.getElementById('login-spinner');
                    
                    btnText.style.display = 'none';
                    spinner.style.display = 'block';

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
                        btnText.style.display = 'block';
                        spinner.style.display = 'none';
                    }
                });
            }
        });
    </script>
    <script src="main.js"></script>
    </body>
    </html>
`;

    const finalHtml = header + newMain + cleanFooter + supabaseScript;
    fs.writeFileSync(loginPath, finalHtml, 'utf8');
    console.log('Update login.html successfully.');
} else {
    console.error('Could not find split markers in login.html');
    console.error('headerIndex', headerIndex, 'footerIndex', footerIndex);
}
