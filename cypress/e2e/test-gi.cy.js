describe("Testing the to do items", () => {
  let TODO_ITEM_ONE = "Make every second count";
  let TODO_ITEM_TWO = "Invest in yourself";
  let TODO_ITEM_THREE = "Learn Cypress";

  beforeEach(() => {
    cy.visit("http://localhost:8888/#/");
  });

  it("displays items", () => {
    cy.get(".new-todo").type(TODO_ITEM_ONE).type("{enter}");
    cy.get(".new-todo").type(TODO_ITEM_TWO).type("{enter}");
    cy.get(".new-todo").type(TODO_ITEM_THREE).type("{enter}");
  });
});

context("Mark all as completed", function () {
  // New commands used here:
  // - cy.check    https://on.cypress.io/api/check
  // - cy.uncheck  https://on.cypress.io/api/uncheck

  beforeEach(function () {
    // This is an example of aliasing
    // within a hook (beforeEach).
    // Aliases will automatically persist
    // between hooks and are available
    // in your tests below
    cy.createDefaultTodos().as("todos");
  });

  it("should allow me to mark all items as completed", function () {
    // complete all todos
    // we use 'check' instead of 'click'
    // because that indicates our intention much clearer
    cy.get(".toggle-all").check();

    // get each todo li and ensure its class is 'completed'
    cy.get("@todos").eq(0).should("have.class", "completed");

    cy.get("@todos").eq(1).should("have.class", "completed");

    cy.get("@todos").eq(2).should("have.class", "completed");
  });
});
