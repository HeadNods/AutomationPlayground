# Page Object Model (POM) for Cypress Tests

This project implements a comprehensive Page Object Model pattern for Cypress tests, providing a maintainable and reusable structure for test automation.

## 📁 Structure

```
cypress/
├── pages/
│   ├── BasePage.js                 # Base class with common methods
│   ├── TodoPage.js                 # Todo app page object
│   ├── ActionsPage.js             # Actions demo page object
│   ├── QueryingPage.js            # Querying demo page object
│   ├── NetworkRequestsPage.js     # Network requests page object
│   └── index.js                   # Central export point
├── e2e/
│   ├── examples/                  # Example tests using page objects
│   │   ├── todo-with-page-objects.cy.js
│   │   ├── actions-with-page-objects.cy.js
│   │   ├── querying-with-page-objects.cy.js
│   │   └── network-requests-with-page-objects.cy.js
│   ├── 1-getting-started/         # Original tests
│   └── 2-advanced-examples/       # Original tests
└── support/
```

## 🏗️ Architecture

### BasePage Class

The `BasePage` class provides common functionality that all page objects inherit:

- **Element Selection**: Methods for finding elements by various selectors
- **Actions**: Common interactions like click, type, select
- **Assertions**: Reusable assertion methods
- **Utilities**: Helper methods for common tasks

### Page Object Classes

Each page object class extends `BasePage` and provides:

- **Selectors**: Centralized element selectors
- **Actions**: Page-specific methods for user interactions
- **Assertions**: Page-specific verification methods
- **Workflows**: Complex multi-step operations

## 🚀 Usage

### Basic Import and Usage

```javascript
import { TodoPage, ActionsPage } from '../pages/index.js';

describe('My Tests', () => {
  let todoPage;

  beforeEach(() => {
    todoPage = new TodoPage();
    todoPage.visitTodoApp();
  });

  it('should add a new todo', () => {
    todoPage
      .addTodo('Buy groceries')
      .shouldContainTodo('Buy groceries')
      .shouldHaveTodoCount(3);
  });
});
```

### Fluent Interface Pattern

All page object methods return `this` to enable method chaining:

```javascript
todoPage
  .addTodo('Task 1')
  .addTodo('Task 2')
  .completeTodoByText('Task 1')
  .showCompletedTodos()
  .shouldHaveTodoCount(1)
  .clearCompletedTodos()
  .shouldHideClearCompletedButton();
```

### Individual Page Objects

#### TodoPage

```javascript
import { TodoPage } from '../pages/index.js';

const todoPage = new TodoPage();

// Navigation
todoPage.visitTodoApp();

// Adding todos
todoPage.addTodo('New task');
todoPage.addMultipleTodos(['Task 1', 'Task 2', 'Task 3']);

// Completing todos
todoPage.completeTodoByText('Task 1');
todoPage.completeTodoByIndex(0);

// Filtering
todoPage.showActiveTodos();
todoPage.showCompletedTodos();
todoPage.showAllTodos();

// Assertions (separation of assertions themselves from the page object)
todoPage.getTodoItems().should('have.length', 1);
todoPage.getTodoItems().first().should('have.text', 'Walk the dog');
todoPage.getByText('Pay electric bill').should('not.exist');
```

#### NetworkRequestsPage

```javascript
import { NetworkRequestsPage } from '../pages/index.js';

const networkPage = new NetworkRequestsPage();

// Navigation
networkPage.visitNetworkRequestsPage();

// API interactions
networkPage.interceptGetComments();
networkPage.clickGetRequestButton();
networkPage.waitForGetComment();

// Direct API calls
networkPage.makeGetRequest().then(response => {
  // Handle response
});

```

## 🔧 Key Features

### 1. Centralized Selectors

Each page object stores selectors in a `selectors` getter:

```javascript
get selectors() {
  return {
    todoInput: '[data-test=new-todo]',
    todoList: '.todo-list',
    todoItem: '.todo-list li'
  };
}
```

### 2. Method Chaining

All methods return `this` for fluent interface:

```javascript
typeInEmailField(text, options = {}) {
  this.typeText(this.selectors.emailInput, text, options);
  return this;
}
```

### 3. Reusable Cypress Implementations

Common cypress page interactions are abstracted in BasePage:

```javascript
getByText(text, selector = null) {
  if (selector) {
    return cy.get(selector).contains(text);
  }
  return cy.contains(text);
}
```

### 4. Complex Workflows

High-level methods combine multiple steps: 
(Optional: I prefer to keep assertions in the test definition instead of the page object, but it does improve readability):

```javascript
testClearCookie() {
  this.shouldHaveCookieNull('token')
    .clickClearCookieSetButton()
    .shouldHaveCookieValue('token', '123ABC')
    .clearCookie('token')
    .shouldHaveCookieNull('token');
  return this;
}
```

