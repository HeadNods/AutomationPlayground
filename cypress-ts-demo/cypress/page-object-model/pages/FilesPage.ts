import { Method } from 'cypress/types/net-stubbing.js';
import BasePage from '../BasePage.js';

/**
 * Page Object for the Files Demo Page
 * URL: https://example.cypress.io/commands/files
 */
class FilesPage extends BasePage {
  private readonly selectors = {
    fixtureButton: '.fixture-btn'
  }

  constructor() {
    super();
    this.url = 'https://example.cypress.io/commands/files';
  }

  // ========================================
  // ACTIONS - Return 'this' for chaining
  // ========================================
  visitFilesPage() {
    return this.visit();
  }
  loadFixture(fixtureName: string) {
    cy.fixture(fixtureName).as(fixtureName.replace('.json', ''));
    return this;
  }
  loadExampleFixture() {
    cy.fixture('example.json').as('example');
    return this;
  }
  interceptWithFixture(method: Method, url: string, fixtureName: string, alias: string) {
    cy.intercept(method, url, { fixture: fixtureName }).as(alias);
    return this;
  }
  clickFixtureButton() {
    this.clickElement(this.selectors.fixtureButton);
    return this;
  }
  writeFile(filePath: string, content: any) {
    cy.writeFile(filePath, content);
    return this;
  }
  writeJsonFile(filePath: string, jsonObject: any) {
    cy.writeFile(filePath, jsonObject);
    return this;
  }
  requestAndWriteFile(url: string, filePath: string) {
    cy.request(url).then((response) => {
      cy.writeFile(filePath, response.body);
    });
    return this;
  }

  // ========================================
  // GETTERS FOR ASSERTIONS - Return Chainable for .should()
  // ========================================
  getFixture(fixtureName: string) {
    return cy.fixture(fixtureName);
  }
  getLoadedFixture(fixtureAlias: string) {
    return cy.get(`@${fixtureAlias}`);
  }
  waitForInterceptedRequest(alias: string) {
    return cy.wait(`@${alias}`);
  }
  readConfigFile() {
    return cy.readFile(Cypress.config('configFile'));
  }
  readFile(filePath: string) {
    return cy.readFile(filePath);
  }
}

export default FilesPage;