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

/* ==========================================================================
   PRODUCT DETAIL PAGE JS (GALLERY & ADD TO CART)
   ========================================================================== */

function changeMainImage(src) {
    const mainImg = document.getElementById('main-product-image');
    if (!mainImg) return;
    
    // Smooth transition
    mainImg.style.opacity = '0';
    setTimeout(() => {
        mainImg.src = src.replace('w=150', 'w=800'); // Load higher res based on unsplash url
        mainImg.style.opacity = '1';
    }, 150);

    // Update active thumb
    const thumbs = document.querySelectorAll('.thumb-img');
    thumbs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
}

// Image Zoom effect on hover
function initImageZoom() {
    const container = document.getElementById('zoom-container');
    const img = document.getElementById('main-product-image');
    if (!container || !img) return;

    container.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = container.getBoundingClientRect();
        const x = (e.clientX - left) / width * 100;
        const y = (e.clientY - top) / height * 100;

        img.style.transformOrigin = `${x}% ${y}%`;
        img.style.transform = 'scale(2)';
    });

    container.addEventListener('mouseleave', () => {
        img.style.transformOrigin = 'center center';
        img.style.transform = 'scale(1)';
    });
}

// Size Selection
function initSizeSelection() {
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
}

/* ==========================================================================
   UX ENHANCEMENTS (TOAST & MOBILE DRAWER)
   ========================================================================== */

function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--color-primary); font-size:1.2rem;"></i> <span>${message}</span>`;
    
    // Force reflow
    void toast.offsetWidth;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Override cart.js addToCart to show Toast instead of opening cart directly
// We will intercept the global function if needed, but since we are in Vanilla,
// we can just re-define or hook into it. Since addToCart is in cart.js, 
// let's just make showToast available globally.
window.showToast = showToast;

function initMobileDrawer() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (!mobileToggle) return;

    // Create Drawer DOM if not exists
    let drawer = document.getElementById('mobile-drawer');
    let overlay = document.getElementById('mobile-drawer-overlay');

    if (!drawer) {
        overlay = document.createElement('div');
        overlay.id = 'mobile-drawer-overlay';
        overlay.className = 'mobile-drawer-overlay';
        
        drawer = document.createElement('div');
        drawer.id = 'mobile-drawer';
        drawer.className = 'mobile-side-drawer';
        drawer.innerHTML = `
            <div class="mobile-drawer-header">
                <img src="https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg" alt="Logo" style="height:40px;">
                <button id="close-drawer-btn" style="font-size:1.5rem;"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="mobile-nav-list">
                <a href="index.html">Home</a>
                <a href="category.html">Kits</a>
                <a href="category.html">Training</a>
                <a href="category.html">Retro</a>
                <a href="category.html">Gifts & Accessories</a>
                <a href="login.html">My Account</a>
            </div>
        `;
        document.body.appendChild(overlay);
        document.body.appendChild(drawer);
    }

    const closeBtn = document.getElementById('close-drawer-btn');

    function openDrawer() {
        drawer.classList.add('open');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        drawer.classList.remove('open');
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    mobileToggle.addEventListener('click', openDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
}

document.addEventListener('DOMContentLoaded', () => {
    initImageZoom();
    initSizeSelection();
    initMobileDrawer();
});
