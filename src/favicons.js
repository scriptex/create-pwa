/**
 * External dependencies
 */
const pngToIco = require('png-to-ico');
const { writeFileSync } = require('fs');

/**
 * Internal dependencies
 */
const { generateFile, msTileSizes, faviconSizes, appleTouchIconSizes } = require('./helpers');

/**
 * Generate all app icons
 */
module.exports = (icon, folder) => {
	generateFile(icon, folder, msTileSizes, 'ms-tile');
	generateFile(icon, folder, faviconSizes, 'favicon');
	generateFile(icon, folder, appleTouchIconSizes, 'apple-touch-icon');

	pngToIco(icon)
		.then(buf => {
			writeFileSync(`${folder}/favicon.ico`, buf);
		})
		.catch(console.error);
};
