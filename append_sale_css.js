const fs = require('fs');
const path = require('path');

const css = `
/* Sale Page CSS */
.badge-sale {
    background-color: var(--color-primary);
    color: var(--color-white);
    padding: 5px 10px;
    font-size: 0.85rem;
    font-weight: bold;
    text-transform: uppercase;
}

.product-price .price-original {
    color: var(--color-gray-dark);
    text-decoration: line-through;
    font-size: 0.9rem;
    margin-right: 8px;
    font-weight: normal;
}

.product-price .price-sale {
    color: var(--color-primary);
    font-weight: 900;
    font-size: 1.1rem;
}

.sale-banner-top {
    width: 100%;
    background-color: #f8e1e1;
    color: var(--color-primary);
    text-align: center;
    padding: 15px;
    font-size: 1.2rem;
    font-weight: 900;
    margin-bottom: 20px;
    border: 1px solid var(--color-primary);
    border-radius: 4px;
    grid-column: 1 / -1; /* Span entire grid width */
}
`;

fs.appendFileSync(path.join(__dirname, 'style.css'), css, 'utf8');
console.log('Appended Sale CSS successfully.');
