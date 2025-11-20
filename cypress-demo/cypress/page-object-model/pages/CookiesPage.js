import BasePage from '../BasePage.js';

/**
 * Page Object for the Cookies Demo Page
 * URL: https://example.cypress.io/commands/cookies
 */
class CookiesPage extends BasePage {
  constructor() {
    super();
    this.url = 'https://example.cypress.io/commands/cookies';
  }

  // Selectors
  get selectors() {
    return {
      getCookieSetButton: '#getCookie .set-a-cookie',
      getCookiesSetButton: '#getCookies .set-a-cookie',
      clearCookieSetButton: '#clearCookie .set-a-cookie',
      clearCookiesSetButton: '#clearCookies .set-a-cookie'
    };
  }

  // Navigation
  visitCookiesPage() {
    Cypress.Cookies.debug(true);
    this.visit();
    cy.clearCookies(); // Clear any existing cookies
    return this;
  }

  // Cookie Setting Actions
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

  // Cookie Operations
  getCookie(name) {
    return cy.getCookie(name);
  }

  getCookies() {
    return cy.getCookies();
  }

  getAllCookies() {
    return cy.getAllCookies();
  }

  setCookie(name, value, options = {}) {
    cy.setCookie(name, value, options);
    return this;
  }

  clearCookie(name) {
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

  // Cookie Assertions
  shouldHaveCookieValue(name, expectedValue) {
    this.getCookie(name).should('have.property', 'value', expectedValue);
    return this;
  }

  shouldHaveCookieNull(name) {
    this.getCookie(name).should('be.null');
    return this;
  }

  shouldHaveCookiesLength(expectedLength) {
    this.getCookies().should('have.length', expectedLength);
    return this;
  }

  shouldHaveAllCookiesLength(expectedLength) {
    this.getAllCookies().should('have.length', expectedLength);
    return this;
  }

  shouldHaveCookiesEmpty() {
    this.getCookies().should('be.empty');
    return this;
  }

  shouldHaveAllCookiesEmpty() {
    this.getAllCookies().should('be.empty');
    return this;
  }

  shouldHaveCookieProperties(name, expectedProperties) {
    this.getCookies().should('have.length', 1).should((cookies) => {
      const cookie = cookies[0];
      Object.keys(expectedProperties).forEach(key => {
        expect(cookie).to.have.property(key, expectedProperties[key]);
      });
      // Default properties that should always exist
      expect(cookie).to.have.property('domain');
      expect(cookie).to.have.property('path');
    });
    return this;
  }

  shouldHaveMultipleCookieProperties(expectedCookies) {
    this.getAllCookies().should('have.length', expectedCookies.length).should((cookies) => {
      expectedCookies.forEach((expectedCookie, index) => {
        Object.keys(expectedCookie).forEach(key => {
          expect(cookies[index]).to.have.property(key, expectedCookie[key]);
        });
        expect(cookies[index]).to.have.property('domain');
        expect(cookies[index]).to.have.property('path');
      });
    });
    return this;
  }
}

export default CookiesPage;