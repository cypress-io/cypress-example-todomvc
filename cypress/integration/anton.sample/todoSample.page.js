export class TodoSamplePage {

    navigate () {
        cy.visit('/')
    }

    todoHeader() {
        return cy.get('h1')
    }

    newTodoInputField() {
        return cy.get('.new-todo')
    }

    todoItem(itemText) {
        return cy.contains('.todo-list li > div > label', itemText)
    }

    checkBox(itemText) {
        return cy.contains('.todo-list li > div > label', itemText).prev()
    }

    todoItemLi(itemText) {
        return cy.contains('.todo-list li', itemText)
    }

    todoEditableItem() {
        return cy.get('.editing > .edit')
    }

    deleteBtn(itemText) {
        return cy.contains('.todo-list li > div > label', itemText).next()
    }

    filterBtn(btnName) {
        return cy.contains('a', btnName)
    }

    todoCount(number) {
        return cy.contains('.todo-count > strong', number)
    }

    todoFooter() {
        return cy.get('.info')
    }

    clrButton() {
        return cy.get('.clear-completed')
    }

}

export const todoSamplePage = new TodoSamplePage ()
