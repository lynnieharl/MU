const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));

const newHeaderHtml = `    <!-- ==========================================
         [PHẦN 1] HEADER & MEGA MENU (MỚI)
         ========================================== -->
    <header class="header-wave-bg">
        <div class="top-bar-container">
            <div class="top-bar-left">
                <button class="top-bar-btn"><i class="fa-solid fa-globe"></i> English - US$</button>
            </div>
            <div class="top-bar-right">
                <a href="track-order.html" class="top-bar-link">Track Order</a>
                <a href="help.html" class="top-bar-link">Help</a>
            </div>
        </div>

        <div class="header-main">
            <div class="header-logo">
                <a href="index.html">
                    <span class="logo-text">UNITED</span>
                    <img src="images/0_Manchester_United_FC_crest.svg" alt="Manchester United Logo" class="logo-img">
                    <span class="logo-text">STORE</span>
                </a>
            </div>
            
            <div class="header-search-icons">
                <div class="header-search">
                    <form action="search.html" method="GET" class="search-form">
                        <input type="text" name="query" class="search-input" placeholder="Search for products, players, and more...">
                        <button type="submit" class="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                </div>
                
                <div class="header-icons">
                    <div class="header-icon-dropdown">
                        <a href="login.html" class="header-icon-link">
                            <i class="fa-regular fa-user"></i>
                        </a>
                        <div class="account-menu">
                            <a href="login.html" class="account-menu-link login-btn">Log In</a>
                            <a href="register.html" class="account-menu-link">Create an account</a>
                        </div>
                    </div>
                    <a href="wishlist.html" class="header-icon-link">
                        <i class="fa-regular fa-heart"></i>
                    </a>
                    <a href="cart.html" class="header-icon-link cart-icon-wrapper">
                        <i class="fa-solid fa-bag-shopping"></i>
                        <span class="cart-badge">0</span>
                    </a>
                </div>
            </div>
        </div>

        <nav class="new-mega-nav">
            <ul class="nav-list">
                <li class="nav-item"><a href="new.html" class="nav-link">New In</a></li>
                <li class="nav-item has-mega-menu">
                    <a href="kits.html" class="nav-link">Jerseys <span class="badge-new">New</span></a>
                    <div class="mega-menu-wrapper">
                        <div class="mega-menu-container">
                            <div class="mega-col">
                                <h3>Home</h3>
                                <ul>
                                    <li><a href="mens.html">Men</a></li>
                                    <li><a href="womens.html">Women</a></li>
                                    <li><a href="kids.html">Kids</a></li>
                                    <li><a href="kids.html">Baby & Infant</a></li>
                                </ul>
                            </div>
                            <div class="mega-col">
                                <h3>Away <span class="badge-new">New</span></h3>
                                <ul>
                                    <li><a href="mens.html">Men</a></li>
                                    <li><a href="womens.html">Women</a></li>
                                    <li><a href="kids.html">Kids</a></li>
                                    <li><a href="kids.html">Baby & Infant</a></li>
                                </ul>
                            </div>
                            <div class="mega-col">
                                <h3>Third</h3>
                                <ul>
                                    <li><a href="mens.html">Men</a></li>
                                    <li><a href="womens.html">Women</a></li>
                                    <li><a href="kids.html">Kids</a></li>
                                    <li><a href="kids.html">Baby & Infant</a></li>
                                </ul>
                            </div>
                            <div class="mega-col">
                                <h3>Goalkeeper</h3>
                                <ul>
                                    <li><a href="mens.html">Men</a></li>
                                    <li><a href="womens.html">Women</a></li>
                                    <li><a href="kids.html">Kids</a></li>
                                </ul>
                            </div>
                            <div class="mega-col">
                                <h3>Shop By Player</h3>
                                <ul>
                                    <li><a href="player.html">Men's team</a></li>
                                    <li><a href="player.html">Women's Team</a></li>
                                    <li><a href="player.html">Player Printed Jerseys</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="nav-item"><a href="training.html" class="nav-link">Trainingwear</a></li>
                <li class="nav-item has-mega-menu">
                    <a href="mens.html" class="nav-link">Fashion <span class="badge-new">New</span></a>
                    <div class="mega-menu-wrapper">
                        <div class="mega-menu-container">
                            <div class="mega-col">
                                <h3>Men</h3>
                                <ul>
                                    <li><a href="mens.html">Tops</a></li>
                                    <li><a href="mens.html">Jackets & coats</a></li>
                                    <li><a href="mens.html">Trousers & shorts</a></li>
                                </ul>
                            </div>
                            <div class="mega-col">
                                <h3>Women</h3>
                                <ul>
                                    <li><a href="womens.html">Tops</a></li>
                                    <li><a href="womens.html">Jackets & coats</a></li>
                                    <li><a href="womens.html">Trousers & shorts</a></li>
                                </ul>
                            </div>
                            <div class="mega-col">
                                <h3>Kids</h3>
                                <ul>
                                    <li><a href="kids.html">Tops</a></li>
                                    <li><a href="kids.html">Jacket & Coat</a></li>
                                    <li><a href="kids.html">Trousers & Shorts</a></li>
                                </ul>
                            </div>
                            <div class="mega-col">
                                <h3>Collections</h3>
                                <ul>
                                    <li><a href="training.html">Trainingwear</a></li>
                                    <li><a href="training.html">Pre Match</a></li>
                                    <li><a href="training.html">Anthem Jackets</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="nav-item has-mega-menu">
                    <a href="souvenirs.html" class="nav-link">Accessories</a>
                    <div class="mega-menu-wrapper">
                        <div class="mega-menu-container">
                            <div class="mega-col">
                                <h3>Accessories</h3>
                                <ul>
                                    <li><a href="souvenirs.html">Headwear</a></li>
                                    <li><a href="souvenirs.html">Watches</a></li>
                                    <li><a href="souvenirs.html">Keyrings</a></li>
                                </ul>
                            </div>
                            <div class="mega-col">
                                <h3>Souvenirs</h3>
                                <ul>
                                    <li><a href="souvenirs.html">Flags & Pennants</a></li>
                                    <li><a href="souvenirs.html">Badges & Pins</a></li>
                                    <li><a href="souvenirs.html">Mugs & Glasses</a></li>
                                </ul>
                            </div>
                            <div class="mega-col">
                                <h3>Homeware</h3>
                                <ul>
                                    <li><a href="souvenirs.html">Bedroom</a></li>
                                    <li><a href="souvenirs.html">Bathroom</a></li>
                                    <li><a href="souvenirs.html">Kitchen</a></li>
                                </ul>
                            </div>
                            <div class="mega-col">
                                <h3>Kids</h3>
                                <ul>
                                    <li><a href="kids.html">Toys & Games</a></li>
                                    <li><a href="kids.html">School Supplies</a></li>
                                    <li><a href="kids.html">Soft Toys</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="nav-item has-mega-menu">
                    <a href="gifts.html" class="nav-link">Gifts</a>
                    <div class="mega-menu-wrapper">
                        <div class="mega-menu-container">
                            <div class="mega-col">
                                <h3>By Recipient</h3>
                                <ul>
                                    <li><a href="gifts.html">Gifts for Him</a></li>
                                    <li><a href="gifts.html">Gifts for Her</a></li>
                                    <li><a href="gifts.html">Gifts for Kids</a></li>
                                </ul>
                            </div>
                            <div class="mega-col">
                                <h3>Accessories</h3>
                                <ul>
                                    <li><a href="gifts.html">Wallets</a></li>
                                    <li><a href="gifts.html">Bags</a></li>
                                    <li><a href="gifts.html">Scarves</a></li>
                                </ul>
                            </div>
                            <div class="mega-col">
                                <h3>By Price</h3>
                                <ul>
                                    <li><a href="gifts.html">Under $25</a></li>
                                    <li><a href="gifts.html">Under $50</a></li>
                                    <li><a href="gifts.html">Under $100</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="nav-item"><a href="auctions.html" class="nav-link">Auctions</a></li>
                <li class="nav-item"><a href="sale.html" class="nav-link" style="color: #ffb3b3;">Outlet</a></li>
            </ul>
        </nav>
    </header>`;

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // Tìm vị trí bắt đầu của Header cũ
    const headerStartIdx = html.indexOf('<!-- ==========================================\n         [PHẦN 1] HEADER');
    let promoIdx = html.indexOf('<!-- ==========================================\n         [PHẦN 1] PROMO BAR');
    
    // Fallback if promo bar isn't found
    if (promoIdx === -1) {
        promoIdx = html.indexOf('<!-- ==========================================\n         [PHẦN MAIN]');
    }
    if (promoIdx === -1) {
        promoIdx = html.indexOf('<main');
    }
    
    // Nếu có header và promo bar, thay thế
    if (headerStartIdx !== -1 && promoIdx !== -1) {
        const beforeHeader = html.substring(0, headerStartIdx);
        // Sometimes promo bar might be missing or commented out differently.
        const afterHeader = html.substring(promoIdx);
        html = beforeHeader + newHeaderHtml + "\n\n    " + afterHeader;
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Updated header in ${file}`);
    } else {
        // Fallback for top-bar if the structure is different
        const topBarIdx = html.indexOf('<div class="top-bar">');
        if (topBarIdx !== -1 && promoIdx !== -1) {
            const beforeHeader = html.substring(0, topBarIdx);
            const afterHeader = html.substring(promoIdx);
            html = beforeHeader + newHeaderHtml + "\n\n    " + afterHeader;
            fs.writeFileSync(filePath, html, 'utf8');
            console.log(`Updated header in ${file}`);
        }
    }
});
