const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM(`<body>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
    const _supabaseUrl = 'https://suabbqtrggzwgchksenq.supabase.co';
    const _supabaseKey = 'sb_publishable_E711W3fBxwZeRVYH3TOBAA_ZNoe_wps';
    const supabase = window.supabase.createClient(_supabaseUrl, _supabaseKey);
</script>
</body>`, { runScripts: "dangerously" });
