// const { AnimeUpdates } = require('./Functions/Updates/Anime/AnimeUpdates');
const {
	// watchJapaneseFiles,
	watchImageFiles,
	watchExeFiles,
} = require('./FileWatcher');
const { watchJapaneseFiles } = require('./Functions/FileControl/Japanese');

const WJ = watchJapaneseFiles();
const WI = watchImageFiles();
const WE = watchExeFiles();

// const PeriodicUpdates = async () => {
// await AnimeUpdates();
// };

// PeriodicUpdates();
