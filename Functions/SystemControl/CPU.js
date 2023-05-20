const os = require('os');

const CPUWatch = () => {
	const cpuInfo = os.cpus();
	// Calculate average CPU usage
	// You can access individual core information from cpuInfo array
	// and calculate the average usage based on idle and total times
	console.log('CPU Info:', cpuInfo);
};

module.exports = { CPUWatch };
