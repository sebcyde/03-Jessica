const { AnimeUpdates } = require('./Functions/Updates/Anime/AnimeUpdates');
const {
	watchJapaneseFiles,
	watchImageFiles,
	watchExeFiles,
} = require('./FileWatcher');

const japaneseWatcher = watchJapaneseFiles();
const imageWatcher = watchImageFiles();
const exeWatcher = watchExeFiles();

const PeriodicUpdates = async () => {
	await AnimeUpdates();
};

PeriodicUpdates();
