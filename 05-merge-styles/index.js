const { error } = require('console');
const fs = require('fs');
const path = require('path');
const pathDir = path.join(__dirname, 'styles')
const writeStreamFile = fs.createWriteStream(path.join(__dirname, './project-dist', 'bundle.css'))

try {
	fs.readdir( pathDir, {withFileTypes: true}, (error, dirEntryList) => {
	if(error) throw Error;

	dirEntryList.forEach(file => {
		if(file.isFile()) {

			const pathFile = path.join(pathDir, file.name)
			fs.stat(pathFile, (error, stats) => {
				if(error) throw Error;

				const fileName = path.extname(file.name);
				const expansion = '.css';
				if(fileName === expansion && file.isFile()) {
					const readStream = fs.createReadStream(path.join(__dirname, './styles', file.name));
					readStream.on('data', (chunk) => {
						writeStreamFile.write('\n/* ** ---Chunk Start--- */\n ')
						writeStreamFile.write(chunk)
						writeStreamFile.write('\n/* ** ---Chunk End--- */\n')
					});
				}
			})
		}
	})
})
} catch {
	console.log('Opps', Error)
}
