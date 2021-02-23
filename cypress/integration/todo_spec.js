describe('TodoMVC - React', () => {
  // items description
  const NEW_ITEMS = [
    'My first todo',
    'My second todo',
  ]
  const EDITED_ITEM = 'Updated todo'

  // LocalStorage helper methods
  function getTodosFromLocalStorage () {
    let storage = localStorage.getItem('react-todos')

    return JSON.parse(storage)
  }

  function checkTodosInLocalStorage (count) {
    let obj = getTodosFromLocalStorage()

    expect(obj.length).to.eq(count)
    for (let i = 0; i < count; i++) {
      expect(obj[i].title).to.eq(NEW_ITEMS[i])
    }
  }

  function addTodoItemInLocalStorage () {
    let data = [{ id: '10cbe0d9-0ebd-424b-b5a9-a7f9867dd1cc', title: NEW_ITEMS[0] }]

    localStorage.setItem('react-todos', JSON.stringify(data))
  }

  // elements
  function todoItems () {
    return cy.get('.todo-list li').as('todo')
  }

  // specs
  beforeEach(function () {
    cy.visit('/')
  })

  it('adds new items', () => {
    cy.get('.new-todo')
    .type(NEW_ITEMS[0])
    .type('{enter}')
    .type(NEW_ITEMS[1])
    .type('{enter}')

    todoItems().should('have.length', 2).then(() => {
      checkTodosInLocalStorage(2)
    })
  })

  it('completes an item', () => {
    addTodoItemInLocalStorage()
    cy.get('.toggle[type="checkbox"]').check()

    todoItems().should('have.class', 'completed')
  })

  it('edits an existing todo', () => {
    addTodoItemInLocalStorage()
    todoItems()
    .dblclick()
    .find('.edit')
    .clear()
    .type(EDITED_ITEM)
    .type('{enter}')

    todoItems()
    .should('contain', EDITED_ITEM)
  })

  it('verify hint message', () => {
    cy.get('input:first')
    .should('have.attr', 'placeholder', 'What needs to be done?')
  })

  it('Verify logo text', () => {
    cy.get('.header')
    .should('contain.text', 'todos')
  })

  it.only('verify Active items section', () => {
    addTodoItemInLocalStorage()
    cy.get('a[href="#/active"').click()
  })

  it('verify Completed items section', () => {

  })
})
