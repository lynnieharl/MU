const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const headerEnd = indexHtml.indexOf('<!-- ==========================================') !== -1 
    ? indexHtml.indexOf('<!-- ==========================================\n         [PHẦN 2] HERO BANNER') 
    : indexHtml.indexOf('<main');
const footerStart = indexHtml.indexOf('<!-- ==========================================\n         [PHẦN 4] NEWSLETTER & FOOTER');

const header = indexHtml.substring(0, headerEnd).replace(/href="new.html"/g, 'href="new-in.html"');
const footer = indexHtml.substring(footerStart);

const mainContent = `
    <!-- ==========================================
         [PHẦN MAIN] NEW IN
         ========================================== -->
    <main class="category-page">
        <div class="breadcrumb">
            <a href="index.html">Home</a> &gt; <span>New In</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 20px;">
            <h1 class="category-title" style="margin-bottom: 0;">NEW IN</h1>
            
            <div class="sort-by-container">
                <label for="sort-by" style="font-weight: bold; margin-right: 10px;">Sort by:</label>
                <select id="sort-by" style="padding: 8px 15px; border: 1px solid var(--color-gray-border); border-radius: 4px; outline: none; cursor: pointer;">
                    <option value="newest">Newest</option>
                    <option value="price-high">Price High-Low</option>
                    <option value="price-low">Price Low-High</option>
                </select>
            </div>
        </div>

        <div class="category-layout">
            <!-- Cột Trái: Filter -->
            <div class="sidebar-filter">
                <h2 class="filter-title">Filter By</h2>
                
                <details class="filter-group" open>
                    <summary class="filter-group-title">Gender <i class="fa-solid fa-chevron-down"></i></summary>
                    <div class="filter-options">
                        <label><input type="checkbox"> Men</label>
                        <label><input type="checkbox"> Women</label>
                        <label><input type="checkbox"> Kids</label>
                    </div>
                </details>

                <details class="filter-group" open>
                    <summary class="filter-group-title">Product Type <i class="fa-solid fa-chevron-down"></i></summary>
                    <div class="filter-options">
                        <label><input type="checkbox"> Jerseys</label>
                        <label><input type="checkbox"> Trainingwear</label>
                        <label><input type="checkbox"> Fashion</label>
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

            <!-- Cột Phải: Product Grid (9 Sản phẩm) -->
            <div class="category-product-grid">
                
                <!-- Product 1 -->
                <div class="product-card">
                    <div class="product-image-container image-swap">
                        <span class="badge-new-product">New</span>
                        <a href="product.html?id=newin-0">
                            <img src="images/4_c836596765f00ea79c068d00ff3c4e05.jpg" alt="Manchester United Mens Home Shirt 24/25 Front" class="product-img img-front">
                            <img src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=400" alt="Manchester United Mens Home Shirt 24/25 Back" class="product-img img-back">
                        </a>
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html?id=newin-0" class="product-title">Manchester United Mens Home Shirt 24/25</a>
                        <p class="product-price">$100.00</p>
                    </div>
                </div>

                <!-- Product 2 -->
                <div class="product-card">
                    <div class="product-image-container image-swap">
                        <span class="badge-new-product">New</span>
                        <a href="product.html?id=newin-1">
                            <img src="images/mens_model_away.jpg" alt="Manchester United Mens Away Shirt 24/25 Front" class="product-img img-front">
                            <img src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=400" alt="Manchester United Mens Away Shirt 24/25 Back" class="product-img img-back">
                        </a>
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html?id=newin-1" class="product-title">Manchester United Mens Away Shirt 24/25</a>
                        <p class="product-price">$100.00</p>
                    </div>
                </div>

                <!-- Product 3 -->
                <div class="product-card">
                    <div class="product-image-container image-swap">
                        <span class="badge-new-product">New</span>
                        <a href="product.html?id=newin-2">
                            <img src="images/8_4c77739191924bede382dbf20ab1a413.jpg" alt="Manchester United Mens Third Shirt 24/25 Front" class="product-img img-front">
                            <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400" alt="Manchester United Mens Third Shirt 24/25 Back" class="product-img img-back">
                        </a>
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html?id=newin-2" class="product-title">Manchester United Mens Third Shirt 24/25</a>
                        <p class="product-price">$100.00</p>
                    </div>
                </div>

                <!-- Product 4 -->
                <div class="product-card">
                    <div class="product-image-container image-swap">
                        <span class="badge-new-product">New</span>
                        <a href="product.html?id=newin-3">
                            <img src="images/17_0bb8ce5dfcdaa5f408a0c8cd9c864247.jpg" alt="Manchester United Mens Anthem Jacket Front" class="product-img img-front">
                            <img src="images/16_a4344ea5b8f98e65d41e2666dc881248.jpg" alt="Manchester United Mens Anthem Jacket Back" class="product-img img-back">
                        </a>
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html?id=newin-3" class="product-title">Manchester United Mens Anthem Jacket</a>
                        <p class="product-price">$110.00</p>
                    </div>
                </div>

                <!-- Product 5 -->
                <div class="product-card">
                    <div class="product-image-container image-swap">
                        <span class="badge-new-product">New</span>
                        <a href="product.html?id=newin-4">
                            <img src="images/7_066d2c004e6666a7d1316d9eb103a421.jpg" alt="Manchester United Training Top Front" class="product-img img-front">
                            <img src="images/6_2ed2651297cac6ec9750f6581a0940e2.jpg" alt="Manchester United Training Top Back" class="product-img img-back">
                        </a>
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html?id=newin-4" class="product-title">Manchester United Training Top</a>
                        <p class="product-price">$60.00</p>
                    </div>
                </div>

                <!-- Product 6 -->
                <div class="product-card">
                    <div class="product-image-container image-swap">
                        <span class="badge-new-product">New</span>
                        <a href="product.html?id=newin-5">
                            <img src="images/19_c09dd81f09a6c8db0ef921ae63aaf881.jpg" alt="Manchester United Pre-Match Shirt Front" class="product-img img-front">
                            <img src="images/2_24295ea4b3319ca1ab4a7b45bc5272e4.jpg" alt="Manchester United Pre-Match Shirt Back" class="product-img img-back">
                        </a>
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html?id=newin-5" class="product-title">Manchester United Pre-Match Shirt</a>
                        <p class="product-price">$75.00</p>
                    </div>
                </div>
                
                <!-- Product 7 -->
                <div class="product-card">
                    <div class="product-image-container image-swap">
                        <span class="badge-new-product">New</span>
                        <a href="product.html?id=newin-6">
                            <img src="images/9_bebbf6efd4d3e67fa7281f6bdf8429a6.jpg" alt="Manchester United Goalkeeper Shirt Front" class="product-img img-front">
                            <img src="images/10_557b882a41d5bc6a7934615bbc14b842.jpg" alt="Manchester United Goalkeeper Shirt Back" class="product-img img-back">
                        </a>
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html?id=newin-6" class="product-title">Manchester United Goalkeeper Shirt</a>
                        <p class="product-price">$110.00</p>
                    </div>
                </div>

                <!-- Product 8 -->
                <div class="product-card">
                    <div class="product-image-container image-swap">
                        <span class="badge-new-product">New</span>
                        <a href="product.html?id=newin-7">
                            <img src="images/kids_model.jpg" alt="Manchester United Kids Home Kit Front" class="product-img img-front">
                            <img src="https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=400" alt="Manchester United Kids Home Kit Back" class="product-img img-back">
                        </a>
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html?id=newin-7" class="product-title">Manchester United Kids Home Kit 24/25</a>
                        <p class="product-price">$65.00</p>
                    </div>
                </div>

                <!-- Product 9 -->
                <div class="product-card">
                    <div class="product-image-container image-swap">
                        <span class="badge-new-product">New</span>
                        <a href="product.html?id=newin-8">
                            <img src="images/womens_model.jpg" alt="Manchester United Womens Home Kit Front" class="product-img img-front">
                            <img src="https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=400" alt="Manchester United Womens Home Kit Back" class="product-img img-back">
                        </a>
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html?id=newin-8" class="product-title">Manchester United Womens Home Shirt 24/25</a>
                        <p class="product-price">$100.00</p>
                    </div>
                </div>

            </div>
        </div>
    </main>
`;

fs.writeFileSync(path.join(__dirname, 'new-in.html'), header + mainContent + footer, 'utf8');
console.log('Tạo new-in.html tĩnh thành công.');
