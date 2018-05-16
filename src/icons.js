/**
 * External dependencies
 */
const sharp = require('sharp');

/**
 * Sizes for all app icons
 */
const iconSizes = [
	'72x72',
	'96x96',
	'128x128',
	'144x144',
	'152x152',
	'192x192',
	'384x384',
	'512x512'
];

/**
 * Generate all app icons
 */
module.exports = function(icon, folder) {
	for (const size of iconSizes) {
		const [width, height] = size.split('x');

		sharp(icon)
			.resize(Number(width), Number(height))
			.png()
			.toFile(`${folder}/icon-${size}.png`);
	}
};
