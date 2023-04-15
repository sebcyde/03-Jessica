const fs = require('fs');
const fse = require('fs-extra');

const backupFolder = (sourceFolder, backupFolder) => {
  fs.readdir(sourceFolder, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    // create the backup folder if it doesn't exist
    if (!fs.existsSync(backupFolder)) {
      fs.mkdirSync(backupFolder);
    }

    // copy each file from the source folder to the backup folder
    files.forEach(file => {
      const sourceFilePath = `${sourceFolder}/${file}`;
      const backupFilePath = `${backupFolder}/${file}`;
      fse.copy(sourceFilePath, backupFilePath, err => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`Copied ${sourceFilePath} to ${backupFilePath}`);
      });
    });
  });
}
