const { RemoteBrowserTarget } = require('happo.io');

module.exports = {
  apiKey: process.env.HAPPO_API_KEY,
  apiSecret: process.env.HAPPO_API_SECRET,
  targets: {
    chrome: new RemoteBrowserTarget('chrome', {
      viewport: '1024x768',
    }),
    'chrome-mobile': new RemoteBrowserTarget('chrome', {
      viewport: '375x768',
    }),
    edge: new RemoteBrowserTarget('edge', {
      viewport: '1024x768',
    }),
    firefox: new RemoteBrowserTarget('firefox', {
      viewport: '1024x768',
    }),
  },
};
