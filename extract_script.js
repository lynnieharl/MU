const fs = require('fs');

const content = fs.readFileSync('admin-dashboard.html', 'utf8');
const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);

if (scriptMatch) {
    fs.writeFileSync('test_script.js', scriptMatch[1], 'utf8');
}
