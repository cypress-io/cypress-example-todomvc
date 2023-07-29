////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
describe("Todo App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("New Todo", function () {
    it("should add three todo items", function () {
      cy.addTodoItem("Make every second count");
      cy.addTodoItem("Invest in yourself");
      cy.addTodoItem("Learn Cypress");

      cy.validateTodoItem(0, "Make every second count");
      cy.validateTodoItem(1, "Invest in yourself");
      cy.validateTodoItem(2, "Learn Cypress");
    });
    Cypress.Commands.add("addTodoItem", (todoText) => {
      cy.get(".new-todo").type(todoText).type("{enter}");
    });
  
    Cypress.Commands.add("validateTodoItem", (index, todoText) => {
      cy.get(".todo-list li").eq(index).find("label").should("contain", todoText);
    });

    // it("should mark 'Learn Cypress' as complete", function () {
    //   cy.get(".todo-list li").contains("Learn Cypress").find(".toggle").check();

    //   cy.get(".todo-list li")
    //     .contains("Learn Cypress")
    //     .should("have.class", "completed");
    // });

    // it("should validate the text of all items", function () {
    //   cy.get(".todo-list li").should("have.length", 3);
    //   cy.validateTodoItem(0, "Make every second count");
    //   cy.validateTodoItem(1, "Invest in yourself");
    //   cy.validateTodoItem(2, "Learn Cypress");
    // });
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
