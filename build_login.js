const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const headerEnd = indexHtml.indexOf('<!-- ==========================================') !== -1 
    ? indexHtml.indexOf('<!-- ==========================================\n         [PHẦN 2] HERO BANNER') 
    : indexHtml.indexOf('<main');
const footerStart = indexHtml.indexOf('<!-- ==========================================\n         [PHẦN 4] NEWSLETTER & FOOTER');

const header = indexHtml.substring(0, headerEnd);
const footer = indexHtml.substring(footerStart);

const mainContent = `
    <!-- ==========================================
         [PHẦN MAIN] NEW LOGIN PAGE (SSO)
         ========================================== -->
    <main class="sso-auth-page">
        <div class="sso-container">
            <img src="images/mu-logo.png" alt="MU Logo" class="sso-logo" onerror="this.src='https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png'">
            
            <h1 class="sso-title">Log In</h1>
            <p class="sso-subtitle">Don't have an account? <a href="register.html">Create an account</a></p>
            
            <form action="#" method="POST" class="sso-form">
                <div class="sso-input-wrapper">
                    <input type="text" placeholder="Email or Supporter ID" class="sso-input" required>
                </div>
                
                <div class="sso-input-wrapper">
                    <input type="password" placeholder="Password" class="sso-input" required>
                    <i class="fa-regular fa-eye-slash password-toggle"></i>
                </div>
                
                <button type="submit" class="sso-continue-btn">Continue</button>
                
                <div class="sso-links">
                    <a href="#">Forgot password?</a>
                    <a href="#">Forgot Supporter ID?</a>
                </div>
            </form>

            <div class="sso-divider">
                <span>Or</span>
            </div>

            <button class="sso-social-btn apple">
                <i class="fa-brands fa-apple"></i>
                Sign in with Apple
            </button>
            <button class="sso-social-btn google">
                <i class="fa-brands fa-google"></i>
                Sign in with Google
            </button>
            <button class="sso-social-btn facebook">
                <i class="fa-brands fa-facebook"></i>
                Sign in with Facebook
            </button>

            <div class="sso-help">
                Having trouble logging in? <a href="#">Get Help</a>
            </div>
        </div>
    </main>

`;

fs.writeFileSync(path.join(__dirname, 'login.html'), header + mainContent + footer, 'utf8');
console.log('Tạo login.html MỚI thành công.');
