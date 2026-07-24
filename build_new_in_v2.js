const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const headerEnd = indexHtml.indexOf('<!-- ==========================================') !== -1 
    ? indexHtml.indexOf('<!-- ==========================================\n         [PHẦN 2] HERO BANNER') 
    : indexHtml.indexOf('<main');
const footerStart = indexHtml.indexOf('<!-- ==========================================\n         [PHẦN 4] NEWSLETTER & FOOTER');

const header = indexHtml.substring(0, headerEnd).replace(/href="new.html"/g, 'href="new-in.html"');
const footer = indexHtml.substring(footerStart);

const homeFront = "https://images.footballfanatics.com/manchester-united/manchester-united-adidas-home-shirt-2024-25_ss5_p-200827282+u-e125l59xksk03ospsf1q+v-uxc4h62vht4e36kffrmf.jpg?_hv=2&w=600";
const homeBack = "https://images.footballfanatics.com/manchester-united/manchester-united-adidas-home-shirt-2024-25_ss5_p-200827282+u-e125l59xksk03ospsf1q+v-5b9rsw6cib9e25sxyldk.jpg?_hv=2&w=600";

const awayFront = "https://images.footballfanatics.com/manchester-united/manchester-united-adidas-away-shirt-2024-25_ss5_p-200827258+u-tt5w6b485nchvokp56i0+v-9159zow11vowgchj6rdj.jpg?_hv=2&w=600";
const awayBack = "https://images.footballfanatics.com/manchester-united/manchester-united-adidas-away-shirt-2024-25_ss5_p-200827258+u-tt5w6b485nchvokp56i0+v-1k04okn3j4t5aeq7gngh.jpg?_hv=2&w=600";

