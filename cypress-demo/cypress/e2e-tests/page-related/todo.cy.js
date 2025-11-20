import { TodoPage } from '../../page-object-model/index.js';

describe('Example to-do app', () => {
  let todoPage = new TodoPage();;

  beforeEach(() => {
    todoPage = new TodoPage();
    todoPage.visitTodoApp();
  });

  // https://on.cypress.io/interacting-with-elements

  it('displays two todo items by default', () => {
    todoPage.getTodoItems().should('have.length', 2);
  })

  it('allows adding a new todo item', () => {
    todoPage.addTodo('New Todo Item');  

    todoPage.getTodoItems().should('have.length', 3);
    todoPage.getTodoItems().last().should('have.text', 'New Todo Item');
  })
  it('can check off an item as completed', () => {
    // In addition to using the `get` command to get an element by selector,
    // we can also use the `contains` command to get an element by its contents.
    // However, this will yield the <label>, which is lowest-level element that contains the text.
    // In order to check the item, we'll find the <input> element for this <label>
    // by traversing up the dom to the parent element. From there, we can `find`
    // the child checkbox <input> element and use the `check` command to check it.
    todoPage.completeTodoByText('Pay electric bill');

    // Now that we've checked the button, we can go ahead and make sure
    // that the list element is now marked as completed.
    // Again we'll use `contains` to find the <label> element and then use the `parents` command
    // to traverse multiple levels up the dom until we find the corresponding <li> element.
    // Once we get that element, we can assert that it has the completed class.
    todoPage.getByText('Pay electric bill')
        .parents('li')
        .should('have.class', 'completed');
  })

  context('with a checked task', () => {
    beforeEach(() => {
      // We'll take the command we used above to check off an element
      // Since we want to perform multiple tests that start with checking
      // one element, we put it in the beforeEach hook
      // so that it runs at the start of every test.
      todoPage.completeTodoByText('Pay electric bill');
    })

    it('can filter for uncompleted tasks', () => {
      // We'll click on the "active" button in order to
      // display only incomplete items
      todoPage.showActiveTodos();

      // After filtering, we can assert that there is only the one
      // incomplete item in the list.
      todoPage.getTodoItems()
              .should('have.length', 1);
      // We can go a step further and assert that the remaining
      // item is the one we expect.
      todoPage.getTodoItems()
              .first()
              .should('have.text', 'Walk the dog');

      // For good measure, let's also assert that the task we checked off
      // does not exist on the page.
      todoPage.getByText('Pay electric bill')
              .should('not.exist');
    })

    it('can filter for completed tasks', () => {
      // We can perform similar steps as the test above to ensure
      // that only completed tasks are shown
      todoPage.showCompletedTodos()
              .getTodoItems()
              .should('have.length', 1)
              .first()
              .should('have.text', 'Pay electric bill')
              
      todoPage.getByText('Walk the dog')
              .should('not.exist');
    })

    it('can delete all completed tasks', () => {
      // First, let's click the "Clear completed" button
      // `contains` is actually serving two purposes here.
      // First, it's ensuring that the button exists within the dom.
      // This button only appears when at least one task is checked
      // so this command is implicitly verifying that it does exist.
      // Second, it selects the button so we can click it.
      todoPage.clearCompletedTodos();

      // Then we can make sure that there is only one element
      // in the list and our element does not exist
      todoPage.getTodoItems()
        .should('have.length', 1)
        .should('not.have.text', 'Pay electric bill')

      // Finally, make sure that the clear button no longer exists.
      todoPage.getByText('Clear completed')
              .should('not.exist')
    })
  })
});