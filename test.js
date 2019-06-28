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
const iconSizes = ['72x72', '96x96', '128x128', '144x144', '152x152', '192x192', '384x384', '512x512'];

/**
 * Sizes for all app launch screens
 */
const launchScreenSizes = [
	'2048x2732', // 12.9" iPad Pro Portrait
	'2732x2048', // 12.9" iPad Pro Landscape
	'1668x2388', // 11" iPad Pro Portrait
	'2388x1668', // 11" iPad Pro Landscape
	'1668x2224', // 10.5" iPad Pro Portrait
	'2224x1668', // 10.5" iPad Pro Landscape
	'1536x2048', // 9.7" iPad Portrait
	'2048x1536', // 9.7" iPad Landscape
	'1536x2048', //7.9" iPad mini 4 Portrait
	'2048x1536', //7.9" iPad mini 4 Landscape
	'1242x2688', // iPhone XS Max Portrait
	'2688x1242', // iPhone XS Max Landscape
	'1125x2436', // iPhone XS Portrait
	'2436x1125', // iPhone XS Landscape
	'828x1792', // iPhone XR Portrait
	'1792x828', // iPhone XR Landscape
	'1125x2436', // iPhone X Portrait
	'2436x1125', // iPhone X Landscape
	'1242x2208', // iPhone 8 Plus Portrait
	'2208x1242', // iPhone 8 Plus Landscape
	'750x1334', // iPhone 8 Portrait
	'1334x750', // iPhone 8 Landscape
	'1242x2208', // iPhone 7 Plus Portrait
	'2208x1242', // iPhone 7 Plus Landscape
	'750x1334', // iPhone 7 Portrait
	'1334x750', // iPhone 7 Landscape
	'1242x2208', // iPhone 6s Plus Portrait
	'2208x1242', // iPhone 6s Plus Landscape
	'750x1334', // iPhone 6s Portrait
	'1334x750', // iPhone 6s Landscape
	'640x1136', // iPhone SE Portrait
	'1136x640' // iPhone SE Landscape
];

/**
 * Init
 */
createPWA({
	icon: './icon.png',
	launch: './launch.png'
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
tape('Should generate 8 icons', t => {
	readdir(resolve(__dirname, 'icons'), (err, files) => {
		t.equal(iconSizes.length, files.length, 'There should be 8 icon files');
	});

	t.end();
});

/**
 * Test if launch screens are being created
 */
tape('Should generate 32 launch screens', t => {
	readdir(resolve(__dirname, 'launch-screens'), (err, files) => {
		t.equal(Array.from(new Set(launchScreenSizes)).length, files.length, 'There should be 32 launch screen files');
	});

	t.end();
});
