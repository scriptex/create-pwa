/**
 * Internal dependencies
 */
const { generateFile, iconSizes } = require('./helpers');

/**
 * Generate all app icons
 */
module.exports = (icon, folder) => generateFile(icon, folder, iconSizes, 'icon');
