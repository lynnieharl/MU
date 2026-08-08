const fs = require('fs');
let content = fs.readFileSync('jerseys.html', 'utf8');

content = content.replace(/}\)\.join\(''\);/g, "}).join('');\n            if (typeof translatePage === 'function') translatePage(localStorage.getItem('preferredLang') || 'en');");

fs.writeFileSync('jerseys.html', content);
