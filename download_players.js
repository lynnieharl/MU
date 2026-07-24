const https = require('https');
const fs = require('fs');
const path = require('path');

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else {
                reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err.message));
        });
    });
};

const images = [
    { url: 'https://resources.premierleague.com/premierleague/photos/players/250x250/p480628.png', filename: 'images/mainoo.png' }, // Random PL ID, might not be Mainoo
    { url: 'https://resources.premierleague.com/premierleague/photos/players/250x250/p249178.png', filename: 'images/hojlund.png' }, // Random PL ID
    // Let's use standard Wikimedia images just in case
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Kobbie_Mainoo_2023.jpg/250px-Kobbie_Mainoo_2023.jpg', filename: 'images/mainoo_wiki.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Rasmus_H%C3%B8jlund_2023.jpg/250px-Rasmus_H%C3%B8jlund_2023.jpg', filename: 'images/hojlund_wiki.jpg' }
];

async function main() {
    for (const img of images) {
        try {
            await download(img.url, path.join(__dirname, img.filename));
            console.log('Downloaded', img.filename);
        } catch (err) {
            console.log('Failed', img.filename, err);
        }
    }
}
main();
