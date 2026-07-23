/**
 * MANUTD STORE - AUTH JS
 * Handles Login, Registration, and User Session via LocalStorage
 */

document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    initAuthForms();
});

function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem('vanilla_store_user'));
    const accountLink = document.getElementById('account-link');
    
    if (accountLink) {
        if (user && user.isLoggedIn) {
            // User is logged in, point to account page
            accountLink.href = 'account.html';
        } else {
            // Not logged in
            accountLink.href = 'login.html';
        }
    }
}

function initAuthForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const pwd = document.getElementById('login-password').value;
            const emailError = document.getElementById('email-error');
            
            emailError.textContent = '';
            
            // Simple mock authentication
            if (email.includes('@') && pwd.length >= 6) {
                // Mock success
                localStorage.setItem('vanilla_store_user', JSON.stringify({
                    email: email,
                    name: email.split('@')[0],
                    isLoggedIn: true
                }));
                window.location.href = 'account.html';
            } else {
                emailError.textContent = 'Invalid email or password.';
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const pwd = document.getElementById('reg-password').value;
            const confirm = document.getElementById('reg-confirm').value;
            const pwdError = document.getElementById('reg-pwd-error');
            
            pwdError.textContent = '';

            if (pwd !== confirm) {
                pwdError.textContent = 'Passwords do not match.';
                return;
            }

            if (pwd.length < 6) {
                pwdError.textContent = 'Password must be at least 6 characters.';
                return;
            }

            // Mock registration success
            localStorage.setItem('vanilla_store_user', JSON.stringify({
                email: email,
                name: name,
                isLoggedIn: true
            }));
            window.location.href = 'account.html';
        });
    }
}

// Global function to logout
window.logoutUser = function() {
    localStorage.removeItem('vanilla_store_user');
    window.location.href = 'login.html';
}
