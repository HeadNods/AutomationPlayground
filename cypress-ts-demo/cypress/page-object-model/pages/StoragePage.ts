import BasePage from '../BasePage.js';

/**
 * Page Object for the Local Storage / Session Storage Demo Page
 * URL: https://example.cypress.io/commands/storage
 * 
 * This page contains only ACTIONS and DATA RETRIEVAL methods.
 * All test logic and assertions should be in the test files.
 */
class StoragePage extends BasePage {
  private readonly selectors = {
    localStorageButton: '.ls-btn'
  }

  constructor() {
    super();
    this.url = 'https://example.cypress.io/commands/storage';
  }

  // ========================================
  // ACTIONS - Return 'this' for chaining
  // ========================================
  visitStoragePage() {
    return this.visit();
  }
  clickLocalStorageButton() {
    this.clickElement(this.selectors.localStorageButton);
    return this;
  }
  clearLocalStorageByKey(key: string) {
    cy.clearLocalStorage(key);
    return this;
  }
  clearLocalStorageByRegex(regex: RegExp) {
    cy.clearLocalStorage(regex);
    return this;
  }
  clearAllLocalStorage() {
    cy.clearLocalStorage();
    return this;
  }
  clearAllLocalStorageAllOrigins() {
    cy.clearAllLocalStorage();
    return this;
  }
  clearAllSessionStorageAllOrigins() {
    cy.clearAllSessionStorage();
    return this;
  }
  performLocalStorageSetup() {
    this.clickLocalStorageButton();
    return this;
  }
  performLocalStorageClearWorkflow() {
    this.clickLocalStorageButton();
    this.clearAllLocalStorage();
    return this;
  }
  performLocalStorageClearByKeyWorkflow(key: string) {
    this.clickLocalStorageButton();
    this.clearLocalStorageByKey(key);
    return this;
  }
  performLocalStorageClearByRegexWorkflow(regex: RegExp) {
    this.clickLocalStorageButton();
    this.clearLocalStorageByRegex(regex);
    return this;
  }
  performSessionStorageWorkflow() {
    this.clickLocalStorageButton();
    return this;
  }

  // ========================================
  // DATA RETRIEVAL - Return Chainable for .should()
  // ========================================
  getLocalStorageButton() {
    return this.getElement(this.selectors.localStorageButton);
  }
  getAllLocalStorage() {
    return cy.getAllLocalStorage();
  }
  getAllSessionStorage() {
    return cy.getAllSessionStorage();
  }
  getLocalStorageItem(key: string) {
    return cy.window().then(win => win.localStorage.getItem(key));
  }
  getSessionStorageItem(key: string) {
    return cy.window().then(win => win.sessionStorage.getItem(key));
  }
  // Helper methods to check storage state
  checkLocalStorageItem(key: string, callback: (value: string | null) => void) {
    return cy.window().should(() => {
      callback(localStorage.getItem(key));
    });
  }
  checkSessionStorageItem(key: string, callback: (value: string | null) => void) {
    return cy.window().should(() => {
      callback(sessionStorage.getItem(key));
    });
  }
}

export default StoragePage;