const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const headerEnd = indexHtml.indexOf('<!-- ==========================================') !== -1 
    ? indexHtml.indexOf('<!-- ==========================================\n         [PHẦN 2] HERO BANNER') 
    : indexHtml.indexOf('<main');
const footerStart = indexHtml.indexOf('<!-- ==========================================\n         [PHẦN 4] NEWSLETTER & FOOTER');

const header = indexHtml.substring(0, headerEnd);
const footer = indexHtml.substring(footerStart);

const mixedProducts = [
    { title: 'Manchester United Home Shirt 23/24', image: 'images/4_c836596765f00ea79c068d00ff3c4e05.jpg', originalPrice: '$100.00', salePrice: '$50.00', discount: '-50%' },
    { title: 'Manchester United Away Shirt 23/24', image: 'images/5_b42223866496c6fac690a48a9b121da5.jpg', originalPrice: '$100.00', salePrice: '$60.00', discount: '-40%' },
    { title: 'Manchester United Training Jacket 23/24', image: 'images/7_066d2c004e6666a7d1316d9eb103a421.jpg', originalPrice: '$80.00', salePrice: '$56.00', discount: '-30%' },
    { title: 'Manchester United Scarf', image: 'https://mufc-live.cdn.scayle.cloud/images/c2cb1a3e88785718a00ed43329107936.jpg', originalPrice: '$25.00', salePrice: '$15.00', discount: '-40%' },
    { title: 'Manchester United Mug', image: 'https://mufc-live.cdn.scayle.cloud/images/418f48039e10d297914561286950f14d.jpg', originalPrice: '$15.00', salePrice: '$10.00', discount: '-33%' },
    { title: 'Manchester United Cap', image: 'https://mufc-live.cdn.scayle.cloud/images/5f795632eb1e9481977755edeb918ce2.jpg', originalPrice: '$30.00', salePrice: '$18.00', discount: '-40%' },
    { title: 'Manchester United Pre-Match Jersey', image: 'images/6_2ed2651297cac6ec9750f6581a0940e2.jpg', originalPrice: '$70.00', salePrice: '$35.00', discount: '-50%' },
    { title: 'Manchester United Third Shirt 23/24', image: 'images/8_4c77739191924bede382dbf20ab1a413.jpg', originalPrice: '$100.00', salePrice: '$70.00', discount: '-30%' },
    { title: 'Manchester United Backpack', image: 'https://mufc-live.cdn.scayle.cloud/images/3fbe3f6f1f45c2f8290f845d47e8e583.jpg', originalPrice: '$50.00', salePrice: '$35.00', discount: '-30%' }
];

let productsHtml = '';
mixedProducts.forEach((prod, idx) => {
    productsHtml += `
                <div class="product-card">
                    <div class="product-image-container">
                        <a href="product.html?id=sale-${idx}"><img src="${prod.image}" alt="${prod.title}" class="product-img"></a>
                        <div class="product-badge badge-sale">${prod.discount}</div>
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html?id=sale-${idx}" class="product-title">${prod.title}</a>
                        <p class="product-price">
                            <del class="price-original">${prod.originalPrice}</del>
                            <span class="price-sale">${prod.salePrice}</span>
                        </p>
                    </div>
                </div>
    `;
});

const mainContent = `
    <!-- ==========================================
         [PHẦN MAIN] SALE PAGE
         ========================================== -->
    <main class="category-page sale-page">
        <div class="breadcrumb">
            <a href="index.html">Home</a> &gt; <span style="color: #c70101; font-weight: bold;">Sale</span>
        </div>
        
        <h1 class="category-title" style="color: #c70101;">SALE</h1>

        <div class="category-layout">
            <!-- Cột Trái: Filter -->
            <div class="sidebar-filter">
                <h2 class="filter-title">Filter By</h2>
                
                <details class="filter-group" open>
                    <summary class="filter-group-title">Department <i class="fa-solid fa-chevron-down"></i></summary>
                    <div class="filter-options">
                        <label><input type="checkbox"> Mens</label>
                        <label><input type="checkbox"> Womens</label>
                        <label><input type="checkbox"> Kids</label>
                        <label><input type="checkbox"> Souvenirs</label>
                    </div>
                </details>

                <details class="filter-group" open>
                    <summary class="filter-group-title">Product Type <i class="fa-solid fa-chevron-down"></i></summary>
                    <div class="filter-options">
                        <label><input type="checkbox"> Shirts</label>
                        <label><input type="checkbox"> Outerwear</label>
                        <label><input type="checkbox"> Accessories</label>
                        <label><input type="checkbox"> Collectibles</label>
                    </div>
                </details>
                
                <details class="filter-group" open>
                    <summary class="filter-group-title">Discount <i class="fa-solid fa-chevron-down"></i></summary>
                    <div class="filter-options">
                        <label><input type="checkbox"> Up to 30% Off</label>
                        <label><input type="checkbox"> Up to 50% Off</label>
                    </div>
                </details>
            </div>

            <!-- Cột Phải: Product Grid -->
            <div class="category-product-grid">
                
                <!-- Sale Banner Top -->
                <div class="sale-banner-top">
                    END OF SEASON SALE - UP TO 50% OFF
                </div>

                ${productsHtml}
            </div>
        </div>
    </main>

`;

fs.writeFileSync(path.join(__dirname, 'sale.html'), header + mainContent + footer, 'utf8');
console.log('Tạo sale.html thành công.');
