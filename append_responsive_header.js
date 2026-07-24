const fs = require('fs');
const path = require('path');

const css = `
/* ==========================================================================
   RESPONSIVE HEADER FIX
   ========================================================================== */
@media (max-width: 992px) {
    /* Hide top bar to save vertical space on mobile */
    .header-wave-bg .top-bar-container {
        display: none; 
    }

    /* Stack Logo and Search/Icons */
    .header-wave-bg .header-main {
        flex-direction: column;
        gap: 15px;
        padding: 15px 20px;
    }

    /* Make search and icons row spread out */
    .header-wave-bg .header-search-icons {
        width: 100%;
        justify-content: space-between;
    }

    /* Expand search bar */
    .header-wave-bg .search-form {
        width: 100%;
        flex: 1;
        margin-right: 20px;
    }

    /* Enable horizontal scrolling for the main navigation links */
    .new-mega-nav .nav-list {
        justify-content: flex-start;
        overflow-x: auto;
        padding: 0 20px;
        gap: 20px;
        scrollbar-width: none; /* Firefox */
        -webkit-overflow-scrolling: touch;
    }
    .new-mega-nav .nav-list::-webkit-scrollbar {
        display: none; /* Chrome/Safari */
    }

    .new-mega-nav .nav-link {
        white-space: nowrap;
    }

    /* Stack mega menu columns vertically instead of side-by-side */
    .mega-menu-container {
        flex-direction: column;
        gap: 20px;
        padding: 20px;
        max-height: 50vh;
        overflow-y: auto;
    }
}

@media (max-width: 480px) {
    .header-wave-bg .header-logo a {
        font-size: 1.2rem;
    }
    .header-wave-bg .logo-img {
        height: 40px;
    }
    .header-wave-bg .header-icons {
        gap: 15px;
    }
}
`;

fs.appendFileSync(path.join(__dirname, 'style.css'), css, 'utf8');
console.log('Appended Responsive Header CSS successfully.');
