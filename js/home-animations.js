document.addEventListener('DOMContentLoaded', () => {
    // AOS Init for Scroll Animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // Honours & Awards Carousel Drag + Auto-scroll
    const honoursContainer = document.querySelector('.lux-honours-container');
    if (honoursContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let animationId;
        let speed = 1; // Tốc độ trượt tự động

        // Mouse events for Desktop
        honoursContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            honoursContainer.classList.add('active');
            startX = e.pageX - honoursContainer.offsetLeft;
            scrollLeft = honoursContainer.scrollLeft;
            cancelAnimationFrame(animationId);
        });
        
        honoursContainer.addEventListener('mouseleave', () => {
            isDown = false;
            honoursContainer.classList.remove('active');
            startAutoScroll();
        });
        
        honoursContainer.addEventListener('mouseup', () => {
            isDown = false;
            honoursContainer.classList.remove('active');
            startAutoScroll();
        });
        
        honoursContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - honoursContainer.offsetLeft;
            const walk = (x - startX) * 2; // Hệ số nhân tốc độ vuốt
            honoursContainer.scrollLeft = scrollLeft - walk;
        });

        // Touch events for Mobile native swipe
        honoursContainer.addEventListener('touchstart', () => cancelAnimationFrame(animationId), {passive: true});
        honoursContainer.addEventListener('touchend', () => startAutoScroll());

        // Infinite loop auto-scroll
        function autoScroll() {
            honoursContainer.scrollLeft += speed;
            // Nếu cuộn qua 1 nửa nội dung (phần đã bị duplicate), reset về 0
            if (honoursContainer.scrollLeft >= honoursContainer.scrollWidth / 2) {
                honoursContainer.scrollLeft -= honoursContainer.scrollWidth / 2;
            }
            animationId = requestAnimationFrame(autoScroll);
        }

        function startAutoScroll() {
            cancelAnimationFrame(animationId);
            animationId = requestAnimationFrame(autoScroll);
        }

        // Init
        startAutoScroll();

        // Pause on hover
        const cards = honoursContainer.querySelectorAll('.lux-award-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!isDown) cancelAnimationFrame(animationId);
            });
            card.addEventListener('mouseleave', () => {
                if (!isDown) startAutoScroll();
            });
        });
    }
});
