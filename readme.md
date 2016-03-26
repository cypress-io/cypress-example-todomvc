# React App + Travis CI [![Build Status](https://travis-ci.org/cypress-io/examples-react-travis-ci.svg)](https://travis-ci.org/cypress-io/examples-react-travis-ci)

This repo contains an example React App, with the tests written in Cypress.

Additionally this example app is configured to run tests in Travis CI.

The tests are written to be directly compared to the official TodoMVC tests.

Each test covers the same functionality found in the official TodoMVC tests but utilizes the Cypress API.

The [tests are heavily commented](tests/app_spec.js) to ease you into the Cypress API.

[You can find the official TodoMVC tests we are comparing to here.](https://github.com/tastejs/todomvc/blob/master/tests/test.js) <br>
[And here.](https://github.com/tastejs/todomvc/blob/master/tests/page.js) <br>
[And here.](https://github.com/tastejs/todomvc/blob/master/tests/testOperations.js)

## Help + Documentation

The steps below will take you all the way through Cypress.

It is assumed you have nothing installed except for `node` + `git`.

If you get stuck, here is more help:

* [Gitter Channel](https://gitter.im/cypress-io/cypress)
* [Cypress Docs](https://github.com/cypress-io/cypress/wiki)
* [Cypress CLI Tool Docs](https://github.com/cypress-io/cypress-cli)

## Running Tests in Cypress

- [Install Cypress](https://docs.cypress.io/docs/installing-and-running#section-installing)
- [Add the `examples-react-travis-ci` folder as a project](https://docs.cypress.io/docs/installing-and-running#section-adding-projects) in Cypress.
- Click `app_spec.js` or `Run All Tests` in the Cypress runner.
- [Read how to setup Continous Integration in TravisCI](https://docs.cypress.io/docs/continuous-integration).