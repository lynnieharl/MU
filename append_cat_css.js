const fs = require('fs');
const path = require('path');

const css = `
/* HTML5 Details Accordion CSS for Category Filter */
.filter-group {
    border-bottom: 1px solid var(--color-gray-border);
    padding: 15px 0;
}
.filter-group-title {
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none; /* Hide default arrow */
    outline: none;
}
.filter-group-title::-webkit-details-marker {
    display: none; /* Chrome/Safari */
}
details[open] .filter-group-title i {
    transform: rotate(180deg);
}
.filter-group-title i {
    transition: transform 0.3s ease;
}
.filter-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
}
.filter-options label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
    color: var(--color-gray-dark);
    cursor: pointer;
}
.filter-options input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: var(--color-primary); /* Đổi màu checkbox sang đỏ */
}
`;

fs.appendFileSync(path.join(__dirname, 'style.css'), css, 'utf8');
console.log('Appended Category CSS successfully.');