## 📋 Best Practices

### 1. Use Descriptive Method Names

```javascript
// Good
todoPage.addTodo('Buy milk');
todoPage.completeTodoByText('Buy milk');

// Bad
todoPage.type('[data-test=new-todo]', 'Buy milk{enter}');
todoPage.click('.todo-list li:contains("Buy milk") input[type=checkbox]');
```

### 2. Keep Selectors in One Place

```javascript
// Good - centralized selectors
get selectors() {
  return {
    todoInput: '[data-test=new-todo]',
    todoList: '.todo-list'
  };
}
addTodo(text) {
  this.getElement(this.selectors.newTodoInput).type(`${text}{enter}`);
  return this;
}

// Bad - scattered selectors
addTodo(text) {
  this.getElement('[data-test=new-todo]').type(`${text}{enter}`);
}
```

### 3. Create Meaningful Assertions

```javascript
// Good - semantic assertions
todoPage.shouldHaveTodoCompleted('Buy milk');

// Bad - low-level assertions
cy.get('.todo-list li:contains("Buy milk")').should('have.class', 'completed');
```

### 4. Use Method Chaining

```javascript
// Good - fluent interface
todoPage.showCompletedTodos()
        .getTodoItems()
        .should('have.length', 1)
        .first()
        .should('have.text', 'Pay electric bill')
        .getByText('Walk the dog')
        .should('not.exist');

// Bad - separate statements
todoPage.addTodo('Task 1');
todoPage.completeTodoByText('Task 1');
todoPage.shouldHaveTodoCompleted('Task 1');
```

### 5. Abstract Complex Workflows

```javascript
// Good - high-level workflow
todoPage.addAndCompleteTodo('Important task');

// Bad - repeated low-level steps
todoPage.addTodo('Important task');
todoPage.completeTodoByText('Important task');
```

## 🧪 Testing Patterns

### Setup in beforeEach

```javascript
describe('Todo Tests', () => {
  let todoPage;

  beforeEach(() => {
    todoPage = new TodoPage();
    todoPage.visitTodoApp();
  });

  it('should work', () => {
    todoPage.addTodo('Test');
  });
});
```

### Multiple Page Objects

```javascript
describe('Cross-page Tests', () => {
  let todoPage, actionsPage;

  beforeEach(() => {
    todoPage = new TodoPage();
    actionsPage = new ActionsPage();
  });

  it('should navigate between pages', () => {
    todoPage.visitTodoApp();
    // ... todo operations
    
    actionsPage.visitActionsPage();
    // ... actions operations
  });
});
```

### Custom Commands Integration

Page objects work well with custom commands:

```javascript
// In commands.js
Cypress.Commands.add('loginAs', (userType) => {
  // Login logic
});

// In test
cy.loginAs('admin');
todoPage.addTodo('Admin task');
```

## 🔍 Debugging Tips

### 1. Use Cypress Studio

Page objects work with Cypress Studio for recording interactions.

### 2. Add Debug Methods

```javascript
debug() {
  cy.pause();
  return this;
}

log(message) {
  cy.log(message);
  return this;
}
```

### 3. Screenshot on Failure

```javascript
takeScreenshot(name) {
  cy.screenshot(name);
  return this;
}
```

### 4. Element Visibility Checks

```javascript
waitForPageLoad() {
  this.waitForVisible(this.selectors.mainContent);
  return this;
}
```

## 📈 Benefits

1. **Maintainability**: Changes to UI only require updates in page objects
2. **Reusability**: Common methods can be shared across tests
3. **Readability**: Tests read like business requirements
4. **Reliability**: Centralized element management reduces flaky tests
5. **Scalability**: Easy to add new pages and extend existing ones

## 🔄 Migration from Existing Tests

To migrate existing tests to use page objects:

1. **Identify Pages**: Group tests by the pages they interact with
2. **Extract Selectors**: Move selectors to page object classes
3. **Create Methods**: Convert direct Cypress commands to page object methods
4. **Add Assertions**: Create semantic assertion methods (optional)
5. **Refactor Tests**: Update tests to use page objects instead of direct commands

## Example Migration

**Before:**
```javascript
it('should add todo', () => {
  cy.visit('https://example.cypress.io/todo');
  cy.get('[data-test=new-todo]').type('New task{enter}');
  cy.get('.todo-list li').should('have.length', 3);
});
```

**After:**
```javascript
it('should add todo', () => {
  todoPage
    .visitTodoApp()
    .addTodo('New task')
    .shouldHaveTodoCount(3)
    .shouldHaveTodo('New task');
});
//OR
it('should add todo', () => {
  todoPage
    .visitTodoApp()
    .addTodo('New task')
    .getTodoItems()
    .should('have.length', 3)
    .should('have.text', 'New task')
});
```

This Page Object Model provides a solid foundation for maintainable, readable, and scalable Cypress tests.