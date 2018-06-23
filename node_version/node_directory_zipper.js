const fs = require('fs');
const path = require('path');
const makeZip = require('./make_zip');


function processDirectory(dirPath, indent = "") {
    fs.readdir(dirPath, async function (err, items) {
        var foundSolvedOrUnsolvedDir = false;
        for (let i = 0; i < items.length; i++) {
            const fullPath = `${dirPath}/${items[i]}`;

            if (fullPath === './node_modules')
                continue;

            const file = fs.lstatSync(fullPath);
            const filename = path.basename(fullPath);
            if (file.isDirectory()) {
                if (filename === 'Solved' || filename === 'Unsolved') {
                    foundSolvedOrUnsolvedDir = true;
                    const zipFilePath = `${dirPath}/${path.basename(dirPath)}-${filename}.zip`;
                    await makeZip(fullPath, zipFilePath);
                } else {
                    processDirectory(fullPath, `${indent}  `);
                }
            }
        }

        // zip up directories that do not have solved/unsolved inside
        const parentPath = path.basename(path.dirname(dirPath));
        if (dirPath !== '01-Activities' && parentPath === '01-Activities' && !foundSolvedOrUnsolvedDir) {
            await makeZip(dirPath, `${dirPath}.zip`);
        }
    });
}

if (process.argv.length === 2) {
    console.error("No argument for activities path provided!");
} else {
    const path = process.argv[2].replace(/\\/g, "/");
    processDirectory(path);
}
