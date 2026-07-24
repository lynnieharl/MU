const fs = require('fs');
const path = require('path');

const css = `
/* ==========================================================================
   NEW WAVE HEADER & MEGA MENU
   ========================================================================== */
.header-wave-bg {
    background-color: #0045a5;
    background-image: url("data:image/svg+xml,%3Csvg width='120' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 30 25, 60 10 T 120 10' fill='none' stroke='%23195ebd' stroke-width='4' opacity='0.6'/%3E%3Cpath d='M0 15 Q 30 30, 60 15 T 120 15' fill='none' stroke='%23003b8e' stroke-width='2' opacity='0.3'/%3E%3C/svg%3E");
    background-size: 120px 20px;
    color: var(--color-white);
    position: relative;
    z-index: 1000;
}

.header-wave-bg .top-bar-container {
    display: flex;
    justify-content: space-between;
    padding: 10px 40px;
    background-color: rgba(0, 0, 0, 0.15); /* Slightly darker for contrast */
    font-size: 0.85rem;
}

.header-wave-bg .top-bar-btn {
    background: none;
    border: none;
    color: var(--color-white);
    cursor: pointer;
    font-size: 0.85rem;
}

.header-wave-bg .top-bar-link {
    color: var(--color-white);
    text-decoration: none;
    margin-left: 20px;
}

.header-wave-bg .header-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
}

.header-wave-bg .header-logo a {
    display: flex;
    align-items: center;
    gap: 15px;
    text-decoration: none;
    color: var(--color-white);
    font-weight: 900;
    font-size: 1.5rem;
    letter-spacing: 1px;
}

.header-wave-bg .logo-img {
    height: 50px;
}

.header-search-icons {
    display: flex;
    align-items: center;
    gap: 30px;
}

.header-wave-bg .search-form {
    display: flex;
    background-color: var(--color-white);
    border-radius: 20px;
    padding: 5px 15px;
    width: 300px;
}

.header-wave-bg .search-input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 0.9rem;
    color: var(--color-black);
}

.header-wave-bg .search-btn {
    background: none;
    border: none;
    color: var(--color-gray-dark);
    cursor: pointer;
    font-size: 1rem;
}

.header-wave-bg .header-icons {
    display: flex;
    gap: 20px;
    align-items: center;
}

.header-wave-bg .header-icon-link {
    color: var(--color-white);
    font-size: 1.3rem;
    text-decoration: none;
    position: relative;
}

.header-wave-bg .header-icon-dropdown {
    position: relative;
}

.header-wave-bg .account-menu {
    position: absolute;
    top: 30px;
    right: -20px;
    background-color: var(--color-white);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    border-radius: 4px;
    padding: 10px 0;
    min-width: 150px;
    display: none;
    z-index: 1001;
}

.header-wave-bg .header-icon-dropdown:hover .account-menu {
    display: block;
}

.header-wave-bg .account-menu-link {
    display: block;
    padding: 10px 20px;
    color: var(--color-black);
    text-decoration: none;
    font-size: 0.9rem;
}

.header-wave-bg .account-menu-link:hover {
    background-color: #f5f5f5;
}

.header-wave-bg .account-menu-link.login-btn {
    font-weight: bold;
}

.header-wave-bg .cart-icon-wrapper .cart-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: var(--color-primary);
    color: var(--color-white);
    font-size: 0.7rem;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

/* NEW MEGA NAV */
.new-mega-nav {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.new-mega-nav .nav-list {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 30px;
    margin: 0;
    padding: 0;
}

.new-mega-nav .nav-item {
    position: static; /* Required for full-width dropdown */
}

.new-mega-nav .nav-link {
    display: block;
    padding: 15px 0;
    color: var(--color-white);
    text-decoration: none;
    font-weight: bold;
    font-size: 0.95rem;
    text-transform: uppercase;
    position: relative;
}

.new-mega-nav .nav-item:hover .nav-link {
    color: var(--color-white);
}

/* Red underline on hover */
.new-mega-nav .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 4px;
    background-color: #DA291C; /* United Red */
    transition: width 0.3s ease;
}

.new-mega-nav .nav-item:hover .nav-link::after {
    width: 100%;
}

/* Badge New */
.badge-new {
    background-color: #DA291C;
    color: var(--color-white);
    font-size: 0.6rem;
    padding: 2px 5px;
    border-radius: 2px;
    position: absolute;
    top: -2px;
    right: -25px;
    text-transform: uppercase;
    font-family: sans-serif;
    font-weight: bold;
}

.mega-col h3 .badge-new {
    position: relative;
    top: -2px;
    right: 0;
    margin-left: 5px;
}

/* Mega Menu Dropdown */
.mega-menu-wrapper {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: var(--color-white);
    color: var(--color-black);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
    border-top: 1px solid var(--color-gray-border);
    z-index: 999;
}

.new-mega-nav .nav-item.has-mega-menu:hover .mega-menu-wrapper {
    opacity: 1;
    visibility: visible;
}

.mega-menu-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    padding: 40px 20px;
    gap: 40px;
}

.mega-col {
    flex: 1;
}

/* Serif font for column titles */
.mega-col h3 {
    font-family: "Times New Roman", Times, serif;
    font-size: 1.2rem;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 20px;
    text-transform: none;
    border-bottom: 1px solid var(--color-gray-border);
    padding-bottom: 10px;
}

.mega-col ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.mega-col ul li {
    margin-bottom: 12px;
}

/* Sans-serif for child links */
.mega-col ul li a {
    font-family: Arial, Helvetica, sans-serif;
    text-decoration: none;
    color: var(--color-gray-dark);
    font-size: 0.95rem;
    transition: color 0.2s;
}

.mega-col ul li a:hover {
    color: var(--color-black);
    text-decoration: underline;
}
`;

fs.appendFileSync(path.join(__dirname, 'style.css'), css, 'utf8');
console.log('Appended Header CSS successfully.');
