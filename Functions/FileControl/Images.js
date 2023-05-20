const notifier = require('node-notifier');
const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');

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

module.exports = { watchImageFiles };
