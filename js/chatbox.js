document.addEventListener('DOMContentLoaded', () => {
    // 1. Config Dify Chatbot
    window.difyChatbotConfig = {
        token: 'yv8bVptWk0pJtIPX',
        baseUrl: 'https://udify.app'
    };

    // 2. Inject Dify Script
    const script = document.createElement('script');
    script.src = 'https://udify.app/embed.min.js';
    script.id = 'yv8bVptWk0pJtIPX';
    script.defer = true;
    document.body.appendChild(script);

    // 3. Inject Custom Styles for MU Theme
    const style = document.createElement('style');
    style.innerHTML = `
        /* Main Bubble Button Style */
        #dify-chatbot-bubble-button {
            position: fixed !important;
            bottom: 24px !important;
            right: 24px !important;
            z-index: 2147483647 !important;
            background-color: #d31145 !important;
            box-shadow: 0 0 15px rgba(211, 17, 69, 0.8), 0 0 30px rgba(255, 0, 0, 0.5) !important; /* Aura effect */
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }

        /* Hover Effect */
        #dify-chatbot-bubble-button:hover {
            transform: scale(1.05);
            transition: transform 0.2s ease-in-out;
        }

        /* Chat Window Size */
        #dify-chatbot-bubble-window {
            position: fixed !important;
            bottom: 84px !important;
            right: 24px !important;
            z-index: 2147483647 !important;
            width: 26rem !important; /* Slightly wider for better reading */
            height: 42rem !important; /* Taller */
            border-radius: 12px !important;
            overflow: hidden !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important;
        }

        /* Hide the default Dify SVG icon */
        #dify-chatbot-bubble-button svg {
            display: none !important;
        }

        /* Inject MU Logo */
        #dify-chatbot-bubble-button::before {
            content: '';
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 32px !important;
            height: 32px !important;
            background: url('https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg') no-repeat center center !important;
            background-size: contain !important;
            filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 15px rgba(255, 0, 0, 0.6)) !important; /* Logo Aura */
        }

        /* Hide Dify Watermark Hack */
        #dify-chatbot-bubble-window iframe {
            height: calc(100% + 40px) !important;
            margin-bottom: -40px !important;
        }
    `;
    document.head.appendChild(style);
});
