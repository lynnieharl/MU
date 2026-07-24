const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://suabbqtrggzwgchksenq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_E711W3fBxwZeRVYH3TOBAA_ZNoe_wps';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function xuLyDangKyTest() {
    const email = 'admin_test_' + Date.now() + '@gmail.com';
    const password = 'password123';

    try {
        console.log("Signing up...");
        const { data: authData, error: authErr } = await supabase.auth.signUp({ email, password });
        if (authErr) throw authErr;

        console.log("Inserting into users...");
        const { error: dbErr } = await supabase.from('users').insert([{ email: email, role: 'admin' }]);
        if (dbErr) throw dbErr;

        console.log("Success!");
    } catch (err) {
        console.error("Error:", err.message);
    }
}

xuLyDangKyTest();
