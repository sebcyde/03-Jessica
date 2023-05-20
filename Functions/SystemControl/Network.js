const { exec } = require('child_process');

const parseNetworkActivityOutput = (output) => {
	// Implement parsing logic to extract relevant network activity information
	// from the output of the `netstat -s` command

	// Example: Parsing logic for received and sent packets
	const lines = output.split('\n');
	const receivedPackets = extractValue(lines, 'Received Packets:');
	const sentPackets = extractValue(lines, 'Sent Packets:');

	return {
		receivedPackets,
		sentPackets,
	};
};

const extractValue = (lines, key) => {
	for (const line of lines) {
		if (line.includes(key)) {
			const parts = line.split(':');
			if (parts.length >= 2) {
				return parts[1].trim();
			}
		}
	}
	return null;
};

const NetworkWatch = () => {
	exec('netstat -s', (error, stdout) => {
		if (error) {
			// Handle error
		} else {
			const networkInfo = parseNetworkActivityOutput(stdout);
			// Extract relevant network activity information from the output

			console.log('Network Info:', networkInfo);
		}
	});
};

module.exports = { NetworkWatch };
