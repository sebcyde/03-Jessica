const os = require('os');

const MemoryWatch = () => {
	const totalMemory = os.totalmem();
	const freeMemory = os.freemem();
	const usedMemory = totalMemory - freeMemory;
	// Calculate memory usage percentage or other relevant metrics

	console.log('Total Memory:', totalMemory);
	console.log('Free Memory:', freeMemory);
	console.log('Used Memory:', usedMemory);
};

module.exports = { MemoryWatch };
