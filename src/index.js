#!/usr/bin/env node

const { resolve, sep } = require('path');
const { existsSync, writeFileSync, mkdirSync } = require('fs');

/**
 * Default options
 */
const DEFAULTS = {
	icon: './icon.png',
	launch: './launch.png',
	output: './'
};

const argv = require('yargs').options({
	icon: {
		default: DEFAULTS.icon,
		type: 'string'
	},
	launch: {
		default: DEFAULTS.launch,
		type: 'string'
	},
	output: {
		default: DEFAULTS.output,
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
const pwd = process.cwd();

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
 * @param {string} name
 */
const setManifest = name => {
	writeFileSync(resolve(pwd, 'manifest.json'), manifestTemplate(name));
};

/**
 * Create app's service worker file
 * @param {string} name
 */
const setServiceWorker = name => {
	writeFileSync(resolve(pwd, 'service-worker.js'), serviceWorkerTemplate(name));
};

/**
 * Create images with `sharp`
 * @param {string} file
 * @param {string} folder
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
 * @param {string} icon
 */
const setIcons = icon => generateImages(icon, 'icons', generateIcons);

/**
 * Create app's cache manifest
 * @param {string} name
 */
const setAppCache = name => {
	writeFileSync(resolve(pwd, `${name}.appcache`), appCacheTemplate());
};

/**
 * Create app's launch screens
 * @param {string} launchScreen
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
 * @param {string} icon
 */
const setFavicons = icon => generateImages(icon, 'favicons', generateFavicons);

/**
 * Create all PWA required files
 */
const create = async () => {
	const name = getAppName();

	const { icon, launch, icons, manifest, favicons, appCache, serviceWorker, launchScreens } = await argv;
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
