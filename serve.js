let static = require('node-static')
let file = new static.Server('./')

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    file.serve(request, response)
  }).resume()
}).listen(8888)


// eslint-disable-next-line no-console, no-undef
console.log('Serving on http://localhost:8888/')
