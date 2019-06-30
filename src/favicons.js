/**
 * External dependencies
 */
const sharp = require('sharp');
const createIco = require('to-ico');
const { writeFileSync } = require('fs');

/**
 * Internal dependencies
 */
const { generateFile, icoSizes, msTileSizes, faviconSizes, appleTouchIconSizes } = require('./helpers');

/**
 * Generate an .ico file
 * @param {String} source
 * @param {String} dest
 */
async function generateFavicon(source, dest) {
	const buffers = await Promise.all(
		icoSizes.map(size =>
			sharp(source)
				.resize(size)
				.toBuffer()
		)
	);

	writeFileSync(dest, await createIco(buffers));
}

/**
 * Generate all app icons
 */
module.exports = (icon, folder) => {
	generateFile(icon, folder, msTileSizes, 'ms-tile');
	generateFile(icon, folder, faviconSizes, 'favicon');
	generateFile(icon, folder, appleTouchIconSizes, 'apple-touch-icon');
	generateFavicon(icon, `${folder}/favicon.ico`);
};
