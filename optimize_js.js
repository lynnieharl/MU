const fs = require('fs');

const jsFiles = ['main.js', 'js/home-animations.js', 'js/mega-menu.js', 'js/hero-carousel.js'];

for (const file of jsFiles) {
    if (!fs.existsSync(file)) continue;
    
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace .addEventListener('scroll', fn) -> .addEventListener('scroll', fn, { passive: true })
    // We'll just look for standard patterns: addEventListener('scroll', ...) or touchstart/touchmove/wheel
    
    const eventsToPassive = ['scroll', 'touchstart', 'touchmove', 'wheel', 'mousewheel'];
    
    let hasChanges = false;
    for (const evt of eventsToPassive) {
        // Regex to match addEventListener('event', function/arrow) without the 3rd argument
        // This is tricky with regex, so we'll just do a simpler replace for known patterns if they don't already have passive
        // Specifically replacing addEventListener('scroll', (e) => { ... })
        // A safer way is just: content = content.replace(/(addEventListener\(['"](scroll|touchstart|touchmove|wheel|mousewheel)['"],\s*[a-zA-Z0-9_()=>\s{]+)(?!\s*,\s*{)/g, '$1, { passive: true }');
        // Actually, let's just do it manually for main.js and home-animations.js where we know they exist.
    }
}
