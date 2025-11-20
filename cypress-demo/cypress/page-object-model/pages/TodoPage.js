import BasePage from '../BasePage.js';

/**
 * Page Object for the Todo Application
 * URL: https://example.cypress.io/todo
 */
class TodoPage extends BasePage {
  constructor() {
    super();
    this.url = 'https://example.cypress.io/todo';
  }

  // Selectors
  get selectors() {
    return {
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
    };
  }

  // Navigation
  visitTodoApp() {
    return this.visit();
  }

  // Todo List Operations
  getTodoItems() {
    return this.getElement(this.selectors.todoItem);
  }

  getTodoItemByIndex(index) {
    return this.getElement(this.selectors.todoItem).eq(index);
  }

  getTodoItemByText(text) {
    return this.getByText(text, this.selectors.todoItem);
  }

  getFirstTodoItem() {
    return this.getElement(this.selectors.todoItem).first();
  }

  getLastTodoItem() {
    return this.getElement(this.selectors.todoItem).last();
  }

  // Adding Todos
  addTodo(todoText) {
    this.getElement(this.selectors.newTodoInput).type(`${todoText}{enter}`);
    return this;
  }

  addMultipleTodos(todos) {
    todos.forEach(todo => this.addTodo(todo));
    return this;
  }

  // Completing/Uncompleting Todos
  completeTodoByText(todoText) {
    this.getByText(todoText)
      .parent()
      .find(this.selectors.todoCheckbox)
      .check();
    return this;
  }

  completeTodoByIndex(index) {
    this.getTodoItemByIndex(index)
      .find(this.selectors.todoCheckbox)
      .check();
    return this;
  }

  uncompleteTodoByText(todoText) {
    this.getByText(todoText)
      .parent()
      .find(this.selectors.todoCheckbox)
      .uncheck();
    return this;
  }

  // Filtering
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

  // Clearing
  clearCompletedTodos() {
    this.clickElement(this.selectors.clearCompletedButton);
    return this;
  }
}

export default TodoPage;