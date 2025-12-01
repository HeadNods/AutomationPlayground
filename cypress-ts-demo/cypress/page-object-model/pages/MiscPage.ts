import BasePage from '../BasePage.js';

/**
 * Page Object for the Misc Demo Page
 * URL: https://example.cypress.io/commands/misc
 */
class MiscPage extends BasePage {
  private readonly selectors = {
    miscForm: '.misc-form',
    nameInput: '#name',
    descriptionInput: '#description'
  }

  constructor() {
    super();
    this.url = 'https://example.cypress.io/commands/misc';
  }

  // ========================================
  // ACTIONS - Return 'this' for chaining
  // ========================================
  visitMiscPage() {
    return this.visit();
  }
  logPlatformInfo() {
    cy.log(`Platform ${Cypress.platform} architecture ${Cypress.arch}`);
    return this;
  }
  clickNameInput() {
    this.getElement(this.selectors.miscForm)
      .find(this.selectors.nameInput)
      .click();
    return this;
  }
  clickDescriptionInput() {
    this.getElement(this.selectors.miscForm)
      .find(this.selectors.descriptionInput)
      .click();
    return this;
  }
  takeScreenshot(name: string) {
    cy.screenshot(name);
    return this;
  }
  configureScreenshotDefaults(options: object = {}) {
    Cypress.Screenshot.defaults({
      blackout: ['.foo'],
      capture: 'viewport',
      clip: { x: 0, y: 0, width: 200, height: 200 },
      scale: false,
      disableTimersAndAnimations: true,
      screenshotOnRunFailure: true,
      onBeforeScreenshot() { },
      onAfterScreenshot() { },
      ...options
    });
    return this;
  }

  // ========================================
  // GETTERS FOR ASSERTIONS - Return Chainable for .should()
  // ========================================
  executeSystemCommand(command: string) {
    return cy.exec(command);
  }
  checkCircleCICondition() {
    return Cypress.platform === 'win32' && Cypress.env('circle');
  }
  checkShippableCondition() {
    return Cypress.platform === 'linux' && Cypress.env('shippable');
  }
  getFocusedElement() {
    return cy.focused();
  }
  wrapObject(obj: object) {
    return cy.wrap(obj);
  }
  getPlatform() {
    return Cypress.platform;
  }
  getArchitecture() {
    return Cypress.arch;
  }
  getVersion() {
    return Cypress.version;
  }
  isWindowsPlatform() {
    return Cypress.platform === 'win32';
  }
  isLinuxPlatform() {
    return Cypress.platform === 'linux';
  }
}

export default MiscPage;