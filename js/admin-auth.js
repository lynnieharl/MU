
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
        // Fallback: If no user in local storage, still show the page after 1 second
        // to prevent infinite loading screens on mock pages.
        setTimeout(showContent, 1000);
    }
});
