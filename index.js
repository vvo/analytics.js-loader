module.exports = load;

var analytics = [];

function load(opts) {
  // If the real analytics.js is already on the page return.
  if (analytics.initialize) return;

  // If the snippet was invoked already show an error.
  if (analytics.invoked) {
    if (window.console && console.error) {
      console.error('Segment snippet included twice.');
    }
    return;
  }

  // Invoked flag, to make sure the snippet
  // is never invoked twice.
  analytics.invoked = true;

  // A list of the methods in Analytics.js to stub.
  analytics.methods = [
    'trackSubmit',
    'trackClick',
    'trackLink',
    'trackForm',
    'pageview',
    'identify',
    'group',
    'track',
    'ready',
    'reset',
    'alias',
    'page',
    'once',
    'off',
    'on'
  ];

  // Define a factory to create stubs. These are placeholders
  // for methods in Analytics.js so that you never have to wait
  // for it to load to actually record data. The `method` is
  // stored as the first argument, so we can replay the data.
  analytics.factory = function(method){
    return function(){
      var args = Array.prototype.slice.call(arguments);
      args.unshift(method);
      analytics.push(args);
      return analytics;
    };
  };

  // For each of our methods, generate a queueing stub.
  for (var i = 0; i < analytics.methods.length; i++) {
    var key = analytics.methods[i];
    analytics[key] = analytics.factory(key);
  }

  // Define a method to load Analytics.js from our CDN,
  // and that will be sure to only ever load it once.
  analytics.load = function(key){
    // Create an async script element based on your key.
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = ('http:' === document.location.protocol
      ? 'http://' : 'https://')
      + 'cdn.segment.com/analytics.js/v1/'
      + key + '/analytics.min.js';

    // Insert our script next to the first script element.
    var first = document.getElementsByTagName('script')[0];
    first.parentNode.insertBefore(script, first);
  };

  // Add a version to keep track of what's in the wild.
  analytics.SNIPPET_VERSION = '3.0.1';

  // Load Analytics.js with your key, which will automatically
  // load the tools you've enabled for your account. Boosh!
  analytics.load(opts.writeKey);

  // Make the first page call to load the integrations. If
  // you'd like to manually name or tag the page, edit or
  // move this call however you'd like.
  if (!opts.skipPageCall) {
    analytics.page();
  }

  /*
  * The analytics.js-loader module returns the "initial" analytics
  * object, which is basically just a queue to hold events until the
  * "real" one is loaded with a global script.  Problem is, the "real"
  * one simply replaces `window.analytics`, and doesn't change over
  * this initial "queue" object, meaning that nothing gets registered
  * after the "real" one is loaded - things just keep adding to the queue.
  *
  * This is why we save off `initialAnalytics`, and then always run
  * methods through `window.analytics`, which might be the queue, and
  * might be the real one.
  */

  var initialAnalytics = analytics;
  var actualAnalytics = {};

  window.analytics = initialAnalytics;

  initialAnalytics.methods.forEach(function(method) {
    actualAnalytics[method] = function() {
      window.analytics[method].apply(window.analytics, arguments);
    }
  });

  return actualAnalytics;
}
