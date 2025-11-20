import BasePage from '../BasePage.js';

/**
 * Page Object for the Aliasing Demo Page
 * URL: https://example.cypress.io/commands/aliasing
 */
class AliasingPage extends BasePage {
  constructor() {
    super();
    this.url = 'https://example.cypress.io/commands/aliasing';
  }

  // Selectors
  get selectors() {
    return {
      asTable: '.as-table',
      tableBody: '.as-table tbody',
      tableRow: '.as-table tbody > tr',
      firstButton: '.as-table tbody > tr:first td:first button',
      networkButton: '.network-btn'
    };
  }

  // Navigation
  visitAliasingPage() {
    return this.visit();
  }

  // DOM Element Aliasing
  aliasFirstButton(aliasName = 'firstBtn') {
    this.getElement(this.selectors.asTable)
      .find('tbody>tr')
      .first()
      .find('td')
      .first()
      .find('button')
      .as(aliasName);
    return this;
  }

  clickAliasedElement(aliasName) {
    cy.get(`@${aliasName}`).click();
    return this;
  }

  getAliasedElement(aliasName) {
    return cy.get(`@${aliasName}`);
  }

  // Network Request Aliasing
  aliasGetCommentRequest(aliasName = 'getComment') {
    cy.intercept('GET', '**/comments/*').as(aliasName);
    return this;
  }

  clickNetworkButton() {
    this.clickElement(this.selectors.networkButton);
    return this;
  }

  waitForAliasedRequest(aliasName) {
    return cy.wait(`@${aliasName}`);
  }
}

export default AliasingPage;