/**
 * Internal dependencies
 */
const { generateFile, launchScreenSizes } = require('./helpers');

/**
 * Generate all app launch screens
 */
module.exports = (image, folder) => generateFile(image, folder, launchScreenSizes, 'launch-screen');
