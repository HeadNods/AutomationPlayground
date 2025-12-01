import BasePage from '../BasePage.js';

/**
 * Page Object for the Todo Application
 * URL: https://example.cypress.io/todo
 */
class TodoPage extends BasePage {
  private readonly selectors = {
    todoList: '.todo-list',
    todoItem: '.todo-list li',
    newTodoInput: '[data-test=new-todo]',
    todoCheckbox: 'input[type=checkbox]',
    todoLabel: 'label',
    filterActive: 'a[href="#/active"]',
    filterCompleted: 'a[href="#/completed"]',
    filterAll: 'a[href="#/"]',
    clearCompletedButton: '.clear-completed',
    todoCount: '.todo-count'
  }

  constructor() {
    super();
    this.url = 'https://example.cypress.io/todo';
  }

  // ========================================
  // ACTIONS - Return 'this' for chaining
  // ========================================
  visitTodoApp() {
    return this.visit();
  }
  addTodo(todoText: string) {
    this.getElement(this.selectors.newTodoInput).type(`${todoText}{enter}`);
    return this;
  }
  addMultipleTodos(todos: string[]) {
    todos.forEach((todo: string) => this.addTodo(todo));
    return this;
  }
  completeTodoByText(todoText: string) {
    this.getByText(todoText)
      .parent()
      .find(this.selectors.todoCheckbox)
      .check();
    return this;
  }
  completeTodoByIndex(index: number) {
    this.getTodoItemByIndex(index)
      .find(this.selectors.todoCheckbox)
      .check();
    return this;
  }
  uncompleteTodoByText(todoText: string) {
    this.getByText(todoText)
      .parent()
      .find(this.selectors.todoCheckbox)
      .uncheck();
    return this;
  }
  showActiveTodos() {
    this.clickElement(this.selectors.filterActive);
    return this;
  }
  showCompletedTodos() {
    this.clickElement(this.selectors.filterCompleted);
    return this;
  }
  showAllTodos() {
    this.clickElement(this.selectors.filterAll);
    return this;
  }
  clearCompletedTodos() {
    this.clickElement(this.selectors.clearCompletedButton);
    return this;
  }

  // ========================================
  // DATA RETRIEVAL - Return Chainable for .should()
  // ========================================
  getTodoItems() {
    return this.getElement(this.selectors.todoItem);
  }
  getTodoItemByIndex(index: number) {
    return this.getElement(this.selectors.todoItem).eq(index);
  }
  getTodoItemByText(text: string) {
    return this.getByText(text, this.selectors.todoItem);
  }
  getFirstTodoItem() {
    return this.getElement(this.selectors.todoItem).first();
  }
  getLastTodoItem() {
    return this.getElement(this.selectors.todoItem).last();
  }
}

export default TodoPage;