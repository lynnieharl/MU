const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('file:///' + __dirname.replace(/\\/g, '/') + '/index.html', { waitUntil: 'networkidle0' });

    // Set local storage to simulate logged-in admin user
    await page.evaluate(() => {
        localStorage.setItem('vanilla_store_user', JSON.stringify({ email: 'admin@manutd.com', role: 'admin' }));
    });
    
    // Reload to apply localstorage
    await page.reload({ waitUntil: 'networkidle0' });

    console.log("Logged in state set. Clicking #user-account-btn...");
    await page.click('#user-account-btn');

    // Wait 500ms
    await new Promise(r => setTimeout(r, 500));

    // Evaluate dropdown state
    const dropdownState = await page.evaluate(() => {
        const dropdown = document.getElementById('user-profile-dropdown');
        if (!dropdown) return 'NOT_FOUND';
        return {
            classes: dropdown.className,
            isVisible: dropdown.offsetParent !== null,
            opacity: window.getComputedStyle(dropdown).opacity,
            visibility: window.getComputedStyle(dropdown).visibility,
            display: window.getComputedStyle(dropdown).display
        };
    });
    
    console.log("Dropdown state:", dropdownState);
    await browser.close();
})();
