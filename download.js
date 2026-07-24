const fs = require('fs');
const path = require('path');
const https = require('https');

const indexFile = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(indexFile, 'utf8');

const imgDir = path.join(__dirname, 'images');
if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir);
}

// Tìm tất cả các link ảnh
const urlRegex = /https:\/\/[^"']+\.(?:jpg|jpeg|png|svg)/gi;
const urls = [...new Set(htmlContent.match(urlRegex))];

let downloaded = 0;
let errors = 0;

if(urls.length === 0) {
    console.log("Không tìm thấy URL nào.");
    process.exit(0);
}

urls.forEach((url, i) => {
    // Trích xuất tên file
    let filename = url.substring(url.lastIndexOf('/') + 1);
    // Nếu tên file có query string, bỏ query string đi
    filename = filename.split('?')[0];
    // Đảm bảo tên file duy nhất nếu trùng
    filename = `${i}_${filename}`;
    
    const dest = path.join(imgDir, filename);

    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            'Referer': 'https://store.manutd.com/'
        }
    };

    https.get(url, options, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            // handle redirect if needed (simplified, skipping for now as these are mostly direct)
            console.log(`Bỏ qua redirect cho ${url}`);
            errors++;
            checkDone();
            return;
        }
        
        if (res.statusCode !== 200) {
            console.log(`Lỗi tải ${url}: HTTP ${res.statusCode}`);
            errors++;
            checkDone();
            return;
        }

        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);

        fileStream.on('finish', () => {
            fileStream.close();
            // Replace trong HTML
            htmlContent = htmlContent.split(url).join(`images/${filename}`);
            downloaded++;
            console.log(`Tải thành công: ${filename}`);
            checkDone();
        });
    }).on('error', (err) => {
        console.log(`Lỗi tải ${url}: ${err.message}`);
        errors++;
        checkDone();
    });
});

function checkDone() {
    if (downloaded + errors === urls.length) {
        fs.writeFileSync(indexFile, htmlContent, 'utf8');
        console.log(`Hoàn tất! Tải thành công: ${downloaded}, Lỗi: ${errors}`);
        console.log('Đã cập nhật index.html với đường dẫn local.');
    }
}
