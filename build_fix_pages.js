const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const headerEnd = indexHtml.indexOf('<!-- ==========================================') !== -1 
    ? indexHtml.indexOf('<!-- ==========================================\n         [PHẦN 2] HERO BANNER') 
    : indexHtml.indexOf('<main');
const footerStart = indexHtml.indexOf('<!-- ==========================================\n         [PHẦN 4] NEWSLETTER & FOOTER');

const header = indexHtml.substring(0, headerEnd);
const footer = indexHtml.substring(footerStart);

const pages = [
    {
        file: 'mens.html',
        title: 'MENS APPAREL',
        breadcrumb: 'Mens',
        products: [
            { name: "Manchester United Mens Home Shirt 24/25", price: "$100.00", img: "images/mens_model.jpg" },
            { name: "Manchester United Mens Away Shirt 24/25", price: "$100.00", img: "images/5_b42223866496c6fac690a48a9b121da5.jpg" },
            { name: "Manchester United Mens Third Shirt 24/25", price: "$100.00", img: "images/8_4c77739191924bede382dbf20ab1a413.jpg" },
            { name: "Manchester United Mens Anthem Jacket", price: "$110.00", img: "images/17_0bb8ce5dfcdaa5f408a0c8cd9c864247.jpg" },
            { name: "Manchester United Mens Casual Hoodie", price: "$85.00", img: "images/19_c09dd81f09a6c8db0ef921ae63aaf881.jpg" },
            { name: "Manchester United Mens Training Top", price: "$60.00", img: "images/7_066d2c004e6666a7d1316d9eb103a421.jpg" }
        ],
        filters: `<label><input type="checkbox" checked> Mens</label>
                  <label><input type="checkbox"> Womens</label>
                  <label><input type="checkbox"> Kids</label>`
    },
    {
        file: 'womens.html',
        title: 'WOMENS APPAREL',
        breadcrumb: 'Womens',
        products: [
            { name: "Manchester United Womens Home Shirt 24/25", price: "$100.00", img: "images/womens_model.jpg" },
            { name: "Manchester United Womens Away Shirt 24/25", price: "$100.00", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=400" },
            { name: "Manchester United Womens Third Shirt 24/25", price: "$100.00", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400" },
            { name: "Manchester United Womens Training Top", price: "$60.00", img: "https://images.unsplash.com/photo-1583496661160-c5d014f6e093?auto=format&fit=crop&q=80&w=400" },
            { name: "Manchester United Womens Track Jacket", price: "$85.00", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400" },
            { name: "Manchester United Womens Shorts", price: "$45.00", img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=400" }
        ],
        filters: `<label><input type="checkbox"> Mens</label>
                  <label><input type="checkbox" checked> Womens</label>
                  <label><input type="checkbox"> Kids</label>`
    },
    {
        file: 'kids.html',
        title: 'KIDS & INFANTS',
        breadcrumb: 'Kids',
        products: [
            { name: "Manchester United Kids Home Kit 24/25", price: "$65.00", img: "images/kids_model.jpg" },
            { name: "Manchester United Kids Away Kit 24/25", price: "$65.00", img: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=400" },
            { name: "Manchester United Kids Third Kit 24/25", price: "$65.00", img: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&q=80&w=400" },
            { name: "Manchester United Baby Home Kit", price: "$50.00", img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=400" },
            { name: "Manchester United Kids Training Top", price: "$45.00", img: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=400" },
            { name: "Manchester United Kids Jacket", price: "$60.00", img: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&q=80&w=400" }
        ],
        filters: `<label><input type="checkbox"> Mens</label>
                  <label><input type="checkbox"> Womens</label>
                  <label><input type="checkbox" checked> Kids</label>`
    }
];

pages.forEach(page => {
    let productsHtml = '';
    
    page.products.forEach((prod, idx) => {
        productsHtml += `
                <!-- Product ${idx + 1} -->
                <div class="product-card">
                    <div class="product-image-container">
                        <a href="product.html?id=${page.file.split('.')[0]}-${idx}">
                            <img src="${prod.img}" alt="${prod.name}" class="product-img" onerror="this.src='images/0_Manchester_United_FC_crest.svg'">
                        </a>
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html?id=${page.file.split('.')[0]}-${idx}" class="product-title">${prod.name}</a>
                        <p class="product-price">${prod.price}</p>
                    </div>
                </div>`;
    });

    const mainContent = `
    <!-- ==========================================
         [PHẦN MAIN] ${page.title}
         ========================================== -->
    <main class="category-page">
        <div class="breadcrumb">
            <a href="index.html">Home</a> &gt; <span>${page.breadcrumb}</span>
        </div>
        
        <h1 class="category-title">${page.title}</h1>

        <div class="category-layout">
            <!-- Cột Trái: Filter -->
            <div class="sidebar-filter">
                <h2 class="filter-title">Filter By</h2>
                
                <details class="filter-group" open>
                    <summary class="filter-group-title">Department <i class="fa-solid fa-chevron-down"></i></summary>
                    <div class="filter-options">
                        ${page.filters}
                    </div>
                </details>

                <details class="filter-group" open>
                    <summary class="filter-group-title">Product Type <i class="fa-solid fa-chevron-down"></i></summary>
                    <div class="filter-options">
                        <label><input type="checkbox"> Shirts</label>
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
                    </div>
                </details>
            </div>

            <!-- Cột Phải: Product Grid (6 Sản phẩm) -->
            <div class="category-product-grid">
                ${productsHtml}
            </div>
        </div>
    </main>
`;

    fs.writeFileSync(path.join(__dirname, page.file), header + mainContent + footer, 'utf8');
    console.log(`Tạo ${page.file} tĩnh thành công.`);
});
