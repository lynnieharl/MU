
// Highlight active nav link
document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // HERO CAROUSEL LOGIC
    // ==========================================
    const heroTrack = document.getElementById("hero-track");
    if (heroTrack) {
        const prevHeroBtn = document.getElementById("hero-prev");
        const nextHeroBtn = document.getElementById("hero-next");
        const dots = document.querySelectorAll(".hero-dot");
        let autoPlayInterval;
        let currentHeroIndex = 0;
        const totalHeroSlides = dots.length;
        
        const updateHeroDots = (index) => {
            dots.forEach(dot => dot.classList.remove("active"));
            if (dots[index]) dots[index].classList.add("active");
            currentHeroIndex = index;
        };

        const scrollHeroTo = (index) => {
            const slideWidth = heroTrack.offsetWidth;
            heroTrack.style.scrollBehavior = "smooth";
            heroTrack.scrollLeft = slideWidth * index;
        };

        const nextHeroSlide = () => {
            let nextIndex = currentHeroIndex + 1;
            if (nextIndex >= totalHeroSlides) nextIndex = 0;
            scrollHeroTo(nextIndex);
        };

        const prevHeroSlide = () => {
            let prevIndex = currentHeroIndex - 1;
            if (prevIndex < 0) prevIndex = totalHeroSlides - 1;
            scrollHeroTo(prevIndex);
        };

        // Auto-play setup
        const startHeroAutoPlay = () => {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextHeroSlide, 5000);
        };

        const stopHeroAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };

        startHeroAutoPlay();

        document.getElementById("hero-carousel").addEventListener("mouseenter", stopHeroAutoPlay);
        document.getElementById("hero-carousel").addEventListener("mouseleave", startHeroAutoPlay);

        if (prevHeroBtn) prevHeroBtn.addEventListener("click", prevHeroSlide);
        if (nextHeroBtn) nextHeroBtn.addEventListener("click", nextHeroSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => scrollHeroTo(index));
        });

        // Sync dots on scroll
        heroTrack.addEventListener("scroll", () => {
            const slideWidth = heroTrack.offsetWidth;
            const scrollPos = heroTrack.scrollLeft;
            const activeIndex = Math.round(scrollPos / slideWidth);
            if (activeIndex !== currentHeroIndex) {
                updateHeroDots(activeIndex);
            }
        });

        // Mouse Drag to Scroll for Hero
        let isHeroDown = false;
        let startHeroX;
        let scrollHeroLeft;

        heroTrack.addEventListener("mousedown", (e) => {
            isHeroDown = true;
            heroTrack.classList.add("active");
            heroTrack.style.scrollSnapType = "none"; // Disable snap
            startHeroX = e.pageX - heroTrack.offsetLeft;
            scrollHeroLeft = heroTrack.scrollLeft;
            stopHeroAutoPlay();
        });
        
        heroTrack.addEventListener("mouseleave", () => {
            isHeroDown = false;
            heroTrack.classList.remove("active");
            heroTrack.style.scrollSnapType = "x mandatory";
            startHeroAutoPlay();
        });
        
        heroTrack.addEventListener("mouseup", () => {
            isHeroDown = false;
            heroTrack.classList.remove("active");
            heroTrack.style.scrollSnapType = "x mandatory";
            startHeroAutoPlay();
        });
        
        heroTrack.addEventListener("mousemove", (e) => {
            if (!isHeroDown) return;
            e.preventDefault();
            const x = e.pageX - heroTrack.offsetLeft;
            const walk = (x - startHeroX) * 1.5; // Drag speed
            heroTrack.scrollLeft = scrollHeroLeft - walk;
        });
    }


    const currentPath = window.location.pathname.split('/').pop();
    if (currentPath === 'jerseys.html') {
        const jerseysLink = document.querySelector('a[href="jerseys.html"].nav-link');
        if (jerseysLink) {
            jerseysLink.classList.add('active');
            jerseysLink.style.color = '#d31145'; // Optional red color indicator
            jerseysLink.style.borderBottom = '2px solid #d31145';
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // TRENDING NOW CAROUSEL LOGIC
    // ==========================================
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.getElementById('trending-prev');
    const nextBtn = document.getElementById('trending-next');
    
    if (track) {
        // Button Click Scroll
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                track.scrollBy({ left: -300, behavior: 'smooth' });
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                track.scrollBy({ left: 300, behavior: 'smooth' });
            });
        }

        // Mouse Drag to Scroll with Momentum & Click Prevention
        let isDown = false;
        let startX;
        let scrollLeft;
        let velX = 0;
        let momentumID;

        const beginMomentumTracking = () => {
            cancelAnimationFrame(momentumID);
            momentumID = requestAnimationFrame(momentumLoop);
        };

        const momentumLoop = () => {
            if (!isDown) {
                track.scrollLeft += velX;
                velX *= 0.95; // Friction
                if (Math.abs(velX) > 0.5) {
                    momentumID = requestAnimationFrame(momentumLoop);
                } else {
                    track.style.scrollSnapType = 'x mandatory'; // Restore snap
                }
            }
        };

        track.addEventListener('mousedown', (e) => {
            isDown = true;
            track.classList.add('active');
            track.style.scrollSnapType = 'none'; // Disable snap during drag
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
            cancelAnimationFrame(momentumID);
            velX = 0;
        });

        track.addEventListener('mouseleave', () => {
            if (!isDown) return;
            isDown = false;
            track.classList.remove('active');
            beginMomentumTracking();
        });

        track.addEventListener('mouseup', () => {
            isDown = false;
            track.classList.remove('active');
            beginMomentumTracking();
            // Restore clicks after a short delay
            setTimeout(() => {
                track.querySelectorAll('.store-card-item').forEach(card => {
                    card.style.pointerEvents = 'auto';
                });
            }, 50);
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            
            // Prevent clicks on cards while dragging
            track.querySelectorAll('.store-card-item').forEach(card => {
                card.style.pointerEvents = 'none';
            });
            
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            const prevScrollLeft = track.scrollLeft;
            track.scrollLeft = scrollLeft - walk;
            velX = track.scrollLeft - prevScrollLeft;
        });
    }

    // ==========================================
    // PRODUCT DETAIL PAGE (PDP) LOGIC
    // ==========================================
    // 1. Thumbnail Image Switcher
    const thumbnails = document.querySelectorAll('.thumb-img');
    const mainImg = document.querySelector('.main-product-img');

    if (thumbnails.length > 0 && mainImg) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Xóa active class của tất cả
                thumbnails.forEach(t => t.classList.remove('active'));
                // Thêm active class cho ảnh được click
                this.classList.add('active');
                // Đổi src ảnh to
                mainImg.src = this.src;
            });
        });
    }

    // 2. Quantity Selector
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    const qtyInput = document.querySelector('.qty-input');

    if (minusBtn && plusBtn && qtyInput) {
        minusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            if (val > 1) {
                qtyInput.value = val - 1;
            }
        });
        
        plusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            if (val < 99) {
                qtyInput.value = val + 1;
            }
        });
    }
    
    // 3. Size Selector
    const sizeBtns = document.querySelectorAll('.size-btn');
    if (sizeBtns.length > 0) {
        sizeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                sizeBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // 4. Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    if (accordionHeaders.length > 0) {
        // Mở sẵn tab đầu tiên
        accordionHeaders[0].parentElement.classList.add('active');
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const item = this.parentElement;
                
                // Toggle trạng thái của tab hiện tại
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                } else {
                    // Tùy chọn: Đóng các tab khác
                    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                }
            });
        });
    }

    // 5. Dynamic Product Loading
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (document.querySelector('.product-page')) {
        if (!productId) {
            // Redirect to home if no ID is present
            window.location.href = 'index.html';
        } else {
            document.querySelector('.product-title-large').innerText = 'Đang tải thông tin sản phẩm...';
            
            const loadProductDetails = async () => {
                try {
                    if (!window.supabaseClient && window.supabase) {
                        console.warn("supabaseClient not found globally, please ensure it's initialized.");
                    }

                    if (window.supabaseClient) {
                        const { data: pd, error } = await window.supabaseClient
                            .from('products')
                            .select('*')
                            .eq('id', productId)
                            .single();
                        
                        if (error || !pd) {
                            console.error('Không tìm thấy sản phẩm này!');
                            window.location.href = 'index.html';
                            return;
                        }

                        const imgUrl = pd.image_url || 'https://images.unsplash.com/photo-1577003833758-c0b93e8784ac?auto=format&fit=crop&w=400&q=80';
                        const priceFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(pd.price || 0);

                        // Cập nhật tên và giá
                        document.querySelector('.product-title-large').innerText = pd.name;
                        document.querySelector('.product-price-large').innerText = priceFormatted;
                        
                        // Cập nhật ảnh chính
                        document.querySelector('.main-product-img').src = imgUrl;
                        
                        // Cập nhật các ảnh thumbnail
                        const thumbs = document.querySelectorAll('.thumb-img');
                        if(thumbs.length > 0) {
                            thumbs.forEach(t => t.src = imgUrl);
                        }
                        
                        // Cập nhật Breadcrumb (Home > Category > Product Name)
                        const breadcrumb = document.querySelector('.breadcrumb');
                        if(breadcrumb) {
                            const cat = pd.category || 'Accessories';
                            breadcrumb.innerHTML = `<a href="index.html">Home</a> &gt; <a href="category.html?type=${cat}">${cat}</a> &gt; <span>${pd.name}</span>`;
                        }

                        // Cập nhật Description
                        const descContainer = document.querySelector('.product-description');
                        if (descContainer) {
                            if (pd.description && pd.description.trim() !== '') {
                                descContainer.innerHTML = `<h3>Description</h3><p style="white-space: pre-wrap;">${pd.description}</p>`;
                            } else {
                                descContainer.innerHTML = `<h3>Description</h3><p>Đang cập nhật thông tin mô tả cho sản phẩm này.</p>`;
                            }
                        }
                    } else {
                        
                    }
                } catch (err) {
                    console.error('Lỗi tải sản phẩm:', err);
                    document.querySelector('.product-title-large').innerText = 'Lỗi tải sản phẩm';
                }
            };

            // Delay slightly to ensure Supabase client is initialized from inline scripts
            setTimeout(loadProductDetails, 300);
        }
    }

    // ==========================================
    // CART PAGE LOGIC
    // ==========================================
    const cartQtyMinus = document.querySelectorAll('.cart-qty .qty-btn.minus');
    const cartQtyPlus = document.querySelectorAll('.cart-qty .qty-btn.plus');

    cartQtyMinus.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.nextElementSibling;
            let val = parseInt(input.value);
            if (val > 1) {
                input.value = val - 1;
                // Có thể thêm hàm tính lại Total ở đây
            }
        });
    });

    cartQtyPlus.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            let val = parseInt(input.value);
            if (val < 99) {
                input.value = val + 1;
                // Có thể thêm hàm tính lại Total ở đây
            }
        });
    });

    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Xóa phần tử cart-item khỏi DOM
            const item = this.closest('.cart-item');
            if (item) {
                item.remove();
                // Có thể thêm hàm tính lại Total ở đây
            }
        });
    });

    // ==========================================
    // GLOBAL NEWSLETTER FORM LOGIC
    // ==========================================
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Cảm ơn bạn đã đăng ký bản tin!');
            this.reset();
        });
    });
});