const mainContent = `
    <!-- ==========================================
         [PHẦN MAIN] NEW IN (FULL WIDTH)
         ========================================== -->
    <main class="new-in-page-full">
        <div class="breadcrumb" style="padding: 20px 40px; margin: 0;">
            <a href="index.html">Home</a> &gt; <span>New In</span>
        </div>
        
        <div class="new-in-top-bar" style="padding: 0 40px 30px 40px; display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid var(--color-gray-border); margin-bottom: 40px;">
            <div style="display: flex; align-items: baseline; gap: 15px;">
                <h1 class="category-title" style="margin: 0; font-size: 2.2rem;">NEW IN</h1>
                <span style="color: var(--color-gray-dark); font-size: 1rem; font-weight: bold;">(142 Items)</span>
            </div>
            
            <div class="sort-by-container">
                <label for="sort-by" style="font-weight: bold; margin-right: 10px;">Sort by:</label>
                <select id="sort-by" style="padding: 10px 20px; border: 1px solid var(--color-gray-border); border-radius: 4px; outline: none; cursor: pointer; font-size: 0.95rem; background-color: var(--color-white);">
                    <option value="newest">Newest</option>
                    <option value="price-high">Price High-Low</option>
                    <option value="price-low">Price Low-High</option>
                </select>
            </div>
        </div>

        <div class="category-layout full-width" style="padding: 0 40px; margin-bottom: 60px;">
            <!-- Cột Phải: Product Grid (4 Cột, 8 Sản phẩm) -->
            <div class="category-product-grid grid-4-cols" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;">
                
                <!-- Product 1 (Home) -->
                <div class="product-card">
                    <div class="product-image-container image-swap">
                        <span class="badge-new-product">New</span>
                        <a href="product.html?id=newin-0">
                            <img src="${homeFront}" alt="Manchester United Adidas Home Shirt 2024-25" class="product-img img-front">
                            <img src="${homeBack}" alt="Manchester United Adidas Home Shirt 2024-25 Back" class="product-img img-back">
                        </a>
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html?id=newin-0" class="product-title">Manchester United Adidas Home Shirt 2024-25</a>
                        <p class="product-price">$100.00</p>
                    </div>
                </div>

                <!-- Product 2 (Away) -->
                <div class="product-card">
                    <div class="product-image-container image-swap">
                        <span class="badge-new-product">New</span>
                        <a href="product.html?id=newin-1">
                            <img src="${awayFront}" alt="Manchester United Adidas Away Shirt 2024-25" class="product-img img-front">
                            <img src="${awayBack}" alt="Manchester United Adidas Away Shirt 2024-25 Back" class="product-img img-back">
                        </a>
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html?id=newin-1" class="product-title">Manchester United Adidas Away Shirt 2024-25</a>
                        <p class="product-price">$100.00</p>
                    </div>
                </div>

                <!-- Product 3 (Home Repeat) -->
                <div class="product-card">
                    <div class="product-image-container image-swap">
                        <span class="badge-new-product">New</span>
                        <a href="product.html?id=newin-2">
                            <img src="${homeFront}" alt="Manchester United Adidas Home Shirt 2024-25" class="product-img img-front">
                            <img src="${homeBack}" alt="Manchester United Adidas Home Shirt 2024-25 Back" class="product-img img-back">
                        </a>
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html?id=newin-2" class="product-title">Manchester United Adidas Home Shirt 2024-25 - Womens</a>
                        <p class="product-price">$100.00</p>
                    </div>
                </div>

                <!-- Product 4 (Away Repeat) -->
                <div class="product-card">
                    <div class="product-image-container image-swap">
                        <span class="badge-new-product">New</span>
                        <a href="product.html?id=newin-3">
                            <img src="${awayFront}" alt="Manchester United Adidas Away Shirt 2024-25" class="product-img img-front">
                            <img src="${awayBack}" alt="Manchester United Adidas Away Shirt 2024-25 Back" class="product-img img-back">
                        </a>
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html?id=newin-3" class="product-title">Manchester United Adidas Away Shirt 2024-25 - Womens</a>
                        <p class="product-price">$100.00</p>
                    </div>
                </div>

                <!-- Product 5 (Home Repeat) -->
                <div class="product-card">
                    <div class="product-image-container image-swap">
                        <span class="badge-new-product">New</span>
                        <a href="product.html?id=newin-4">
                            <img src="${homeFront}" alt="Manchester United Adidas Home Shirt 2024-25" class="product-img img-front">
                            <img src="${homeBack}" alt="Manchester United Adidas Home Shirt 2024-25 Back" class="product-img img-back">
                        </a>
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html?id=newin-4" class="product-title">Manchester United Adidas Home Shirt 2024-25 - Kids</a>
                        <p class="product-price">$65.00</p>
                    </div>
                </div>

                <!-- Product 6 (Away Repeat) -->
                <div class="product-card">
                    <div class="product-image-container image-swap">
                        <span class="badge-new-product">New</span>
                        <a href="product.html?id=newin-5">
                            <img src="${awayFront}" alt="Manchester United Adidas Away Shirt 2024-25" class="product-img img-front">
                            <img src="${awayBack}" alt="Manchester United Adidas Away Shirt 2024-25 Back" class="product-img img-back">
                        </a>
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html?id=newin-5" class="product-title">Manchester United Adidas Away Shirt 2024-25 - Kids</a>
                        <p class="product-price">$65.00</p>
                    </div>
                </div>
                
                <!-- Product 7 (Home Repeat) -->
                <div class="product-card">
                    <div class="product-image-container image-swap">
                        <span class="badge-new-product">New</span>
                        <a href="product.html?id=newin-6">
                            <img src="${homeFront}" alt="Manchester United Adidas Home Shirt 2024-25" class="product-img img-front">
                            <img src="${homeBack}" alt="Manchester United Adidas Home Shirt 2024-25 Back" class="product-img img-back">
                        </a>
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html?id=newin-6" class="product-title">Manchester United Adidas Home Shirt 2024-25 - Long Sleeve</a>
                        <p class="product-price">$120.00</p>
                    </div>
                </div>

                <!-- Product 8 (Away Repeat) -->
                <div class="product-card">
                    <div class="product-image-container image-swap">
                        <span class="badge-new-product">New</span>
                        <a href="product.html?id=newin-7">
                            <img src="${awayFront}" alt="Manchester United Adidas Away Shirt 2024-25" class="product-img img-front">
                            <img src="${awayBack}" alt="Manchester United Adidas Away Shirt 2024-25 Back" class="product-img img-back">
                        </a>
                        <button class="quick-view-btn">Quick View</button>
                    </div>
                    <div class="product-info">
                        <a href="product.html?id=newin-7" class="product-title">Manchester United Adidas Away Shirt 2024-25 - Long Sleeve</a>
                        <p class="product-price">$120.00</p>
                    </div>
                </div>

            </div>
        </div>
    </main>
`;

fs.writeFileSync(path.join(__dirname, 'new-in.html'), header + mainContent + footer, 'utf8');
console.log('Tạo new-in.html bản Full-width thành công.');
