const rimraf = require('rimraf');

function deleteDirectory(path) {
    return new Promise((resolve, reject) => {
        rimraf(path, () => {
            resolve();
        });
    });
}

module.exports = deleteDirectory;
