import { When, Then } from "cypress-cucumber-preprocessor/steps"

import { homePage } from '../lesson5.page'
import { searchResultPage } from '../lesson5.page'

When('I open Automation Practice website', () => {
  homePage.navigate()
})

When(`I search by {string} keyword`, (keyword) => {
  homePage.searchSection.searchBy(keyword)
  cy.wrap(keyword).as("keyword")
})

Then("I should be on home page", () => {
  homePage.headerLogo().should('exist')
})

Then('I should see relevant results', () => {
  cy.get("@keyword").then((keyword) => {
    searchResultPage.header().should('contain', keyword)
    searchResultPage.products().its('length').should('be.gt', 0)
  })
})
