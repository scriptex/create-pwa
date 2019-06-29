/**
 * Internal dependencies
 */
const { iconFiles, launchScreenFiles } = require('./helpers');

module.exports = () => `CACHE MANIFEST

CACHE:
# Offline cache v2

# See below for example
# on how to add files to cache:

# App Icons
${iconFiles.join('\n')}

# App Launch screens
${launchScreenFiles.join('\n')}
`;
