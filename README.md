# analytics.js-loader

This is the [segment.com snippet](https://segment.com/docs/libraries/analytics.js/quickstart/#step-1-copy-the-snippet) *Slightly* modified to be a commonJS compatible module.

It's usable with module loaders like [browserify](http://browserify.org/) or [webpack](http://webpack.github.io/docs/).

## Install

```shell
npm install analytics.js-loader --save
```

## Usage

```js
var analytics = require('analytics.js-loader')({
  writeKey: 'YOUR_WRITE_KEY',
  // you can skip the first analytics.page() call if needed, #1
  skipPageCall: false
});

analytics.identify('1e810c197e', {
  name: 'Bill Lumbergh',
  email: 'bill@initech.com'
});

analytics.track('Signed Up', {
  plan: 'Startup',
  source: 'Analytics Academy'
});
```
