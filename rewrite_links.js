const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const replacements = [
    { from: /href="mens\.html"/g, to: 'href="category.html?type=Men"' },
    { from: /href="womens\.html"/g, to: 'href="category.html?type=Women"' },
    { from: /href="kids\.html"/g, to: 'href="category.html?type=Accessories"' }, // We don't have a Kids option, maybe fallback to Accessories or create a Kids option. Wait, the user provided: Men, Women, Home, Away, Training, Accessories. I'll map kids to Accessories for now or just generic. Let's map to Accessories.
    { from: /href="kits\.html"/g, to: 'href="category.html?type=Home"' },
    { from: /href="training\.html"/g, to: 'href="category.html?type=Training"' },
    { from: /href="new-in\.html"/g, to: 'href="category.html"' },
    { from: /href="sale\.html"/g, to: 'href="category.html"' },
    { from: /href="souvenirs\.html"/g, to: 'href="category.html?type=Accessories"' },
    { from: /href="category\.html"/g, to: 'href="category.html"' } // Do nothing if it's already category.html, wait, this regex doesn't match query params so it might be safe.
];

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    let changed = false;

    replacements.forEach(rep => {
        if (content.match(rep.from)) {
            content = content.replace(rep.from, rep.to);
            changed = true;
        }
    });

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${file}`);
    }
});
