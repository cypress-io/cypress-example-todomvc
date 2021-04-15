import { When, Then } from "cypress-cucumber-preprocessor/steps"

import { todoSamplePage } from '../todoSample.page'
import { localStorageHelper } from '../../../helpers/local-storage.helper'

When(`I add items via localStorage`, () => {
    localStorageHelper.addItemsToLocalStorage()
})

When('I open todo list page', () => {
    todoSamplePage.navigate()
})

Then ('I see that header is shown', () => {
    todoSamplePage.todoHeader().should('be.visible')
})

Then ('I see that footer is shown', () => {
    todoSamplePage.todoFooter().should('be.visible')
})

When(`I type {string} into input field and press Enter`, (keyword) => {
    todoSamplePage.newTodoInputField().type(keyword)
    cy.wrap(keyword).as("keyword")
    todoSamplePage.newTodoInputField().type('{enter}')
})

When(`I see that {string} item is presented`, (itemText) => {
    todoSamplePage.todoItem(itemText).should('be.visible')
})

When(`I check off {string} item`, (itemText) => {
    todoSamplePage.checkBox(itemText).check()
})

When(`I see that {string} item is changed to completed`, (itemText) => {
    todoSamplePage.todoItemLi(itemText).should('have.class', 'completed')
})

When (`I delete {string} item`, (itemText) => {
    todoSamplePage.todoItemLi(itemText).trigger('mouseover')
    todoSamplePage.deleteBtn(itemText).invoke('show').should('be.visible')
    todoSamplePage.deleteBtn(itemText).click()
})

When(`I see that {string} item is not presented`, (itemText) => {
    todoSamplePage.todoItem(itemText).should('not.exist')
})

When(`I double click on {string} item`, (itemText) => {
    todoSamplePage.todoItemLi(itemText).dblclick()
    todoSamplePage.todoItemLi(itemText).clear()
})

When(`I type {string} into edit field and press Enter`, (keyword) => {
    todoSamplePage.todoEditableItem().type(keyword)
    cy.wrap(keyword).as("keyword")
    todoSamplePage.todoEditableItem().type('{enter}')
})

When(`I see that "Clear completed" button is not presented`, () => {
    todoSamplePage.clrButton().should('not.exist')
})

When(`I see that "Clear completed" button appears`, () => {
    todoSamplePage.clrButton().should('exist')
})

Then(`I see that number of left items is {string}`, (number) => {
    todoSamplePage.todoCount(number).should('have.text', number)
})

Then(`I click {string} filter button`, (btnName) => {
    todoSamplePage.filterBtn(btnName).click()
})

When(`I click "Clear completed" button`, () => {
    todoSamplePage.clrButton().click()
})
