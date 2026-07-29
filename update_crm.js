const fs = require('fs');

const original = fs.readFileSync('admin-crm.html', 'utf8');
const replacement = fs.readFileSync('new_crm_layout.html', 'utf8');

const startIndex = original.indexOf('<link rel="stylesheet" href="style.css">');
if (startIndex === -1) {
    console.log("Could not find start index");
    process.exit(1);
}

const scriptMarker = '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>';
const endIndex = original.indexOf(scriptMarker);
if (endIndex === -1) {
    console.log("Could not find script marker");
    process.exit(1);
}

const before = original.substring(0, startIndex);
const after = '\n    ' + original.substring(endIndex);

const finalHtml = before + replacement + after;
fs.writeFileSync('admin-crm.html', finalHtml);
console.log('admin-crm.html updated successfully.');
