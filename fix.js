const fs = require('fs');
let content = fs.readFileSync('jerseys.html', 'utf8');
content = content.replace(/value="price-asc"/g, 'value="price-low"');
content = content.replace(/value="price-desc"/g, 'value="price-high"');
fs.writeFileSync('jerseys.html', content);

let indexContent = fs.readFileSync('index.html', 'utf8');
// Only remove AOS from bento items
indexContent = indexContent.replace(/class="lux-bento-item(.*?)data-aos="fade-up"(.*?)>/g, 'class="lux-bento-item$1$2>');
indexContent = indexContent.replace(/class="lux-bento-item(.*?)data-aos="fade-left"(.*?)>/g, 'class="lux-bento-item$1$2>');
indexContent = indexContent.replace(/data-aos-delay="\d+"/g, '');
fs.writeFileSync('index.html', indexContent);
