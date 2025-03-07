const fs = require('fs');
const path = require('path');

 const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'));

let textContent = '';

readStream.on('error', (error) => console.log(error.message));
readStream.on('data',  (chunk) => textContent += chunk.toString());
readStream.on('end',	 () => console.log(textContent));