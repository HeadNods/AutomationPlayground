import BasePage from '../BasePage.js';

/**
 * Page Object for the Assertions Demo Page
 * URL: https://example.cypress.io/commands/assertions
 */
class AssertionsPage extends BasePage {
  private readonly selectors = {
    assertionTable: '.assertion-table',
    tableBody: '.assertion-table tbody',
    lastRow: '.assertion-table tbody tr:last',
    firstCell: '.assertion-table tbody tr:last td:first',
    assertionsLink: '.assertions-link',
    assertionsParagraph: '.assertions-p',
    docsHeader: '.docs-header',
    twoElements: '.two-elements',
    firstElement: '.two-elements .first',
    secondElement: '.two-elements .second',
    randomNumber: '#random-number'
  }

  constructor() {
    super();
    this.url = 'https://example.cypress.io/commands/assertions';
  }

  // ========================================
  // ACTIONS - Return 'this' for chaining
  // ========================================
  visitAssertionsPage() {
    return this.visit();
  }

  // ========================================
  // GETTERS FOR ASSERTIONS - Return Chainable for .should()
  // ========================================
  getAssertionTable() {
    return this.getElement(this.selectors.assertionTable);
  }

  getLastTableRow() {
    return this.getElement(this.selectors.lastRow);
  }

  getFirstCellOfLastRow() {
    return this.getElement(this.selectors.firstCell);
  }

  getAssertionsLink() {
    return this.getElement(this.selectors.assertionsLink);
  }

  getAssertionsParagraph() {
    return this.getElement(this.selectors.assertionsParagraph);
  }

  getDocsHeader() {
    return this.getElement(this.selectors.docsHeader);
  }

  getFirstElement() {
    return this.getElement(this.selectors.firstElement);
  }

  getSecondElement() {
    return this.getElement(this.selectors.secondElement);
  }

  getRandomNumberElement() {
    return this.getElement(this.selectors.randomNumber);
  }
}

export default AssertionsPage;