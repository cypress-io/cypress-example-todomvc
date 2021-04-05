export class BasePage {
  header() { return cy.get('h1') }
  headerLogo() { return cy.get('img.logo') }
}

export class HomePage extends BasePage {
  constructor() {
    super()
    this.searchSection = new SearchSection ()
  }

  navigate () { cy.visit('http://automationpractice.com/index.php') }
}

class SearchSection {
  searchField () { return cy.get('.search_query') }

  searchBy(keyword) {
    this.searchField().type(keyword).type('{enter}')
    return new SearchResultPage ()
  }
}

export class SearchResultPage extends BasePage {
  constructor() {
    super()
  }

  products() { return cy.get('.product_list>li') }
}

export const homePage = new HomePage ()
export const searchResultPage = new SearchResultPage ()
