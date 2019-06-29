/**
 * External dependencies
 */
const sharp = require('sharp');

/**
 * Internal dependencies
 */
const { launchScreenSizes } = require('./sizes');

/**
 * Generate all app launch screens
 */
module.exports = (image, folder) => {
	for (const size of launchScreenSizes) {
		const [width, height] = size.split('x');

		sharp(image)
			.resize(Number(width), Number(height))
			.png()
			.toFile(`${folder}/launch-screen-${size}.png`);
	}
};
