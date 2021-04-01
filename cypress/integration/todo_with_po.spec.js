import { todoPage } from '../page-objects/todo.page'
import { localStorageHelper } from '../helpers/local-storage.helper'

describe('TodoMVC with Page Objects', () => {
  beforeEach(() => {
    todoPage.navigate()
  })

  it('shows a form for adding todo items', () => {
    todoPage.header().should('contain', 'todos')
    todoPage.newTodo().should('have.attr', 'placeholder', 'What needs to be done?')
    todoPage.todoItems().should('have.length', 0)
    todoPage.footer.info().should('contain', 'Double-click to edit a todo')
  })

  it('adds new items', () => {
    let items = [
      'My first todo',
      'My second todo',
    ]

    todoPage.addItems(items)
    todoPage.verifyItems(items)
  })

  it('completes an item', () => {
    localStorageHelper.addTodoItemInLocalStorage()
    cy.get('.toggle[type="checkbox"]').check()

    todoPage.todoItems().should('have.class', 'completed')
  })

  it('edits an existing todo', () => {
    let item = 'Updated todo'

    localStorageHelper.addTodoItemInLocalStorage()
    todoPage.editItem(item)

    todoPage.todoItems()
    .should('contain', item)
  })

  it('filters by active items', () => {
    localStorageHelper.addMultipleTodoItemsInLocalStorage(
      [
        { id: '1', title: 'Active item', completed: false },
        { id: '2', title: 'Completed item', completed: true },
      ],
    )

    todoPage.filterBy('Active')
    todoPage.todoItems()
    .should('have.length', 1)
    .should('contain', 'Active item')
  })

  it('filters by completed items', () => {
    localStorageHelper.addMultipleTodoItemsInLocalStorage(
      [
        { id: '1', title: 'Active item', completed: false },
        { id: '2', title: 'Completed item', completed: true },
      ],
    )

    todoPage.filterBy('Completed')
    todoPage.todoItems()
    .should('have.length', 1)
    .should('contain', 'Completed item')
  })

  it('clears all completed items', () => {
    localStorageHelper.addMultipleTodoItemsInLocalStorage(
      [
        { id: '1', title: 'Active item', completed: false },
        { id: '2', title: 'Completed item', completed: true },
      ],
    )

    todoPage.clearCompleted()
    todoPage.todoItems()
    .should('have.length', 1)
    .should('contain', 'Active item')

    todoPage.todoCount()
    .should('have.text', '1 item left')
  })

  it('deletes the todo', () => {
    localStorageHelper.addTodoItemInLocalStorage()

    todoPage.todoCount()
    .should('have.text', '1 item left')

    todoPage.removeItem()

    todoPage.todoItems().should('have.length', 0)

    todoPage.todoCount()
    .should('not.exist')
  })
})
