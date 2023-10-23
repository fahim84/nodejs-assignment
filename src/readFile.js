var fs = require('fs');

function readFile() {
    try {
        const data = fs.readFileSync('files/text.txt', 'utf-8');
        return (data);
    } catch (error) {
        return (error.toString());
    }

}

module.exports = readFile;