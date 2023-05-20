const { exec } = require('child_process');

const DiskWatch = () => {
	exec('df -h', (error, stdout) => {
		if (error) {
			// Handle error
		} else {
			const diskInfo = parseDiskSpaceOutput(stdout);
			// Extract relevant disk space information from the output
		}
	});
};

module.exports = { DiskWatch };
