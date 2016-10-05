// ***********************************************
// All of these tests are written to implement
// the official TodoMVC tests written for Selenium.
//
// The Cypress tests cover the exact same functionality,
// and match the same test names as TodoMVC.
//
// Most tests are heavily commented because this example
// app should serve as an introduction to Cypress. Once
// you become familiar with the API these comments are
// completely unnecessary.
//
// You can find the original TodoMVC tests here:
// https://github.com/tastejs/todomvc/blob/master/tests/test.js
// ***********************************************

describe("TodoMVC - React", function(){

  // setup these constants to match what TodoMVC does
  var TODO_ITEM_ONE   = "buy some cheese"
  var TODO_ITEM_TWO   = "feed the cat"
  var TODO_ITEM_THREE = "book a doctors appointment"

  beforeEach(function(){
    // By default Cypress will automatically
    // clear the Local Storage prior to each
    // test which ensures no todos carry over
    // between tests.
    //
    // Go out and visit our local web server
    // before each test, which serves us the
    // TodoMVC App we want to test against
    //
    // https://on.cypress.io/api/visit
    cy.visit("http://localhost:8888")
  })

  context("When page is initially opened", function(){
    it("should focus on the todo input field", function(){
      // get the currently focused element and assert
      // that it has class="new-todo"
      //
      // https://on.cypress.io/api/focused
      cy.focused().should("have.class", "new-todo")
    })
  })

  context("No Todos", function(){
    it("should hide #main and #footer", function(){
      // Unlike the TodoMVC tests, we don't need to create
      // a gazillion helper functions which are difficult to
      // parse through. Instead we'll opt to use real selectors
      // so as to make our testing intentions as clear as possible.
      //
      // https://on.cypress.io/api/get
      cy
        .get(".todo-list li").should("not.exist")
        .get(".main").should("not.exist")
        .get(".footer").should("not.exist")
    })
  })

  context("New Todo", function(){
    // New commands used here:
    // - cy.type     https://on.cypress.io/api/type
    // - cy.eq       https://on.cypress.io/api/eq
    // - cy.find     https://on.cypress.io/api/find
    // - cy.contains https://on.cypress.io/api/contains
    // - cy.should   https://on.cypress.io/api/should
    // - cy.as       https://on.cypress.io/api/as

    // New concepts introduced:
    // - Aliasing    https://on.cypress.io/api/aliasing
    // - Assertions  https://on.cypress.io/api/assertions

    it("should allow me to add todo items", function(){
      cy
        // create 1st todo
        .get(".new-todo").type(TODO_ITEM_ONE).type("{enter}")

        // make sure the 1st label contains the 1st todo text
        .get(".todo-list li").eq(0).find("label").should("contain", TODO_ITEM_ONE)

        // create 2nd todo
        .get(".new-todo").type(TODO_ITEM_TWO).type("{enter}")

        // make sure the 2nd label contains the 2nd todo text
        .get(".todo-list li").eq(1).find("label").should("contain", TODO_ITEM_TWO)
    })

    it("should clear text input field when an item is added", function(){
      cy
        .get(".new-todo").type(TODO_ITEM_ONE).type("{enter}")
        .get(".new-todo").should("have.text", "")
    })

    it("should append new items to the bottom of the list", function(){
      cy
        // this is an example of a custom command
        // which is stored in tests/_support/spec_helper.js
        // you should open up the spec_helper and look at
        // the comments!
        .createDefaultTodos().as("todos")

        // even though the text content is split across
        // multiple <span> and <strong> elements
        // `cy.contains` can verify this correctly
        .get(".todo-count").contains("3 items left")

        .get("@todos").eq(0).find("label").should("contain", TODO_ITEM_ONE)
        .get("@todos").eq(1).find("label").should("contain", TODO_ITEM_TWO)
        .get("@todos").eq(2).find("label").should("contain", TODO_ITEM_THREE)
    })

    it("should trim text input", function(){
      cy
        // this is an example of another custom command
        // since we repeat the todo creation over and over
        // again. It's up to you to decide when to abstract
        // repetitive behavior and roll that up into a custom
        // command vs explicitly writing the code.
        .createTodo("    " + TODO_ITEM_ONE + "    ")

        // we use as explicit assertion here about the text instead of
        // using 'contain' so we can specify the exact text of the element
        // does not have any whitespace around it
        .get(".todo-list li").eq(0).should("have.text", TODO_ITEM_ONE)
    })

    it("should show #main and #footer when items added", function(){
      cy
        .createTodo(TODO_ITEM_ONE)
        .get(".main").should("be.visible")
        .get(".footer").should("be.visible")
    })
  })

  context("Mark all as completed", function(){
    // New commands used here:
    // - cy.check    https://on.cypress.io/api/check
    // - cy.uncheck  https://on.cypress.io/api/uncheck

    beforeEach(function(){
      // This is an example of aliasing
      // within a hook (beforeEach).
      // Aliases will automatically persist
      // between hooks and are available
      // in your tests below
      cy.createDefaultTodos().as("todos")
    })

    it("should allow me to mark all items as completed", function(){
      cy
        // complete all todos
        // we use 'check' instead of 'click'
        // because that indicates our intention much clearer
        .get(".toggle-all").check()

        // get each todo li and ensure its class is 'completed'
        .get("@todos").eq(0).should("have.class", "completed")
        .get("@todos").eq(1).should("have.class", "completed")
        .get("@todos").eq(2).should("have.class", "completed")
    })

    it("should allow me to clear the complete state of all items", function(){
      cy
        // check and then immediately uncheck
        .get(".toggle-all").check().uncheck()

        .get("@todos").eq(0).should("not.have.class", "completed")
        .get("@todos").eq(1).should("not.have.class", "completed")
        .get("@todos").eq(2).should("not.have.class", "completed")
    })

    it("complete all checkbox should update state when items are completed / cleared", function(){
      cy
        // alias the .toggle-all for reuse later
        .get(".toggle-all").as("toggleAll")
          .check()
          // this assertion is silly here IMO but
          // it is what TodoMVC does
          .should("be.checked")

        // alias the first todo and then click it
        .get(".todo-list li").eq(0).as("firstTodo")
          .find(".toggle")
          .uncheck()

        // reference the .toggle-all element again
        // and make sure its not checked
        .get("@toggleAll").should("not.be.checked")

        // reference the first todo again and now toggle it
        .get("@firstTodo").find(".toggle").check()

        // assert the toggle all is checked again
        .get("@toggleAll").should("be.checked")
    })
  })

  context("Item", function(){
    // New commands used here:
    // - cy.clear    https://on.cypress.io/api/clear

    it("should allow me to mark items as complete", function(){
      cy
        // we are aliasing the return value of
        // our custom command 'createTodo'
        //
        // the return value is the <li> in the <ul.todos-list>
        .createTodo(TODO_ITEM_ONE).as("firstTodo")
        .createTodo(TODO_ITEM_TWO).as("secondTodo")

        .get("@firstTodo").find(".toggle").check()
        .get("@firstTodo").should("have.class", "completed")

        .get("@secondTodo").should("not.have.class", "completed")
        .get("@secondTodo").find(".toggle").check()

        .get("@firstTodo").should("have.class", "completed")
        .get("@secondTodo").should("have.class", "completed")
    })

    it("should allow me to un-mark items as complete", function(){
      cy
        .createTodo(TODO_ITEM_ONE).as("firstTodo")
        .createTodo(TODO_ITEM_TWO).as("secondTodo")

        .get("@firstTodo").find(".toggle").check()
        .get("@firstTodo").should("have.class", "completed")
        .get("@secondTodo").should("not.have.class", "completed")

        .get("@firstTodo").find(".toggle").uncheck()
        .get("@firstTodo").should("not.have.class", "completed")
        .get("@secondTodo").should("not.have.class", "completed")
    })

    it("should allow me to edit an item", function(){
      cy
        .createDefaultTodos().as("todos")

        .get("@todos").eq(1).as("secondTodo")
          // TODO: fix this, dblclick should
          // have been issued to label
          .find("label").dblclick()

        // clear out the inputs current value
        // and type a new value
        .get("@secondTodo").find(".edit").clear()
          .type("buy some sausages").type("{enter}")

        // explicitly assert about the text value
        .get("@todos").eq(0).should("contain", TODO_ITEM_ONE)
        .get("@secondTodo").should("contain", "buy some sausages")
        .get("@todos").eq(2).should("contain", TODO_ITEM_THREE)
    })
  })

  context("Editing", function(){
    // New commands used here:
    // - cy.blur    https://on.cypress.io/api/blur

    beforeEach(function(){
      cy.createDefaultTodos().as("todos")
    })

    it("should hide other controls when editing", function(){
      cy
        .get("@todos").eq(1).as("secondTodo")
          .find("label").dblclick()

        .get("@secondTodo").find(".toggle").should("not.be.visible")
        .get("@secondTodo").find("label").should("not.be.visible")

    })

    it("should save edits on blur", function(){
      cy
        .get("@todos").eq(1).as("secondTodo")
          .find("label").dblclick()

        .get("@secondTodo")
          .find(".edit").clear()
          .type("buy some sausages")

          // we can just send the blur event directly
          // to the input instead of having to click
          // on another button on the page. though you
          // could do that its just more mental work
          .blur()

        .get("@todos").eq(0).should("contain", TODO_ITEM_ONE)
        .get("@secondTodo").should("contain", "buy some sausages")
        .get("@todos").eq(2).should("contain", TODO_ITEM_THREE)
    })

    it("should trim entered text", function(){
      cy
        .get("@todos").eq(1).as("secondTodo")
          .find("label").dblclick()

        .get("@secondTodo")
          .find(".edit").clear()
          .type("    buy some sausages    ").type("{enter}")

        .get("@todos").eq(0).should("contain", TODO_ITEM_ONE)
        .get("@secondTodo").should("contain", "buy some sausages")
        .get("@todos").eq(2).should("contain", TODO_ITEM_THREE)
    })

    it("should remove the item if an empty text string was entered", function(){
      cy
        .get("@todos").eq(1).as("secondTodo")
          .find("label").dblclick()

        .get("@secondTodo")
          .find(".edit").clear().type("{enter}")

        .get("@todos").should("have.length", 2)
    })

    it("should cancel edits on escape", function(){
      cy
        .get("@todos").eq(1).as("secondTodo")
          .find("label").dblclick()

        .get("@secondTodo")
          .find(".edit").clear().type("foo{esc}")

        .get("@todos").eq(0).should("contain", TODO_ITEM_ONE)
        .get("@todos").eq(1).should("contain", TODO_ITEM_TWO)
        .get("@todos").eq(2).should("contain", TODO_ITEM_THREE)
    })
  })

  context("Counter", function(){
    it("should display the current number of todo items", function(){
      cy
        .createTodo(TODO_ITEM_ONE)
        .get(".todo-count").contains("1 item left")
        .createTodo(TODO_ITEM_TWO)
        .get(".todo-count").contains("2 items left")
    })
  })

  context("Clear completed button", function(){
    beforeEach(function(){
      cy.createDefaultTodos().as("todos")
    })

    it("should display the correct text", function(){
      cy
        .get("@todos").eq(0).find(".toggle").check()
        .get(".clear-completed").contains("Clear completed")
    })

    it("should remove completed items when clicked", function(){
      cy
        .get("@todos").eq(1).find(".toggle").check()
        .get(".clear-completed").click()
        .get("@todos").should("have.length", 2)
        .get("@todos").eq(0).should("contain", TODO_ITEM_ONE)
        .get("@todos").eq(1).should("contain", TODO_ITEM_THREE)
    })

    it("should be hidden when there are no items that are completed", function(){
      cy
        .get("@todos").eq(1).find(".toggle").check()
        .get(".clear-completed").should("be.visible").click()
        .get(".clear-completed").should("not.exist")
    })
  })

  context("Persistence", function(){
    it("should persist its data", function(){
      // mimicking TodoMVC tests
      // by writing out this function
      function testState() {
        cy
          .get("@firstTodo").should("contain", TODO_ITEM_ONE).and("have.class", "completed")
          .get("@secondTodo").should("contain", TODO_ITEM_TWO).and("not.have.class", "completed")
      }

      cy
        .createTodo(TODO_ITEM_ONE).as("firstTodo")
        .createTodo(TODO_ITEM_TWO).as("secondTodo")
        .get("@firstTodo").find(".toggle").check()

        .then(testState)

        // visit will automatically visit about:blank
        // before actually visiting the url
        .visit("http://localhost:8888")

        .then(testState)
    })
  })

  context("Routing", function(){
    // New commands used here:
    // - cy.window  https://on.cypress.io/api/window
    // - cy.its     https://on.cypress.io/api/its
    // - cy.invoke  https://on.cypress.io/api/invoke
    // - cy.within  https://on.cypress.io/api/within

    beforeEach(function(){
      cy.createDefaultTodos().as("todos")
    })

    it("should allow me to display active items", function(){
      cy
        .get("@todos").eq(1).find(".toggle").check()
        .get(".filters").contains("Active").click()
        .get("@todos").eq(0).should("contain", TODO_ITEM_ONE)
        .get("@todos").eq(1).should("contain", TODO_ITEM_THREE)
    })

    it("should respect the back button", function(){
      cy
        .get("@todos").eq(1).find(".toggle").check()
        .get(".filters").contains("Active").click()
        .get(".filters").contains("Completed").click()
        .get("@todos").should("have.length", 1)
        .go("back")
        .get("@todos").should("have.length", 2)
        .go("back")
        .get("@todos").should("have.length", 3)
    })

    it("should allow me to display completed items", function(){
      cy
        .get("@todos").eq(1).find(".toggle").check()
        .get(".filters").contains("Completed").click()
        .get("@todos").should("have.length", 1)
    })

    it("should allow me to display all items", function(){
      cy
        .get("@todos").eq(1).find(".toggle").check()
        .get(".filters").contains("Active").click()
        .get(".filters").contains("Completed").click()
        .get(".filters").contains("All").click()
        .get("@todos").should("have.length", 3)
    })

    it("should highlight the currently applied filter", function(){
      cy
        // using a within here which will automatically scope
        // nested 'cy' queries to our parent element <ul.filters>
        .get(".filters").within(function(){
          cy.contains("All").should("have.class", "selected")
          cy.contains("Active").click().should("have.class", "selected")
          cy.contains("Completed").click().should("have.class", "selected")
        })
    })
  })


})