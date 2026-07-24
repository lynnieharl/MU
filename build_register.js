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
         [PHẦN MAIN] NEW REGISTER PAGE (SSO)
         ========================================== -->
    <main class="sso-auth-page">
        <div class="sso-container" style="max-width: 500px;">
            <img src="images/mu-logo.png" alt="MU Logo" class="sso-logo" onerror="this.src='https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png'">
            
            <h1 class="sso-title">Create An Account</h1>
            <p class="sso-subtitle" style="text-align: center; margin-bottom: 10px;">Join for FREE and become part of United's global fan community to enjoy exclusive content, perks & rewards.</p>
            <p class="sso-subtitle" style="text-align: center;">Already a member? <a href="login.html">Log In</a></p>
            
            <form action="#" method="POST" class="sso-form">
                
                <div class="sso-input-wrapper">
                    <label class="sso-label">First Name</label>
                    <input type="text" class="sso-input" required>
                </div>
                
                <div class="sso-input-wrapper">
                    <label class="sso-label">Surname</label>
                    <input type="text" class="sso-input" required>
                </div>

                <div class="sso-input-wrapper">
                    <label class="sso-label">Email Address</label>
                    <input type="email" class="sso-input" required>
                </div>

                <div class="sso-input-wrapper">
                    <label class="sso-label">Confirm Email Address</label>
                    <input type="email" class="sso-input" required>
                </div>
                
                <div class="sso-input-wrapper">
                    <label class="sso-label">Password</label>
                    <input type="password" class="sso-input" required>
                    <i class="fa-regular fa-eye-slash password-toggle"></i>
                </div>

                <div class="sso-input-wrapper">
                    <label class="sso-label">Confirm Password</label>
                    <input type="password" class="sso-input" required>
                    <i class="fa-regular fa-eye-slash password-toggle"></i>
                </div>

                <div class="sso-input-wrapper">
                    <label class="sso-label">Country</label>
                    <select class="sso-input" required>
                        <option value="">Country</option>
                        <option value="GB">United Kingdom</option>
                        <option value="VN">Vietnam</option>
                        <option value="US">United States</option>
                    </select>
                </div>

                <div class="sso-input-wrapper">
                    <label class="sso-label">Date of Birth</label>
                    <div class="sso-row">
                        <select class="sso-input" style="padding: 15px 10px;" required>
                            <option value="">Day</option>
                            <option value="01">1</option>
                            <option value="15">15</option>
                            <option value="31">31</option>
                        </select>
                        <select class="sso-input" style="padding: 15px 10px;" required>
                            <option value="">Month</option>
                            <option value="01">Jan</option>
                            <option value="06">Jun</option>
                            <option value="12">Dec</option>
                        </select>
                        <select class="sso-input" style="padding: 15px 10px;" required>
                            <option value="">Year</option>
                            <option value="2000">2000</option>
                            <option value="1999">1999</option>
                            <option value="1990">1990</option>
                        </select>
                    </div>
                </div>

                <div class="sso-input-wrapper" style="margin-top: 15px;">
                    <p class="sso-info-text"><strong>After login, you will have access United Store, Ticketing, MUTV, manutd.com, and official app experiences.</strong></p>
                    <p class="sso-info-text">We want you to be the first to know about New Signings, Competitions, Club News, Ticket Availability and occasional offers from official sponsors and partners. To stay updated, select YES: *</p>
                    <div class="sso-radio-group">
                        <label class="sso-radio-label">
                            <input type="radio" name="marketing" value="yes" required> Yes
                        </label>
                        <label class="sso-radio-label">
                            <input type="radio" name="marketing" value="no" required> No
                        </label>
                    </div>
                </div>
                
                <p class="sso-info-text">You can change your preferences or unsubscribe at any time in your Preference Centre.</p>
                <p class="sso-info-text">If you are under 16 years old you must obtain consent from your parent or legal guardian to continue</p>
                <p class="sso-info-text">By signing up, you agree to <a href="#">Manchester United (“MU”) Group</a> using your personal data in accordance with our <a href="#">Privacy Policy</a>.</p>

                <button type="submit" class="sso-continue-btn" style="background-color: #c70101;">Create Account</button>
            </form>
            
            <div class="sso-help">
                Having trouble logging in? <a href="#">Get Help</a>
            </div>
        </div>
    </main>

`;

fs.writeFileSync(path.join(__dirname, 'register.html'), header + mainContent + footer, 'utf8');
console.log('Tạo register.html thành công.');
