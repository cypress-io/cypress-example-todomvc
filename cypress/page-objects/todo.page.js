import { Page } from './page';
import { FooterSection } from './footer.section';

export class TodoPage extends Page {
  constructor () {
    super()
    this.footer = new FooterSection()
  }

  newTodo () { return cy.get('.new-todo') }
  todoItems () { return cy.get('.todo-list li') }
  completeBtn() { return cy.get('.toggle[type="checkbox"]') }
  filterBtn(status) { return cy.contains('a', status) }
  clearBtn() { return cy.contains('button', 'Clear completed') }
  todoCount() { return cy.get('.todo-count') }

  navigate () {
    cy.visit('/')
  }

  addItems(items) {
    for (let item of items) {
      this.newTodo().type(item).type('{enter}')
    }
  }

  verifyItems(items) {
    this.todoItems().should('have.length', items.length)
    for (let item of items) {
      this.todoItems().should('contain', item)
    }
  }

  editItem(newText) {
    this.todoItems()
    .dblclick()
    .find('.edit')
    .clear()
    .type(newText)
    .type('{enter}')
  }

  completeItem() {
    this.completeBtn().check()
  }

  filterBy(status) {
    this.filterBtn(status).click()
  }

  clearCompleted() {
    this.clearBtn().click()
  }

  removeItem() {
    this.todoItems()
    .trigger('mouseover').get('.destroy')
    .invoke('show').should('be.visible')
    .click()
  }
}

export const todoPage = new TodoPage()
