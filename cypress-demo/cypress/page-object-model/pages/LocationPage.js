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

  // Navigation
  visitLocationPage() {
    return this.visit();
  }

  // Location Methods
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