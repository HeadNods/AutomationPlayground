import BasePage from '../BasePage.js';

/**
 * Page Object for the Local Storage / Session Storage Demo Page
 * URL: https://example.cypress.io/commands/storage
 * 
 * This page contains only ACTIONS and DATA RETRIEVAL methods.
 * All test logic and assertions should be in the test files.
 */
class StoragePage extends BasePage {
  constructor() {
    super();
    this.url = 'https://example.cypress.io/commands/storage';
  }

  // Selectors
  get selectors() {
    return {
      // Storage buttons
      localStorageButton: '.ls-btn'
    };
  }

  // Navigation
  visitStoragePage() {
    return this.visit();
  }

  // Element Actions
  clickLocalStorageButton() {
    return this.clickElement(this.selectors.localStorageButton);
  }

  // Data Retrieval
  getLocalStorageButton() {
    return this.getElement(this.selectors.localStorageButton);
  }

  // Local Storage Actions
  clearAllLocalStorage() {
    return cy.clearLocalStorage();
  }

  clearLocalStorageByKey(key) {
    return cy.clearLocalStorage(key);
  }

  clearLocalStorageByRegex(regex) {
    return cy.clearLocalStorage(regex);
  }

  getAllLocalStorage() {
    return cy.getAllLocalStorage();
  }

  clearAllLocalStorageAllOrigins() {
    return cy.clearAllLocalStorage();
  }

  // Session Storage Actions
  getAllSessionStorage() {
    return cy.getAllSessionStorage();
  }

  clearAllSessionStorageAllOrigins() {
    return cy.clearAllSessionStorage();
  }

  // Local Storage Data Retrieval
  getLocalStorageItem(key) {
    return cy.window().then(win => win.localStorage.getItem(key));
  }

  getSessionStorageItem(key) {
    return cy.window().then(win => win.sessionStorage.getItem(key));
  }

  // Helper methods to check storage state
  checkLocalStorageItem(key, callback) {
    return cy.window().should(() => {
      callback(localStorage.getItem(key));
    });
  }

  checkSessionStorageItem(key, callback) {
    return cy.window().should(() => {
      callback(sessionStorage.getItem(key));
    });
  }

  // Workflow methods (actions only, no assertions)
  performLocalStorageSetup() {
    this.clickLocalStorageButton();
    return this;
  }

  performLocalStorageClearWorkflow() {
    this.clickLocalStorageButton();
    this.clearAllLocalStorage();
    return this;
  }

  performLocalStorageClearByKeyWorkflow(key) {
    this.clickLocalStorageButton();
    this.clearLocalStorageByKey(key);
    return this;
  }

  performLocalStorageClearByRegexWorkflow(regex) {
    this.clickLocalStorageButton();
    this.clearLocalStorageByRegex(regex);
    return this;
  }

  performSessionStorageWorkflow() {
    this.clickLocalStorageButton();
    return this;
  }
}

export default StoragePage;