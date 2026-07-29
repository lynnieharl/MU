const SUPABASE_URL = 'https://suabbqtrggzwgchksenq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_E711W3fBxwZeRVYH3TOBAA_ZNoe_wps';
let supabaseClient = null;

if (window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
} else {
    console.error("Supabase SDK not loaded!");
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
}

// Utility function for empty states
function createEmptyState(message) {
    return `<tr><td colspan="10" style="text-align: center; padding: 40px; color: #888; font-weight: 500;">
        <i class="fas fa-inbox" style="font-size: 2.5rem; color: #cbd5e1; margin-bottom: 12px; display: block;"></i>
        ${message}
    </td></tr>`;
}
