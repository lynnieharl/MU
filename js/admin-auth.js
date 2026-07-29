
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('crm-guard-overlay');
    
    function showContent() {
        if (overlay) {
            overlay.style.display = 'none';
        }
        document.body.style.overflow = 'auto'; // in case it was locked
    }

    // Check if user is logged in (mock logic for now)
    const userStr = localStorage.getItem('user');
    if (userStr) {
        showContent();
    } else {
        setTimeout(showContent, 1000);
    }

    // --- LOGOUT LOGIC ---
    const handleLogout = async (e) => {
        e.preventDefault();
        if (!confirm('Bạn có chắc chắn muốn đăng xuất?')) return;

        // Clear local and session storage
        localStorage.removeItem('adminToken');
        localStorage.removeItem('user');
        localStorage.removeItem('sb-access-token');
        sessionStorage.clear();

        // Sign out of Supabase if available
        if (window.supabaseClient) {
            await window.supabaseClient.auth.signOut();
        }

        // Redirect to login
        window.location.href = 'index.html';
    };

    // Attach to sidebar logout button
    const sidebarLogoutBtns = document.querySelectorAll('.logout-btn-icon');
    sidebarLogoutBtns.forEach(btn => {
        btn.addEventListener('click', handleLogout);
    });

    // Attach to dropdown logout button
    const dropdownLogoutBtn = document.getElementById('dropdown-logout-btn');
    if (dropdownLogoutBtn) {
        dropdownLogoutBtn.addEventListener('click', handleLogout);
    }
});
