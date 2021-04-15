import {v4 as uuidv4} from "uuid";

export class LocalStorageHelper {
  getTodosFromLocalStorage () {
    let storage = localStorage.getItem('react-todos')
    return JSON.parse(storage)
  }

  checkTodosInLocalStorage (count, items) {
    let obj = getTodosFromLocalStorage()

    expect(obj.length).to.eq(count)
    for (let i = 0; i < count; i++) {
      expect(obj[i].title).to.eq(items[i])
    }
  }

  addTodoItemInLocalStorage (id = '1', title = 'new todo', completed = false) {
    let data = [{ id, title, completed }]
    localStorage.setItem('react-todos', JSON.stringify(data))
  }

  addMultipleTodoItemsInLocalStorage (data) {
    localStorage.setItem('react-todos', JSON.stringify(data))
  }

  addItemsToLocalStorage() {
    let data = [];
    for(let i = 0; i <= 2; i++){
      let id = uuidv4();
      let title = 'item' + i;
      let completed = false;
      data.push({ id, title, completed});
    }
    cy.setLocalStorage('react-todos', JSON.stringify(data))
  }

}

export const localStorageHelper = new LocalStorageHelper()
