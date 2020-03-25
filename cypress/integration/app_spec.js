// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../support" />

// check this file using TypeScript if available
// @ts-check

// ***********************************************
// All of these tests are written to implement
// the official TodoMVC tests written for Selenium.
//
// The Cypress tests cover the exact same functionality,
// and match the same test names as TodoMVC.
// Please read our getting started guide
// https://on.cypress.io/introduction-to-cypress
//
// You can find the original TodoMVC tests here:
// https://github.com/tastejs/todomvc/blob/master/tests/test.js
// ***********************************************

describe('TodoMVC - React', function() {
  // setup these constants to match what TodoMVC does
  let TODO_ITEM_ONE = 'buy some cheese';
  let TODO_ITEM_TWO = 'feed the cat';
  let TODO_ITEM_THREE = 'book a doctors appointment';

  beforeEach(function() {
    // By default Cypress will automatically
    // clear the Local Storage prior to each
    // test which ensures no todos carry over
    // between tests.
    //
    // Go out and visit our local web server
    // before each test, which serves us the
    // TodoMVC App we want to test against
    //
    // We've set our baseUrl to be http://localhost:8888
    // which is automatically prepended to cy.visit
    //
    // https://on.cypress.io/api/visit
    cy.visit('/');
  });

  afterEach(() => {
    // In firefox, blur handlers will fire upon navigation if there is an activeElement.
    // Since todos are updated on blur after editing,
    // this is needed to blur activeElement after each test to prevent state leakage between tests.
    cy.window().then(win => {
      // @ts-ignore
      win.document.activeElement.blur();
    });
  });

  // a very simple example helpful during presentations
  it('adds 2 todos', function() {
    cy.get('.new-todo')
      .type('learn testing{enter}')
      .type('be cool{enter}')
      .happoScreenshot({ component: 'New todo' });

    cy.get('.todo-list li').should('have.length', 2);
    cy.get('body').happoScreenshot({
      component: 'App',
      variant: 'two items added',
    });
  });

  context('No Todos', function() {
    it('should hide #main and #footer', function() {
      // Unlike the TodoMVC tests, we don't need to create
      // a gazillion helper functions which are difficult to
      // parse through. Instead we'll opt to use real selectors
      // so as to make our testing intentions as clear as possible.
      //
      // http://on.cypress.io/get
      cy.get('body').happoScreenshot({
        component: 'App',
        variant: 'empty',
      });
      cy.get('.todo-list li').should('not.exist');
      cy.get('.main').should('not.exist');
      cy.get('.footer').should('not.exist');
    });
  });

  context('Mark all as completed', function() {
    // New commands used here:
    // - cy.check    https://on.cypress.io/api/check
    // - cy.uncheck  https://on.cypress.io/api/uncheck

    beforeEach(function() {
      // This is an example of aliasing
      // within a hook (beforeEach).
      // Aliases will automatically persist
      // between hooks and are available
      // in your tests below
      cy.createDefaultTodos().as('todos');
    });

    it('should allow me to mark all items as completed', function() {
      // complete all todos
      // we use 'check' instead of 'click'
      // because that indicates our intention much clearer
      cy.get('.toggle-all').check();

      // get each todo li and ensure its class is 'completed'
      cy.get('@todos')
        .eq(0)
        .should('have.class', 'completed');

      cy.get('@todos')
        .eq(1)
        .should('have.class', 'completed');

      cy.get('@todos')
        .eq(2)
        .should('have.class', 'completed');

      cy.get('body').happoScreenshot({
        component: 'App',
        variant: 'all items completed',
      });
    });

    it('should allow me to clear the complete state of all items', function() {
      // check and then immediately uncheck
      cy.get('.toggle-all')
        .check()
        .uncheck();

      cy.get('@todos')
        .eq(0)
        .should('not.have.class', 'completed');

      cy.get('@todos')
        .eq(1)
        .should('not.have.class', 'completed');

      cy.get('@todos')
        .eq(2)
        .should('not.have.class', 'completed');

      cy.get('body').happoScreenshot({
        component: 'App',
        variant: 'all items uncompleted',
      });
    });
  });

  context('Editing', function() {
    // New commands used here:
    // - cy.blur    https://on.cypress.io/api/blur

    beforeEach(function() {
      cy.createDefaultTodos().as('todos');
    });

    it('should hide other controls when editing', function() {
      cy.get('@todos')
        .eq(1)
        .as('secondTodo')
        .find('label')
        .dblclick();

      cy.get('@secondTodo')
        .find('.toggle')
        .should('not.be.visible');

      cy.get('@secondTodo')
        .find('label')
        .should('not.be.visible');

      cy.get('body').happoScreenshot({
        component: 'App',
        variant: 'editing item',
      });
    });
  });

  context('Counter', function() {
    it('should display the current number of todo items', function() {
      cy.createTodo(TODO_ITEM_ONE);
      cy.get('.todo-count')
        .contains('1 item left')
        .happoScreenshot({ component: 'Counter', variant: '1 item left' });
      cy.createTodo(TODO_ITEM_TWO);
      cy.get('.todo-count')
        .contains('2 items left')
        .happoScreenshot({ component: 'Counter', variant: '2 items left' });
    });
  });
});
