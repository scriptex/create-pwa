const { generateFile, launchScreenSizes } = require('./helpers');

/**
 * Generate all app launch screens
 * @param {string} image
 * @param {string} folder
 *
 */
module.exports = (image, folder) => generateFile(image, folder, launchScreenSizes, 'launch-screen');
