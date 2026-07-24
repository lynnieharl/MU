const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const headerEnd = indexHtml.indexOf('<!-- ==========================================') !== -1 
    ? indexHtml.indexOf('<!-- ==========================================\n         [PHẦN 2] HERO BANNER') 
    : indexHtml.indexOf('<main');
const footerStart = indexHtml.indexOf('<!-- ==========================================\n         [PHẦN 4] NEWSLETTER & FOOTER');

const header = indexHtml.substring(0, headerEnd);
const footer = indexHtml.substring(footerStart);

const categories = [
    { title: 'Training', file: 'training.html' },
    { title: 'Mens', file: 'mens.html' },
    { title: 'Womens', file: 'womens.html' },
    { title: 'Kids', file: 'kids.html' },
    { title: 'Souvenirs', file: 'souvenirs.html' }
];

const images = [
    'images/6_2ed2651297cac6ec9750f6581a0940e2.jpg', // Training Top
    'images/7_066d2c004e6666a7d1316d9eb103a421.jpg', // Anthem Jacket
    'https://mufc-live.cdn.scayle.cloud/images/b2c94380b2a95c47936a715f5c80ac87.jpg', // Warm up top
    'https://mufc-live.cdn.scayle.cloud/images/8ab5a7a7bb629399eb2a0ec17e3f4f1d.jpg'  // Hoodie
];

const titles = [
    'Manchester United Training Top 24/25',
    'Manchester United Anthem Jacket 24/25',
    'Manchester United Warm Up Top 24/25',
    'Manchester United Hoodie 24/25'
];

categories.forEach(cat => {
    let productsHtml = '';
    for(let i=0; i<9; i++) {
        let img = images[i % images.length];
        let title = titles[i % titles.length];
        let price = '$' + (Math.floor(Math.random() * 50) + 50) + '.00';
        let id = 'training-top'; // Fake ID for linking

        productsHtml += `
                    <div class="product-card">
                        <div class="product-image-container">
                            <a href="product.html?id=${id}"><img src="${img}" alt="${title}" class="product-img"></a>
                            <div class="product-badge badge-exclusive">Exclusive</div>
                            <button class="quick-view-btn">Quick View</button>
                        </div>
                        <div class="product-info">
                            <a href="product.html?id=${id}" class="product-title">${title}</a>
                            <p class="product-price">${price}</p>
                        </div>
                    </div>
        `;
    }

    const mainContent = `
    <!-- ==========================================
         [PHẦN MAIN] CATEGORY PAGE TEMPLATE
         ========================================== -->
    <main class="category-page">
        <div class="breadcrumb">
            <a href="index.html">Home</a> &gt; <span>${cat.title}</span>
        </div>
        
        <h1 class="category-title">${cat.title.toUpperCase()}</h1>

        <div class="category-layout">
            <!-- Cột Trái: Filter (25%) sử dụng thẻ details/summary HTML5 (Accordion) -->
            <div class="sidebar-filter">
                <h2 class="filter-title">Filter By</h2>
                
                <details class="filter-group" open>
                    <summary class="filter-group-title">Department <i class="fa-solid fa-chevron-down"></i></summary>
                    <div class="filter-options">
                        <label><input type="checkbox"> Mens</label>
                        <label><input type="checkbox"> Womens</label>
                        <label><input type="checkbox"> Kids</label>
                    </div>
                </details>

                <details class="filter-group" open>
                    <summary class="filter-group-title">Product Type <i class="fa-solid fa-chevron-down"></i></summary>
                    <div class="filter-options">
                        <label><input type="checkbox"> T-Shirts</label>
                        <label><input type="checkbox"> Hoodies</label>
                        <label><input type="checkbox"> Jackets</label>
                        <label><input type="checkbox"> Shorts</label>
                    </div>
                </details>

                <details class="filter-group" open>
                    <summary class="filter-group-title">Size <i class="fa-solid fa-chevron-down"></i></summary>
                    <div class="filter-options">
                        <label><input type="checkbox"> S</label>
                        <label><input type="checkbox"> M</label>
                        <label><input type="checkbox"> L</label>
                        <label><input type="checkbox"> XL</label>
                        <label><input type="checkbox"> XXL</label>
                    </div>
                </details>
            </div>

            <!-- Cột Phải: Product Grid (75%) -->
            <div class="category-product-grid">
                ${productsHtml}
            </div>
        </div>
    </main>

`;

    fs.writeFileSync(path.join(__dirname, cat.file), header + mainContent + footer, 'utf8');
    console.log('Tạo ' + cat.file + ' thành công.');
});
