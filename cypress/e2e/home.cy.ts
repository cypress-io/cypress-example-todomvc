context("Home page", () => {
    describe("Main page", () => {
        beforeEach(() => {
            cy.visit("http://localhost:8888")
        })
        it("should be h1 in document ", () => {
        cy.get("[data-reactid='.0.0.0']").contains("todos")
        })
    })
})