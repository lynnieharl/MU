const fs = require('fs');
const path = require('path');

const dir = __dirname;
const scriptTag = '\n    <!-- Cart Logic -->\n    <script src="js/cart-logic.js"></script>\n';

fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Prevent double insertion
        if (!content.includes('cart-logic.js')) {
            content = content.replace(/<\/body>/i, scriptTag + '</body>');
            fs.writeFileSync(filePath, content);
            console.log('Injected cart-logic into', file);
        }
    }
});
console.log('Done injecting cart-logic!');
