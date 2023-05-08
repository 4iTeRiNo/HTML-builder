const fs = require('fs');
const path = require('path');
const {stdin, exit } = require('process');

const filePath = fs.createWriteStream(path.join(__dirname, 'output.txt'));

console.log('Hello, write some text pls :-)');

process.on('SIGINT', () => {
	console.log("Thank you for your time spent");
	exit();
})

stdin.on('data', chunk => {
	if(chunk.toString().trim() === "exit") {
		console.log("Thank you for your time spent");
		exit();
	}
	filePath.write(chunk);
})