const { error } = require('console');
const fs = require('fs');
const path = require('path');

const projectFolder = 'project-dist';
const bundlePath = path.join(__dirname, projectFolder, 'style.css');

function main() {
  fs.promises.mkdir(path.join(__dirname, projectFolder), {recursive: true})
    .then(() => {

      fs.promises.writeFile(bundlePath, '')

      const writeStream = fs.createWriteStream(bundlePath);

      fs.promises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true })
        .then(files => {

          files.filter((file) => path.parse(file.name).ext === '.css');
          for (let i = 0; i < files.length; i++) {
            const readStream = fs.createReadStream(path.join(__dirname, 'styles', files[i].name));

            readStream.pipe(writeStream);
          }
        })

        fs.promises.mkdir(path.join(__dirname, projectFolder, 'assets'), {recursive: true})
        .then(() => {
      
          fs.promises.readdir(path.join(__dirname, 'assets'), { withFileTypes: true })
            .then(dirs => {
      
              for (let i = 0; i < dirs.length; i++) {
      
                fs.promises.mkdir(path.join(__dirname, projectFolder, 'assets', dirs[i].name), {recursive: true})
                  .then(() => {
      
                    fs.promises.readdir(path.join(__dirname, 'assets', dirs[i].name), { withFileTypes: true })
                      .then((files) => {
      
                        for (let j = 0; j < files.length; j++) {
                          fs.promises.copyFile(path.join(__dirname, 'assets', dirs[i].name, files[j].name),
																							path.join(__dirname, projectFolder, 'assets', dirs[i].name, files[j].name))
                        }
											})
										});
              }
            })
						console.log(projectFolder ,'is create')
        })
      
      fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf8')
        .then((data) => {

          const section = data.match(/{{.+}}/g);

          replaceTemplates(section, data);
        })
    });
}

fs.promises.access(path.join(__dirname, projectFolder))
  .then(() => {
		
    fs.promises.rm(path.join(__dirname, projectFolder), {recursive: true})
      .then(() => {
        main();
      })
  })
  .catch(() => {
    main();
  })

async function replaceTemplates(section, data) {
  for (let i = 0; i < section.length; i++) {
    const fileName = section[i].replace(/{{/, '').replace(/}}/, '');

    const component = await fs.promises.readFile(path.join(__dirname, 'components', fileName + '.html'), 'utf8');

    const regex = new RegExp(section[i]);
    data = data.replace(regex, component);

    if (i === section.length - 1) {
      fs.promises.writeFile(path.join(__dirname, projectFolder, 'index.html'), data);
    }

  }
}