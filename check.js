const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
    
    await page.goto('http://127.0.0.1:5500/index.html', { waitUntil: 'networkidle2' });
    
    // Check if auth-user-icon-container has any content
    const html = await page.evaluate(() => {
        const c = document.getElementById('auth-user-icon-container');
        return c ? c.innerHTML : 'NOT FOUND';
    });
    console.log('Container HTML:', html);
    
    await browser.close();
})();
