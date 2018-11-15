/* eslint-env browser */
it('adds 1 todo', function () {
  cy.get('.new-todo').type('first todo{enter}')
  cy.get('.new-todo').type('second todo{enter}')
  cy.get('.todo-list li').should('have.length', 2)
  .first()
  .find(':checkbox').check()

  cy.contains('.filters li', 'Active').click()
  cy.url().should('include', 'active')

  cy.contains('.filters li', 'Completed').click()
  cy.url().should('include', 'completed')

  cy.contains('.filters li', 'All').click()
  cy.url().should('include', '#/')
})
