const { watchJapaneseFiles, watchImageFiles } = require('./FileWatcher');

const japaneseWatcher = watchJapaneseFiles();
const imageWatcher = watchImageFiles();
