const fs = require('fs');
const path = require('path');

const css = `
/* Registration Specific */
.sso-row {
    display: flex;
    gap: 15px;
}
.sso-row .sso-input-wrapper {
    flex: 1;
}
.sso-label {
    display: block;
    font-size: 0.95rem;
    font-weight: bold;
    margin-bottom: 5px;
    color: var(--color-black);
}
.sso-radio-group {
    display: flex;
    gap: 20px;
    margin-top: 5px;
}
.sso-radio-label {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.95rem;
    cursor: pointer;
}
.sso-info-text {
    font-size: 0.85rem;
    color: var(--color-gray-dark);
    line-height: 1.5;
    margin-bottom: 10px;
}
.sso-info-text a {
    color: var(--color-black);
    text-decoration: underline;
}
`;

fs.appendFileSync(path.join(__dirname, 'style.css'), css, 'utf8');
console.log('Appended Registration CSS successfully.');
