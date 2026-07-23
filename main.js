/**
 * MANUTD STORE - MAIN JS
 * Handles Header, Navigation, and General UI Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initMegaMenuMobile();
});

// For mobile, we might need a click toggle instead of hover
function initMegaMenuMobile() {
    const navItems = document.querySelectorAll('.nav-item');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            if (navMenu.style.display === 'flex') {
                navMenu.style.display = 'none';
            } else {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.backgroundColor = '#fff';
                navMenu.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
            }
        });
    }

    // In a real responsive scenario, we would add click listeners for mega-menu on mobile
    // For now, hover handles it on desktop via CSS.
}

/* ==========================================================================
   HOMEPAGE JS (HERO SLIDER & PRODUCT CAROUSEL)
   ========================================================================== */

let currentHeroSlide = 0;
let heroSlideInterval;

function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;
    
    // Auto slide every 5 seconds
    heroSlideInterval = setInterval(() => moveHeroSlide(1), 5000);
}

function moveHeroSlide(direction) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('#heroDots .dot');
    if (slides.length === 0) return;

    slides[currentHeroSlide].classList.remove('active');
    dots[currentHeroSlide].classList.remove('active');

    currentHeroSlide = (currentHeroSlide + direction + slides.length) % slides.length;

    slides[currentHeroSlide].classList.add('active');
    dots[currentHeroSlide].classList.add('active');

    // Reset interval when user manually clicks
    clearInterval(heroSlideInterval);
    heroSlideInterval = setInterval(() => moveHeroSlide(1), 5000);
}

function setHeroSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('#heroDots .dot');
    if (slides.length === 0) return;

    slides[currentHeroSlide].classList.remove('active');
    dots[currentHeroSlide].classList.remove('active');

    currentHeroSlide = index;

    slides[currentHeroSlide].classList.add('active');
    dots[currentHeroSlide].classList.add('active');

    clearInterval(heroSlideInterval);
    heroSlideInterval = setInterval(() => moveHeroSlide(1), 5000);
}

function scrollCarousel(direction) {
    const carousel = document.getElementById('trendingCarousel');
    if (!carousel) return;

    // Scroll by roughly the width of one product card + gap
    const scrollAmount = 300 * direction;
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

// Initialize sliders when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initCategoryLogic();
});

/* ==========================================================================
   CATEGORY JS (FILTERING & SORTING)
   ========================================================================== */

function initCategoryLogic() {
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    const sortSelect = document.getElementById('sort-select');
    if (filterCheckboxes.length === 0 && !sortSelect) return;

    filterCheckboxes.forEach(cb => cb.addEventListener('change', applyFiltersAndSort));
    if(sortSelect) sortSelect.addEventListener('change', applyFiltersAndSort);
}

function applyFiltersAndSort() {
    const products = Array.from(document.querySelectorAll('.grid-item'));
    const grid = document.getElementById('product-grid');
    const countSpan = document.getElementById('product-count');
    const noProductsMsg = document.getElementById('no-products-msg');

    // Get active filters
    const activeFilters = {
        gender: [],
        size: []
    };

    document.querySelectorAll('.filter-checkbox:checked').forEach(cb => {
        activeFilters[cb.dataset.type].push(cb.value);
    });

    let visibleCount = 0;

    // Filter
    products.forEach(product => {
        const pGender = product.dataset.gender;
        const pSize = product.dataset.size; // Comma separated, e.g., "S,M,L"

        const passGender = activeFilters.gender.length === 0 || activeFilters.gender.includes(pGender);
        
        // For size, if any active size is in the product's sizes
        let passSize = true;
        if (activeFilters.size.length > 0) {
            passSize = activeFilters.size.some(size => pSize.includes(size));
        }

        if (passGender && passSize) {
            product.style.display = 'block';
            product.dataset.visible = 'true';
            visibleCount++;
        } else {
            product.style.display = 'none';
            product.dataset.visible = 'false';
        }
    });

    // Update count
    if (countSpan) countSpan.textContent = visibleCount;
    if (noProductsMsg) {
        noProductsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // Sort
    const sortValue = document.getElementById('sort-select')?.value;
    if (!sortValue) return;

    const visibleProducts = products.filter(p => p.dataset.visible === 'true');
    
    visibleProducts.sort((a, b) => {
        if (sortValue === 'price-asc') {
            return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
        } else if (sortValue === 'price-desc') {
            return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
        } else if (sortValue === 'newest') {
            return new Date(b.dataset.date) - new Date(a.dataset.date);
        }
        return 0;
    });

    // Re-append sorted elements
    visibleProducts.forEach(p => grid.appendChild(p));
}
