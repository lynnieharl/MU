const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Extract the header block from index.html
const headerStart = indexHtml.indexOf('<header class="header-wave-bg">');
const headerEndStr = '</header>';
const headerEnd = indexHtml.indexOf(headerEndStr, headerStart) + headerEndStr.length;

if (headerStart === -1 || headerEnd === -1) {
    console.error('Could not find header in index.html');
    process.exit(1);
}

const headerContent = indexHtml.substring(headerStart, headerEnd);

for (const file of files) {
    if (file === 'index.html') continue; // Skip index.html

    let html = fs.readFileSync(file, 'utf8');
    let modified = false;

    // 1. Replace header
    const fHeaderStart = html.indexOf('<header class="header-wave-bg">');
    const fHeaderEnd = html.indexOf('</header>', fHeaderStart) + '</header>'.length;

    if (fHeaderStart !== -1 && fHeaderEnd !== -1) {
        html = html.substring(0, fHeaderStart) + headerContent + html.substring(fHeaderEnd);
        modified = true;
    }

    // 2. Add mega-menu.js script if missing
    if (!html.includes('<script src="js/mega-menu.js"></script>')) {
        const scriptTag = '    <!-- Mega Menu -->\n    <script src="js/mega-menu.js"></script>\n';
        // Find chatbox script or cart logic script to insert nearby
        const chatboxIdx = html.indexOf('<script src="js/chatbox.js"></script>');
        if (chatboxIdx !== -1) {
            html = html.substring(0, chatboxIdx + 38) + '\n' + scriptTag + html.substring(chatboxIdx + 38);
        } else {
            const bodyEnd = html.indexOf('</body>');
            if (bodyEnd !== -1) {
                html = html.substring(0, bodyEnd) + scriptTag + html.substring(bodyEnd);
            }
        }
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, html);
        console.log(`Updated header & scripts in ${file}`);
    }
}
