// ***********************************************
// This example spec_helper.js shows you how to
// create the custom command: 'createDefaultTodos'.
//
// The spec_helper.js file is a great place to
// add reusable logic / custom commands which
// become usable in every single test file.
//
// You can read more about custom commands here:
// http://on.cypress.io/commands#customizing
// ***********************************************
//

Cypress.addParentCommand("createDefaultTodos", function(){

  var TODO_ITEM_ONE   = "buy some cheese"
  var TODO_ITEM_TWO   = "feed the cat"
  var TODO_ITEM_THREE = "book a doctors appointment"

  // begin the command here, which by will display
  // as a 'spinning blue state' in the UI to indicate
  // the command is running
  var log = Cypress.Log.command({
    name: "create default todos",
    message: [],

    // this is a temporary fix to prevent this log
    // from auto-ending after the command is finished.
    // some internal logic needs refactoring for this
    // not to need to be specified.
    autoEnd: false,

    onConsole: function(){
      // we're creating our own custom message here
      // which will print out to our browsers console
      // whenever we click on this command
      return {
        "Inserted Todos": [TODO_ITEM_ONE, TODO_ITEM_TWO, TODO_ITEM_THREE]
      }
    }
  })

  // additionally we pass {log: false} to all of our
  // sub-commands so none of them will output to
  // our command log

  cy
    //allow chaining onto this custom command
    .chain()

    .get(".new-todo", {log: false})
      .type(TODO_ITEM_ONE   + "{enter}", {log: false})
      .type(TODO_ITEM_TWO   + "{enter}", {log: false})
      .type(TODO_ITEM_THREE + "{enter}", {log: false})

    .get(".todo-list li", {log: false})
    .then(function($listItems){
      // once we're done inserting each of the todos
      // above we want to return the .todo-list li's
      // to allow for further chaining and then
      // we want to snapshot the state of the DOM
      // and end the log so it goes from that
      // 'spinning blue state' to the 'finished state'.
      //
      // this behavior is also temporary as Cypress needs some
      // internal refactoring to make it intelligent
      // enough to automatically figure this out on its own.
      // currently the log needs to be specifically ended
      // when 'autoEnd' is set to false.
      log.set({$el: $listItems}).snapshot().end()
    })
})

Cypress.addParentCommand("createTodo", function(todo){

  var log = Cypress.Log.command({
    name: "create todo",
    message: todo,
    autoEnd: false,
    onConsole: function(){
      return {
        "Inserted Todo": todo
      }
    }
  })

  cy
    // allow chaining onto this custom command
    .chain()

    // create the todo
    .get(".new-todo", {log: false}).type(todo + "{enter}", {log: false})

    // now go find the actual todo
    // in the todo list so we can
    // easily alias this in our tests
    // and set the $el so its highlighted
    .get(".todo-list", {log: false}).contains("li", todo.trim(), {log: false})
    .then(function($li){
      // set the $el for the command so
      // it highlights when we hover over
      // our command
      log.set({$el: $li}).snapshot().end()
    })
})