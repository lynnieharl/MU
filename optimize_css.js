const fs = require('fs');

const cssFiles = ['style.css', 'luxury.css', 'admin.css'];

for (const file of cssFiles) {
    if (!fs.existsSync(file)) continue;
    
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace "transition: all X" with specific properties to avoid layout thrashing
    content = content.replace(/transition:\s*all\s+([^;]+);/g, 'transition: transform $1, opacity $1, background-color $1, color $1, border-color $1, box-shadow $1;');
    
    fs.writeFileSync(file, content);
    console.log(`Optimized CSS: ${file}`);
}
