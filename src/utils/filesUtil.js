const fs = require('fs');
const path = require('path');

module.exports = {
    getRecursivelyDirectoryFiles
}

function getRecursivelyDirectoryFiles(dir, filter = ".js") {
    let files = [];

    fs.readdirSync(dir)
    .forEach(file => {
        const absolutePath = path.join(dir, file);
        const isDirectory = fs.statSync(absolutePath).isDirectory();

        if(!isDirectory && !file.endsWith(filter)) return;

        files.push(isDirectory ? getRecursivelyDirectoryFiles(absolutePath) : absolutePath);
    })

    return files.flat();
}