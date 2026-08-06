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

        // Greeting
        if (msg.includes('chào') || msg.includes('hi ') || msg.includes('hello')) {
            return "Xin chào! GGMU! Mình có thể giúp gì cho bạn hôm nay?";
        }

        // Default Fallback
        return "Xin lỗi, mình chưa hiểu ý bạn lắm. Bạn có thể hỏi về: giá áo, size, phí ship, đổi trả hoặc cách thức mua hàng nhé. GGMU! 🔴";
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
