import BasePage from '../BasePage.js';

/**
 * Page Object for the Querying Demo Page
 * URL: https://example.cypress.io/commands/querying
 */
class QueryingPage extends BasePage {
  constructor() {
    super();
    this.url = 'https://example.cypress.io/commands/querying';
  }

  // Selectors
  get selectors() {
    return {
      // Basic query elements
      queryButton: '#query-btn',
      queryButtonClass: '.query-btn',
      queryButtonComplex: '#querying .well>button:first',
      testExample: '[data-test-id="test-example"]',
      
      // Contains query elements
      queryList: '.query-list',
      queryListItems: '.query-list li',
      queryForm: '.query-form',
      saveFormButton: '.query-button',
      saveFormButtonText: 'Save Form',

      // Within query elements
      formFirstInput: 'input:first',
      formLastInput: 'input:last',
      
      // Root query elements
      queryUl: '.query-ul',
      
      // Best practices elements
      bestPracticesSection: '[data-cy=best-practices-selecting-elements]',
      bestPracticesButton: 'button',
      bestPracticesSubmit: '[data-cy=submit]'
    };
  }

  // Navigation
  visitQueryingPage() {
    return this.visit();
  }

  // Basic cy.get() queries
  getQueryButton() {
    return this.getElement(this.selectors.queryButton);
  }

  getQueryButtonByClass() {
    return this.getElement(this.selectors.queryButtonClass);
  }

  getQueryButtonComplex() {
    return this.getElement(this.selectors.queryButtonComplex);
  }

  getTestExampleElement() {
    return this.getElement(this.selectors.testExample);
  }

  // cy.contains() queries
  getListItemByText(text) {
    return this.getElement(this.selectors.queryList).contains(text);
  }

  getListItemByRegex(regex) {
    return this.getElement(this.selectors.queryList).contains(regex);
  }

  getListContainerByText(selector, text) {
    return this.getElement('#querying').contains(selector, text);
  }

  getSaveFormButton() {
    return this.getElement(this.selectors.saveFormButton).contains(this.selectors.saveFormButtonText);
  }

  // .within() queries
  getFormInputsWithin() {
    return this.getElement(this.selectors.queryForm);
  }

  // cy.root() queries
  getRootElement() {
    return cy.root();
  }

  getRootWithinUl() {
    return this.getElement(this.selectors.queryUl).within(() => {
      return cy.root();
    });
  }

  // Best practices queries
  getBestPracticesSection() {
    return this.getElement(this.selectors.bestPracticesSection);
  }

  clickBestPracticesButtons() {
    return this.getBestPracticesSection().within(() => {
      // Examples from the best practices test
      cy.get('button').click(); // Worst
      cy.get('.btn.btn-large').click(); // Bad
      cy.get('[name=submission]').click(); // Average
      cy.get('#main').click(); // Better
      cy.get('#main[role=button]').click(); // Slightly better
      cy.contains('Submit').click(); // Much better
      cy.get('[data-cy=submit]').click(); // Best
    });
  }
}

export default QueryingPage;