// const { spawn } = require('child_process');
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
						message: `I've moved ${fileName} to your Japanese Homework folder to help keep your downloads folder clear. The end destination is ${destination}.`,
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
						message: `Congrats on the new certificate! I've put it with the others in the Japanese certificates folder.`,
					});
				});
			}
		}
	});
	return japaneseWatcher;
};

const watchImageFiles = () => {
	// Watch for image files
	const ImageWatcher = chokidar.watch('C:\\Users\\SebCy\\Downloads', {
		ignored: /(^|[\/\\])\../, // ignore dotfiles
		persistent: true,
		usePolling: true, // enable polling for better file detection on some systems
	});

	ImageWatcher.on('add', (filePath) => {
		const fileName = path.basename(filePath);
		const extName = path.extname(filePath);
		if (
			extName.toLowerCase() === '.png' ||
			extName.toLowerCase() === '.jpg' ||
			extName.toLowerCase() === '.jpeg' ||
			extName.toLowerCase() === '.webp'
		) {
			const destination = 'C:/Users/SebCy/Documents/Pictures/' + fileName;
			fs.rename(filePath, destination, (err) => {
				if (err) throw err;

				notifier.notify({
					appID: 'Jessica',
					title: 'Jessica',
					icon: './Icons/JessicaIcon.png',
					message: `I've moved this to the images folder for you.`,
				});
			});
		}
	});
	return ImageWatcher;
};

module.exports = { watchJapaneseFiles, watchImageFiles };
