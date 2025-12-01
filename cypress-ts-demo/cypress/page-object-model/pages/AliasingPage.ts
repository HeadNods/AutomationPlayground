import BasePage from '../BasePage.js';

/**
 * Page Object for the Aliasing Demo Page
 * URL: https://example.cypress.io/commands/aliasing
 */
class AliasingPage extends BasePage {
  private readonly selectors = {
    asTable: '.as-table',
    tableBody: '.as-table tbody',
    tableRow: '.as-table tbody > tr',
    firstButton: '.as-table tbody > tr:first td:first button',
    networkButton: '.network-btn'
  }

  constructor() {
    super();
    this.url = 'https://example.cypress.io/commands/aliasing';
  }

  // ========================================
  // ACTIONS - Return 'this' for chaining
  // ========================================
  visitAliasingPage() {
    return this.visit();
  }
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
  clickAliasedElement(aliasName: string) {
    cy.get(`@${aliasName}`).click();
    return this;
  }
  aliasGetCommentRequest(aliasName = 'getComment') {
    cy.intercept('GET', '**/comments/*').as(aliasName);
    return this;
  }
  clickNetworkButton() {
    this.clickElement(this.selectors.networkButton);
    return this;
  }

  // ========================================
  // GETTERS FOR ASSERTIONS - Return Chainable for .should()
  // ========================================
  getAliasedElement(aliasName: string) {
    return cy.get(`@${aliasName}`);
  }
  waitForAliasedRequest(aliasName: string) {
    return cy.wait(`@${aliasName}`);
  }
}

export default AliasingPage;