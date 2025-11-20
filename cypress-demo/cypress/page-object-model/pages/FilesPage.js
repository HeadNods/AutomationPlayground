import BasePage from '../BasePage.js';

/**
 * Page Object for the Files Demo Page
 * URL: https://example.cypress.io/commands/files
 */
class FilesPage extends BasePage {
  constructor() {
    super();
    this.url = 'https://example.cypress.io/commands/files';
  }

  // Selectors
  get selectors() {
    return {
      fixtureButton: '.fixture-btn'
    };
  }

  // Navigation
  visitFilesPage() {
    return this.visit();
  }

  // Fixture Methods
  loadFixture(fixtureName) {
    cy.fixture(fixtureName).as(fixtureName.replace('.json', ''));
    return this;
  }

  loadExampleFixture() {
    cy.fixture('example.json').as('example');
    return this;
  }

  getFixture(fixtureName) {
    return cy.fixture(fixtureName);
  }

  getLoadedFixture(fixtureAlias) {
    return cy.get(`@${fixtureAlias}`);
  }

  interceptWithFixture(method, url, fixtureName, alias) {
    cy.intercept(method, url, { fixture: fixtureName }).as(alias);
    return this;
  }

  clickFixtureButton() {
    this.clickElement(this.selectors.fixtureButton);
    return this;
  }

  waitForInterceptedRequest(alias) {
    return cy.wait(`@${alias}`);
  }

  // File Reading Methods
  readConfigFile() {
    return cy.readFile(Cypress.config('configFile'));
  }

  readFile(filePath) {
    return cy.readFile(filePath);
  }

  // File Writing Methods
  writeFile(filePath, content) {
    cy.writeFile(filePath, content);
    return this;
  }

  writeJsonFile(filePath, jsonObject) {
    cy.writeFile(filePath, jsonObject);
    return this;
  }

  requestAndWriteFile(url, filePath) {
    cy.request(url).then((response) => {
      cy.writeFile(filePath, response.body);
    });
    return this;
  }
}

export default FilesPage;