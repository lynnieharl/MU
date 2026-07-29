const fs = require('fs');

const original = fs.readFileSync('manage-products.html', 'utf8');
const replacement = fs.readFileSync('new_products_layout.html', 'utf8');

// Find the start of the style block (or just link rel="stylesheet" href="style.css">)
const startIndex = original.indexOf('<link rel="stylesheet" href="style.css">');
if (startIndex === -1) {
    console.log("Could not find start index");
    process.exit(1);
}

// Find the end where the script starts
const scriptMarker = '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>';
const endIndex = original.indexOf(scriptMarker);
if (endIndex === -1) {
    console.log("Could not find script marker");
    process.exit(1);
}

const before = original.substring(0, startIndex);
// Add the script marker back since it's the boundary
const after = '\n    ' + original.substring(endIndex);

const finalHtml = before + replacement + after;
fs.writeFileSync('manage-products.html', finalHtml);
console.log('manage-products.html updated successfully.');
