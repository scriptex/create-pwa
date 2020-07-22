/**
 * External dependencies
 */
const sharp = require('sharp');

/**
 * Sizes for all app icons
 */
const iconSizes = ['72x72', '96x96', '128x128', '144x144', '152x152', '192x192', '384x384', '512x512'];

/**
 * Sizes for all app launch screens based on
 * https://developer.apple.com/design/human-interface-guidelines/ios/icons-and-images/launch-screen#static-launch-screen-images-not-recommended
 */
const launchScreenSizes = [
	'2048x2732', // 12.9" iPad Pro Portrait
	'2732x2048', // 12.9" iPad Pro Landscape
	'1668x2388', // 11" iPad Pro Portrait
	'2388x1668', // 11" iPad Pro Landscape
	'1668x2224', // 10.5" iPad Pro Portrait
	'2224x1668', // 10.5" iPad Pro Landscape
	'1536x2048', // 9.7" iPad Portrait
	'2048x1536', // 9.7" iPad Landscape
	'1536x2048', //7.9" iPad mini 4 Portrait
	'2048x1536', //7.9" iPad mini 4 Landscape
	'1242x2688', // iPhone XS Max Portrait
	'2688x1242', // iPhone XS Max Landscape
	'1125x2436', // iPhone XS Portrait
	'2436x1125', // iPhone XS Landscape
	'828x1792', // iPhone XR Portrait
	'1792x828', // iPhone XR Landscape
	'1125x2436', // iPhone X Portrait
	'2436x1125', // iPhone X Landscape
	'1242x2208', // iPhone 8 Plus Portrait
	'2208x1242', // iPhone 8 Plus Landscape
	'750x1334', // iPhone 8 Portrait
	'1334x750', // iPhone 8 Landscape
	'1242x2208', // iPhone 7 Plus Portrait
	'2208x1242', // iPhone 7 Plus Landscape
	'750x1334', // iPhone 7 Portrait
	'1334x750', // iPhone 7 Landscape
	'1242x2208', // iPhone 6s Plus Portrait
	'2208x1242', // iPhone 6s Plus Landscape
	'750x1334', // iPhone 6s Portrait
	'1334x750', // iPhone 6s Landscape
	'640x1136', // iPhone SE Portrait
	'1136x640' // iPhone SE Landscape
];

/**
 * Sizes for all apple touch icons
 */
const appleTouchIconSizes = ['57x57', '60x60', '72x72', '76x76', '114x114', '120x120', '144x144', '152x152'];

/**
 * Sizes for all favicons
 */
const faviconSizes = ['16x16', '32x32', '96x96', '128x128', '196x196'];

/**
 * Sizes for all microsoft windows tiles
 */
const msTileSizes = ['70x70', '144x144', '150x150', '310x150', '310x310'];

/**
 * Create files out of all icon sizes
 */
const iconFiles = iconSizes.map(size => `icons/icon-${size}.png`);

/**
 * Create files our of all launch screen sizes
 */
const launchScreenFiles = launchScreenSizes.map(size => `launch-screens/launch-screen-${size}.png`);

/**
 * Create files our of all apple touch icon sizes
 */
const appleTouchIconFiles = appleTouchIconSizes.map(size => `favicons/apple-touch-icon-${size}.png`);

/**
 * Create files our of all favicon sizes
 */
const faviconFiles = faviconSizes.map(size => `favicons/favicon-${size}.png`);

/**
 * Create files our of all microsoft windows tile sizes
 */
const msTileFiles = msTileSizes.map(size => `favicons/ms-tile-${size}.png`);

/**
 * Generate a png file with `sharp`
 * @param {File} file
 * @param {String} folder
 * @param {String[]} sizes
 * @param {String} prefix
 */
const generateFile = (file, folder, sizes, prefix) => {
	for (const size of sizes) {
		const [width, height] = size.split('x');

		sharp(file).resize(Number(width), Number(height)).png().toFile(`${folder}/${prefix}-${size}.png`);
	}
};

module.exports = {
	iconSizes,
	iconFiles,
	generateFile,
	launchScreenSizes,
	launchScreenFiles,
	appleTouchIconSizes,
	appleTouchIconFiles,
	faviconSizes,
	faviconFiles,
	msTileSizes,
	msTileFiles
};
