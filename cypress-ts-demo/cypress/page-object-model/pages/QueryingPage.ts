import BasePage from '../BasePage.js';

/**
 * Page Object for the Querying Demo Page
 * URL: https://example.cypress.io/commands/querying
 */
class QueryingPage extends BasePage {
  private readonly selectors = {
    queryButton: '#query-btn',
    queryButtonClass: '.query-btn',
    queryButtonComplex: '#querying .well>button:first',
    testExample: '[data-test-id="test-example"]',

    queryList: '.query-list',
    queryListItems: '.query-list li',
    queryForm: '.query-form',
    saveFormButton: '.query-button',
    saveFormButtonText: 'Save Form',

    formFirstInput: 'input:first',
    formLastInput: 'input:last',

    queryUl: '.query-ul',

    bestPracticesSection: '[data-cy=best-practices-selecting-elements]',
    bestPracticesButton: 'button',
    bestPracticesSubmit: '[data-cy=submit]'
  }

  constructor() {
    super();
    this.url = 'https://example.cypress.io/commands/querying';
  }
  // ========================================
  // ACTIONS - Return 'this' for chaining
  // ========================================
  visitQueryingPage() {
    return this.visit();
  }

  // ========================================
  // GETTERS FOR ASSERTIONS - Return Chainable for .should()
  // ========================================
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
  getListItemByText(text: string) {
    return this.getElement(this.selectors.queryList).contains(text);
  }
  getListItemByRegex(regex: RegExp) {
    return this.getElement(this.selectors.queryList).contains(regex);
  }
  getListContainerByText(selector: string, text: string) {
    return this.getElement('#querying').contains(selector, text);
  }
  getSaveFormButton() {
    return this.getElement(this.selectors.saveFormButton).contains(this.selectors.saveFormButtonText);
  }
  getFormContainer() {
    return this.getElement(this.selectors.queryForm);
  }
  getRootElement() {
    return cy.root();
  }
  getRootWithinUl() {
    return this.getElement(this.selectors.queryUl).within(() => {
      return cy.root();
    });
  }
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