import { QueryingPage } from '../../page-object-model/index';

describe('Querying with Page Objects', () => {
  let queryingPage: QueryingPage;

  beforeEach(() => {
    queryingPage = new QueryingPage();
    queryingPage.visitQueryingPage();
  });

  // The most commonly used query is 'cy.get()', you can
  // think of this like the '$' in jQuery

  it('cy.get() - query DOM elements', () => {
    // https://on.cypress.io/get

    queryingPage
      .getQueryButton()
      .should('contain', 'Button');
    queryingPage
      .getQueryButtonByClass()
      .should('contain', 'Button');
    queryingPage
      .getQueryButtonComplex()
      .should('contain', 'Button');

    // Use CSS selectors just like jQuery
    queryingPage
      .getTestExampleElement()
      .should('have.class', 'example');

    // 'cy.get()' yields jQuery object, you can get its attribute
    // by invoking `.attr()` method
    queryingPage
      .getTestExampleElement()
      .invoke('attr', 'data-test-id')
      .should('equal', 'test-example');

    // or you can get element's CSS property
    queryingPage
      .getTestExampleElement()
      .invoke('css', 'position')
      .should('equal', 'static');

    // or use assertions directly during 'cy.get()'
    // https://on.cypress.io/assertions
    queryingPage
      .getTestExampleElement()
      .should('have.class', 'example')
      .and('have.attr', 'data-test-id', 'test-example')
      .and('have.css', 'position', 'static');
  });

  it('cy.contains() - query DOM elements with matching content', () => {
    // https://on.cypress.io/contains
    // Verify bananas has class 'third'
    queryingPage
      .getListItemByText('bananas')
      .should('have.class', 'third');
    // Verify regex matching for words starting with 'b'
    queryingPage
      .getListItemByRegex(/^b\w+/)
      .should('have.class', 'third');
    // Verify apples has class 'first'
    queryingPage
      .getListItemByText('apples')
      .should('have.class', 'first');

    // passing a selector to contains will
    // yield the selector containing the text
    queryingPage
      .getListContainerByText('ul', 'oranges')
      .should('have.class', 'query-list');

    queryingPage
      .getSaveFormButton()
      .should('have.class', 'btn');
  });

  it('.within() - query DOM elements within a specific element', () => {
    // https://on.cypress.io/within
    queryingPage.getFormContainer().should('have.length', 1).within(() => {
      cy.get('input:first').should('have.attr', 'placeholder', 'Email');
      cy.get('input:last').should('have.attr', 'placeholder', 'Password');
    });
  });

  it('cy.root() - query the root DOM element', () => {
    // https://on.cypress.io/root
    queryingPage.getRootElement()
      .should('match', 'html');

    // Verify root within ul context
    queryingPage.getRootWithinUl()
      .should('have.class', 'query-ul');
  });

  it('best practices - selecting elements', () => {
    // https://on.cypress.io/best-practices#Selecting-Elements
    queryingPage.getBestPracticesSection().within(() => {
      // Worst - too generic, no context
      cy.get('button').click();

      // Bad. Coupled to styling. Highly subject to change.
      cy.get('.btn.btn-large').click();

      // Average. Coupled to the `name` attribute which has HTML semantics.
      cy.get('[name=submission]').click();

      // Better. But still coupled to styling or JS event listeners.
      cy.get('#main').click();

      // Slightly better. Uses an ID but also ensures the element
      // has an ARIA role attribute
      cy.get('#main[role=button]').click();

      // Much better. But still coupled to text content that may change.
      cy.contains('Submit').click();

      // Best. Insulated from all changes.
      cy.get('[data-cy=submit]').click();
    });
  });
});