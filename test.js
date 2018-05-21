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

/**
 * Sizes for all app icons
 */
const iconSizes = [
	'72x72',
	'96x96',
	'128x128',
	'144x144',
	'152x152',
	'192x192',
	'384x384',
	'512x512'
];

/**
 * Init
 */
createPWA({
	icon: './icon.png'
});

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
tape('The name of the app should be "test"', t => {
	t.equal(
		require(resolve(__dirname, './manifest.json')).name,
		'create-pwa',
		'The name of the PWA is "create-pwa"'
	);

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
 * Test if icons are being generated
 */
tape('Should generate 8 icons', t => {
	readdir(resolve(__dirname, 'icons'), (err, files) => {
		t.equal(8, files.length, 'There should be 8 icon files');
	});

	t.end();
});
