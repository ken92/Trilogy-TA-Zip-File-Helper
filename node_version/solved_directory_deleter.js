const fs = require('fs');
const path = require('path');
const deleteDirectory = require('./delete_directory');

function processDirectory(dirPath, indent = "") {
    fs.readdir(dirPath, async function (err, items) {
        if (!items || items.length === 0) {
            console.log("no items found!");
            return;
        }

        for (let i = 0; i < items.length; i++) {
            const fullPath = `${dirPath}/${items[i]}`;

            if (fullPath === './node_modules')
                continue;

            const file = fs.lstatSync(fullPath);
            const filename = path.basename(fullPath);
            if (file.isDirectory()) {
                if (filename === 'Solved') {
                    await deleteDirectory(fullPath);
                } else {
                    processDirectory(fullPath, `${indent}  `);
                }
            }
        }
    });
}

if (process.argv.length === 2) {
    console.error("No argument for activities path provided!");
} else {
    const path = process.argv[2].replace(/\\/g, "/");
    processDirectory(path);
}
