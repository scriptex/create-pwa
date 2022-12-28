const { generateFile, iconSizes } = require('./helpers');

/**
 * Generate all app icons
 * @param {string} icon
 * @param {string} folder
 */
module.exports = (icon, folder) => generateFile(icon, folder, iconSizes, 'icon');
