const fs = require('fs');

const cssContent = `
/* ==========================================
   Header Logo Flexbox & Devil Aura Animation
   ========================================== */
.logo-link {
    display: flex;
    align-items: center;
    gap: 15px;
    text-decoration: none;
    color: inherit;
}

.logo-link .logo-text {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: 2px;
    margin: 0;
}

/* Devil Aura Animation */
.devil-aura {
    width: 60px;
    height: auto;
    border-radius: 50%;
    /* Fiery neon red glow */
    box-shadow: 0 0 10px #ff0000, 
                0 0 20px #ff4500, 
                0 0 30px #ff0000, 
                inset 0 0 15px #ffae00;
    animation: devilAura 2s infinite alternate;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background-color: rgba(255, 0, 0, 0.1);
}

@keyframes devilAura {
    0% {
        box-shadow: 0 0 10px #ff0000, 
                    0 0 20px #ff4500;
        background-color: rgba(255, 0, 0, 0.05);
    }
    100% {
        box-shadow: 0 0 15px #ff0000, 
                    0 0 30px #ff4500, 
                    0 0 45px #ffae00;
        background-color: rgba(255, 0, 0, 0.2);
    }
}

.logo-link:hover .devil-aura {
    transform: scale(1.1) rotate(-3deg);
    /* Exploding fiery glow on hover */
    box-shadow: 0 0 20px #ff0000, 
                0 0 40px #ff4500, 
                0 0 60px #ffae00, 
                inset 0 0 20px #ff0000;
    animation: none; /* pause breathing, just glow big */
}
`;

fs.appendFileSync('style.css', cssContent, 'utf8');
console.log('Appended Aura CSS to style.css');
