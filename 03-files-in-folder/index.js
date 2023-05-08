const { readdir, stat, } = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'secret-folder');

readdir(filePath, {withFileTypes: true}, (error, dirEntryList) => {
	if(error) throw Error;

	dirEntryList.forEach( dirEntry => {

		if(dirEntry.isFile()) {
			stat(path.join(filePath, dirEntry.name), (error, stats) => {

				if(error) {
					console.log(error);

				} else {
					console.log(`${path.basename(dirEntry.name, path.extname(dirEntry.name))} - ${path.extname(dirEntry.name).slice(1)} - ${Math.round(stats.size/1024)} kb`);

				}
			});
		}
	});
});
