const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Replace new.html with new-in.html in all navigational links
    if (html.includes('href="new.html"')) {
        html = html.replace(/href="new.html"/g, 'href="new-in.html"');
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Fixed link in ${file}`);
    }
});
