#!/usr/bin/env node

/**
 * Node dependencies
 */
const { dirname, resolve, sep } = require('path');
const { existsSync, writeFileSync } = require('fs');

/**
 * Internal dependencies
 */
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
	if (
		existsSync(resolve(pwd, 'package.json')) &&
		require(resolve(pwd, 'package.json')).name
	) {
		return require(resolve(pwd, 'package.json')).name;
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
 * Create all PWA required files
 */
const create = () => {
	const name = getAppName();

	setManifest(name);
	setServiceWorker(name);
};

create();

module.exports = create;
module.exports.setManifest = setManifest;
module.exports.setServiceWorker = setServiceWorker;
