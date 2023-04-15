const {
	watchJapaneseFiles,
	watchImageFiles,
	watchExeFiles,
} = require('./FileWatcher');

const japaneseWatcher = watchJapaneseFiles();
const imageWatcher = watchImageFiles();
const ExecWatcher = watchExeFiles();
