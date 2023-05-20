// File Control
const { watchJapaneseFiles } = require('./Functions/FileControl/Japanese');
const { watchExeFiles } = require('./Functions/FileControl/Executables');
const { watchImageFiles } = require('./Functions/FileControl/Images');
const japaneseWatcher = watchJapaneseFiles();
const imageWatcher = watchImageFiles();
const ExecWatcher = watchExeFiles();

// System Control
// const { NetworkWatch } = require('./Functions/SystemControl/Network');
const { MemoryWatch } = require('./Functions/SystemControl/Memory');
const { DiskWatch } = require('./Functions/SystemControl/Disk');
const { CPUWatch } = require('./Functions/SystemControl/CPU');
// NetworkWatch();
MemoryWatch();
DiskWatch();
CPUWatch();


// Updates
