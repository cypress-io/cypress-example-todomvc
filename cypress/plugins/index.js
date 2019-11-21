const findEdgeBrowser = require('./find-edge')
const findBraveBrowser = require('./find-brave')

// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  if (!config.browsers) {
    // we are running Cypress < v3.7.0 thus we cannot modify list of browsers
    return
  }

  return Promise.all([findEdgeBrowser(), findBraveBrowser()]).then(([edge, brave]) => {
    return {
      browsers: config.browsers.concat(edge, brave),
    }
  })
}
