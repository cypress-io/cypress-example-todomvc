// ***********************************************
// This example commands.js shows you how to
// create the custom commands: 'createDefaultTodos'
// and 'createTodo'.
//
// The commands.js file is a great place to
// modify existing commands and create custom
// commands for use throughout your tests.
//
// You can read more about custom commands here:
// https://on.cypress.io/commands
// ***********************************************

/* eslint-env browser */

// libraries that compute selectors compared in
// https://github.com/fczbkk/css-selector-generator-benchmark
const finder = require('@medv/finder').default

before(() => {
  window.testedSelectors = []
})

after(() => {
  const selectors = Cypress._.uniq(window.testedSelectors)

  // eslint-disable-next-line no-console
  console.log('tested the following selectors:', selectors)

  // shortcut to get application's window context
  // without going through cy.window() command
  const win = cy.state('window')

  selectors.forEach((selector) => {
    const el = win.document.querySelector(selector)

    if (el) {
      el.style.opacity = 1
      el.style.border = '1px solid magenta'
    }
  })
})

const getSelector = ($el) => {
  if ($el.attr('data-cy')) {
    return `[data-cy=${$el.attr('data-cy')}]`
  }

  return finder($el[0], {
    // a trick to point "finder" at the application's iframe
    root: cy.state('window').document.body,
  })
}

Cypress.Commands.overwrite('type', function (type, $el, text, options) {
  const selector = getSelector($el)

  window.testedSelectors.push(selector)

  return type($el, text, options)
})

Cypress.Commands.overwrite('check', function (check, $el, options) {
  const selector = getSelector($el)

  window.testedSelectors.push(selector)

  return check($el, options)
})

Cypress.Commands.overwrite('click', function (click, $el, options) {
  const selector = getSelector($el)

  window.testedSelectors.push(selector)

  return click($el, options)
})

Cypress.Commands.add('createDefaultTodos', function () {

  let TODO_ITEM_ONE = 'buy some cheese'
  let TODO_ITEM_TWO = 'feed the cat'
  let TODO_ITEM_THREE = 'book a doctors appointment'

  // begin the command here, which by will display
  // as a 'spinning blue state' in the UI to indicate
  // the command is running
  let cmd = Cypress.log({
    name: 'create default todos',
    message: [],
    consoleProps () {
      // we're creating our own custom message here
      // which will print out to our browsers console
      // whenever we click on this command
      return {
        'Inserted Todos': [TODO_ITEM_ONE, TODO_ITEM_TWO, TODO_ITEM_THREE],
      }
    },
  })

  // additionally we pass {log: false} to all of our
  // sub-commands so none of them will output to
  // our command log

  cy.get('.new-todo', { log: false })
  .type(`${TODO_ITEM_ONE}{enter}`, { log: false })
  .type(`${TODO_ITEM_TWO}{enter}`, { log: false })
  .type(`${TODO_ITEM_THREE}{enter}`, { log: false })

  cy.get('.todo-list li', { log: false })
  .then(function ($listItems) {
    // once we're done inserting each of the todos
    // above we want to return the .todo-list li's
    // to allow for further chaining and then
    // we want to snapshot the state of the DOM
    // and end the command so it goes from that
    // 'spinning blue state' to the 'finished state'
    cmd.set({ $el: $listItems }).snapshot().end()
  })
})

Cypress.Commands.add('createTodo', function (todo) {

  let cmd = Cypress.log({
    name: 'create todo',
    message: todo,
    consoleProps () {
      return {
        'Inserted Todo': todo,
      }
    },
  })

  // create the todo
  cy.get('.new-todo', { log: false }).type(`${todo}{enter}`, { log: false })

  // now go find the actual todo
  // in the todo list so we can
  // easily alias this in our tests
  // and set the $el so its highlighted
  cy.get('.todo-list', { log: false })
  .contains('li', todo.trim(), { log: false })
  .then(function ($li) {
    // set the $el for the command so
    // it highlights when we hover over
    // our command
    cmd.set({ $el: $li }).snapshot().end()
  })
})
