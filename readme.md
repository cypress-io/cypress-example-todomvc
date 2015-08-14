# React App + Travis CI

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

## 1. Install Cypress

#### From the command line

```bash
## install the Cypress CLI tool
npm install -g cypress

## install the Desktop Cypress app
cypress install
```

![cypress-install](https://cloud.githubusercontent.com/assets/1268976/9279271/5c3826ba-4284-11e5-969b-91b0c27a8dee.gif)

#### Alternative direct download

Instead of using the CLI: [you can download Cypress directly here.](http://download.cypress.io/latest)

## 2. Fork this repo

If you want to experiment with running this project in Travis CI, you'll need to fork it first.

![fork2](https://cloud.githubusercontent.com/assets/1268976/9283761/24c8f0a4-42a4-11e5-8f57-f99fb70c75fb.gif)

After forking this project in `Github`, run these commands:

```bash
## clone this repo to a local directory
git clone https://github.com/<your-username>/examples-react-travis-ci.git

## cd into the cloned repo
cd examples-react-travis-ci

## install the node_modules
npm install

## start the local webserver
npm start
```

The `npm start` script will spawn a webserver on port `8888` which hosts the React TodoMVC App.

You can verify this by opening your browser and navigating to: `http://localhost:8888`

You should see `TodoMVC` up and running. We are now ready to run and write Cypress tests.

## 3. Add the project to Cypress

* Open the Cypress App -- just double click the app here: `/Applications/Cypress.app`
* Add the `examples-react-travis-ci` directory into Cypress by clicking the `+` icon
* Click on the project, and you'll see the `Server is Running` message.
* Click on `http://localhost:2020`.
* Click `Run All Tests` inside of Cypress

After adding `examples-react-travis-ci` to Cypress, Cypress will generate a `cypress.json` file here:

```
examples-react-travis-ci/cypress.json
```

This file contains your unique `projectId`, and any specific Cypress configuration you add.

It is okay to commit this file to `git`.

## 4. Run in Travis CI

It is very simple to get Cypress up and running in Travis CI.

There are two things you'll need to do:

1. Add your repo to Travis CI
2. Add your project's `secret key` to Travis CI

This secret key is how Cypress verifies your project is allowed to run in CI. This key can (currently) only be obtained from the CLI Tool.

#### Add your repo to Travis CI

* Log into www.travis-ci.org
* Switch `ON` your `examples-react-travis-ci` fork

#### Obtaining your secret key

You must install the Cypress CLI tool (mentioned in Step 1)

Run this command from your terminal:

```bash
## this will return your secret key
cypress get:key
```

```bash
## you'll see a key that looks like this
703b33d9-a00e-4c66-90c2-40efc0fee2c6
```

#### Provide this secret key to Travis CI

You have a few different ways to provide the secret to travis, but you only have to do one of these:

* Simply add it directly in your `.travis.yml` file
* Or configure Environment Variables on Travis CI's site
* Or use Travis CI's encrypt tool to encrypt your key

#### Adding your key in `.travis.yml` file

This is the simplest way to provide your `secret key`.

However if your `.travis.yml` file is committed to a public project (like this one), anyone will be able see your project's secret key.

But if you're committing to a private github project this may not matter to you.

To add this to your `.travis.yml` file:

* Edit the `examples-react-travis-ci/.travis.yml` file
* Paste your secret project key as an argument to the `cypress ci` command.

The command should look like:

```
cypress ci 703b33d9-a00e-4c66-90c2-40efc0fee2c6
```

Commit this change and you are done, your tests should run in Travis CI.

**Note:**
> Passing a specific secret key will override the CYPRESS_API_KEY environment variable you may have configured.

#### Configuring Environment Variables

Instead of writing your secret key directly into your `.travis.yml`, you can configure this key as an `environment variable`.

* Log into www.travis-ci.org
* Go to your repo's `Settings`
* Under `Environment Variables`
* Set `Name` to: `CYPRESS_API_KEY`
* Set `Value` to whatever your secret key is.

The name of the key must match `CYPRESS_API_KEY`.

You are now done. The next time you commit anything to this repo, Travis CI should run your tests.

#### Securing your secret project key

One last way Travis CI offers to secure secret keys is their own `encrypt` tool.

[Read the docs here](http://docs.travis-ci.com/user/encryption-keys/) to learn how.
