const fs = require('fs');
const path = require('path');

const dir = __dirname;

fs.readdir(dir, (err, files) => {
    if (err) throw err;

    const htmlFiles = files.filter(f => f.endsWith('.html'));

    htmlFiles.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Regex to match <script src="..."> but ignore those that already have defer or type="module"
        // Also ensure we don't accidentally defer things that might break, but the plan is to defer all src scripts.
        const updatedContent = content.replace(/<script\s+(?!.*(?:defer|type=["']module["']))([^>]*?src=["'][^"']+["'][^>]*?)>/gi, '<script defer $1>');

        if (content !== updatedContent) {
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`Updated ${file}`);
        }
    });
    
    console.log('Finished updating HTML files with defer attribute.');
});
