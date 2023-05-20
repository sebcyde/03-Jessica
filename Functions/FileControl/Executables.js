// const { spawn } = require('child_process');
const notifier = require('node-notifier');
const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');

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

				notifier.notify({
					appID: 'Jessica',
					title: 'Jessica',
					icon: './Icons/JessicaIcon.png',
					message: `I've moved this to the Executables folder.`,
				});
			});
		}
	});
	return ExecWatcher;
};

module.exports = { watchExeFiles };
