document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // TRENDING NOW CAROUSEL LOGIC
    // ==========================================
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.getElementById('trending-prev');
    const nextBtn = document.getElementById('trending-next');
    
    if (track && prevBtn && nextBtn) {
        // Trong trường hợp này có 4 sản phẩm, đang hiển thị 4 cột
        // Nếu muốn hiệu ứng trượt mượt mà khi có nhiều sản phẩm hơn,
        // chúng ta sẽ tính toán width và dịch chuyển.
        
        let currentIndex = 0;
        
        // Mặc định hiện tại có 4 sản phẩm, nên không cần trượt.
        // Tuy nhiên, logic dưới đây sẵn sàng cho trường hợp thêm sản phẩm vào HTML.
        const updateCarousel = () => {
            const cards = document.querySelectorAll('.product-card');
            if(cards.length === 0) return;
            
            // Tính chiều rộng của 1 card cộng với khoảng cách (gap)
            // Lấy kích thước thực tế từ DOM
            const cardWidth = cards[0].offsetWidth;
            const gap = 20; // 20px gap như trong CSS
            
            const moveAmount = (cardWidth + gap) * currentIndex;
            track.style.transform = `translateX(-${moveAmount}px)`;
        };

        nextBtn.addEventListener('click', () => {
            const cards = document.querySelectorAll('.product-card');
            const maxIndex = Math.max(0, cards.length - 4); // Hiển thị 4 item mỗi lần
            
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            } else {
                // Quay lại đầu nếu đã đến cuối (tùy chọn)
                currentIndex = 0;
                updateCarousel();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        // Cập nhật lại khi resize cửa sổ
        window.addEventListener('resize', updateCarousel);
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
                    document.getElementById('products-container');
  if (!container) return;

  // Cơ chế Polling: Đợi tối đa 5 giây cho SDK Supabase tải xong nếu mạng chậm
  let retries = 0;
  while ((!window.supabaseClient || !window.supabase) && retries < 10) {
    if (window.supabase && window.supabase.createClient && !window.supabaseClient) {
      if (typeof initSupabase === 'function') {
        initSupabase(); // Thử khởi tạo lại
      } else {
        window.supabaseClient = window.supabase.createClient('https://suabbqtrggzwgchksenq.supabase.co', 'sb_publishable_E711W3fBxwZeRVYH3TOBAA_ZNoe_wps');
      }
    }
    await new Promise(resolve => setTimeout(resolve, 500)); // Đợi 0.5s
    retries++;
  }

  // Nếu thử 10 lần (5 giây) vẫn không nạp được SDK
  if (!window.supabaseClient) {
    container.innerHTML = `<div style="text-align: center; color: #da020e; padding: 40px; grid-column: 1/-1;"> ⚠️ Trình duyệt hoặc bộ chặn quảng cáo (AdBlock) đang chặn kết nối CDN Supabase.<br> Vui lòng tạm tắt AdBlock/Cốc Cốc Shield và bấm <b>Tải lại trang</b>. </div>`;
    return;
  }

  try {
    // 1. TỰ ĐỘNG LẤY THAM SỐ PHÂN LOẠI TỪ URL (Ví dụ: page.html?cat=jerseys&sub=home)
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat') || urlParams.get('category');
    const subParam = urlParams.get('sub') || urlParams.get('subcategory');

    // 2. TẠO QUERY SUPABASE NĂNG ĐỘNG
    let query = window.supabaseClient.from('products').select('*');

    // Nếu có phân loại trên URL -> Mới tiến hành lọc (Lưu ý ilike để không phân biệt hoa/thường)
    if (catParam) {
      query = query.ilike('category', `%${catParam}%`);
    }
    if (subParam) {
      query = query.ilike('subcategory', `%${subParam}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Lỗi lấy sản phẩm:", error);
      container.innerHTML = `<p style="text-align: center; width: 100%; color: #888;">Không thể tải sản phẩm (${error.message}).</p>`;
      return;
    }
    
    if (!data || data.length === 0) {
      container.innerHTML = `<p style="text-align: center; width: 100%; color: #888; padding: 40px;">Chưa có sản phẩm nào thuộc phân loại này.</p>`;
      return;
    }
    
    // 3. RENDER LAYOUT CHUẨN UNITED STORE OFFICIAL
    container.innerHTML = data.map(item => {
      const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
        .format(item.price || 0)
        .replace('VND', '')
        .trim();
        
      return `
      <div class="product-card" onclick="location.href='product-detail.html?id=${item.id}'"> 
        <div class="product-image-box"> 
          <img src="${item.image_url || item.image || 'https://via.placeholder.com/300x375'}" alt="${item.name}"> 
          <button class="wishlist-btn" onclick="event.stopPropagation(); toggleWishlist('${item.id}')"> 
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2"> 
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path> 
            </svg> 
          </button> 
          <span class="badge-new">New</span> 
        </div> 
        <div class="product-info-box"> 
          <div class="price">₫${formattedPrice}</div> 
          <h3 class="title">${item.name || 'Manchester United Jersey'}</h3> 
        </div> 
      </div>`;
    }).join('');
  } catch (err) {
    console.error("Crash JS:", err);
    container.innerHTML = `<p style="text-align: center; width: 100%; color: #888;">Đã xảy ra lỗi khi tải dữ liệu (${err.message}).</p>`;
  }
}

document.addEventListener('DOMContentLoaded', loadProducts);
window.addEventListener('load', loadProducts);