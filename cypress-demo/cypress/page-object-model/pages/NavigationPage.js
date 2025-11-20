import BasePage from '../BasePage.js';

/**
 * Page Object for the Navigation Demo Page
 * URL: https://example.cypress.io/commands/navigation (accessed via menu)
 */
class NavigationPage extends BasePage {
  constructor() {
    super();
    this.url = 'https://example.cypress.io';
  }

  // Selectors
  get selectors() {
    return {
      navbar: '.navbar-nav',
      dropdownMenu: '.dropdown-menu'
    };
  }

  // Navigation to the Navigation page
  visitNavigationPage() {
    cy.visit(this.url);
    this.getElement(this.selectors.navbar).contains('Commands').click();
    this.getElement(this.selectors.dropdownMenu).contains('Navigation').click();
    return this;
  }

  // Browser Navigation Methods
  goBack() {
    cy.go('back');
    return this;
  }

  goForward() {
    cy.go('forward');
    return this;
  }

  goBackSteps(steps) {
    cy.go(steps);
    return this;
  }

  goForwardSteps(steps) {
    cy.go(steps);
    return this;
  }

  reloadPage() {
    cy.reload();
    return this;
  }

  reloadPageWithoutCache() {
    cy.reload(true);
    return this;
  }

  visitWithOptions(url, options) {
    cy.visit(url, options);
    return this;
  }

  getLocation(path) {
    return cy.location(path);
  }
}

export default NavigationPage;