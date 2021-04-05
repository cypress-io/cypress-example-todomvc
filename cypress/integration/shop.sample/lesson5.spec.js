import { HomePage } from './lesson5.page'

describe('Test POM', () => {
  const homePage = new HomePage ()

  beforeEach(function () {
    homePage.navigate()
  })

  it('opens home page', () => {
    homePage.headerLogo().should('exist')
  })

  it('search product by keyword', () => {
    let searchResultPage = homePage.searchSection.searchBy('Blouse')

    searchResultPage.header().should('contain', 'Blouse')
    searchResultPage.products().its('length').should('be.gt', 0)
  })
})
