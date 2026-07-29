// INTERACTIVITY FOR DROPDOWNS
document.addEventListener('DOMContentLoaded', () => {
    const notifBtn = document.getElementById('notif-btn');
    const notifDropdown = document.getElementById('notif-dropdown');
    const avatarBtn = document.getElementById('avatar-btn');
    const profileDropdown = document.getElementById('profile-dropdown');
    const markReadBtn = document.getElementById('mark-read-btn');
    const notifBadge = document.getElementById('notif-badge');
    
    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notifDropdown.classList.toggle('active');
            if(profileDropdown) profileDropdown.classList.remove('active');
        });
    }
    if (avatarBtn && profileDropdown) {
        avatarBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
            if(notifDropdown) notifDropdown.classList.remove('active');
        });
    }
    if (markReadBtn && notifBadge) {
        markReadBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notifBadge.style.display = 'none';
        });
    }

    const devFeatures = document.querySelectorAll('.dev-feature');
    devFeatures.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Tính năng đang phát triển!');
        });
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (notifDropdown && !notifDropdown.contains(e.target) && !notifBtn.contains(e.target)) {
            notifDropdown.classList.remove('active');
        }
        if (profileDropdown && !profileDropdown.contains(e.target) && !avatarBtn.contains(e.target)) {
            profileDropdown.classList.remove('active');
        }
    });
});