import BasePage from '../BasePage.js';

/**
 * Page Object for the Location Demo Page
 * URL: https://example.cypress.io/commands/location
 */
class LocationPage extends BasePage {
  constructor() {
    super();
    this.url = 'https://example.cypress.io/commands/location';
  }

  // ========================================
  // ACTIONS - Return 'this' for chaining
  // ========================================
  visitLocationPage() {
    return this.visit();
  }

  // ========================================
  // GETTERS FOR ASSERTIONS - Return Chainable for .should()
  // ========================================
  getHash() {
    return cy.hash();
  }
  getLocation() {
    return cy.location();
  }
  getUrl() {
    return cy.url();
  }
}

export default LocationPage;