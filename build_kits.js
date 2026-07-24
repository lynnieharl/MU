const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Phân tích cắt header và footer
const headerEnd = indexHtml.indexOf('<!-- ==========================================') !== -1 
    ? indexHtml.indexOf('<!-- ==========================================\n         [PHẦN 2] HERO BANNER') 
    : indexHtml.indexOf('<main');

const footerStart = indexHtml.indexOf('<!-- ==========================================\n         [PHẦN 4] NEWSLETTER & FOOTER');

const header = indexHtml.substring(0, headerEnd);
const footer = indexHtml.substring(footerStart);

const mainContent = `
    <!-- ==========================================
         [PHẦN MAIN] MENS KITS CATEGORY
         ========================================== -->
    <main class="category-page">
        <!-- Breadcrumb -->
        <div class="breadcrumb">
            <a href="index.html">Home</a> &gt; <a href="kits.html">Kits</a> &gt; <span>Mens</span>
        </div>
        
        <div class="category-header">
            <h1 class="category-title">MENS KITS</h1>
        </div>

        <div class="category-layout">
            <!-- Cột Trái: Sidebar Filter (25%) -->
            <aside class="sidebar-filter">
                <div class="filter-group">
                    <h3 class="filter-title">Gender</h3>
                    <ul class="filter-list">
                        <li><label><input type="checkbox" name="gender" value="mens" checked> Mens</label></li>
                        <li><label><input type="checkbox" name="gender" value="womens"> Womens</label></li>
                        <li><label><input type="checkbox" name="gender" value="kids"> Kids</label></li>
                    </ul>
                </div>
                
                <div class="filter-group">
                    <h3 class="filter-title">Size</h3>
                    <ul class="filter-list">
                        <li><label><input type="checkbox" name="size" value="s"> S</label></li>
                        <li><label><input type="checkbox" name="size" value="m"> M</label></li>
                        <li><label><input type="checkbox" name="size" value="l"> L</label></li>
                        <li><label><input type="checkbox" name="size" value="xl"> XL</label></li>
                        <li><label><input type="checkbox" name="size" value="xxl"> XXL</label></li>
                    </ul>
                </div>
                
                <div class="filter-group">
                    <h3 class="filter-title">Price</h3>
                    <ul class="filter-list">
                        <li><label><input type="checkbox" name="price" value="under-50"> Under $50</label></li>
                        <li><label><input type="checkbox" name="price" value="50-100"> $50 - $100</label></li>
                        <li><label><input type="checkbox" name="price" value="over-100"> Over $100</label></li>
                    </ul>
                </div>
            </aside>

            <!-- Cột Phải: Product Grid (75%) -->
            <section class="category-product-grid">
                <!-- Sản phẩm 1: Home Shirt -->
                <div class="product-card">
                    <div class="product-image-container">
                        <img src="images/4_c836596765f00ea79c068d00ff3c4e05.jpg" class="product-img" alt="Manchester United Home Shirt 24/25">
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html" class="product-title">Mens Manchester United Home Authentic Shirt 24/25</a>
                        <p class="product-price">$90.00</p>
                    </div>
                </div>

                <!-- Sản phẩm 2: Away Shirt -->
                <div class="product-card">
                    <div class="product-image-container">
                        <div class="product-badges"><span class="badge badge-sale">Sale</span></div>
                        <img src="images/5_b42223866496c6fac690a48a9b121da5.jpg" class="product-img" alt="Manchester United Away Shirt 24/25">
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html" class="product-title">Mens Manchester United Away Shirt 24/25</a>
                        <p class="product-price">$75.00</p>
                    </div>
                </div>

                <!-- Sản phẩm 3: Third Kit -->
                <div class="product-card">
                    <div class="product-image-container">
                        <div class="product-badges"><span class="badge badge-exclusive">Exclusive</span></div>
                        <img src="images/10_557b882a41d5bc6a7934615bbc14b842.jpg" class="product-img" alt="Manchester United Third Shirt 24/25">
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html" class="product-title">Mens Manchester United Third Shirt 24/25</a>
                        <p class="product-price">$90.00</p>
                    </div>
                </div>

                <!-- Sản phẩm 4: Goalkeeper Shirt -->
                <div class="product-card">
                    <div class="product-image-container">
                        <img src="https://mufc-live.cdn.scayle.cloud/images/b08cc3092b199551aacc2528c7b4c45b.jpg" class="product-img" alt="Manchester United Goalkeeper Shirt">
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html" class="product-title">Mens Manchester United Goalkeeper Shirt 24/25</a>
                        <p class="product-price">$95.00</p>
                    </div>
                </div>

                <!-- Sản phẩm 5: Training Top -->
                <div class="product-card">
                    <div class="product-image-container">
                        <img src="images/6_2ed2651297cac6ec9750f6581a0940e2.jpg" class="product-img" alt="Manchester United Training Top">
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html" class="product-title">Mens Manchester United Training Top 24/25</a>
                        <p class="product-price">$65.00</p>
                    </div>
                </div>

                <!-- Sản phẩm 6: Anthem Jacket -->
                <div class="product-card">
                    <div class="product-image-container">
                        <img src="images/7_066d2c004e6666a7d1316d9eb103a421.jpg" class="product-img" alt="Manchester United Anthem Jacket">
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html" class="product-title">Mens Manchester United Anthem Jacket 24/25</a>
                        <p class="product-price">$110.00</p>
                    </div>
                </div>
            </section>
        </div>
    </main>

`;

fs.writeFileSync(path.join(__dirname, 'kits.html'), header + mainContent + footer, 'utf8');
console.log('Tạo kits.html thành công.');
