/// <reference types="cypress" />

describe('TodoMVC', () => {
  it('adds todos', () => {
    cy.visit('/')
    cy.get('.new-todo').type('write code{enter}').type('write tests{enter}')
    cy.get('.todo-list li')
    .should('have.length', 2)
    .first()
    .find('.toggle')
    .click()

    cy.get('.todo-list li').first().should('have.class', 'completed')
    cy.get('.todo-list li').eq(1).should('not.have.class', 'completed')
  })
})
