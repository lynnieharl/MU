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
    { title: 'Training', file: 'training.html', key: 'training' },
    { title: 'Mens', file: 'mens.html', key: 'mens' },
    { title: 'Womens', file: 'womens.html', key: 'womens' },
    { title: 'Kids', file: 'kids.html', key: 'kids' },
    { title: 'Souvenirs', file: 'souvenirs.html', key: 'souvenirs' }
];

const categoryProducts = {
    souvenirs: [
        { name: "Manchester United Red Scarf", price: "$20.00", img: "https://mufc-live.cdn.scayle.cloud/images/c2cb1a3e88785718a00ed43329107936.jpg" },
        { name: "Manchester United Crest Mug", price: "$15.00", img: "https://mufc-live.cdn.scayle.cloud/images/418f48039e10d297914561286950f14d.jpg" },
        { name: "Manchester United Baseball Cap", price: "$25.00", img: "https://mufc-live.cdn.scayle.cloud/images/5f795632eb1e9481977755edeb918ce2.jpg" },
        { name: "Manchester United Crest Backpack", price: "$50.00", img: "https://mufc-live.cdn.scayle.cloud/images/3fbe3f6f1f45c2f8290f845d47e8e583.jpg" },
        { name: "Manchester United Keyring", price: "$10.00", img: "https://mufc-live.cdn.scayle.cloud/images/3fbe3f6f1f45c2f8290f845d47e8e583.jpg" }, // Reuse backpack if needed, or better, fallback
        { name: "Manchester United Autograph Football", price: "$30.00", img: "https://images.unsplash.com/photo-1614632537190-23e4146777db?auto=format&fit=crop&q=80&w=400" }, // Football placeholder
        { name: "Manchester United Old Trafford 3D Puzzle", price: "$40.00", img: "https://images.unsplash.com/photo-1579208035105-0816b328148b?auto=format&fit=crop&q=80&w=400" }, // Stadium placeholder
        { name: "Manchester United Beanie", price: "$22.00", img: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=400" }, // Beanie placeholder
        { name: "Manchester United Water Bottle", price: "$18.00", img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=400" } // Bottle placeholder
    ],
    training: [
        { name: "Manchester United Training Jacket", price: "$90.00", img: "images/7_066d2c004e6666a7d1316d9eb103a421.jpg" },
        { name: "Manchester United Pre-Match Shirt", price: "$70.00", img: "images/6_2ed2651297cac6ec9750f6581a0940e2.jpg" },
        { name: "Manchester United Training Shorts", price: "$45.00", img: "https://images.unsplash.com/photo-1551854838-212c50b4c5cb?auto=format&fit=crop&q=80&w=400" }, // Shorts placeholder
        { name: "Manchester United Training Pants", price: "$65.00", img: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&q=80&w=400" }, // Pants placeholder
        { name: "Manchester United Anthem Jacket", price: "$100.00", img: "images/16_a4344ea5b8f98e65d41e2666dc881248.jpg" },
        { name: "Manchester United Warm-up Top", price: "$60.00", img: "images/17_0bb8ce5dfcdaa5f408a0c8cd9c864247.jpg" },
        { name: "Manchester United Sleeveless Training Top", price: "$50.00", img: "images/18_efc356c8f7694d0e6b81af8b55e486dd.jpg" },
        { name: "Manchester United Training Hoodie", price: "$85.00", img: "images/19_c09dd81f09a6c8db0ef921ae63aaf881.jpg" },
        { name: "Manchester United Presentation Jacket", price: "$95.00", img: "images/7_066d2c004e6666a7d1316d9eb103a421.jpg" }
    ],
    mens: [
        { name: "Manchester United Mens Home Shirt 24/25", price: "$100.00", img: "images/4_c836596765f00ea79c068d00ff3c4e05.jpg" },
        { name: "Manchester United Mens Away Shirt 24/25", price: "$100.00", img: "images/5_b42223866496c6fac690a48a9b121da5.jpg" },
        { name: "Manchester United Mens Third Shirt 24/25", price: "$100.00", img: "images/8_4c77739191924bede382dbf20ab1a413.jpg" },
        { name: "Manchester United Mens Goalkeeper Shirt", price: "$110.00", img: "images/9_bebbf6efd4d3e67fa7281f6bdf8429a6.jpg" },
        { name: "Manchester United Mens Retro Kit 1990", price: "$90.00", img: "images/10_557b882a41d5bc6a7934615bbc14b842.jpg" },
        { name: "Manchester United Mens Graphic Tee", price: "$35.00", img: "images/2_24295ea4b3319ca1ab4a7b45bc5272e4.jpg" },
        { name: "Manchester United Mens Polo Shirt", price: "$50.00", img: "images/16_a4344ea5b8f98e65d41e2666dc881248.jpg" },
        { name: "Manchester United Mens Anthem Jacket", price: "$100.00", img: "images/17_0bb8ce5dfcdaa5f408a0c8cd9c864247.jpg" },
        { name: "Manchester United Mens Casual Hoodie", price: "$75.00", img: "images/19_c09dd81f09a6c8db0ef921ae63aaf881.jpg" }
    ],
    womens: [
        { name: "Manchester United Womens Home Shirt 24/25", price: "$100.00", img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=400" },
        { name: "Manchester United Womens Away Shirt 24/25", price: "$100.00", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=400" },
        { name: "Manchester United Womens Third Shirt 24/25", price: "$100.00", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400" },
        { name: "Manchester United Womens Training Top", price: "$60.00", img: "https://images.unsplash.com/photo-1583496661160-c5d014f6e093?auto=format&fit=crop&q=80&w=400" },
        { name: "Manchester United Womens Track Jacket", price: "$85.00", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400" },
        { name: "Manchester United Womens Graphic Tee", price: "$35.00", img: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&q=80&w=400" },
        { name: "Manchester United Womens Shorts", price: "$40.00", img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=400" },
        { name: "Manchester United Womens Hoodie", price: "$75.00", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400" },
        { name: "Manchester United Womens Pre-Match", price: "$70.00", img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=400" }
    ],
    kids: [
        { name: "Manchester United Kids Home Kit 24/25", price: "$65.00", img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=400" },
        { name: "Manchester United Kids Away Kit 24/25", price: "$65.00", img: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=400" },
        { name: "Manchester United Kids Third Kit 24/25", price: "$65.00", img: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&q=80&w=400" },
        { name: "Manchester United Baby Home Kit", price: "$50.00", img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=400" },
        { name: "Manchester United Kids Training Top", price: "$45.00", img: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=400" },
        { name: "Manchester United Kids Jacket", price: "$60.00", img: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&q=80&w=400" },
        { name: "Manchester United Kids Graphic Tee", price: "$25.00", img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=400" },
        { name: "Manchester United Kids Shorts", price: "$30.00", img: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=400" },
        { name: "Manchester United Kids Beanie", price: "$15.00", img: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&q=80&w=400" }
    ]
};

categories.forEach(category => {
    let productsHtml = '';
    
    const prods = categoryProducts[category.key];
    
    prods.forEach((prod, idx) => {
        productsHtml += `
                <div class="product-card">
                    <div class="product-image-container">
                        <a href="product.html?id=\${category.key}-\${idx}"><img src="\${prod.img}" alt="\${prod.name}" class="product-img" onerror="this.src='images/0_Manchester_United_FC_crest.svg'"></a>
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html?id=\${category.key}-\${idx}" class="product-title">\${prod.name}</a>
                        <p class="product-price">\${prod.price}</p>
                    </div>
                </div>
        `;
    });

    const mainContent = `
    <!-- ==========================================
         [PHẦN MAIN] CATEGORY PAGE (\${category.title})
         ========================================== -->
    <main class="category-page">
        <div class="breadcrumb">
            <a href="index.html">Home</a> &gt; <span>\${category.title}</span>
        </div>
        
        <h1 class="category-title">\${category.title}</h1>

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
                    </div>
                </details>
            </div>

            <!-- Cột Phải: Product Grid -->
            <div class="category-product-grid">
                \${productsHtml}
            </div>
        </div>
    </main>

`;

    fs.writeFileSync(path.join(__dirname, category.file), header + mainContent + footer, 'utf8');
    console.log(`Tạo ${category.file} thành công.`);
});
