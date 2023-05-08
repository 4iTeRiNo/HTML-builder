const fs = require('fs')
const path = require('path')
const folderPath = path.join(__dirname, 'files')
const folderCopyPath = path.join(__dirname, 'copy-files')

try {

	fs.rm(folderCopyPath, { recursive: true, force: true }, (error) => {
		if(error) throw Error;

		fs.mkdir(folderCopyPath, {recursive: true}, error => {
			if(error) throw Error;
		
			fs.readdir(folderPath, (error, files) => {
				if(error) throw Error;
			
				files.forEach(item => {
					const filePath = path.join(folderPath, item)
					const fileCopyPath = path.join(folderCopyPath, item)
				
					fs.copyFile(filePath, fileCopyPath, 0,(err) => {
						if(err) throw Error;
					})
				})
			})
			console.log('folder copied')
		})
	})
	
} catch {
	console.log('Opps', error)
}
