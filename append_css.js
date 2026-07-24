const fs = require('fs');
const path = require('path');

const css = `
/* Account Header Dropdown */
.header-icon-dropdown {
    position: relative;
    display: flex;
    align-items: center;
}

.account-menu {
    position: absolute;
    top: 100%;
    right: -20px;
    background-color: var(--color-white);
    border: 1px solid var(--color-gray-border);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    width: 220px;
    display: none;
    flex-direction: column;
    padding: 15px;
    z-index: 100;
}

.header-icon-dropdown:hover .account-menu {
    display: flex;
}

.account-menu-link {
    display: block;
    padding: 10px 0;
    color: var(--color-black);
    text-decoration: none;
    font-weight: bold;
    text-align: center;
    border-radius: 4px;
    transition: all 0.2s;
}

.account-menu-link:hover {
    color: var(--color-primary);
}

.account-menu-link.login-btn {
    background-color: var(--color-primary);
    color: var(--color-white);
    margin-bottom: 10px;
}

.account-menu-link.login-btn:hover {
    background-color: #a81c12;
    color: var(--color-white);
}

/* ==========================================================================
   NEW LOGIN PAGE (SSO STYLE)
   ========================================================================== */
.sso-auth-page {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 50px 20px 100px;
}

.sso-container {
    width: 100%;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.sso-logo {
    width: 60px;
    margin-bottom: 20px;
}

.sso-title {
    font-family: 'Times New Roman', Times, serif;
    font-size: 2.5rem;
    font-weight: normal;
    margin-bottom: 10px;
    color: var(--color-black);
}

.sso-subtitle {
    font-size: 0.95rem;
    color: var(--color-black);
    margin-bottom: 30px;
}

.sso-subtitle a {
    color: var(--color-primary);
    text-decoration: underline;
}

.sso-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.sso-input-wrapper {
    position: relative;
    width: 100%;
}

.sso-input {
    width: 100%;
    padding: 15px;
    border: 1px solid var(--color-gray-border);
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;
}

.sso-input:focus {
    border-color: var(--color-black);
}

.password-toggle {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-gray-dark);
    cursor: pointer;
}

.sso-continue-btn {
    width: 100%;
    padding: 15px;
    background-color: #e3a9a9;
    color: var(--color-white);
    font-weight: bold;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.2s;
}

.sso-continue-btn:hover {
    background-color: #d18d8d;
}

.sso-links {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
    font-size: 0.9rem;
}

.sso-links a {
    color: var(--color-black);
    text-decoration: underline;
}

.sso-divider {
    display: flex;
    align-items: center;
    text-align: center;
    width: 100%;
    margin: 30px 0;
    color: var(--color-gray-dark);
}

.sso-divider::before, .sso-divider::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid var(--color-gray-border);
}

.sso-divider span {
    padding: 0 15px;
}

.sso-social-btn {
    width: 100%;
    padding: 15px;
    background-color: var(--color-white);
    border: 1px solid var(--color-gray-border);
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    margin-bottom: 15px;
    color: var(--color-black);
    transition: background-color 0.2s;
}

.sso-social-btn:hover {
    background-color: var(--color-gray-light);
}

.sso-social-btn.apple i { color: #000; font-size: 1.2rem; }
.sso-social-btn.google i { color: #EA4335; font-size: 1.2rem; }
.sso-social-btn.facebook i { color: #1877F2; font-size: 1.2rem; }

.sso-help {
    margin-top: 20px;
    font-size: 0.9rem;
    text-align: center;
}

.sso-help a {
    color: var(--color-black);
    text-decoration: underline;
}
`;

fs.appendFileSync(path.join(__dirname, 'style.css'), css, 'utf8');
console.log('Appended CSS successfully.');
