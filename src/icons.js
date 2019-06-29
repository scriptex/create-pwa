/**
 * External dependencies
 */
const sharp = require('sharp');

/**
 * Internal dependencies
 */
const { iconSizes } = require('./sizes');

/**
 * Generate all app icons
 */
module.exports = (icon, folder) => {
	for (const size of iconSizes) {
		const [width, height] = size.split('x');

		sharp(icon)
			.resize(Number(width), Number(height))
			.png()
			.toFile(`${folder}/icon-${size}.png`);
	}
};
