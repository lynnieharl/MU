document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/chatbox.css';
    document.head.appendChild(link);

    // Font Awesome check (ensure icons work)
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(faLink);
    }

    // 2. Inject HTML
    const chatboxHTML = `
        <div class="chatbox-fab" id="chatbox-fab" title="Chat với chúng tôi">
            <i class="fa-solid fa-message"></i>
            <i class="fa-solid fa-xmark"></i>
        </div>

        <div class="chatbox-window" id="chatbox-window">
            <div class="chatbox-header">
                <div class="chatbox-header-avatar">
                    <i class="fa-solid fa-robot"></i>
                </div>
                <div class="chatbox-header-info">
                    <h4>MU Store Assistant</h4>
                    <p>Trợ lý ảo thông minh</p>
                </div>
            </div>
            
            <div class="chatbox-body" id="chatbox-body">
                <div class="chat-msg bot">
                    <div class="chat-bubble">
                        Xin chào! 👋 Tôi là trợ lý ảo của Manchester United Store Vietnam. Tôi có thể giúp gì cho bạn hôm nay?
                        <div class="chat-chips">
                            <span class="chat-chip" onclick="window.sendSuggestedMsg('Áo đấu giá bao nhiêu?')">Áo đấu giá bao nhiêu?</span>
                            <span class="chat-chip" onclick="window.sendSuggestedMsg('Phí giao hàng thế nào?')">Phí giao hàng thế nào?</span>
                            <span class="chat-chip" onclick="window.sendSuggestedMsg('Chính sách đổi trả')">Chính sách đổi trả</span>
                        </div>
                    </div>
                    <span class="chat-time">${new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
            </div>

            <div class="chatbox-input-area">
                <input type="text" id="chatbox-input" class="chatbox-input" placeholder="Nhập câu hỏi của bạn..." autocomplete="off">
                <button class="chatbox-send-btn" id="chatbox-send-btn">
                    <i class="fa-solid fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;

    const chatContainer = document.createElement('div');
    chatContainer.innerHTML = chatboxHTML;
    document.body.appendChild(chatContainer);

    // 3. Logic and Interactivity
    const fab = document.getElementById('chatbox-fab');
    const windowEl = document.getElementById('chatbox-window');
    const input = document.getElementById('chatbox-input');
    const sendBtn = document.getElementById('chatbox-send-btn');
    const body = document.getElementById('chatbox-body');

    fab.addEventListener('click', () => {
        fab.classList.toggle('active');
        windowEl.classList.toggle('active');
        if (windowEl.classList.contains('active')) {
            input.focus();
        }
    });

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender}`;
        
        const time = new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'});
        msgDiv.innerHTML = `
            <div class="chat-bubble">${text}</div>
            <span class="chat-time">${time}</span>
        `;
        
        body.appendChild(msgDiv);
        body.scrollTop = body.scrollHeight; // Auto scroll to bottom
    }

    // Knowledge Base (Rule-based Bot)
    function getBotResponse(message) {
        const msg = message.toLowerCase();
        
        // Product Info
        if (msg.includes('giá') || msg.includes('bao nhiêu')) {
            return "Giá áo đấu chính hãng hiện tại dao động từ 2.000.000đ đến 3.500.000đ tùy phiên bản (Fan hay Player). Bạn có thể vào mục Áo Đấu để xem chi tiết nhé!";
        }
        if (msg.includes('size') || msg.includes('kích cỡ')) {
            return "Cửa hàng có đủ size từ S đến 2XL theo tiêu chuẩn Châu Âu. Form áo hơi to nên nếu bạn thích mặc ôm, hãy cân nhắc giảm 1 size nhé.";
        }
        if (msg.includes('chính hãng') || msg.includes('fake') || msg.includes('thật')) {
            return "Cam kết 100% hàng chính hãng, nhập khẩu trực tiếp từ cửa hàng Megastore tại Old Trafford. Đền bù gấp 10 lần nếu phát hiện hàng giả!";
        }

        // Shipping
        if (msg.includes('giao hàng') || msg.includes('ship') || msg.includes('vận chuyển')) {
            return "Cửa hàng miễn phí giao hàng (Freeship) cho mọi đơn hàng trên 2.500.000đ. Thời gian giao hàng từ 2-4 ngày trên toàn quốc.";
        }

        // Returns
        if (msg.includes('đổi trả') || msg.includes('hoàn tiền') || msg.includes('bảo hành')) {
            return "Bạn được phép đổi size miễn phí trong vòng 14 ngày nếu áo chưa cắt tag và chưa qua sử dụng. Không hỗ trợ đổi trả áo có in tên số theo yêu cầu.";
        }

        // Purchasing
        if (msg.includes('mua') || msg.includes('đặt hàng')) {
            return "Bạn chỉ cần chọn sản phẩm, nhấn 'Add to Bag' sau đó bấm vào biểu tượng Giỏ hàng ở góc phải trên cùng để tiến hành Thanh toán nhé.";
        }
        
        // CRM / Support
        if (msg.includes('liên hệ') || msg.includes('hỗ trợ') || msg.includes('admin')) {
            return "Bạn có thể liên hệ trực tiếp với chúng tôi qua số điện thoại 1900-1234 hoặc email support@unitedstore.vn";
        }

        // MU Players
        if (msg.includes('cầu thủ') || msg.includes('đội hình') || msg.includes('ai đá')) {
            return "Đội hình chính hiện tại của Manchester United gồm các ngôi sao nổi bật như Bruno Fernandes (Đội trưởng), Marcus Rashford, Alejandro Garnacho, Kobbie Mainoo, Rasmus Hojlund, Leny Yoro, và Andre Onana.";
        }
        if (msg.includes('bruno') || msg.includes('fernandes')) {
            return "Bruno Fernandes (số 8) là Đội trưởng hiện tại của Manchester United, được biết đến với nhãn quan chiến thuật tuyệt vời và khả năng kiến tạo đỉnh cao.";
        }
        if (msg.includes('rashford')) {
            return "Marcus Rashford (số 10) là tiền đạo xuất thân từ học viện Carrington, niềm tự hào của Manchester United với tốc độ và khả năng săn bàn ấn tượng.";
        }
        if (msg.includes('garnacho') || msg.includes('mainoo')) {
            return "Alejandro Garnacho (số 17) và Kobbie Mainoo (số 37) là những tài năng trẻ sáng giá bậc nhất của Manchester United hiện tại, tương lai của Quỷ Đỏ!";
        }

        // MU History
        if (msg.includes('lịch sử') || msg.includes('thành lập') || msg.includes('ra đời')) {
            return "Manchester United được thành lập vào năm 1878 với tên gọi ban đầu là Newton Heath LYR Football Club, sau đó đổi tên thành Manchester United vào năm 1902.";
        }
        if (msg.includes('sir alex') || msg.includes('ferguson')) {
            return "Sir Alex Ferguson là vị huấn luyện viên vĩ đại nhất lịch sử CLB, dẫn dắt đội bóng từ 1986 đến 2013, mang về 38 danh hiệu lớn nhỏ bao gồm 13 chức vô địch Premier League.";
        }
        if (msg.includes('cúp') || msg.includes('vô địch') || msg.includes('danh hiệu')) {
            return "Manchester United là câu lạc bộ giàu truyền thống nhất nước Anh với 20 lần vô địch Ngoại Hạng Anh, 13 FA Cup, 6 League Cup, và 3 lần vô địch UEFA Champions League.";
        }
        if (msg.includes('treble') || msg.includes('cú ăn 3') || msg.includes('1999')) {
            return "Năm 1999, Manchester United làm nên lịch sử khi trở thành đội bóng Anh đầu tiên giành Cú ăn ba vĩ đại (Treble): Premier League, FA Cup và UEFA Champions League.";
        }

        // General Football / Legends
        if (msg.includes('ronaldo') || msg.includes('cr7')) {
            return "Cristiano Ronaldo (CR7) là một trong những cầu thủ vĩ đại nhất lịch sử. Anh từng thi đấu bùng nổ trong màu áo Manchester United, giành Quả bóng vàng đầu tiên tại đây trước khi tạo nên di sản vĩ đại.";
        }
        if (msg.includes('messi') || msg.includes('m10') || msg.includes('lionel')) {
            return "Lionel Messi là huyền thoại bóng đá thế giới với kỷ lục 8 Quả bóng vàng. Dù chưa từng thi đấu cho Manchester United, tài năng của anh là điều cả thế giới phải công nhận.";
        }
        if (msg.includes('rooney') || msg.includes('gã shrek')) {
            return "Wayne Rooney là cầu thủ ghi bàn vĩ đại nhất lịch sử Manchester United với 253 bàn thắng. Một huyền thoại mang dòng máu Quỷ đỏ thực sự tại Old Trafford!";
        }
        if (msg.includes('pele') || msg.includes('maradona')) {
            return "Pele và Maradona là hai biểu tượng vĩnh cửu của bóng đá thế giới, những người đã đưa môn thể thao vua lên tầm nghệ thuật trong thế kỷ 20.";
        }
        if (msg.includes('beckham')) {
            return "David Beckham (số 7) không chỉ là một huyền thoại với những cú sút phạt thần sầu mà còn là biểu tượng thời trang vĩ đại xuất thân từ Thế hệ 92 của Manchester United.";
        }
        
        // Tournaments / Rules / Awards
        if (msg.includes('world cup')) {
            return "World Cup là giải vô địch bóng đá thế giới được tổ chức 4 năm một lần bởi FIFA. Đây là giấc mơ vinh quang lớn nhất của mọi cầu thủ quốc gia.";
        }
        if (msg.includes('champions league') || msg.includes('cúp c1') || msg.includes('c1')) {
            return "UEFA Champions League (Cúp C1) là giải đấu danh giá nhất cấp câu lạc bộ tại Châu Âu. Manchester United từng 3 lần đăng quang tại đấu trường này (1968, 1999, 2008).";
        }
        if (msg.includes('ngoại hạng anh') || msg.includes('premier league') || msg.includes('epl')) {
            return "Premier League là giải đấu quốc nội hấp dẫn nhất hành tinh. Manchester United hiện đang là câu lạc bộ giữ kỷ lục vô địch nhiều nhất với 20 lần lên ngôi vương.";
        }
        if (msg.includes('việt vị') || msg.includes('offside')) {
            return "Luật Việt vị (Offside): Cầu thủ bị coi là việt vị nếu họ đứng gần đường biên ngang sân đối phương hơn cả bóng và cầu thủ phòng ngự đối phương cuối cùng (không tính thủ môn) ở thời điểm đồng đội chuyền bóng.";
        }
        if (msg.includes('quả bóng vàng') || msg.includes('ballon d\'or') || msg.includes('qbv')) {
            return "Quả bóng vàng (Ballon d'Or) là giải thưởng cá nhân danh giá nhất bóng đá. Kỷ lục hiện tại thuộc về Lionel Messi (8 lần) và Cristiano Ronaldo (5 lần). Bốn cầu thủ MU từng giành giải này là Denis Law, Bobby Charlton, George Best và Cristiano Ronaldo.";
        }

        // MU Fixtures
        if (msg.includes('lịch thi đấu') || msg.includes('trận tới') || msg.includes('khi nào đá') || msg.includes('đối thủ')) {
            return "Bạn có thể theo dõi lịch thi đấu chính thức, bảng xếp hạng và các tin tức mới nhất về đội bóng ngay trên trang chủ hoặc ứng dụng chính thức của Manchester United nhé!";
        }
        if (msg.includes('hôm nay') && (msg.includes('đá') || msg.includes('trận'))) {
            return "Để cập nhật chính xác trận đấu hôm nay, bạn vui lòng xem trực tiếp trên các kênh truyền hình thể thao hoặc app chính thức của CLB. GGMU!";
        }

        // Greeting
        if (msg.includes('chào') || msg.includes('hi ') || msg.includes('hello')) {
            return "Xin chào! GGMU! Mình có thể giúp gì cho bạn hôm nay?";
        }

        // Default Fallback
        return "Xin lỗi, mình chưa hiểu ý bạn lắm. Bạn có thể hỏi về thông tin sản phẩm (giá áo, size), hoặc hỏi về đội bóng Manchester United (lịch sử, cầu thủ, lịch thi đấu) nhé. GGMU! 🔴";
    }

    function handleSend() {
        const text = input.value.trim();
        if (!text) return;

        // User message
        appendMessage('user', text);
        input.value = '';

        // Simulate typing delay
        setTimeout(() => {
            const response = getBotResponse(text);
            appendMessage('bot', response);
        }, 600);
    }

    // Export for chips
    window.sendSuggestedMsg = function(text) {
        input.value = text;
        handleSend();
    };

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});
