const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const preconnectTags = `
    <!-- Performance Preconnects -->
    <link rel="preconnect" href="https://qtxikxszhllugqnhdypo.supabase.co" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
    <link rel="preconnect" href="https://images.unsplash.com" crossorigin>
`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let hasChanges = false;

    // 1. Inject preconnects before </head>
    if (!content.includes('rel="preconnect" href="https://qtxikxszhllugqnhdypo.supabase.co"')) {
        content = content.replace('</head>', `${preconnectTags}\n</head>`);
        hasChanges = true;
    }

    // 2. Add loading="lazy" decoding="async" to images (except logos or hero images)
    // We will do a generic replace on <img that doesn't already have loading="lazy"
    const imgRegex = /<img(?![^>]*\bloading=["']lazy["'])[^>]*>/gi;
    content = content.replace(imgRegex, (match) => {
        // Exclude header logos or hero images based on class/alt
        if (match.includes('class="logo-img"') || match.includes('class="fab-icon-main"') || match.includes('admin-logo')) {
            return match;
        }
        // If it already has decoding="async", avoid duplicating
        let newMatch = match;
        if (!newMatch.includes('loading=')) {
            newMatch = newMatch.replace('<img', '<img loading="lazy" decoding="async"');
        }
        return newMatch;
    });
    
    // Check if regex modified anything
    if (content !== fs.readFileSync(file, 'utf8')) {
        hasChanges = true;
    }

    if (hasChanges) {
        fs.writeFileSync(file, content);
        console.log(`Optimized HTML: ${file}`);
    }
}
