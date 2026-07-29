
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'admin-dashboard.html';

    const sidebarLinks = document.querySelectorAll('.sidebar-nav ul li a');
    
    // First, remove active from all li
    document.querySelectorAll('.sidebar-nav ul li').forEach(li => li.classList.remove('active'));

    // Highlight the one matching current URL
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href === pageName) {
            link.parentElement.classList.add('active');
        }
    });
});
