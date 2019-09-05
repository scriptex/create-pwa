/**
 * Internal dependencies
 */
const { iconFiles, launchScreenFiles, appleTouchIconFiles, faviconFiles, msTileFiles } = require('./helpers');

module.exports = () => `CACHE MANIFEST

CACHE:
# Offline cache v2

# See below for example
# on how to add files to cache:

# Favicons
${appleTouchIconFiles.join('\n')}
${faviconFiles.join('\n')}
${msTileFiles.join('\n')}
favicons/favicon.ico

# App Icons
${iconFiles.join('\n')}

# App Launch screens
${launchScreenFiles.join('\n')}
`;
