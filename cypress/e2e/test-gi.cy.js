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

    it("should mark 'Learn Cypress' as complete", function () {
      cy.get(".todo-list li").contains("Learn Cypress").find(".toggle").check();

      cy.get(".todo-list li")
        .contains("Learn Cypress")
        .should("have.class", "completed");
    });

    it("should validate the text of all items", function () {
      cy.get(".todo-list li").should("have.length", 3);
      cy.validateTodoItem(0, "Make every second count");
      cy.validateTodoItem(1, "Invest in yourself");
      cy.validateTodoItem(2, "Learn Cypress");
    });
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("Testing the to do items", () => {
//   let TODO_ITEM_ONE = "Make every second count";
//   let TODO_ITEM_TWO = "Invest in yourself";
//   let TODO_ITEM_THREE = "Learn Cypress";

//   beforeEach(() => {
//     cy.visit("http://localhost:8888/#/");
//   });

//   it("displays items", () => {
//     cy.get(".new-todo").type(TODO_ITEM_ONE).type("{enter}");
//     cy.get(".new-todo").type(TODO_ITEM_TWO).type("{enter}");
//     cy.get(".new-todo").type(TODO_ITEM_THREE).type("{enter}");
//   });
// });

// context("Mark all as completed", function () {
//   beforeEach(function () {
//     cy.createDefaultTodos().as("todos");
//   });

//   it("should allow me to mark all items as completed", function () {
//     cy.get(".toggle-all").check();

//     cy.get("@todos").eq(0).should("have.class", "completed");

//     cy.get("@todos").eq(1).should("have.class", "completed");

//     cy.get("@todos").eq(2).should("have.class", "completed");
//   });
// });