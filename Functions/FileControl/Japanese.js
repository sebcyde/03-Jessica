const notifier = require('node-notifier');
const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');

const watchJapaneseFiles = () => {
	const japaneseWatcher = chokidar.watch('C:\\Users\\SebCy\\Downloads', {
		ignored: /(^|[\/\\])\../, // ignore dotfiles
		persistent: true,
	});

	const currentDate = new Date();
	const day = String(currentDate.getUTCDate()).padStart(2, '0');
	const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
	const year = currentDate.getUTCFullYear();
	const formattedDate = `${day}${month}${year}`;

	japaneseWatcher.on('add', (filePath) => {
		const fileName = path.basename(filePath);
		if (filePath.toLowerCase().includes('japanese')) {
			if (filePath.toLowerCase().includes('homework')) {
				// Japanese Homework

				const destination = `C:/Users/SebCy/Documents/Japanese/HW/${year}/${month}/${formattedDate}/${fileName}`;

				fs.rename(filePath, destination, (err) => {
					if (err) throw err;
					notifier.notify({
						title: 'Jessica',
						icon: './Icons/JessicaIcon.png',
						appID: 'Jessica',
						message: `I've moved this to your Japanese Homework folder. It's saved as ${fileName}`,
					});
				});
			}

			if (filePath.toLowerCase().includes('certificate')) {
				// Japanese Completion Certificates
				const destination = `C:/Users/SebCy/Documents/Japanese/Certificates/${year}/${month}/${formattedDate}/${fileName}`;

				fs.rename(filePath, destination, (err) => {
					if (err) throw err;

					notifier.notify({
						appID: 'Jessica',
						title: 'Jessica',
						icon: './Icons/JessicaIcon.png',
						message: `I've put it with the others in the Japanese certificates folder. It's saved as ${fileName}`,
					});
				});
			}
		}
	});
	return japaneseWatcher;
};

module.exports = { watchJapaneseFiles };
