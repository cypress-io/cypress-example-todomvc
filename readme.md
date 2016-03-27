# React App + Travis CI [![Build Status](https://travis-ci.org/cypress-io/cypress-example-todomvc.svg)](https://travis-ci.org/cypress-io/cypress-example-todomvc)

![todomvc-gif](https://cloud.githubusercontent.com/assets/1268976/12985445/ad168098-d0c0-11e5-94e7-2f2e619bae93.gif)

This repo contains an example React App, with the tests written in Cypress.

Additionally this example app is configured to run tests in Travis CI.

The tests are written to be directly compared to the official TodoMVC tests.

Each test covers the same functionality found in the official TodoMVC tests but utilizes the Cypress API.

The [tests are heavily commented](tests/app_spec.js) to ease you into the Cypress API.

[You can find the official TodoMVC tests we are comparing to here.](https://github.com/tastejs/todomvc/blob/master/tests/test.js) <br>
[And here.](https://github.com/tastejs/todomvc/blob/master/tests/page.js) <br>
[And here.](https://github.com/tastejs/todomvc/blob/master/tests/testOperations.js)

## Running Tests in Cypress

- [Install Cypress](https://on.cypress.io/guides/installing-and-running#section-installing)
- [Add the `cypress-example-piechopper` folder as a project](https://on.cypress.io/guides/installing-and-running#section-adding-projects) in Cypress.
- Click `app_spec.js` or `Run All Tests` in the Cypress runner.
- [Read how to setup Continous Integration in CircleCI](https://on.cypress.io/guides/continuous-integration).

