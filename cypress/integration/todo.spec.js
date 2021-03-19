describe('TodoMVC - React', () => {
  // items description
  const NEW_ITEMS = [
    'My first todo',
    'My second todo',
  ]
  const EDITED_ITEM = 'Updated todo'

  // LocalStorage helper methods
  const getTodosFromLocalStorage = () => {
    let storage = localStorage.getItem('react-todos')

    return JSON.parse(storage)
  }

  const checkTodosInLocalStorage = (count) => {
    let obj = getTodosFromLocalStorage()

    expect(obj.length).to.eq(count)
    for (let i = 0; i < count; i++) {
      expect(obj[i].title).to.eq(NEW_ITEMS[i])
    }
  }

  const addTodoItemInLocalStorage = (id = '1', title = NEW_ITEMS[0], completed = false) => {
    let data = [{ id, title, completed }]

    localStorage.setItem('react-todos', JSON.stringify(data))
  }

  const addMultipleTodoItemsInLocalStorage = (data) => {
    localStorage.setItem('react-todos', JSON.stringify(data))
  }

  // elements
  const todoItems = () => {
    return cy.get('.todo-list li').as('todo')
  }

  // specs
  beforeEach(function () {
    cy.visit('/')
  })

  it('shows a form for adding todo items', () => {
    cy.get('h1').should('contain', 'todos')
    cy.get('.new-todo').should('have.attr', 'placeholder', 'What needs to be done?')
    todoItems().should('have.length', 0)
  })

  it('adds new items', () => {
    cy.get('.new-todo')
    .type(NEW_ITEMS[0]).type('{enter}')
    .type(NEW_ITEMS[1]).type('{enter}')

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

  it('filters by active items', () => {
    addMultipleTodoItemsInLocalStorage(
      [
        { id: '1', title: 'Active item', completed: false },
        { id: '2', title: 'Completed item', completed: true },
      ],
    )

    cy.contains('a', 'Active').click()
    todoItems()
    .should('have.length', 1)
    .should('contain', 'Active item')
  })

  it('filters by completed items', () => {
    addMultipleTodoItemsInLocalStorage(
      [
        { id: '1', title: 'Active item', completed: false },
        { id: '2', title: 'Completed item', completed: true },
      ],
    )

    cy.contains('a', 'Completed').click()
    todoItems()
    .should('have.length', 1)
    .should('contain', 'Completed item')
  })

  it('clears all completed items', () => {
    addMultipleTodoItemsInLocalStorage(
      [
        { id: '1', title: 'Active item', completed: false },
        { id: '2', title: 'Completed item', completed: true },
      ],
    )

    cy.contains('button', 'Clear completed').click()
    todoItems()
    .should('have.length', 1)
    .should('contain', 'Active item')

    cy.get('.todo-count')
    .should('have.text', '1 item left')
  })

  it('deletes the todo', () => {
    addTodoItemInLocalStorage()

    cy.get('.todo-count')
    .should('have.text', '1 item left')

    todoItems()
    .trigger('mouseover').get('.destroy')
    .invoke('show').should('be.visible')
    .click()

    todoItems().should('have.length', 0)

    cy.get('.todo-count')
    .should('not.exist')
  })
})
