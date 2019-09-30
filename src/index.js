#!/usr/bin/env node

/**
 * Node dependencies
 */
const { resolve, sep } = require('path');
const { existsSync, writeFileSync, mkdirSync } = require('fs');

/**
 * Default options
 */
const DEFAULTS = {
	icon: './icon.png',
	launch: './launch.png'
};

/**
 * External dependencies
 */
const argv = require('yargs').options({
	icon: {
		default: DEFAULTS.icon,
		type: 'string'
	},
	launch: {
		default: DEFAULTS.launch,
		type: 'string'
	},
	icons: {
		default: true,
		type: 'boolean'
	},
	manifest: {
		default: true,
		type: 'boolean'
	},
	appCache: {
		default: true,
		type: 'boolean'
	},
	favicons: {
		default: true,
		type: 'boolean'
	},
	serviceWorker: {
		default: true,
		type: 'boolean'
	},
	launchScreens: {
		default: true,
		type: 'boolean'
	}
}).argv;

/**
 * Internal dependencies
 */
const generateIcons = require('./icons');
const manifestTemplate = require('./manifest');
const appCacheTemplate = require('./appcache');
const generateFavicons = require('./favicons');
const msTileConfigTemplate = require('./mstile');
const generateLaunchScreens = require('./launch-screens');
const serviceWorkerTemplate = require('./sw');

/**
 * Get caller's folder
 */
const pwd = process.env.PWD;

/**
 * Get application's name
 */
const getAppName = () => {
	const pkg = resolve(pwd, 'package.json');

	if (existsSync(pkg) && require(pkg).name) {
		return require(pkg).name;
	}

	return pwd.split(sep).pop();
};

/**
 * Create app's manifest.json file
 * @param {String} name
 */
const setManifest = name => {
	writeFileSync(resolve(pwd, 'manifest.json'), manifestTemplate(name));
};

/**
 * Create app's service worker file
 * @param {String} name
 */
const setServiceWorker = name => {
	writeFileSync(resolve(pwd, 'service-worker.js'), serviceWorkerTemplate(name));
};

/**
 * Create images with `sharp`
 * @param {File} file
 * @param {String} folder
 * @param {Function} callback
 */
const generateImages = (file, folder, callback) => {
	if (!file) {
		return;
	}

	const dir = resolve(pwd, folder);
	const image = resolve(pwd, file);

	if (!existsSync(dir)) {
		mkdirSync(dir);
	}

	callback(image, dir);
};

/**
 * Create app's icons
 * @param {File} icon
 */
const setIcons = icon => generateImages(icon, 'icons', generateIcons);

/**
 * Create app's cache manifest
 * @param {String} name
 */
const setAppCache = name => {
	writeFileSync(resolve(pwd, `${name}.appcache`), appCacheTemplate());
};

/**
 * Create app's launch screens
 * @param {File} launchScreen
 */
const setLaunchScreens = launchScreen => generateImages(launchScreen, 'launch-screens', generateLaunchScreens);

/**
 * Create app's config for Microsoft browsers
 */
const setMsTileConfig = () => {
	writeFileSync(resolve(pwd, 'config.xml'), msTileConfigTemplate());
};

/**
 * Create app's favicons
 * @param {File} icon
 */
const setFavicons = icon => generateImages(icon, 'favicons', generateFavicons);

/**
 * Create all PWA required files
 * @param {Object} => { icon: File, launch: File}
 */
const create = () => {
	const name = getAppName();

	const { icon, launch, icons, manifest, favicons, appCache, serviceWorker, launchScreens } = argv;
	const iconToUse = icon || DEFAULTS.icon;
	const launchToUse = launch || DEFAULTS.launch;

	if (icons) {
		setIcons(iconToUse);
	}

	if (manifest) {
		setManifest(name);
	}

	if (appCache) {
		setAppCache(name);
	}

	if (favicons) {
		setFavicons(iconToUse);
		setMsTileConfig();
	}

	if (serviceWorker) {
		setServiceWorker(name);
	}

	if (launchScreens) {
		setLaunchScreens(launchToUse);
	}
};

create();

module.exports = create;
module.exports.setIcons = setIcons;
module.exports.setAppCache = setAppCache;
module.exports.setManifest = setManifest;
module.exports.setFavicons = setFavicons;
module.exports.setMsTileConfig = setMsTileConfig;
module.exports.setServiceWorker = setServiceWorker;
module.exports.setLaunchScreens = setLaunchScreens;
