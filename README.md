<div align="center">

![Create PWA Logo](https://raw.githubusercontent.com/scriptex/create-pwa/master/create-pwa.svg?sanitize=true)

</div>

# Create PWA (Create a Progressive Web Application) 

[![npm][npm-version-img]][npm-version-url] [![MIT license][license-img]][license-url] [![Twitter][twitter-img]][twitter-url] [![Analytics][analytics-img]][analytics-url]

> Easily create a Progressive Web Application

[![All issues on Github][github-issues-img]][github-issues-url]
[![Open issues on Github][github-open-issues-img]][github-open-issues-url]
[![Closed issues on Github][github-closed-issues-img]][github-closed-issues-url]
[![Latest Github gag][github-tag-img]][github-tag-url]
[![GitHub last commit][last-commit-img]][last-commit-url]

[![Weekly downloads on NPM][npm-downloads-weekly-img]][npm-url]
[![Monthly downloads on NPM][npm-downloads-monthly-img]][npm-url]
[![Yearly downloads on NPM][npm-downloads-yearly-img]][npm-url]
[![Total downloads on NPM][npm-downloads-total-img]][npm-url]

[![Githib build status][github-status-img]][github-status-url]
[![Combined Github checks][github-checks-img]][github-checks-url]
![Publish size][publish-size-img]
![Top language][github-top-language-img]
![Used languages count][github-languages-img]
[![Renovate App Status][renovateapp-img]][renovateapp-url]
[![Make A Pull Request][prs-welcome-img]][prs-welcome-url]

## About

`create-pwa` is a module for quick scaffolding and producing of progressive web applications.

`create-pwa` adds the minimum required boilerplate which your app requires in order to become a PWA.

`create-pwa` can be used with existing applications or can be the first thing one does when starting a new app.

## Dependencies

In order to use this module, you must have NodeJS installed and NPM or Yarn available.

**You also need a bash shell installed and configured - default on OSX and linux or [Git bash](https://git-scm.com/downloads) on Windows.**

## Install

```sh
# Using NPM:
npm i create-pwa --save-dev

# Using Yarn
yarn add create-pwa --dev
```

## Arguments

1. `icon`: Specifies a relative path to the application icon. **Should be a `.png` file.**

This path is relative to the folder you are located in. It is recommended that the icon file is at least a 512x512 pixels square.

**The `icon` argument is not required.**

If the `icon` argument is not provided, the [default icon](https://github.com/scriptex/create-pwa/blob/master/icon.png) is used.

2. `launch`: Specifies a relative path to the application launch (splash) screen. **Should be a `.png` file.**

This path is relative to the folder you are located in. It is recommended that the launch is at least 3200x3200 pixels square and the actual content (for example brand image) is located in the middle of the image in a square with dimensions up to 500x500 pixels.

**The `launch` argument is not required.**

If the `launch` argument is not provided, the [default launch screen](https://github.com/scriptex/create-pwa/blob/master/launch.png) is used.

## Usage

If you want to use if from the command line, you should first install Create PWA globally:

```sh
npm i -g create-pwa

# or

yarn global add create-pwa
```

Then, navigate to your application's folder:
Then run the install command (see above)

```sh
cd your/app/folder

create-pwa --icon="./icon.png" --launch="./launch.png"
```

You can also use `create-pwa` as a package.json script (in this case you don't need to install the package globally):

```json
{
	"scripts": {
		"pwa": "create-pwa --icon=\"path/to/your/icon.png\" --launch=\"path/to/your/launch.png\""
	}
}
```

The above commands will generate:

-   a `manifest.json` and a `service-worker.js` files
-   several (8) png icons in the `/icons/` folder in your app's root folder
-   several (19) favicons in the `/favicons` folder in your app's root folder
-   several (20) launch screen images in the `launch-screen` folder in your app's root folder
-   a `config.xml` file in your app's root folder - this file is required in Microsoft's browsers

You can edit the contents of the `manifest.json` and `service-worker.js` files.

Their default content is based on industry's best practices and is highly opinionated.

In order to create a customized experience for your users, feel advised to revise and edit the contents of the above files.

When the files(`manifest.json` and `service-worker.js`) are ready for production, you need to let the world know about them:

Feel adviced to edit the content of the `<TileColor>` tag in the `config.xml` file as it matches the color of your application's status bar on Chrome (found in the `<meta name="color" />` tag);

1.  Add the following to the `head` of your HTML file(s):

```html
<link rel="manifest" href="manifest.json" />
```

You can read more about the Web App Manifest [here](https://developers.google.com/web/fundamentals/web-app-manifest/).

2.  Add the following snippet to your application's JavaScript bundle or place it in a `script` tag just before the closing `</body>` tag in your HTML file(s):

```javascript
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('./service-worker.js').then(
			registration => {
				console.log(`ServiceWorker registration successful with scope: ${registration.scope}`);
			},
			error => {
				console.log(`ServiceWorker registration failed: ${error}`);
			}
		);
	});
}
```

The code above checks for service worker support and then registers a service worker located in the `service-worker.js` file in the root of the project.

You can read more about Service Workers [here](https://developers.google.com/web/fundamentals/primers/service-workers/).

After that, add references to all icons which were generated by `create-pwa`:

3. Add the following favicons and meta tags in the `head` of your HTML file(s):

For more info about the favicons and meta tags below see [here](https://github.com/audreyr/favicon-cheat-sheet).

<details>
	<summary>View favicons and meta tags</summary>

```html
<!-- All Apple touch icons for iPad, iPhone, iPod -->
<link rel="apple-touch-icon" sizes="57x57" href="favicons/apple-touch-icon-57x57.png" />
<link rel="apple-touch-icon" sizes="60x60" href="favicons/apple-touch-icon-60x60.png" />
<link rel="apple-touch-icon" sizes="72x72" href="favicons/apple-touch-icon-72x72.png" />
<link rel="apple-touch-icon" sizes="76x76" href="favicons/apple-touch-icon-76x76.png" />
<link rel="apple-touch-icon" sizes="114x114" href="favicons/apple-touch-icon-114x114.png" />
<link rel="apple-touch-icon" sizes="120x120" href="favicons/apple-touch-icon-120x120.png" />
<link rel="apple-touch-icon" sizes="144x144" href="favicons/apple-touch-icon-144x144.png" />
<link rel="apple-touch-icon" sizes="152x152" href="favicons/apple-touch-icon-152x152.png" />

<!-- All favicon sizes - for all devices and browsers -->
<link rel="icon" type="image/png" href="favicons/favicon-196x196.png" sizes="196x196" />
<link rel="icon" type="image/png" href="favicons/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/png" href="favicons/favicon-32x32.png" sizes="32x32" />
<link rel="icon" type="image/png" href="favicons/favicon-16x16.png" sizes="16x16" />
<link rel="icon" type="image/png" href="favicons/favicon-128x128.png" sizes="128x128" />

<!-- A favicon with four different sizes -->
<link rel="shortcut icon" type="image/x-icon" href="favicons/favicon.ico" />

<!-- Application color for Microsoft Windows app tile and Android status bar -->
<meta name="theme-color" content="#edc22e" />
<meta name="msapplication-TileColor" content="#edc22e" />

<!-- Application name for Microsoft Windows app tile -->
<meta name="application-name" content="Create PWA" />

<!-- Application icons for Microsoft Windows app tile -->
<meta name="msapplication-TileImage" content="favicons/ms-tile-144x144.png" />
<meta name="msapplication-square70x70logo" content="favicons/ms-tile-70x70.png" />
<meta name="msapplication-square150x150logo" content="favicons/ms-tile-150x150.png" />
<meta name="msapplication-wide310x150logo" content="favicons/ms-tile-310x150.png" />
<meta name="msapplication-square310x310logo" content="favicons/ms-tile-310x310.png" />

<!-- Application config file for Microsoft browsers -->
<meta name="msapplication-config" content="config.xml" />
```

</details>

4. (Optional) Add the following launch screens in the `head` of your HTML file(s):

<details>
	<summary>View launch screens</summary>

```html
<!-- 12.9" iPad Pro Portrait -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-2048x2732.png"
	media="(device-width: 2048px) and (device-height: 2732px) and (orientation: portrait)"
/>

<!-- 12.9" iPad Pro Landscape -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-2732x2048.png"
	media="(device-width: 2732px) and (device-height: 2048px) and (orientation: landscape)"
/>

<!--  11" iPad Pro Portrait -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-1668x2388.png"
	media="(device-width: 1668px) and (device-height: 2388px) and (orientation: portrait)"
/>

<!--  11" iPad Pro Landscape -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-2388x1668.png"
	media="(device-width: 2388px) and (device-height: 1668px) and (orientation: landscape)"
/>

<!-- 10.5" iPad Pro Portrait -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-1668x2224.png"
	media="(device-width: 1668px) and (device-height: 2224px) and (orientation: portrait)"
/>

<!-- 10.5" iPad Pro Landscape -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-2224x1668.png"
	media="(device-width: 2224px) and (device-height: 1668px) and (orientation: landscape)"
/>

<!--  9.7" iPad Portrait -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-1536x2048.png"
	media="(device-width: 1536px) and (device-height: 2048px) and (orientation: portrait)"
/>

<!--  9.7" iPad Landscape -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-2048x1536.png"
	media="(device-width: 2048px) and (device-height: 1536px) and (orientation: landscape)"
/>

<!--7.9" iPad mini 4 Portrait -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-1536x2048.png"
	media="(device-width: 1536px) and (device-height: 2048px) and (orientation: portrait)"
/>

<!--7.9" iPad mini 4 Landscape -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-2048x1536.png"
	media="(device-width: 2048px and (device-height: 1536px) and (orientation: landscape)"
/>

<!--  iPhone XS Max Portrait -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-1242x2688.png"
	media="(device-width: 1242px and (device-height: 2688px) and (orientation: portrait)"
/>

<!--  iPhone XS Max Landscape -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-2688x1242.png"
	media="(device-width: 2688px) and (device-height: 142px) and (orientation: landscape)"
/>

<!--  iPhone XS Portrait -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-1125x2436.png"
	media="(device-width: 1125px) and (device-height: 236px) and (orientation: portrait)"
/>

<!--  iPhone XS Landscape -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-2436x1125.png"
	media="(device-width: 2436px) and (device-height: 1125px) and (orientation: landscape)"
/>

<!--  iPhone XR Portrait -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-828x1792.png"
	media="(device-width: 828px) and (device-height: 192px) and (orientation: portrait)"
/>

<!--  iPhone XR Landscape -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-1792x828.png"
	media="(device-width: 1792px) and (device-height: 28px) and (orientation: landscape)"
/>

<!--  iPhone X Portrait -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-1125x2436.png"
	media="(device-width: 1125px) and (device-height: 236px) and (orientation: portrait)"
/>

<!--  iPhone X Landscape -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-2436x1125.png"
	media="(device-width: 2436px and (device-height: 1125px) and (orientation: landscape)"
/>

<!--  iPhone 8 Plus Portrait -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-1242x2208.png"
	media="(device-width: 1242px and (device-height: 2208px) and (orientation: portrait)"
/>

<!--  iPhone 8 Plus Landscape -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-2208x1242.png"
	media="(device-width: 2208px) and (device-height: 1242px) and (orientation: landscape)"
/>

<!--  iPhone 8 Portrait -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-750x1334.png"
	media="(device-width: 750px) and (device-height: 134px) and (orientation: portrait)"
/>

<!--  iPhone 8 Landscape -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-1334x750.png"
	media="(device-width: 1334px and (device-height: 750px) and (orientation: landscape)"
/>

<!--  iPhone 7 Plus Portrait -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-1242x2208.png"
	media="(device-width: 1242px and (device-height: 2208px) and (orientation: portrait)"
/>

<!--  iPhone 7 Plus Landscape -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-2208x1242.png"
	media="(device-width: 2208px) and (device-height: 1242px) and (orientation: landscape)"
/>

<!--  iPhone 7 Portrait -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-750x1334.png"
	media="(device-width: 750px) and (device-height: 134px) and (orientation: portrait)"
/>

<!--  iPhone 7 Landscape -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-1334x750.png"
	media="(device-width: 1334px and (device-height: 750px) and (orientation: landscape)"
/>

<!--  iPhone 6s Plus Portrait -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-1242x2208.png"
	media="(device-width: 1242px and (device-height: 2208px) and (orientation: portrait)"
/>

<!--  iPhone 6s Plus Landscape -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-2208x1242.png"
	media="(device-width: 2208px) and (device-height: 1242px) and (orientation: landscape)"
/>

<!--  iPhone 6s Portrait -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-750x1334.png"
	media="(device-width: 750px) and (device-height: 134px) and (orientation: portrait)"
/>

<!--  iPhone 6s Landscape -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-1334x750.png"
	media="(device-width: 1334px) and (device-height: 50px) and (orientation: landscape)"
/>

<!--  iPhone SE Portrait -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-640x1136.png"
	media="(device-width: 640px) and (device-height: 136px) and (orientation: portrait)"
/>

<!--  iPhone SE Landscape -->
<link
	rel="apple-touch-startup-image"
	href="./launch-screens/launch-screen-1136x640.png"
	media="(device-width: 1136px) and (device-height: 640px) and (orientation: landscape)"
/>
```

</details>

In order to have the launch screens shown on an iOS device you also need to tell the device it is dealing with a web app:

```html
<meta name="apple-mobile-web-app-capable" content="yes" /> <meta name="mobile-web-app-capable" content="yes" />
```

The formet works on **Safari** on all iOS devices.
The latter works on **Google Chrome** on all iOS devices.

**Android devices** show splash screen based on the data provided in the `manifest.json` file: `icons`, `name`, etc.

5. (Optional) Add the following attribute to your `html` tag: `manifest="<YOUR_APP_NAME>.appcache"`. It should look something like this:

```html
<html lang="en" manifest="create-pwa.appcache">
	<!-- More awesome HTML code here -->
</html>
```

This will enable application cache and will cache all files listed in the `.appcache` file.
Application cache is currently deprecated in most evergreen browsers and will probably be removed soon.
This, however, does not mean that you can not use it in older browsers (for example IE 11).

You can read more about Application Cache [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache)

## More info

There is a lot information about Progressive Web Applications on the Internet.
In order to comply with browser's requirements and pass the audits you need to check out and fulfill the [PWA Checklist](https://developers.google.com/web/progressive-web-apps/checklist).

The entries listed in **Baseline Progressive Web App Checklist** are mandatory and without them your web app will not qualify as a PWA.

If you wish to test your web app's compliance, you can use the Chrome's built-in Lighthouse tool (found under the _Audits_ tab in the Developer tools).

## NodeJS API

You can generate each of the components above separately using the Create PWA API in NodeJS:

1. To create only an `appcache` file:

```javascript
const { setAppCache } = require('create-pwa');
const appName = 'Your application name';

setAppCache(appName);
```

**The generated `appcache` file contains references to the application icons and application launch screens. You must have these already generated otherwise you must edit your `appcache` file and remove them.**

2. To create only the application icons:

```javascript
const { setIcons } = require('create-pwa');
const appIcon = require('fs').resolve(__dirname, './your_icon.png');

setIcons(appIcon);
```

**The generated icons are located in the `/icons` folder.**

3. To create only the launch screens:

```javascript
const { setLaunchScreens } = require('create-pwa');
const launchScreen = require('fs').resolve(__dirname, './your_launch_screen.png');

setLaunchScreens(launchScreen);
```

**The generated files are located in the `/launch-screens` folder.**

4. To create only manifest file:

```javascript
const { setManifest } = require('create-pwa');
const appName = 'Your application name';

setManifest(appName);
```

**The generated `manifest.json` file contains references to the application icons. You must have these already generated otherwise you must edit your `manifest.json` file and remove them.**

5. To create only favicon files:

```javascript
const { setFavicons } = require('create-pwa');
const appIcon = require('fs').resolve(__dirname, './your_icon.png');

setFavicons(appIcon);
```

**The generated files are located in the `/favicons` folder.**

6. To create only service worker file:

```javascript
const { setServiceWorker } = require('create-pwa');
const appName = 'Your application name';

setServiceWorker(appName);
```

**The generated `service-worker.js` file contains references to the application icons and application launch screens. You must have these already generated otherwise you must edit your `service-worker.js` file and remove them.**

## LICENSE

[MIT][license-url]

---

<div align="center">
    Connect with me:
</div>

<br />

<div align="center">
    <a href="https://atanas.info">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/logo.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="mailto:hi@atanas.info">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/email.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://www.linkedin.com/in/scriptex/">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/linkedin.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://github.com/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/github.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://gitlab.com/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/gitlab.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://twitter.com/scriptexbg">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/twitter.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://www.npmjs.com/~scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/npm.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://www.youtube.com/user/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/youtube.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://stackoverflow.com/users/4140082/atanas-atanasov">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/stackoverflow.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://codepen.io/scriptex/">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/codepen.svg" width="20" alt="">
    </a>
    &nbsp;
    <a href="https://profile.codersrank.io/user/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/codersrank.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://linktr.ee/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/linktree.svg" height="20" alt="">
    </a>
</div>

---

<div align="center">
    Support and sponsor my work:<br /><br />

[![Tweet][tweet-img]][tweet-url]

[![Donate on Paypal][paypal-img]][paypal-url]
[![Donate on Revolut][revolut-img]][revolut-url]
[![Become a Patron][patreon-img]][patreon-url]
[![Buy Me A Coffee][ko-fi-img]][ko-fi-url]
[![Donate on Liberapay][liberapay-img]][liberapay-url]

![Donate Bitcoin][bitcoin-wallet]<br />
![Donate Etherium][etherium-wallet]<br />
![Donate Shiba Inu][shiba-inu-wallet]
</div>

[npm-version-img]: https://badgen.net/npm/v/create-pwa?icon=npm
[npm-version-url]: https://www.npmjs.com/package/create-pwa
[license-img]: https://badgen.net/npm/license/create-pwa
[license-url]: https://github.com/scriptex/create-pwa/blob/master/LICENSE
[twitter-url]: https://twitter.com/scriptexbg
[twitter-img]: https://badgen.net/twitter/follow/scriptexbg?icon=twitter&color=1da1f2&cache=300
[github-tag-img]: https://badgen.net/github/tag/scriptex/create-pwa?icon=github
[github-tag-url]: https://github.com/scriptex/create-pwa/releases/latest
[github-checks-img]: https://badgen.net/github/checks/scriptex/create-pwa?icon=github
[github-checks-url]: https://github.com/scriptex/create-pwa
[github-issues-img]: https://badgen.net/github/issues/scriptex/create-pwa?icon=github
[github-issues-url]: https://github.com/scriptex/create-pwa/issues
[github-open-issues-img]: https://badgen.net/github/open-issues/scriptex/create-pwa?icon=github
[github-open-issues-url]: https://github.com/scriptex/create-pwa/issues?q=is%3Aopen+is%3Aissue
[github-closed-issues-img]: https://badgen.net/github/closed-issues/scriptex/create-pwa?icon=github
[github-closed-issues-url]: https://github.com/scriptex/create-pwa/issues?q=is%3Aissue+is%3Aclosed
[last-commit-img]: https://badgen.net/github/last-commit/scriptex/create-pwa?icon=github
[last-commit-url]: https://github.com/scriptex/create-pwa/commits/master
[analytics-img]: https://ga-beacon.appspot.com/UA-83446952-1/github.com/scriptex/create-pwa/README.md
[analytics-url]: https://github.com/scriptex/create-pwa/
[npm-downloads-weekly-img]: https://badgen.net/npm/dw/create-pwa?icon=npm
[npm-downloads-monthly-img]: https://badgen.net/npm/dm/create-pwa?icon=npm
[npm-downloads-yearly-img]: https://badgen.net/npm/dy/create-pwa?icon=npm
[npm-downloads-total-img]: https://badgen.net/npm/dt/create-pwa?icon=npm
[npm-url]: https://www.npmjs.com/package/create-pwa
[tweet-img]: https://img.shields.io/badge/Tweet-Share_this_repository-blue.svg?style=flat-square&logo=twitter&color=38A1F3
[tweet-url]: https://twitter.com/intent/tweet?text=Checkout%20this%20awesome%20developer%20profile%3A&url=https%3A%2F%2Fgithub.com%2Fscriptex&via=scriptexbg&hashtags=software%2Cgithub%2Ccode%2Cawesome
[paypal-img]: https://img.shields.io/badge/Donate-Support_me_on_PayPal-blue.svg?style=flat-square&logo=paypal&color=222d65
[paypal-url]: https://www.paypal.me/scriptex
[revolut-img]: https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/revolut.json
[revolut-url]: https://revolut.me/scriptex
[patreon-img]: https://img.shields.io/badge/Become_Patron-Support_me_on_Patreon-blue.svg?style=flat-square&logo=patreon&color=e64413
[patreon-url]: https://www.patreon.com/atanas
[ko-fi-img]: https://img.shields.io/badge/Donate-Buy%20me%20a%20coffee-yellow.svg?logo=ko-fi
[ko-fi-url]: https://ko-fi.com/scriptex
[liberapay-img]: https://img.shields.io/liberapay/receives/scriptex.svg?logo=liberapay
[liberapay-url]: https://liberapay.com/scriptex
[issuehunt-img]: https://raw.githubusercontent.com/BoostIO/issuehunt-materials/master/v1/issuehunt-shield-v1.svg
[issuehunt-url]: https://issuehunt.io/r/scriptex/create-pwa
[publish-size-img]: https://badgen.net/packagephobia/publish/create-pwa
[renovateapp-img]: https://badgen.net/badge/renovate/enabled/green?cache=300
[renovateapp-url]: https://renovatebot.com
[prs-welcome-img]: https://badgen.net/badge/PRs/welcome/green?cache=300
[prs-welcome-url]: https://github.com/scriptex/create-pwa/pulls
[github-status-img]: https://badgen.net/github/status/scriptex/create-pwa?icon=github
[github-status-url]: https://github.com/scriptex/create-pwa/actions/workflows/build.yml
[github-languages-img]: https://img.shields.io/github/languages/count/scriptex/create-pwa
[github-top-language-img]: https://img.shields.io/github/languages/top/scriptex/create-pwa
[bitcoin-wallet]: https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/bitcoin.json
[etherium-wallet]: https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/etherium.json
[shiba-inu-wallet]: https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/shiba-inu.json

[social-website-url]: https://atanas.info
[social-website-img]: https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/logo.svg
[social-email-url]: mailto:hi@atanas.info
[social-email-img]: https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/email.svg
[social-linkedin-url]: https://www.linkedin.com/in/scriptex/
[social-linkedin-img]: https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/linkedin.svg
[social-github-url]: https://github.com/scriptex
[social-github-img]: https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/github.svg
[social-gitlab-url]: https://gitlab.com/scriptex
[social-gitlab-img]: https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/gitlab.svg
[social-twitter-url]: https://twitter.com/scriptexbg
[social-twitter-img]: https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/twitter.svg
[social-npm-url]: https://www.npmjs.com/~scriptex
[social-npm-img]: https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/npm.svg
[social-youtube-url]: https://www.youtube.com/user/scriptex
[social-youtube-img]: https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/youtube.svg
[social-stackoverflow-url]: https://stackoverflow.com/users/4140082/atanas-atanasov
[social-stackoverflow-img]: https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/stackoverflow.svg
[social-codepen-url]: https://codepen.io/scriptex/
[social-codepen-img]: https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/codepen.svg
[social-codersrank-url]: https://profile.codersrank.io/user/scriptex
[social-codersrank-img]: https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/codersrank.svg
[social-linktree-url]: https://linktr.ee/scriptex
[social-linktree-img]: https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/linktree.svg
