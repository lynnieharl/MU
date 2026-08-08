// Highlight active nav link
document.addEventListener('DOMContentLoaded', () => {
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
                        let priceVal = parseFloat(pd.price) || 0;
                        const priceFormatted = '₫' + new Intl.NumberFormat('en-US').format(priceVal);

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
      container.innerHTML = `
        <div style="width: 100%; text-align: center; padding: 50px; color: #888; grid-column: 1 / -1; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.1);">
            <i class="fa-solid fa-box-open" style="font-size: 48px; margin-bottom: 15px; color: #444;"></i>
            <h3 style="color: #444; font-size: 20px; margin-bottom: 8px;" data-i18n="no-products">No products in this category.</h3>
        </div>
      `;
      return;
    }
    
    window.rawCategoryProducts = productsList;
    
    window.renderSortedProducts = function(products) {
      if (!container || !products) return;
      container.innerHTML = products.map(item => {
        let rawPrice = parseFloat(item.price) || 0;
        let formattedPrice = '₫' + new Intl.NumberFormat('en-US').format(rawPrice);
          
        return `<div class="store-card-item" onclick="location.href='product.html?id=${item.id}'"> 
          <div class="store-card-img-wrap"> 
            <img src="${item.image_url || item.image || 'https://via.placeholder.com/300x375'}" alt="${item.name}"> 
            <button class="store-card-wishlist" onclick="event.stopPropagation();"> 
              <i class="fa-regular fa-heart"></i>
            </button> 
            <div class="badge-container">
              <span class="official-badge-new">New</span>
            </div>
          </div> 
          <div class="store-card-info" style="padding-top: 12px; gap: 6px;"> 
            <p class="card-price" style="font-weight: 700 !important; color: #000 !important; margin: 0 !important; font-size: 14px !important;">${formattedPrice}</p>
            <h3 class="card-title" style="color: #767677 !important; font-size: 13px !important; font-weight: 400 !important; margin: 0 !important; line-height: 1.4 !important;">${item.name || 'Manchester United Jersey'}</h3> 
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
    if (typeof translatePage === 'function') translatePage(localStorage.getItem('preferredLang') || 'en');

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
    container.innerHTML = `<p style="text-align: center; width: 100%; color: #888;" data-i18n="load-error">Unable to load products.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', loadProducts);
window.addEventListener('load', loadProducts);

/* USER PROFILE DROPDOWN MENU INITIALIZER has been migrated to auth-modal.js */