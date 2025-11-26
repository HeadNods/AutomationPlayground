import BasePage from '../BasePage.js';

/**
 * Page Object for the Misc Demo Page
 * URL: https://example.cypress.io/commands/misc
 */
class MiscPage extends BasePage {
  constructor() {
    super();
    this.url = 'https://example.cypress.io/commands/misc';
  }

  // Selectors
  get selectors() {
    return {
      miscForm: '.misc-form',
      nameInput: '#name',
      descriptionInput: '#description'
    };
  }

  // Navigation
  visitMiscPage() {
    return this.visit();
  }

  // System Command Execution
  executeSystemCommand(command) {
    return cy.exec(command);
  }

  logPlatformInfo() {
    cy.log(`Platform ${Cypress.platform} architecture ${Cypress.arch}`);
    return this;
  }

  checkCircleCICondition() {
    return Cypress.platform === 'win32' && Cypress.env('circle');
  }

  checkShippableCondition() {
    return Cypress.platform === 'linux' && Cypress.env('shippable');
  }

  // Focus Management
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

  getFocusedElement() {
    return cy.focused();
  }

  // Screenshot Methods
  takeScreenshot(name) {
    cy.screenshot(name);
    return this;
  }

  configureScreenshotDefaults(options = {}) {
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

  // Wrap Method
  wrapObject(obj) {
    return cy.wrap(obj);
  }

  // Utility methods
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