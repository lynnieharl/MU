require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const AUTH_SUPABASE_URL = 'https://suabbqtrggzwgchksenq.supabase.co';
const AUTH_SUPABASE_KEY = 'sb_publishable_E711W3fBxwZeRVYH3TOBAA_ZNoe_wps';
const supabase = createClient(AUTH_SUPABASE_URL, AUTH_SUPABASE_KEY);

async function checkSchema() {
  const { data, error } = await supabase.from('orders').select('*').limit(1);
  console.log('Orders data:', data);
  console.log('Orders error:', error);
}
checkSchema();
