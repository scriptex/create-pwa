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
const serviceWorkerTemplate = require('./service-worker');

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
	const ext = icon.split('.').pop();
	const image = resolve(pwd, icon);
	const dir = resolve(pwd, 'icons');

	if (!existsSync(dir)) {
		mkdirSync(dir);
	}

	generateIcons(image, dir);
};

/**
 * Create all PWA required files
 */
const create = () => {
	const name = getAppName();

	argv.icon && setIcons(argv.icon);

	setManifest(name);
	setServiceWorker(name);
};

create();

module.exports = create;
module.exports.setManifest = setManifest;
module.exports.setServiceWorker = setServiceWorker;
