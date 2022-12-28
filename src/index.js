#!/usr/bin/env node

const { resolve, sep } = require('path');
const { existsSync, writeFileSync, mkdirSync } = require('fs');

/**
 * Default options
 */
const DEFAULTS = {
	icon: './icon.png',
	launch: './launch.png',
	output: ''
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
 * Create a directory if one doesn't exist
 * @param {string} dist Path to a folder inside the project's directory
 * @param {string} name Name of the new folder to be created
 */
const createDirIfNotExists = (dist, name) => {
	const dir = resolve(pwd, dist, name);

	if (!existsSync(dir)) {
		mkdirSync(dir, { recursive: true });
	}

	return dir;
};

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
 * @param {string} name Name of the application
 * @param {string} dist Path to a folder inside the project's directory
 */
const setManifest = (name, dist) => {
	const dir = createDirIfNotExists(dist, '');

	writeFileSync(resolve(dir, 'manifest.json'), manifestTemplate(name));
};

/**
 * Create app's service worker file
 * @param {string} name Name of the application
 * @param {string} dist Path to a folder inside the project's directory
 */
const setServiceWorker = (name, dist) => {
	const dir = createDirIfNotExists(dist, '');

	writeFileSync(resolve(dir, 'service-worker.js'), serviceWorkerTemplate(name));
};

/**
 * Create images with `sharp`
 * @param {string} file Path to the image file
 * @param {string} dist Path to a folder inside the project's directory
 * @param {string} name Name of the new folder to be created
 * @param {Function} callback
 */
const generateImages = (file, dist, name, callback) => {
	if (!file) {
		return;
	}

	const dir = createDirIfNotExists(dist, name);
	const image = resolve(pwd, file);

	callback(image, dir);
};

/**
 * Create app's icons
 * @param {string} file Path to the image file
 * @param {string} dist Path to a folder inside the project's directory
 */
const setIcons = (file, dist) => generateImages(file, dist, 'icons', generateIcons);

/**
 * Create app's cache manifest
 * @param {string} name Name of the application
 * @param {string} dist Path to a folder inside the project's directory
 */
const setAppCache = (name, dist) => {
	const dir = createDirIfNotExists(dist, '');

	writeFileSync(resolve(dir, `${name}.appcache`), appCacheTemplate());
};

/**
 * Create app's launch screens
 * @param {string} file Path to the image file
 * @param {string} dist Path to a folder inside the project's directory
 */
const setLaunchScreens = (file, dist) => {
	generateImages(file, dist, 'launch-screens', generateLaunchScreens);
};

/**
 * Create app's config for Microsoft browsers
 * @param {string} dist Path to a folder inside the project's directory
 */
const setMsTileConfig = dist => {
	const dir = createDirIfNotExists(dist, '');

	writeFileSync(resolve(dir, 'config.xml'), msTileConfigTemplate());
};

/**
 * Create app's favicons
 * @param {string} file Path to the image file
 * @param {string} dist Path to a folder inside the project's directory
 */
const setFavicons = (file, dist) => generateImages(file, dist, 'favicons', generateFavicons);

/**
 * Create all PWA required files
 */
const create = async () => {
	const name = getAppName();

	const { icon, launch, output, icons, manifest, favicons, appCache, serviceWorker, launchScreens } = await argv;
	const iconToUse = icon || DEFAULTS.icon;
	const launchToUse = launch || DEFAULTS.launch;

	if (icons) {
		setIcons(iconToUse, output);
	}

	if (manifest) {
		setManifest(name, output);
	}

	if (appCache) {
		setAppCache(name, output);
	}

	if (favicons) {
		setFavicons(iconToUse, output);
		setMsTileConfig(output);
	}

	if (serviceWorker) {
		setServiceWorker(name, output);
	}

	if (launchScreens) {
		setLaunchScreens(launchToUse, output);
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
