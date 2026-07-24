const fs = require('fs');
const path = require('path');

const css = `
/* ==========================================================================
   NEW IN PAGE (Animations & UI)
   ========================================================================== */

/* Product Sort By Dropdown */
.sort-by-container select:hover {
    border-color: var(--color-black);
}

/* Badge New (Top Left) */
.badge-new-product {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #DA291C; /* United Red */
    color: var(--color-white);
    padding: 3px 10px;
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    z-index: 10; /* Ensures it stays on top of images */
    border-radius: 2px;
}

/* Hover Image Swap Animation */
.image-swap {
    position: relative;
    overflow: hidden;
    background-color: var(--color-gray-light);
}

.image-swap .img-front,
.image-swap .img-back {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.5s ease-in-out;
}

.image-swap .img-back {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
}

/* Hover effect */
.image-swap:hover .img-front {
    opacity: 0;
}

.image-swap:hover .img-back {
    opacity: 1;
}

/* Ensure Quick View Button styling remains robust */
.product-image-container .quick-view-btn {
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.95);
    color: var(--color-black);
    border: 1px solid var(--color-gray-border);
    padding: 12px 20px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 85%;
    text-align: center;
    z-index: 15;
    opacity: 0;
}

.product-image-container:hover .quick-view-btn {
    bottom: 20px;
    opacity: 1;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.product-image-container .quick-view-btn:hover {
    background-color: var(--color-black);
    color: var(--color-white);
}
`;

fs.appendFileSync(path.join(__dirname, 'style.css'), css, 'utf8');
console.log('Appended New In CSS successfully.');
