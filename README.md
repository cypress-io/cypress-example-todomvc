# TodoMVC [![Travis CI](https://travis-ci.org/cypress-io/cypress-example-todomvc.svg)](https://travis-ci.org/cypress-io/cypress-example-todomvc) [![Circle CI](https://circleci.com/gh/cypress-io/cypress-example-todomvc.svg?style=svg)](https://circleci.com/gh/cypress-io/cypress-example-todomvc) [![Build status](https://ci.appveyor.com/api/projects/status/6wjyoye82orkkyny?svg=true)](https://ci.appveyor.com/project/cypress-io/cypress-example-todomvc)

[![Greenkeeper badge](https://badges.greenkeeper.io/cypress-io/cypress-example-todomvc.svg)](https://greenkeeper.io/)

This repo contains an example React App, with the tests written in Cypress.

Additionally this example app is configured to run tests in Circle CI and Travis CI.

The tests are written to be directly compared to the official TodoMVC tests.

Each test covers the same functionality found in the official TodoMVC tests but utilizes the Cypress API.

The [tests are heavily commented](cypress/integration/app_spec.js) to ease you into the Cypress API.

[You can find the official TodoMVC tests we are comparing to here.](https://github.com/tastejs/todomvc/blob/master/tests/test.js) [And here.](https://github.com/tastejs/todomvc/blob/master/tests/page.js) [And here.](https://github.com/tastejs/todomvc/blob/master/tests/testOperations.js)

## Help + Testing

The steps below will take you all the way through Cypress. It is assumed you have nothing installed except for node + git.

**If you get stuck, here is more help:**

* [Gitter Channel](https://gitter.im/cypress-io/cypress)
* [Cypress Docs](https://on.cypress.io)
* [Cypress CLI Tool Docs](https://github.com/cypress-io/cypress-cli)

### 1. Install Cypress

[Follow these instructions to install Cypress.](https://on.cypress.io/guides/installing-and-running#section-installing)

### 2. Fork this repo

If you want to experiment with running this project in Continous Integration, you'll need to [fork](https://github.com/cypress-io/cypress-example-todomvc#fork-destination-box) it first.

After forking this project in `Github`, run these commands:

```bash
## clone this repo to a local directory
git clone https://github.com/<your-username>/cypress-example-todomvc.git

## cd into the cloned repo
cd cypress-example-todomvc

## install the node_modules
npm install

## start the local webserver
npm start
```

The `npm start` script will spawn a webserver on port `8888` which hosts the TodoMVC app.

You can verify this by opening your browser and navigating to: [`http://localhost:8888`](http://localhost:8888)

You should see the TodoMVC app up and running. We are now ready to run Cypress tests.

### 3. Add the project to Cypress

[Follow these instructions to add the project to Cypress.](https://on.cypress.io/guides/installing-and-running#section-adding-projects)

### 4. Run in Continuous Integration

[Follow these instructions to run the tests in CI.](https://on.cypress.io/guides/continuous-integration#section-running-in-ci)

## Cypress IntelliSense

If you use modern IDE that supports TypeScript (like VSCode), you can benefit
from Cypress type declarations included with the `cypress` NPM module. Just
add `@ts-check` to the spec file and configure "dummy"
[tsconfig.json](tsconfig.json) file and see IntelliSense over `cy.<something>`
commands.

![cy.type IntelliSense](img/cytype.png)

If you find errors in the type documentation, please
[open an issue](https://github.com/cypress-io/cypress/issues)
