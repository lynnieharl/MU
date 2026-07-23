/**
 * OFFICIAL MANCHESTER UNITED STORE - VANILLA JS (NEW VERSION)
 */

document.addEventListener('DOMContentLoaded', () => {
    initTrendingCarousel();
});

function initTrendingCarousel() {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.getElementById('trending-prev');
    const nextBtn = document.getElementById('trending-next');
    
    if (!track || !prevBtn || !nextBtn) return;

    const item = track.querySelector('.product-card');
    if (!item) return;

    let currentIndex = 0;
    
    nextBtn.addEventListener('click', () => {
        const itemWidth = item.offsetWidth;
        const gap = 20; // 20px gap between items as per CSS
        const moveAmount = itemWidth + gap;

        const totalItems = track.children.length;
        // On desktop, 4 items are visible. 
        // Max index we can scroll to is (Total - 4).
        const visibleItems = 4;
        const maxIndex = Math.max(0, totalItems - visibleItems);

        if (currentIndex < maxIndex) {
            currentIndex++;
            track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;
        }
    });

    prevBtn.addEventListener('click', () => {
        const itemWidth = item.offsetWidth;
        const gap = 20;
        const moveAmount = itemWidth + gap;

        if (currentIndex > 0) {
            currentIndex--;
            track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;
        }
    });
}
