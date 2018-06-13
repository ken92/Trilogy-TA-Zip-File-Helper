const fs = require('fs');
const zipdir = require('zip-dir');

function makeZip(folderToBeZippedPath, newZipName) {
    return new Promise((resolve, reject) => {        
        zipdir(folderToBeZippedPath, {saveTo: newZipName}, function (err, buffer) {
            resolve();
        });
    });
}
module.exports = makeZip;
