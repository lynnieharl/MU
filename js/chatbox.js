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
            background-color: #d31145 !important;
            box-shadow: 0 4px 15px rgba(211, 17, 69, 0.5) !important;
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
            display: block;
            width: 32px;
            height: 32px;
            background: url('images/0_Manchester_United_FC_crest.svg') no-repeat center center;
            background-size: contain;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }
    `;
    document.head.appendChild(style);
});
