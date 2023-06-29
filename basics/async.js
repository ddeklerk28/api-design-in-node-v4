const fs = require('fs/promises');

const path = require('path');
const read = async () => {
    const result = await fs.readFile(path.join(__dirname, 'package.json'), 'utf-8');
    console.log('inside function', result);
    return result;
}

read().then((s) => console.log('s', s));
console.log('hi');