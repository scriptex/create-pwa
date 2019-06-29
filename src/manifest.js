/**
 * Internal dependencies
 */
const { iconSizes } = require('./helpers');

const icons = iconSizes.map(size => ({
	src: `icons/icon-${size}.png`,
	sizes: size,
	type: 'image/png'
}));

/**
 * Generate a manifest.json file
 */
module.exports = name => `{
	"lang": "en",
	"dir": "ltr",
	"name": "${name}",
	"short_name": "${name}",
	"description": "",
	"theme_color": "#000",
	"background_color": "#000",
	"display": "standalone",
	"orientation": "portrait",
	"scope": "/",
	"start_url": "/",
	"icons": ${JSON.stringify(icons, null, '\t')},
	"splash_pages": null
}`;