// Cấp cứu: Debug Load Products
async function loadProducts() {
  const container = document.getElementById('product-list') || 
                    document.querySelector('.products-grid') || 
                    document.getElementById('trending-products') ||
                    document.getElementById('cat-product-grid') ||
                    document.getElementById('products-container') ||
                    document.getElementById('real-products-track');
  if (!container) return;

  // Cơ chế Polling: Đợi tối đa 5 giây cho SDK Supabase tải xong nếu mạng chậm
  let retries = 0;
  while ((!window.supabaseClient || !window.supabase) && retries < 10) {
    if (window.supabase && window.supabase.createClient && !window.supabaseClient) {
      if (typeof initSupabase === 'function') {
        initSupabase();
      } else {
        window.supabaseClient = window.supabase.createClient('https://suabbqtrggzwgchksenq.supabase.co', 'sb_publishable_E711W3fBxwZeRVYH3TOBAA_ZNoe_wps');
      }
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    retries++;
  }

  if (!window.supabaseClient) {
    container.innerHTML = `<div style="text-align: center; color: #da020e; padding: 40px; grid-column: 1/-1;"> Unable to connect to product server. Please refresh the page. </div>`;
    return;
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat') || urlParams.get('category');
    const subParam = urlParams.get('sub') || urlParams.get('subcategory');

    let query = window.supabaseClient.from('products').select('*');
    const isJerseysPage = window.location.pathname.includes('jerseys.html');
    
    if (isJerseysPage && !catParam && !subParam) {
        query = query.in('category', ['Home', 'Away', 'Third', 'Goalkeeper']);
    } else {
        if (catParam) {
            query = query.ilike('category', catParam);
        }
    }

    if (subParam) {
      query = query.ilike('subcategory', subParam);
    }

    const breadcrumb = document.getElementById('cat-breadcrumb');
    const pageTitle = document.getElementById('cat-page-title');
    if (breadcrumb || pageTitle) {
      let displayTitle = 'All Products';
      if (catParam && subParam) {
        displayTitle = `${catParam} - ${subParam}`;
      } else if (catParam || subParam) {
        displayTitle = catParam || subParam;
      }
      
      if (breadcrumb) breadcrumb.innerText = displayTitle;
      if (pageTitle) pageTitle.innerText = (!catParam && !subParam) ? 'ALL PRODUCTS' : 'CATEGORY: ' + displayTitle.toUpperCase();
      document.title = displayTitle + ' - Manchester United Official Store';
    }

    const { data, error } = await query;

    if (error) {
      console.error("Lỗi lấy sản phẩm:", error);
      container.innerHTML = `<p style="text-align: center; width: 100%; color: #888;">Unable to load products (${error.message}).</p>`;
      return;
    }
    
    let productsList = data;
    if (!productsList || productsList.length === 0) {
      // Fallback mock data if DB returns 0 rows
      productsList = [
        { id: 101, name: 'Manchester United 24/25 Home Shirt - Men', price: 110, category: 'Home', image_url: 'https://images.unsplash.com/photo-1577003833758-c0b93e8784ac?auto=format&fit=crop&w=400&q=80' },
        { id: 102, name: 'Manchester United 24/25 Away Shirt - Men', price: 110, category: 'Away', image_url: 'https://images.unsplash.com/photo-1577003833758-c0b93e8784ac?auto=format&fit=crop&w=400&q=80' },
        { id: 103, name: 'Manchester United 24/25 Third Shirt - Men', price: 110, category: 'Third', image_url: 'https://images.unsplash.com/photo-1577003833758-c0b93e8784ac?auto=format&fit=crop&w=400&q=80' },
        { id: 104, name: 'Manchester United Training Jersey 24/25', price: 75, category: 'Training', image_url: 'https://images.unsplash.com/photo-1577003833758-c0b93e8784ac?auto=format&fit=crop&w=400&q=80' },
        { id: 105, name: 'Manchester United Essential Hoodie', price: 90, category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1577003833758-c0b93e8784ac?auto=format&fit=crop&w=400&q=80' },
        { id: 106, name: 'Manchester United Official Crest Cap', price: 30, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1577003833758-c0b93e8784ac?auto=format&fit=crop&w=400&q=80' }
      ];
    }
    
    window.rawCategoryProducts = productsList;
    
    window.renderSortedProducts = function(products) {
      if (!container || !products) return;
      container.innerHTML = products.map(item => {
        let rawPrice = parseFloat(item.price) || 0;
        let formattedPrice = '';
        if (rawPrice > 100000) {
          let usd = (rawPrice / 25000).toFixed(2);
          if (parseFloat(usd) > 300) usd = '110.00';
          formattedPrice = '$' + usd;
        } else if (rawPrice > 0) {
          formattedPrice = '$' + rawPrice.toFixed(2);
        } else {
          formattedPrice = '$110.00';
        }
          
        return `<div class="store-card-item" onclick="location.href='product.html?id=${item.id}'"> 
          <div class="store-card-img-wrap"> 
            <img src="${item.image_url || item.image || 'https://via.placeholder.com/300x375'}" alt="${item.name}"> 
            <button class="store-card-wishlist" onclick="event.stopPropagation();"> 
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2"> 
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path> 
              </svg> 
            </button> 
            <span class="store-card-badge-new">New</span> 
          </div> 
          <div class="store-card-info"> 
            <div class="card-price">${formattedPrice}</div> 
            <h3 class="card-title">${item.name || 'Manchester United Jersey'}</h3> 
          </div> 
        </div>`;
      }).join('');
    };

    window.sortAndRenderCategoryProducts = function(sortValue) {
      if (!window.rawCategoryProducts) return;
      let list = [...window.rawCategoryProducts];

      if (sortValue === 'price-asc') {
        list.sort((a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0));
      } else if (sortValue === 'price-desc') {
        list.sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0));
      } else if (sortValue === 'name-asc' || sortValue === 'a-z') {
        list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      } else if (sortValue === 'name-desc' || sortValue === 'z-a') {
        list.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
      } else {
        list.sort((a, b) => (b.id || 0) - (a.id || 0));
      }

      window.renderSortedProducts(list);
    };

    // Initial Render
    window.renderSortedProducts(productsList);

    const sortSelect = document.getElementById('sort-select') || document.getElementById('sort-by');
    if (sortSelect && !sortSelect.hasAttribute('data-sort-bound')) {
      sortSelect.setAttribute('data-sort-bound', 'true');
      sortSelect.addEventListener('change', function(e) {
        window.sortAndRenderCategoryProducts(e.target.value);
      });
    }

    const countText = document.getElementById('jerseys-count-text');
    const pillCount = document.getElementById('total-count-pill');
    if (countText) countText.innerText = productsList.length + ' products';
    if (pillCount && !catParam && !subParam) pillCount.innerText = productsList.length;
  } catch (err) {
    console.error("Crash JS:", err);
    container.innerHTML = `<p style="text-align: center; width: 100%; color: #888;">Unable to load products (${err.message}).</p>`;
  }
}

document.addEventListener('DOMContentLoaded', loadProducts);
window.addEventListener('load', loadProducts);

/* =========================================
   USER PROFILE DROPDOWN MENU INITIALIZER
   ========================================= */
function setupGlobalUserDropdown() {
  const accountBtn = document.getElementById('user-account-btn') || 
                     document.querySelector('.user-account-btn') ||
                     document.getElementById('account-link');
  if (!accountBtn) return;

  accountBtn.style.position = 'relative';

  let dropdown = document.getElementById('user-profile-dropdown');
  if (!dropdown) {
    dropdown = document.createElement('div');
    dropdown.id = 'user-profile-dropdown';
    dropdown.className = 'user-dropdown-menu';
    dropdown.innerHTML = `
      <div class="user-dropdown-header">
        <div class="dropdown-user-avatar">
          <img src="https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg" alt="User Avatar">
        </div>
        <div class="dropdown-user-info">
          <span class="user-name">Admin Account</span>
          <span class="user-role">Administrator</span>
        </div>
      </div>
      <div class="user-dropdown-divider"></div>
      <ul class="user-dropdown-links">
        <li>
          <a href="admin-crm.html">
            <i class="fas fa-chart-line"></i>
            <span>Admin CRM Dashboard</span>
          </a>
        </li>
        <li>
          <a href="manage-products.html">
            <i class="fas fa-boxes-stacked"></i>
            <span>Manage Products</span>
          </a>
        </li>
        <li>
          <a href="orders.html">
            <i class="fas fa-shopping-bag"></i>
            <span>My Orders</span>
          </a>
        </li>
        <li>
          <a href="account.html">
            <i class="fas fa-user-gear"></i>
            <span>Account Settings</span>
          </a>
        </li>
        <li class="dropdown-logout-item">
          <a href="#" id="dropdown-logout-btn">
            <i class="fas fa-arrow-right-from-bracket"></i>
            <span>Log Out</span>
          </a>
        </li>
      </ul>
    `;
    accountBtn.appendChild(dropdown);
  }

  // Handle click on user profile icon
  accountBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    // Check if user is logged in
    const storedUser = localStorage.getItem('currentUser') || 
                       localStorage.getItem('vanilla_store_user') || 
                       localStorage.getItem('user');

    if (!storedUser) {
      // GUEST: Open Login / Register Modal or redirect to login.html
      if (typeof window.openAuthModal === 'function') {
        window.openAuthModal();
      } else {
        const modal = document.getElementById('authModal') || document.getElementById('auth-modal');
        if (modal) {
          modal.classList.add('active', 'show');
          modal.style.display = 'flex';
          modal.style.zIndex = '999999';
        } else {
          window.location.href = 'login.html';
        }
      }
    } else {
      // LOGGED IN: Toggle Dropdown Menu
      dropdown.classList.toggle('active');
    }
  });

  // Handle logout
  const logoutBtn = document.getElementById('dropdown-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = 'index.html';
    });
  }

  // Close dropdown on click outside
  document.addEventListener('click', function(e) {
    if (!accountBtn.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupGlobalUserDropdown);
} else {
  setupGlobalUserDropdown();
}