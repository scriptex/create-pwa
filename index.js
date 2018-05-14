const dir = __dirname;
const { resolve } = require('path');
const { existsSync, writeFileSync } = require('fs');

const isInitialized = existsSync(resolve(dir, 'package.json'));

if (isInitialized) {
} else {
	writeFileSync('package.json', '{}');
}
