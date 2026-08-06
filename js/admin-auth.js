
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

    // Global patch to fix hardcoded admin@gmail.com text across all admin pages
    setTimeout(async () => {
        if (window.supabaseClient) {
            try {
                const { data: { session } } = await window.supabaseClient.auth.getSession();
                if (session && session.user) {
                    const email = session.user.email;
                    const name = email.split('@')[0];
                    
                    document.querySelectorAll('span').forEach(span => {
                        if (span.textContent.includes('admin@gmail.com')) {
                            span.textContent = `Thông tin (${email})`;
                        }
                    });
                    
                    document.querySelectorAll('.avatar-name').forEach(span => {
                        if (span.textContent === 'Admin') {
                            span.textContent = name;
                        }
                    });
                }
            } catch(e) {}
        }
    }, 300);

    // --- LOGOUT LOGIC ---
    window.executeLogout = async function(e) {
        if (e && e.preventDefault) e.preventDefault();
        
        // Clear local and session storage completely
        localStorage.clear();
        sessionStorage.clear();
        
        // Clear cookies
        document.cookie.split(";").forEach(function(c) { 
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
        });

        // Sign out of Supabase if available
        if (window.supabaseClient) {
            await window.supabaseClient.auth.signOut();
        }

        // Hard redirect
        window.location.href = 'index.html?logout=' + Date.now();
    };

    // Attach to sidebar logout button
    const sidebarLogoutBtns = document.querySelectorAll('.logout-btn-icon');
    sidebarLogoutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                window.executeLogout(e);
            }
        });
    });

    // Attach to dropdown logout button
    const dropdownLogoutBtn = document.getElementById('dropdown-logout-btn');
    if (dropdownLogoutBtn) {
        dropdownLogoutBtn.addEventListener('click', (e) => {
            if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                window.executeLogout(e);
            }
        });
    }
});
