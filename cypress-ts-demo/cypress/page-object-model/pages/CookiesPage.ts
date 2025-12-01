import BasePage from '../BasePage.js';

/**
 * Page Object for the Cookies Demo Page
 * URL: https://example.cypress.io/commands/cookies
 */
class CookiesPage extends BasePage {
  private readonly selectors = {
    getCookieSetButton: '#getCookie .set-a-cookie',
    getCookiesSetButton: '#getCookies .set-a-cookie',
    clearCookieSetButton: '#clearCookie .set-a-cookie',
    clearCookiesSetButton: '#clearCookies .set-a-cookie'
  }

  constructor() {
    super();
    this.url = 'https://example.cypress.io/commands/cookies';
  }

  // ========================================
  // ACTIONS - Return 'this' for chaining
  // ========================================
  visitCookiesPage() {
    Cypress.Cookies.debug(true);
    this.visit();
    cy.clearCookies(); // Clear any existing cookies
    return this;
  }
  clickGetCookieSetButton() {
    this.clickElement(this.selectors.getCookieSetButton);
    return this;
  }
  clickGetCookiesSetButton() {
    this.clickElement(this.selectors.getCookiesSetButton);
    return this;
  }
  clickClearCookieSetButton() {
    this.clickElement(this.selectors.clearCookieSetButton);
    return this;
  }
  clickClearCookiesSetButton() {
    this.clickElement(this.selectors.clearCookiesSetButton);
    return this;
  }
  setCookie(name: string, value: string, options: Partial<Cypress.SetCookieOptions> = {}) {
    cy.setCookie(name, value, options);
    return this;
  }
  clearCookie(name: string) {
    cy.clearCookie(name);
    return this;
  }
  clearCookies() {
    cy.clearCookies();
    return this;
  }
  clearAllCookies() {
    cy.clearAllCookies();
    return this;
  }

  // ========================================
  // GETTERS FOR ASSERTIONS - Return Chainable for .should()
  // ========================================
  getCookie(name: string) {
    return cy.getCookie(name);
  }
  getCookies() {
    return cy.getCookies();
  }
  getAllCookies() {
    return cy.getAllCookies();
  }
}

export default CookiesPage;