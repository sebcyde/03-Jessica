const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');
const { SendToastNotif } = require('./Functions/ToastNotifs');

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
					SendToastNotif("I've moved this to your Japanese Homework folder.");
				});
			}

			if (filePath.toLowerCase().includes('certificate')) {
				// Japanese Completion Certificates
				const destination =
					'C:/Users/SebCy/Documents/Japanese/Certificates/' + fileName;
				fs.rename(filePath, destination, (err) => {
					if (err) throw err;
					SendToastNotif(
						"I've put it with the others in the Japanese certificates folder."
					);
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
				SendToastNotif("I've moved this to the images folder for you.");
			});
		}
	});
	return ImageWatcher;
};

const watchExeFiles = () => {
	// Watch for image files
	const ExecWatcher = chokidar.watch('C:\\Users\\SebCy\\Downloads', {
		ignored: /(^|[\/\\])\../,
		persistent: true,
		usePolling: true,
	});

	ExecWatcher.on('add', (filePath) => {
		const fileName = path.basename(filePath);
		const extName = path.extname(filePath);
		if (extName.toLowerCase() === '.exe') {
			const destination = 'C:/Users/SebCy/Documents/Execs/' + fileName;
			fs.rename(filePath, destination, (err) => {
				if (err) throw err;
				SendToastNotif("I've moved this to the Executables folder.");
			});
		}
	});
	return ExecWatcher;
};

const string = 'hello english. こんにちは ';

const isJapanese = (string) => {
	return string.match(
		/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/
	);
};

const FileWatcher = async () => {
	const Watcher = chokidar.watch('C:\\Users\\SebCy\\Downloads', {
		ignored: /(^|[\/\\])\../, // ignore dotfiles
		persistent: true,
	});

	Watcher.on('add', (filePath) => {
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) {
				console.error(err);
				return;
			}
			const fileName = path.basename(filePath);

			if (isJapanese(data)) {
				const destination = 'C:/Users/SebCy/Documents/Japanese/' + fileName;
				fs.rename(filePath, destination, (err) => {
					if (err) throw err;
					SendToastNotif(
						"I've put it with the others in the Japanese certificates folder."
					);
				});
			}

			console.log(data);
		});
	});
};

module.exports = {
	FileWatcher,
	watchJapaneseFiles,
	watchImageFiles,
	watchExeFiles,
};
