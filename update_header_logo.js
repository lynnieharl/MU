const fs = require('fs');
const path = require('path');

const directoryPath = __dirname;
let updateCount = 0;

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(file => {
        if (file.endsWith('.html')) {
            const filePath = path.join(directoryPath, file);
            let content = fs.readFileSync(filePath, 'utf8');
            let modified = false;

            const oldLogoHTML = `<div class="header-logo">
                <a href="index.html">
                    <span class="logo-text">UNITED</span>
                    <img src="images/0_Manchester_United_FC_crest.svg" alt="Manchester United Logo" class="logo-img">
                    <span class="logo-text">STORE</span>
                </a>
            </div>`;
            
            const newLogoHTML = `<div class="header-logo">
                <a href="index.html" class="logo-link">
                    <img src="images/0_Manchester_United_FC_crest.svg" alt="Manchester United Logo" class="logo-img devil-aura">
                    <span class="logo-text">UNITED STORE</span>
                </a>
            </div>`;

            // Normal replace for exact match
            if (content.includes(oldLogoHTML)) {
                content = content.replace(oldLogoHTML, newLogoHTML);
                modified = true;
            } else {
                // Regex fallback if indentation varies
                const logoRegex = /<div class="header-logo">\s*<a href="index\.html">\s*<span class="logo-text">UNITED<\/span>\s*<img src="images\/0_Manchester_United_FC_crest\.svg" alt="Manchester United Logo" class="logo-img">\s*<span class="logo-text">STORE<\/span>\s*<\/a>\s*<\/div>/;
                if (logoRegex.test(content)) {
                    content = content.replace(logoRegex, newLogoHTML);
                    modified = true;
                }
            }

            if (modified) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Updated Header Logo in:', file);
                updateCount++;
            }
        }
    });
    console.log(`Finished updating ${updateCount} HTML files.`);
});
