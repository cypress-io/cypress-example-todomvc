/* eslint-env browser */
beforeEach(() => {
  cy.visit('/')
})
it('works', function () {
  cy.get('.new-todo').type('first todo{enter}')
  cy.get('.new-todo').type('second todo{enter}')
  cy.get('.todo-list li').should('have.length', 2)
    .first().find(':checkbox').check()

  cy.contains('.filters a', 'Active').click()
  cy.url().should('include', 'active')

  cy.contains('.filters a', 'Completed').click()
  cy.url().should('include', 'completed')

  cy.contains('.filters a', 'All').click()
  cy.url().should('include', '#/')
})
