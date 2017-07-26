beforeEach(() => {
  cy.visit('http://localhost:8888')
})

it('can insert new todo', () => {
  cy.get('.new-todo').type('first todo{enter}')
  cy.get('ul.todo-list').find('li').should('have.length', 2)
})
