document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // HERO CAROUSEL LOGIC
    // ==========================================
    const heroTrack = document.getElementById("hero-track");
    if (heroTrack) {
        const prevHeroBtn = document.getElementById("hero-prev");
        const nextHeroBtn = document.getElementById("hero-next");
        const dots = document.querySelectorAll(".hero-dot");
        let autoPlayInterval;
        let currentHeroIndex = 0;
        const totalHeroSlides = dots.length;
        
        const updateHeroDots = (index) => {
            dots.forEach(dot => dot.classList.remove("active"));
            if (dots[index]) dots[index].classList.add("active");
            currentHeroIndex = index;
        };

        const scrollHeroTo = (index) => {
            const slideWidth = heroTrack.offsetWidth;
            heroTrack.style.scrollBehavior = "smooth";
            heroTrack.scrollLeft = slideWidth * index;
        };

        const nextHeroSlide = () => {
            let nextIndex = currentHeroIndex + 1;
            if (nextIndex >= totalHeroSlides) nextIndex = 0;
            scrollHeroTo(nextIndex);
        };

        const prevHeroSlide = () => {
            let prevIndex = currentHeroIndex - 1;
            if (prevIndex < 0) prevIndex = totalHeroSlides - 1;
            scrollHeroTo(prevIndex);
        };

        // Auto-play setup
        const startHeroAutoPlay = () => {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextHeroSlide, 5000);
        };

        const stopHeroAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };

        startHeroAutoPlay();

        const heroCarousel = document.getElementById("hero-carousel");
        if (heroCarousel) {
            heroCarousel.addEventListener("mouseenter", stopHeroAutoPlay);
            heroCarousel.addEventListener("mouseleave", startHeroAutoPlay);
        }

        if (prevHeroBtn) prevHeroBtn.addEventListener("click", prevHeroSlide);
        if (nextHeroBtn) nextHeroBtn.addEventListener("click", nextHeroSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => scrollHeroTo(index));
        });

        // Sync dots on scroll
        heroTrack.addEventListener("scroll", () => {
            const slideWidth = heroTrack.offsetWidth;
            const scrollPos = heroTrack.scrollLeft;
            const activeIndex = Math.round(scrollPos / slideWidth);
            if (activeIndex !== currentHeroIndex) {
                updateHeroDots(activeIndex);
            }
        }, { passive: true });

        // Mouse Drag to Scroll for Hero
        let isHeroDown = false;
        let startHeroX;
        let scrollHeroLeft;

        heroTrack.addEventListener("mousedown", (e) => {
            isHeroDown = true;
            heroTrack.classList.add("active");
            heroTrack.style.scrollSnapType = "none"; // Disable snap
            startHeroX = e.pageX - heroTrack.offsetLeft;
            scrollHeroLeft = heroTrack.scrollLeft;
            stopHeroAutoPlay();
        });
        
        heroTrack.addEventListener("mouseleave", () => {
            isHeroDown = false;
            heroTrack.classList.remove("active");
            heroTrack.style.scrollSnapType = "x mandatory";
            startHeroAutoPlay();
        });
        
        heroTrack.addEventListener("mouseup", () => {
            isHeroDown = false;
            heroTrack.classList.remove("active");
            heroTrack.style.scrollSnapType = "x mandatory";
            startHeroAutoPlay();
        });
        
        heroTrack.addEventListener("mousemove", (e) => {
            if (!isHeroDown) return;
            e.preventDefault();
            const x = e.pageX - heroTrack.offsetLeft;
            const walk = (x - startHeroX) * 1.5; // Drag speed
            heroTrack.scrollLeft = scrollHeroLeft - walk;
        });
    }
});
