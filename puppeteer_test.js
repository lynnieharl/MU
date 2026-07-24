const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

    await page.goto('file://C:/Users/vodat/.gemini/antigravity/scratch/manutd-store-vanilla/admin-dashboard.html', { waitUntil: 'networkidle2' });
    
    await browser.close();
})();
