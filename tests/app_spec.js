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

describe("TodoMVC - React [000]", function(){

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
    // https://github.com/cypress-io/cypress/wiki/visit
    cy.visit("http://localhost:8888")
  })

  context("When page is initially opened [001]", function(){
    it("should focus on the todo input field [002]", function(){
      // get the currently focused element and assert
      // that it has class="new-todo"
      //
      // https://github.com/cypress-io/cypress/wiki/focused
      cy.focused().should("have.class", "new-todo")
    })
  })

  context("No Todos [003]", function(){
    it("should hide #main and #footer [004]", function(){
      // Unlike the TodoMVC tests, we don't need to create
      // a gazillion helper functions which are difficult to
      // parse through. Instead we'll opt to use real selectors
      // so as to make our testing intentions as clear as possible.
      //
      // https://github.com/cypress-io/cypress/wiki/commands#options
      // https://github.com/cypress-io/cypress/wiki/get
      cy
        .get(".todo-list li", {exist: false})
        .get(".main",         {exist: false})
        .get(".footer",       {exist: false})
    })
  })

  context("New Todo [005]", function(){
    // New commands used here:
    // - cy.type     https://github.com/cypress-io/cypress/wiki/type
    // - cy.eq       https://github.com/cypress-io/cypress/wiki/eq
    // - cy.find     https://github.com/cypress-io/cypress/wiki/find
    // - cy.contains https://github.com/cypress-io/cypress/wiki/contains
    // - cy.should   https://github.com/cypress-io/cypress/wiki/should
    // - cy.as       https://github.com/cypress-io/cypress/wiki/as

    // New concepts introduced:
    // - Aliasing    https://github.com/cypress-io/cypress/wiki/aliasing
    // - Assertions  https://github.com/cypress-io/cypress/wiki/assertions

    it("should allow me to add todo items [006]", function(){
      cy
        // create 1st todo
        .get(".new-todo").type(TODO_ITEM_ONE).type("{enter}")

        // make sure the 1st label contains the 1st todo text
        .get(".todo-list li").eq(0).find("label").contains(TODO_ITEM_ONE)

        // create 2nd todo
        .get(".new-todo").type(TODO_ITEM_TWO).type("{enter}")

        // make sure the 2nd label contains the 2nd todo text
        .get(".todo-list li").eq(1).find("label").contains(TODO_ITEM_TWO)
    })

    it("should clear text input field when an item is added [007]", function(){
      cy
        .get(".new-todo").type(TODO_ITEM_ONE).type("{enter}")
        .get(".new-todo").should("have.text", "")
    })

    it("should append new items to the bottom of the list [008]", function(){
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

        .get("@todos").eq(0).find("label").contains(TODO_ITEM_ONE)
        .get("@todos").eq(1).find("label").contains(TODO_ITEM_TWO)
        .get("@todos").eq(2).find("label").contains(TODO_ITEM_THREE)
    })

    it("should trim text input [009]", function(){
      cy
        // this is an example of another custom command
        // since we repeat the todo creation over and over
        // again. It's up to you to decide when to abstract
        // repetitive behavior and roll that up into a custom
        // command vs explicitly writing the code.
        .createTodo("    " + TODO_ITEM_ONE + "    ")

        // we use as explicit assertion here about the text instead of
        // using cy.contains so we can specify the exact text of the element
        // does not have any whitespace around it
        .get(".todo-list li").eq(0).should("have.text", TODO_ITEM_ONE)
    })

    it("should show #main and #footer when items added [00a]", function(){
      cy
        .createTodo(TODO_ITEM_ONE)
        .get(".main",   {visible: true})
        .get(".footer", {visible: true})
    })
  })

  context("Mark all as completed [00b]", function(){
    // New commands used here:
    // - cy.check    https://github.com/cypress-io/cypress/wiki/check
    // - cy.uncheck  https://github.com/cypress-io/cypress/wiki/uncheck

    beforeEach(function(){
      // This is an example of aliasing
      // within a hook (beforeEach).
      // Aliases will automatically persist
      // between hooks and are available
      // in your tests below
      cy.createDefaultTodos().as("todos")
    })

    it("should allow me to mark all items as completed [00c]", function(){
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

    it("should allow me to clear the complete state of all items [00d]", function(){
      cy
        // check and then immediately uncheck
        .get(".toggle-all").check().uncheck()

        .get("@todos").eq(0).should("not.have.class", "completed")
        .get("@todos").eq(1).should("not.have.class", "completed")
        .get("@todos").eq(2).should("not.have.class", "completed")
    })

    it("complete all checkbox should update state when items are completed / cleared [00e]", function(){
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

  context("Item [00g]", function(){
    // New commands used here:
    // - cy.clear    https://github.com/cypress-io/cypress/wiki/clear

    it("should allow me to mark items as complete [00f]", function(){
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

    it("should allow me to un-mark items as complete [00h]", function(){
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

    it("should allow me to edit an item [00i]", function(){
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
        .get("@todos").eq(0).should("have.text", TODO_ITEM_ONE)
        .get("@secondTodo").should("have.text", "buy some sausages")
        .get("@todos").eq(2).should("have.text", TODO_ITEM_THREE)
    })
  })

  context("Editing [00j]", function(){
    // New commands used here:
    // - cy.blur    https://github.com/cypress-io/cypress/wiki/blur

    beforeEach(function(){
      cy.createDefaultTodos().as("todos")
    })

    it("should hide other controls when editing [00k]", function(){
      cy
        .get("@todos").eq(1).as("secondTodo")
          .find("label").dblclick()

        .get("@secondTodo").find(".toggle", {visible: false})
        .get("@secondTodo").find("label",   {visible: false})

    })

    it("should save edits on blur [00l]", function(){
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

        .get("@todos").eq(0).should("have.text", TODO_ITEM_ONE)
        .get("@secondTodo").should("have.text", "buy some sausages")
        .get("@todos").eq(2).should("have.text", TODO_ITEM_THREE)
    })

    it("should trim entered text [00m]", function(){
      cy
        .get("@todos").eq(1).as("secondTodo")
          .find("label").dblclick()

        .get("@secondTodo")
          .find(".edit").clear()
          .type("    buy some sausages    ").type("{enter}")

        .get("@todos").eq(0).should("have.text", TODO_ITEM_ONE)
        .get("@secondTodo").should("have.text", "buy some sausages")
        .get("@todos").eq(2).should("have.text", TODO_ITEM_THREE)
    })

    it("should remove the item if an empty text string was entered [00n]", function(){
      cy
        .get("@todos").eq(1).as("secondTodo")
          .find("label").dblclick()

        .get("@secondTodo")
          .find(".edit").clear().type("{enter}")

        .get("@todos").should("have.length", 2)
    })

    it("should cancel edits on escape [00o]", function(){
      cy
        .get("@todos").eq(1).as("secondTodo")
          .find("label").dblclick()

        .get("@secondTodo")
          .find(".edit").clear().type("foo{esc}")

        .get("@todos").eq(0).should("have.text", TODO_ITEM_ONE)
        .get("@todos").eq(1).should("have.text", TODO_ITEM_TWO)
        .get("@todos").eq(2).should("have.text", TODO_ITEM_THREE)
    })
  })

  context("Counter [00p]", function(){
    it("should display the current number of todo items [00q]", function(){
      cy
        .createTodo(TODO_ITEM_ONE)
        .get(".todo-count").contains("1 item left")
        .createTodo(TODO_ITEM_TWO)
        .get(".todo-count").contains("2 items left")
    })
  })

  context("Clear completed button [00r]", function(){
    beforeEach(function(){
      cy.createDefaultTodos().as("todos")
    })

    it("should display the correct text [00s]", function(){
      cy
        .get("@todos").eq(0).find(".toggle").check()
        .get(".clear-completed").contains("Clear completed")

    })

    it("should remove completed items when clicked [00t]", function(){
      cy
        .get("@todos").eq(1).find(".toggle").check()
        .get(".clear-completed").click()
        .get("@todos").should("have.length", 2)
        .get("@todos").eq(0).should("have.text", TODO_ITEM_ONE)
        .get("@todos").eq(1).should("have.text", TODO_ITEM_THREE)
    })

    it("should be hidden when there are no items that are completed [00u]", function(){
      cy
        .get("@todos").eq(1).find(".toggle").check()
        .get(".clear-completed", {visible: true}).click()
        .get(".clear-completed", {exist: false})
    })
  })

  context("Persistence [00v]", function(){
    it("should persist its data [00w]", function(){
      // mimicking TodoMVC tests
      // by writing out this function
      function testState() {
        cy
          .get("@firstTodo").should("have.text", TODO_ITEM_ONE).and("have.class", "completed")
          .get("@secondTodo").should("have.text", TODO_ITEM_TWO).and("not.have.class", "completed")
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

  context("Routing [00x]", function(){
    // New commands used here:
    // - cy.window  https://github.com/cypress-io/cypress/wiki/window
    // - cy.its     https://github.com/cypress-io/cypress/wiki/its
    // - cy.invoke  https://github.com/cypress-io/cypress/wiki/invoke
    // - cy.within  https://github.com/cypress-io/cypress/wiki/within

    beforeEach(function(){
      cy.createDefaultTodos().as("todos")
    })

    it("should allow me to display active items [00y]", function(){
      cy
        .get("@todos").eq(1).find(".toggle").check()
        .get(".filters").contains("Active").click()
        .get("@todos").eq(0).should("have.text", TODO_ITEM_ONE)
        .get("@todos").eq(1).should("have.text", TODO_ITEM_THREE)
    })

    it("should respect the back button [00z]", function(){
      // TODO need to add the `cy.navigate` command here
      // which handles both history navigation and url / hash
      // navigation
      cy
        .get("@todos").eq(1).find(".toggle").check()
        .get(".filters").contains("Active").click()
        .get(".filters").contains("Completed").click()
        .get("@todos").should("have.length", 1)
        .window().its("history").invoke("back")
        .get("@todos").should("have.length", 2)
        .window().its("history").invoke("back")
        .get("@todos").should("have.length", 3)
    })

    it("should allow me to display completed items [010]", function(){
      cy
        .get("@todos").eq(1).find(".toggle").check()
        .get(".filters").contains("Completed").click()
        .get("@todos").should("have.length", 1)
    })

    it("should allow me to display all items [011]", function(){
      cy
        .get("@todos").eq(1).find(".toggle").check()
        .get(".filters").contains("Active").click()
        .get(".filters").contains("Completed").click()
        .get(".filters").contains("All").click()
        .get("@todos").should("have.length", 3)
    })

    it("should highlight the currently applied filter [012]", function(){
      cy
        // using a within here which will automatically scope
        // nested 'cy' queries to our parent element <ul.filters>
        .get(".filters").within(function(){
          // we're introducing 'eventually' assertions here which retry their
          // assertion until they become truthy. In this situation React
          // applies the class fast enough to probably not need this, but in
          // other JS frameworks which have their own digest loop *cough angular*
          // or any other async actions is a great use case for the 'eventually' flag
          cy.contains("All").should("eventually.have.class", "selected")
          cy.contains("Active").click().should("eventually.have.class", "selected")
          cy.contains("Completed").click().should("eventually.have.class", "selected")
        })
    })
  })


})