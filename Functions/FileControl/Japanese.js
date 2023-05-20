const notifier = require('node-notifier');
const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');

const watchJapaneseFiles = () => {
	const japaneseWatcher = chokidar.watch('C:\\Users\\SebCy\\Downloads', {
		ignored: /(^|[\/\\])\../, // ignore dotfiles
		persistent: true,
	});

	japaneseWatcher.on('add', (filePath) => {
		const fileName = path.basename(filePath);
		if (filePath.toLowerCase().includes('japanese')) {
			if (filePath.toLowerCase().includes('homework')) {
				// Japanese Homework
				const destination = 'C:/Users/SebCy/Documents/Japanese/HW/' + fileName;
				fs.rename(filePath, destination, (err) => {
					if (err) throw err;
					notifier.notify({
						title: 'Jessica',
						icon: './Icons/JessicaIcon.png',
						appID: 'Jessica',
						message: `I've moved this to your Japanese Homework folder.`,
					});
				});
			}

			if (filePath.toLowerCase().includes('certificate')) {
				// Japanese Completion Certificates
				const destination =
					'C:/Users/SebCy/Documents/Japanese/Certificates/' + fileName;
				fs.rename(filePath, destination, (err) => {
					if (err) throw err;

					notifier.notify({
						appID: 'Jessica',
						title: 'Jessica',
						icon: './Icons/JessicaIcon.png',
						message: `I've put it with the others in the Japanese certificates folder.`,
					});
				});
			}
		}
	});
	return japaneseWatcher;
};

module.exports = { watchJapaneseFiles };
