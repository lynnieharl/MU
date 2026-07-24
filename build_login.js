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
         [PHẦN MAIN] LOGIN / REGISTER PAGE
         ========================================== -->
    <main class="auth-page">
        <div class="auth-container">
            
            <!-- Cột Trái: LOG IN -->
            <section class="auth-section login-section">
                <h1 class="auth-title">LOG IN</h1>
                <p class="auth-subtitle">Welcome back! Sign in to your account.</p>
                
                <form action="#" method="POST" class="auth-form">
                    <div class="form-group">
                        <label for="login-email">Email Address *</label>
                        <input type="email" id="login-email" name="email" class="form-input" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="login-password">Password *</label>
                        <input type="password" id="login-password" name="password" class="form-input" required>
                    </div>
                    
                    <div class="form-options">
                        <a href="#" class="forgot-link">Forgotten password?</a>
                    </div>
                    
                    <button type="submit" class="auth-btn btn-login">LOG IN</button>
                </form>
            </section>

            <!-- Cột Phải: CREATE ACCOUNT -->
            <section class="auth-section register-section">
                <h2 class="auth-title">CREATE ACCOUNT</h2>
                <p class="auth-subtitle">New here? Register to checkout faster and track your orders.</p>
                
                <form action="#" method="POST" class="auth-form">
                    <div class="form-row">
                        <div class="form-group half-width">
                            <label for="reg-firstname">First Name *</label>
                            <input type="text" id="reg-firstname" name="firstname" class="form-input" required>
                        </div>
                        <div class="form-group half-width">
                            <label for="reg-lastname">Last Name *</label>
                            <input type="text" id="reg-lastname" name="lastname" class="form-input" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="reg-email">Email Address *</label>
                        <input type="email" id="reg-email" name="email" class="form-input" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="reg-password">Password *</label>
                        <input type="password" id="reg-password" name="password" class="form-input" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="reg-confirm-password">Confirm Password *</label>
                        <input type="password" id="reg-confirm-password" name="confirm_password" class="form-input" required>
                    </div>
                    
                    <button type="submit" class="auth-btn btn-register">CREATE ACCOUNT</button>
                </form>
            </section>

        </div>
    </main>

`;

fs.writeFileSync(path.join(__dirname, 'login.html'), header + mainContent + footer, 'utf8');
console.log('Tạo login.html thành công.');
