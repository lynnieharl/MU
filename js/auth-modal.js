// ==========================================
// 1. SUPABASE INITIALIZATION FOR AUTH
// ==========================================
const AUTH_SUPABASE_URL = 'https://suabbqtrggzwgchksenq.supabase.co';
const AUTH_SUPABASE_KEY = 'sb_publishable_E711W3fBxwZeRVYH3TOBAA_ZNoe_wps';

let authClient = null;
if (window.supabase) {
    authClient = window.supabase.createClient(AUTH_SUPABASE_URL, AUTH_SUPABASE_KEY);
}

// ==========================================
// 2. INJECT CSS STYLES FOR MODAL & AVATAR
// ==========================================
const authStyles = `
    /* Modal Overlay */
    .auth-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(8px);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    }
    .auth-modal-overlay.active {
        opacity: 1;
        pointer-events: auto;
    }

    /* Modal Box */
    .auth-modal-box {
        background: #111;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 12px;
        width: 100%;
        max-width: 420px;
        padding: 30px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        transform: translateY(-20px);
        transition: transform 0.3s ease;
        position: relative;
    }
    .auth-modal-overlay.active .auth-modal-box {
        transform: translateY(0);
    }

    /* Close Button */
    .auth-modal-close {
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        color: #888;
        font-size: 20px;
        cursor: pointer;
        transition: color 0.2s;
    }
    .auth-modal-close:hover {
        color: #fff;
    }

    /* Tabs */
    .auth-tabs {
        display: flex;
        margin-bottom: 25px;
        border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .auth-tab {
        flex: 1;
        text-align: center;
        padding: 10px 0;
        color: #888;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        border-bottom: 2px solid transparent;
    }
    .auth-tab.active {
        color: #fff;
        border-bottom: 2px solid #d31145;
    }

    /* Forms */
    .auth-form {
        display: none;
    }
    .auth-form.active {
        display: block;
        animation: fadeIn 0.3s;
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    .auth-input-group {
        margin-bottom: 15px;
    }
    .auth-input-group label {
        display: block;
        color: #aaa;
        font-size: 13px;
        margin-bottom: 5px;
        text-align: left;
    }
    .auth-input-group input {
        width: 100%;
        padding: 12px 15px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 6px;
        color: #fff;
        font-size: 14px;
        outline: none;
        transition: border 0.2s;
        box-sizing: border-box;
    }
    .auth-input-group input:focus {
        border-color: #d31145;
    }
    .auth-btn {
        width: 100%;
        padding: 12px;
        background: linear-gradient(135deg, #d31145, #9b0b31);
        color: #fff;
        border: none;
        border-radius: 6px;
        font-size: 15px;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        margin-top: 10px;
    }
    .auth-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(211, 17, 69, 0.4);
    }
    .auth-error {
        color: #ff4d4d;
        font-size: 13px;
        margin-top: 10px;
        text-align: center;
        display: none;
    }

    /* Header Avatar Styles */
    .header-dynamic-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        transition: transform 0.2s;
        text-decoration: none;
    }
    .header-dynamic-avatar:hover {
        transform: scale(1.1);
    }
    .header-dynamic-avatar img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .header-dynamic-avatar i {
        color: #fff;
        font-size: 20px;
    }

    /* Avatar Dropdown Menu (For User) */
    .avatar-dropdown {
        position: absolute;
        top: 35px;
        right: -10px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        width: 180px;
        padding: 5px 0;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        opacity: 0;
        visibility: hidden;
        transform: translateY(10px);
        transition: all 0.3s ease;
        z-index: 1000;
        text-align: left;
    }
    .header-dynamic-avatar:hover .avatar-dropdown {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    .avatar-dropdown-item {
        display: block;
        padding: 10px 15px;
        color: #333;
        text-decoration: none;
        font-size: 13px;
        transition: background 0.2s, color 0.2s;
        white-space: nowrap;
    }
    .avatar-dropdown-item:hover {
        background: #f5f5f5;
        color: #d31145;
    }
    .avatar-dropdown-item i {
        margin-right: 8px;
        width: 16px;
        text-align: center;
    }
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = authStyles;
document.head.appendChild(styleElement);

// ==========================================
// 3. INJECT HTML FOR MODAL
// ==========================================
const modalHtml = \`
<div class="auth-modal-overlay" id="authModal">
    <div class="auth-modal-box">
        <button class="auth-modal-close" onclick="closeAuthModal()"><i class="fa-solid fa-xmark"></i></button>
        
        <div class="auth-tabs">
            <div class="auth-tab active" id="tab-login" onclick="switchAuthTab('login')">ĐĂNG NHẬP</div>
            <div class="auth-tab" id="tab-register" onclick="switchAuthTab('register')">ĐĂNG KÝ</div>
        </div>

        <!-- Login Form -->
        <form id="form-login" class="auth-form active" onsubmit="handleAuthLogin(event)">
            <div class="auth-input-group">
                <label>Email</label>
                <input type="email" id="login-email" required placeholder="Nhập địa chỉ email...">
            </div>
            <div class="auth-input-group">
                <label>Mật Khẩu</label>
                <input type="password" id="login-pwd" required placeholder="Nhập mật khẩu...">
            </div>
            <div class="auth-error" id="login-error"></div>
            <button type="submit" class="auth-btn" id="btn-login-submit">Đăng Nhập</button>
        </form>

        <!-- Register Form -->
        <form id="form-register" class="auth-form" onsubmit="handleAuthRegister(event)">
            <div class="auth-input-group">
                <label>Email</label>
                <input type="email" id="reg-email" required placeholder="Nhập địa chỉ email...">
            </div>
            <div class="auth-input-group">
                <label>Mật Khẩu</label>
                <input type="password" id="reg-pwd" required placeholder="Tối thiểu 6 ký tự..." minlength="6">
            </div>
            <div class="auth-error" id="reg-error"></div>
            <button type="submit" class="auth-btn" id="btn-reg-submit">Tạo Tài Khoản</button>
        </form>
    </div>
</div>
\`;
document.body.insertAdjacentHTML('beforeend', modalHtml);

// ==========================================
// 4. LOGIC: OPEN/CLOSE/SWITCH TABS
// ==========================================
window.openAuthModal = function() {
    document.getElementById('authModal').classList.add('active');
}

window.closeAuthModal = function() {
    document.getElementById('authModal').classList.remove('active');
    document.getElementById('login-error').style.display = 'none';
    document.getElementById('reg-error').style.display = 'none';
    document.getElementById('form-login').reset();
    document.getElementById('form-register').reset();
}

window.switchAuthTab = function(tab) {
    if (tab === 'login') {
        document.getElementById('tab-login').classList.add('active');
        document.getElementById('tab-register').classList.remove('active');
        document.getElementById('form-login').classList.add('active');
        document.getElementById('form-register').classList.remove('active');
    } else {
        document.getElementById('tab-register').classList.add('active');
        document.getElementById('tab-login').classList.remove('active');
        document.getElementById('form-register').classList.add('active');
        document.getElementById('form-login').classList.remove('active');
    }
}

// ==========================================
// 5. LOGIC: REGISTER
// ==========================================
window.handleAuthRegister = async function(e) {
    e.preventDefault();
    if (!authClient) return console.error('Lỗi kết nối máy chủ!');
    
    const email = document.getElementById('reg-email').value;
    const pwd = document.getElementById('reg-pwd').value;
    const errorEl = document.getElementById('reg-error');
    const btn = document.getElementById('btn-reg-submit');

    if (pwd.length < 6) {
        errorEl.textContent = 'Mật khẩu phải chứa ít nhất 6 ký tự!';
        errorEl.style.display = 'block';
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang Xử Lý...';
    errorEl.style.display = 'none';

    try {
        const { data, error } = await authClient.auth.signUp({
            email: email,
            password: pwd
        });

        if (error) throw error;

        // Insert into users table
        await authClient.from('users').insert([{ email: email, role: 'user' }]);

        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        switchAuthTab('login');
        document.getElementById('login-email').value = email;

    } catch (err) {
        errorEl.textContent = err.message || 'Có lỗi xảy ra khi đăng ký!';
        errorEl.style.display = 'block';
    } finally {
        btn.disabled = false;
        btn.innerHTML = 'Tạo Tài Khoản';
    }
}

// ==========================================
// 6. LOGIC: LOGIN
// ==========================================
window.handleAuthLogin = async function(e) {
    e.preventDefault();
    if (!authClient) return console.error('Lỗi kết nối máy chủ!');

    const email = document.getElementById('login-email').value;
    const pwd = document.getElementById('login-pwd').value;
    const errorEl = document.getElementById('login-error');
    const btn = document.getElementById('btn-login-submit');

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang Xử Lý...';
    errorEl.style.display = 'none';

    try {
        const { data, error } = await authClient.auth.signInWithPassword({
            email: email,
            password: pwd
        });

        if (error) throw error;

        // Close modal and refresh header
        closeAuthModal();
        await updateHeaderAvatar();

    } catch (err) {
        errorEl.textContent = 'Sai tài khoản hoặc mật khẩu!';
        errorEl.style.display = 'block';
    } finally {
        btn.disabled = false;
        btn.innerHTML = 'Đăng Nhập';
    }
}

// ==========================================
// 7. LOGIC: LOGOUT
// ==========================================
window.handleGlobalLogout = async function(e) {
    if (e) e.preventDefault();
    if (!authClient) return;
    
    await authClient.auth.signOut();
    await updateHeaderAvatar();
    
    // Redirect if on admin or protected page
    if (window.location.pathname.includes('admin') || window.location.pathname.includes('manage-products')) {
        window.location.href = 'index.html';
    }
};

// ==========================================
// 8. LOGIC: UPDATE HEADER AVATAR
// ==========================================
window.updateHeaderAvatar = async function() {
    const container = document.getElementById('auth-user-icon-container');
    if (!container) return; // Wait for the DOM element to be available

    if (!authClient) {
        renderGuestAvatar(container);
        return;
    }

    try {
        const { data: { session } } = await authClient.auth.getSession();
        if (!session) {
            renderGuestAvatar(container);
            return;
        }

        const email = session.user.email;
        const { data: userData, error } = await authClient.from('users').select('role').eq('email', email).single();
        
        let role = 'user';
        if (userData && userData.role) {
            role = userData.role;
        }

        if (role === 'admin') {
            // ADMIN LOGO (MU Crest)
            container.innerHTML = \`
                <a href="admin-crm.html" class="header-dynamic-avatar" title="Quản Trị Hệ Thống">
                    <img src="https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg" alt="Admin">
                </a>
            \`;
        } else {
            // USER LOGO (Red Devil)
            container.innerHTML = \`
                <div class="header-dynamic-avatar" title="Tài Khoản">
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png" style="filter: grayscale(100%) contrast(150%) brightness(50%) sepia(100%) hue-rotate(-50deg) saturate(1000%) contrast(2);" alt="User">
                    <div class="avatar-dropdown">
                        <a href="manage-products.html" class="avatar-dropdown-item"><i class="fa-solid fa-box"></i> Quản Lý Sản Phẩm</a>
                        <a href="#" onclick="handleGlobalLogout(event)" class="avatar-dropdown-item"><i class="fa-solid fa-right-from-bracket"></i> Đăng Xuất</a>
                    </div>
                </div>
            \`;
        }

    } catch (err) {
        console.error("Lỗi lấy thông tin session:", err);
        renderGuestAvatar(container);
    }
}

function renderGuestAvatar(container) {
    container.innerHTML = \`
        <a href="#" onclick="openAuthModal(); return false;" class="header-dynamic-avatar" title="Đăng Nhập / Đăng Ký">
            <i class="fa-regular fa-user"></i>
        </a>
    \`;
}

// Chạy cập nhật Avatar ngay khi tải xong file
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateHeaderAvatar();
    });
} else {
    updateHeaderAvatar();
}
