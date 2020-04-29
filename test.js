/**
 * Node dependencies
 */
const { resolve } = require('path');
const { existsSync, readdir } = require('fs');

/**
 * Test environment
 */
const tape = require('tape');
const createPWA = require('./src');
const { iconSizes, faviconSizes, msTileSizes, launchScreenSizes, appleTouchIconSizes } = require('./src/helpers');

/**
 * Init
 */
createPWA();

/**
 * Test if a manifest is created
 */
tape('Should create a manifest', t => {
	const manifest = resolve(__dirname, './manifest.json');
	const manifestExists = existsSync(manifest);

	t.ok(manifestExists, 'manifest.json exists');
	t.end();
});

/**
 * Test if the app name is correct
 */
tape('The name of the app should be "create-pwa"', t => {
	t.equal(require(resolve(__dirname, './manifest.json')).name, 'create-pwa', 'The name of the PWA is "create-pwa"');
	t.end();
});

/**
 * Test if a service worker is created
 */
tape('Should create a service worker', t => {
	const sw = resolve(__dirname, './service-worker.js');
	const serviceWorkerExists = existsSync(sw);

	t.ok(serviceWorkerExists, 'service-worker.js exists');
	t.end();
});

/**
 * Test if an appcache file is created
 */
tape('Should create an appcache file', t => {
	const ac = resolve(__dirname, './create-pwa.appcache');
	const appCacheFileExists = existsSync(ac);

	t.ok(appCacheFileExists, 'create-pwa.appcache exists');
	t.end();
});

/**
 * Test if icons are being generated
 */
tape('Should generate icons', t => {
	readdir(resolve(__dirname, 'icons'), (err, files) => {
		const len = iconSizes.length;
		t.equal(len, files.length, `There should be ${len} icon files`);
		t.end();
	});
});

/**
 * Test if launch screens are being created
 */
tape('Should generate launch screens', t => {
	readdir(resolve(__dirname, 'launch-screens'), (err, files) => {
		const len = Array.from(new Set(launchScreenSizes)).length;

		t.equal(len, files.length, `There should be ${len} launch screen files`);
		t.end();
	});
});

/**
 * Test if favicons are being created
 */
tape('Should generate favicons', t => {
	readdir(resolve(__dirname, 'favicons'), (err, files) => {
		const len = faviconSizes.length + msTileSizes.length + appleTouchIconSizes.length;

		files = files.filter(file => !file.endsWith('ico'));

		t.equal(len, files.length, `There should be ${len} favicon files.`);
		t.end();
	});
});

/**
 * Test if config.xml is being created
 */
tape('Should generate a config file for Microsoft browsers', t => {
	const ac = resolve(__dirname, './config.xml');
	const configFileExists = existsSync(ac);

	t.ok(configFileExists, 'config.xml exists');
	t.end();
});
