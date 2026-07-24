const { createClient } = require('@supabase/supabase-js');

const _supabaseUrl = 'https://suabbqtrggzwgchksenq.supabase.co';
const _supabaseKey = 'sb_publishable_E711W3fBxwZeRVYH3TOBAA_ZNoe_wps';
const supabase = createClient(_supabaseUrl, _supabaseKey);

async function testSignup() {
    const email = 'testuser_' + Date.now() + '@example.com';
    console.log('Testing signup with email:', email);
    
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: 'password123'
        });
        
        if (error) {
            console.error('Auth Error:', error);
            return;
        }
        
        console.log('Auth success:', data.user ? data.user.id : 'No user ID returned');
        
        const { error: dbErr } = await supabase
            .from("users")
            .insert([{ email: email, role: "user" }]);
            
        if (dbErr) {
            console.error('DB Insert Error:', dbErr);
            return;
        }
        
        console.log('Insert success!');
    } catch (e) {
        console.error('Exception:', e);
    }
}

testSignup();
