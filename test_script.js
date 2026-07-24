
        // CẤU HÌNH SUPABASE
        const SUPABASE_URL = 'https://suabbqtrggzwgchksenq.supabase.co';
        const SUPABASE_KEY = 'sb_publishable_E711W3fBxwZeRVYH3TOBAA_ZNoe_wps';
        const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

        // Đổi tab Đăng nhập / Đăng ký
        function switchTab(type) {
            const btnLog = document.querySelectorAll('.tab-btn')[0];
            const btnReg = document.querySelectorAll('.tab-btn')[1];
            const formLog = document.getElementById('form-login');
            const formReg = document.getElementById('form-register');

            if (type === 'login') {
                btnLog.classList.add('active');
                btnReg.classList.remove('active');
                formLog.style.display = 'block';
                formReg.style.display = 'none';
            } else {
                btnReg.classList.add('active');
                btnLog.classList.remove('active');
                formReg.style.display = 'block';
                formLog.style.display = 'none';
            }
        }

        // 1. XỬ LÝ ĐĂNG KÝ ADMIN TỰ ĐỘNG
        async function xuLyDangKy(e) {
            e.preventDefault();
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;

            try {
                // Tạo user trên Supabase Auth
                const { data: authData, error: authErr } = await supabase.auth.signUp({ email, password });
                if (authErr) throw authErr;

                // Thêm luôn vào bảng users với role là 'admin'
                const { error: dbErr } = await supabase.from('users').insert([{ email: email, role: 'admin' }]);
                if (dbErr) throw dbErr;

                alert("🎉 Tạo tài khoản Admin thành công! Giờ ông có thể Đăng Nhập.");
                switchTab('login');
                document.getElementById('login-email').value = email;
            } catch (err) {
                alert("❌ Lỗi Đăng Ký: " + err.message);
            }
        }

        // 2. XỬ LÝ ĐĂNG NHẬP & PHÂN QUYỀN
        async function xuLyDangNhap(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            try {
                // Xác thực tài khoản
                const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({ email, password });
                if (authErr) throw authErr;

                // Kiểm tra xem email này trong bảng 'users' có quyền 'admin' không
                const { data: userData, error: userErr } = await supabase
                    .from('users')
                    .select('role')
                    .eq('email', email)
                    .single();

                if (userErr || !userData || userData.role !== 'admin') {
                    await supabase.auth.signOut();
                    return alert("⛔ LỖI BẢO MẬT: Tài khoản này chưa được cấp quyền Admin!");
                }

                // Nếu đúng Admin -> Mở Dashboard
                alert("✅ Đăng nhập Admin thành công!");
                document.getElementById('auth-screen').style.display = 'none';
                document.getElementById('dashboard-screen').style.display = 'block';
                document.getElementById('admin-email-display').innerText = email;

                // Load danh sách sản phẩm
                taiDanhSachSanPham();

            } catch (err) {
                alert("❌ Lỗi Đăng Nhập: " + err.message);
            }
        }

        // 3. TẢI SAN PHAM TỪ BẢNG 'products'
        async function taiDanhSachSanPham() {
            const tbody = document.getElementById('product-list');
            tbody.innerHTML = '<tr><td colspan="5">Đang tải dữ liệu kho...</td></tr>';

            try {
                const { data, error } = await supabase.from('products').select('*');
                if (error) throw error;

                tbody.innerHTML = '';
                if (data.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="5">Kho đang trống sản phẩm.</td></tr>';
                    return;
                }

                data.forEach(item => {
                    tbody.innerHTML += `
                        <tr>
                            <td>${item.id}</td>
                            <td><img src="${item.image_url || 'https://via.placeholder.com/40'}" width="40" height="40" style="object-fit:cover;"></td>
                            <td>${item.name}</td>
                            <td>${item.price}</td>
                            <td><button class="btn-delete" onclick="xoaSanPham('${item.id}')">Xóa</button></td>
                        </tr>
                    `;
                });
            } catch (err) {
                console.error("Lỗi tải SP:", err);
                tbody.innerHTML = '<tr><td colspan="5">Lỗi không thể tải kho hàng (Kiểm tra lại bảng products).</td></tr>';
            }
        }

        // 4. THÊM SẢN PHẨM MỚI
        async function themSanPham(e) {
            e.preventDefault();
            const name = document.getElementById('p-name').value;
            const price = document.getElementById('p-price').value;
            const image_url = document.getElementById('p-img').value;

            try {
                const { error } = await supabase.from('products').insert([{ name, price, image_url }]);
                if (error) throw error;

                alert("Đã thêm sản phẩm mới vào Supabase!");
                e.target.reset();
                taiDanhSachSanPham();
            } catch (err) {
                alert("❌ Lỗi thêm SP: " + err.message);
            }
        }

        // 5. XÓA SẢN PHẨM
        async function xoaSanPham(id) {
            if (!confirm("Ông chắc chắn muốn xóa sản phẩm này khỏi Database?")) return;

            try {
                const { error } = await supabase.from('products').delete().eq('id', id);
                if (error) throw error;

                alert("Đã xóa!");
                taiDanhSachSanPham();
            } catch (err) {
                alert("❌ Lỗi xóa SP: " + err.message);
            }
        }

        // 6. ĐĂNG XUẤT
        async function dangXuat() {
            await supabase.auth.signOut();
            location.reload();
        }
    