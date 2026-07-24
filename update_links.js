const fs = require('fs');
const path = require('path');

function replaceProductLinks(filename) {
    const filePath = path.join(__dirname, filename);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Mảng map Title -> ID
    const mappings = [
        { title: 'Home Authentic Shirt', id: 'home-shirt' },
        { title: 'Away Shirt', id: 'away-shirt' },
        { title: 'Third Shirt', id: 'third-shirt' },
        { title: 'Goalkeeper Shirt', id: 'gk-shirt' },
        { title: 'Training Top', id: 'training-top' },
        { title: 'Anthem Jacket', id: 'anthem-jacket' },
        // Dự phòng cho index.html
        { title: 'Home Shirt', id: 'home-shirt' }
    ];

    mappings.forEach(map => {
        // Tìm href="product.html" nằm ngay trước class="product-title">Mens Manchester United ... map.title
        // Dùng regex để thay thế
        const regex = new RegExp(`href="product\.html"( class="product-title">Mens Manchester United[^<]*${map.title})`, 'g');
        content = content.replace(regex, `href="product.html?id=${map.id}"$1`);
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Đã cập nhật link trong ${filename}`);
}

replaceProductLinks('index.html');
replaceProductLinks('kits.html');
