#!/usr/bin/env node

/**
 * Node dependencies
 */
const { dirname, resolve, sep } = require('path');
const { existsSync, writeFileSync, mkdirSync } = require('fs');

/**
 * External dependencies
 */
const argv = require('yargs').argv;

/**
 * Internal dependencies
 */
const generateIcons = require('./icons');
const manifestTemplate = require('./manifest');
const appCacheTemplate = require('./appcache');
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
 */
const setManifest = name => {
	writeFileSync(resolve(pwd, 'manifest.json'), manifestTemplate(name));
};

/**
 * Create app's service worker file
 */
const setServiceWorker = name => {
	writeFileSync(
		resolve(pwd, 'service-worker.js'),
		serviceWorkerTemplate(name)
	);
};

/**
 * Create app's icons
 */
const setIcons = icon => {
	if (!icon) {
		return;
	}

	const dir = resolve(pwd, 'icons');
	const image = resolve(pwd, icon);

	if (!existsSync(dir)) {
		mkdirSync(dir);
	}

	generateIcons(image, dir);
};

/**
 * Create app's cache manifest
 */
const setAppCache = name => {
	writeFileSync(
		resolve(pwd, `${name}.appcache`),
		appCacheTemplate()
	);
};

/**
 * Create all PWA required files
 */
const create = ({ icon }) => {
	const name = getAppName();

	setIcons(argv.icon || icon);
	setAppCache(name);
	setManifest(name);
	setServiceWorker(name);
};

create({
	icon: './icon.png'
});

module.exports = create;
module.exports.setIcons = setIcons;
module.exports.setAppCache = setAppCache;
module.exports.setManifest = setManifest;
module.exports.setServiceWorker = setServiceWorker;
