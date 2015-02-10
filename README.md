# analytics.js-loader

Asynchronously load segment.com's
[analytics.js](https://segment.com/docs/libraries/analytics.js/).

This is the [segment.com snippet](https://segment.com/docs/libraries/analytics.js/quickstart/#step-1-copy-the-snippet) as an npm module.

## Install

```shell
npm install analytics.js-loader --save
```

## Usage

```js
require('analytics.js-loader')({
  writeKey: 'YOUR_WRITE_KEY'
});

global.analytics.identify('1e810c197e', {
  name: 'Bill Lumbergh',
  email: 'bill@initech.com'
});

global.analytics.track('Signed Up', {
  plan: 'Startup',
  source: 'Analytics Academy'
});
```


