const https = require('https');

https.get('https://store.manutd.com/en', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const regex = /https:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp|svg)/gi;
    let matches = data.match(regex);
    if(matches) {
        matches = [...new Set(matches)];
        console.log(matches.slice(0, 50).join('\n'));
    } else {
        console.log("No images found");
    }
  });
});
