const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const headerEnd = indexHtml.indexOf('<!-- ==========================================') !== -1 
    ? indexHtml.indexOf('<!-- ==========================================\n         [PHẦN 2] HERO BANNER') 
    : indexHtml.indexOf('<main');
const footerStart = indexHtml.indexOf('<!-- ==========================================\n         [PHẦN 4] NEWSLETTER & FOOTER');

const header = indexHtml.substring(0, headerEnd);
const footer = indexHtml.substring(footerStart);

const mainContent = `
    <!-- ==========================================
         [PHẦN MAIN] PRODUCT DETAIL PAGE
         ========================================== -->
    <main class="product-page">
        <div class="breadcrumb">
            <a href="index.html">Home</a> &gt; <a href="kits.html">Kits</a> &gt; <a href="kits.html">Mens</a> &gt; <span>Home Authentic Shirt 24/25</span>
        </div>

        <div class="product-container">
            <!-- Cột Trái: Ảnh sản phẩm (60%) -->
            <div class="product-gallery">
                <div class="thumbnail-list">
                    <img src="images/4_c836596765f00ea79c068d00ff3c4e05.jpg" alt="Thumb 1" class="thumb-img active">
                    <img src="images/4_c836596765f00ea79c068d00ff3c4e05.jpg" alt="Thumb 2" class="thumb-img">
                    <img src="images/4_c836596765f00ea79c068d00ff3c4e05.jpg" alt="Thumb 3" class="thumb-img">
                </div>
                <div class="main-image-container">
                    <img src="images/4_c836596765f00ea79c068d00ff3c4e05.jpg" alt="Manchester United Home Shirt 24/25" class="main-product-img">
                </div>
            </div>

            <!-- Cột Phải: Thông tin sản phẩm (40%) -->
            <div class="product-details">
                <div class="product-badges">
                    <span class="badge badge-sale">Top Seller</span>
                </div>
                
                <h1 class="product-title-large">Mens Manchester United Home Authentic Shirt 24/25</h1>
                <p class="product-price-large">$90.00</p>

                <div class="product-options">
                    <!-- Size Selector -->
                    <div class="option-group">
                        <div class="option-header">
                            <span class="option-title">Select Size</span>
                            <a href="#" class="size-guide-link">Size Guide</a>
                        </div>
                        <div class="size-selector">
                            <button class="size-btn">S</button>
                            <button class="size-btn">M</button>
                            <button class="size-btn active">L</button>
                            <button class="size-btn">XL</button>
                            <button class="size-btn">XXL</button>
                        </div>
                    </div>

                    <!-- Personalisation -->
                    <div class="option-group personalisation-group">
                        <span class="option-title">Add Personalisation (Optional)</span>
                        <div class="personalisation-inputs">
                            <input type="text" placeholder="Name (e.g. BRUNO)" class="pers-input" maxlength="12">
                            <input type="number" placeholder="No." class="pers-input num-input" min="1" max="99">
                        </div>
                    </div>

                    <!-- Quantity & Add to Cart -->
                    <div class="action-group">
                        <div class="qty-selector">
                            <button class="qty-btn minus">-</button>
                            <input type="text" value="1" class="qty-input" readonly>
                            <button class="qty-btn plus">+</button>
                        </div>
                        <button class="add-to-cart-btn"><i class="fa-solid fa-bag-shopping"></i> ADD TO CART</button>
                    </div>
                </div>

                <!-- Product Description -->
                <div class="product-description">
                    <h3>Description</h3>
                    <p>Designed for the fans, this Manchester United home shirt keeps you comfortable with sweat-wicking AEROREADY and mesh panels. A woven club badge stands out on the chest, displaying your loyalty for all to see.</p>
                    <ul>
                        <li>Regular fit</li>
                        <li>Ribbed crewneck</li>
                        <li>100% recycled polyester</li>
                        <li>AEROREADY technology</li>
                    </ul>
                </div>
            </div>
        </div>
    </main>

`;

fs.writeFileSync(path.join(__dirname, 'product.html'), header + mainContent + footer, 'utf8');
console.log('Tạo product.html thành công.');
