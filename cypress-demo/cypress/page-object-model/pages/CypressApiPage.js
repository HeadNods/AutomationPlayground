import BasePage from '../BasePage.js';

/**
 * Page Object for the Cypress API Demo Page
 * URL: https://example.cypress.io/cypress-api
 */
class CypressApiPage extends BasePage {
  constructor() {
    super();
    this.url = 'https://example.cypress.io/cypress-api';
  }

  // Selectors
  get selectors() {
    return {
      domParagraphHidden: '.dom-p p.hidden',
      domParagraphVisible: '.dom-p p.visible',
      button: 'button'
    };
  }

  // Navigation
  visitCypressApiPage() {
    return this.visit();
  }

  // Custom Commands
  addConsoleCommand() {
    Cypress.Commands.add('console', {
      prevSubject: true,
    }, (subject, method) => {
      // the previous subject is automatically received
      // and the commands arguments are shifted

      // allow us to change the console method used
      method = method || 'log';

      // log the subject to the console
      console[method]('The subject is', subject);

      // whatever we return becomes the new subject
      // we don't want to change the subject so
      // we return whatever was passed in
      return subject;
    });
    return this;
  }

  useCustomConsoleCommand() {
    cy.get(this.selectors.button).console('info').then(($button) => {
      // subject is still $button
    });
    return this;
  }

  // Cookie Debugging
  enableCookieDebugging() {
    Cypress.Cookies.debug(true);
    return this;
  }

  performFakeCookieOperations() {
    cy.setCookie('fakeCookie', '123ABC');
    cy.clearCookie('fakeCookie');
    cy.setCookie('fakeCookie', '123ABC');
    cy.clearCookie('fakeCookie');
    cy.setCookie('fakeCookie', '123ABC');
    return this;
  }

  // Architecture Information
  getCpuArchitecture() {
    return Cypress.arch;
  }

  // Configuration
  getConfiguration() {
    return Cypress.config();
  }

  getSpecificConfig(key) {
    return Cypress.config(key);
  }

  setConfiguration(key, value) {
    Cypress.config(key, value);
    return this;
  }

  // DOM Utilities
  getHiddenParagraph() {
    return Cypress.$(this.selectors.domParagraphHidden).get(0);
  }

  getVisibleParagraph() {
    return Cypress.$(this.selectors.domParagraphVisible).get(0);
  }

  // Environment Variables
  setEnvironmentVariables(envVars) {
    Cypress.env(envVars);
    return this;
  }

  getEnvironmentVariable(key) {
    return Cypress.env(key);
  }

  setEnvironmentVariable(key, value) {
    Cypress.env(key, value);
    return this;
  }

  getAllEnvironmentVariables() {
    return Cypress.env();
  }

  // Platform Information
  getPlatform() {
    return Cypress.platform;
  }

  // Version Information
  getVersion() {
    return Cypress.version;
  }

  // Spec Information
  getSpecInformation() {
    return Cypress.spec;
  }
}

export default CypressApiPage;