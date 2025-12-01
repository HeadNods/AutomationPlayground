import BasePage from '../BasePage.js';

/**
 * Page Object for the Cypress API Demo Page
 * URL: https://example.cypress.io/cypress-api
 */
class CypressApiPage extends BasePage {
  private readonly selectors = {
    domParagraphHidden: '.dom-p p.hidden',
    domParagraphVisible: '.dom-p p.visible',
    button: 'button'
  }

  constructor() {
    super();
    this.url = 'https://example.cypress.io/cypress-api';
  }

  // ========================================
  // ACTIONS - Return 'this' for chaining
  // ========================================
  visitCypressApiPage() {
    return this.visit();
  }
  addConsoleCommand() {
    Cypress.Commands.add('console', { prevSubject: true }, (subject, method) => {
      // the previous subject is automatically received
      // and the commands arguments are shifted

      // allow us to change the console method used
      method = method || 'log';

      // log the subject to the console
      (console as any)[method]('The subject is', subject);

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
  setConfiguration(key: any, value: number) {
    Cypress.config(key, value);
    return this;
  }
  setEnvironmentVariables(envVars: any) {
    Cypress.env(envVars);
    return this;
  }
  setEnvironmentVariable(key: string, value: any) {
    Cypress.env(key, value);
    return this;
  }

  // ========================================
  // GETTERS FOR ASSERTIONS - Return Chainable for .should()
  // ========================================
  getCpuArchitecture() {
    return Cypress.arch;
  }
  getConfiguration() {
    return Cypress.config();
  }
  getSpecificConfig(key: any) {
    return Cypress.config(key);
  }
  getHiddenParagraph() {
    return Cypress.$(this.selectors.domParagraphHidden).get(0);
  }
  getVisibleParagraph() {
    return Cypress.$(this.selectors.domParagraphVisible).get(0);
  }
  getEnvironmentVariable(key: string) {
    return Cypress.env(key);
  }
  getAllEnvironmentVariables() {
    return Cypress.env();
  }
  getPlatform() {
    return Cypress.platform;
  }
  getVersion() {
    return Cypress.version;
  }
  getSpecInformation() {
    return Cypress.spec;
  }
}

export default CypressApiPage;