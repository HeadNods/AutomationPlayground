import BasePage from '../BasePage.js';

/**
 * Page Object for the Navigation Demo Page
 * URL: https://example.cypress.io/commands/navigation (accessed via menu)
 */
class NavigationPage extends BasePage {
  private readonly selectors = {
    navbar: '.navbar-nav',
    dropdownMenu: '.dropdown-menu'
  };
  constructor() {
    super();
    this.url = 'https://example.cypress.io';
  }
  // ========================================
  // ACTIONS - Return 'this' for chaining
  // ========================================
  visitNavigationPage() {
    cy.visit(this.url);
    this.getElement(this.selectors.navbar).contains('Commands').click();
    this.getElement(this.selectors.dropdownMenu).contains('Navigation').click();
    return this;
  }
  goBack() {
    cy.go('back');
    return this;
  }
  goForward() {
    cy.go('forward');
    return this;
  }
  goBackSteps(steps: number) {
    cy.go(steps);
    return this;
  }
  goForwardSteps(steps: number) {
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
  visitWithOptions(url: string, options: object = {}) {
    cy.visit(url, options);
    return this;
  }

  // ========================================
  // GETTERS FOR ASSERTIONS - Return Chainable for .should()
  // ========================================
  getLocation(path: any) {
    return cy.location(path);
  }
}

export default NavigationPage;