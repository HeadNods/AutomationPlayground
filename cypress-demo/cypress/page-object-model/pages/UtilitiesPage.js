import BasePage from '../BasePage.js';

/**
 * Page Object for the Utilities Demo Page
 * URL: https://example.cypress.io/utilities
 */
class UtilitiesPage extends BasePage {
  constructor() {
    super();
    this.url = 'https://example.cypress.io/utilities';
  }

  // Selectors
  get selectors() {
    return {
      utilityJquery: '.utility-jquery',
      utilityJqueryLi: '.utility-jquery li:first',
      utilityBlob: '.utility-blob',
      utilityBlobImg: '.utility-blob img'
    };
  }

  // Navigation
  visitUtilitiesPage() {
    return this.visit();
  }

  // Cypress._ (Lodash) Methods
  requestUsers() {
    return cy.request('https://jsonplaceholder.cypress.io/users');
  }

  extractUserIds(users) {
    return Cypress._.chain(users).map('id').take(3).value();
  }

  performLodashChaining(users) {
    return Cypress._.chain(users).map('id').take(3).value();
  }

  getLodashUserNames(users) {
    return Cypress._.map(users, 'name');
  }

  takeFirstItems(array, count) {
    return Cypress._.take(array, count);
  }

  sortArray(array) {
    return Cypress._.sortBy(array);
  }

  // Cypress.$ (jQuery) Methods
  getJqueryElement() {
    return Cypress.$(this.selectors.utilityJqueryLi);
  }

  clickJqueryElement() {
    let $li = this.getJqueryElement();
    cy.wrap($li).click();
    return this;
  }

  getJqueryElementWrapper() {
    let $li = this.getJqueryElement();
    return cy.wrap($li);
  }

  hasJqueryClass($element, className) {
    return $element.hasClass(className);
  }

  getJqueryElementText($element) {
    return $element.text();
  }

  getJqueryElementSiblings($element) {
    return $element.siblings();
  }

  // Cypress.Blob Methods
  getBlobDiv() {
    return this.getElement(this.selectors.utilityBlob);
  }

  convertImageToDataUrl(imageUrl) {
    return Cypress.Blob.imgSrcToDataURL(imageUrl, undefined, 'anonymous');
  }

  createImageElement(dataUrl) {
    return Cypress.$('<img />', { src: dataUrl });
  }

  appendImageToDiv($div, $img) {
    $div.append($img);
    return this;
  }

  clickBlobImage() {
    return this.clickElement(this.selectors.utilityBlobImg);
  }

  getBlobImageElement() {
    return this.getElement(this.selectors.utilityBlobImg);
  }

  // Cypress.minimatch Methods
  matchPath(path, pattern, options = {}) {
    return Cypress.minimatch(path, pattern, options);
  }

  matchPathWithBase(path, pattern) {
    return Cypress.minimatch(path, pattern, { matchBase: true });
  }

  matchPathWithoutBase(path, pattern) {
    return Cypress.minimatch(path, pattern, { matchBase: false });
  }

  // Cypress.Promise Methods
  createPromise(delayMs, resolveValue) {
    return new Cypress.Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(resolveValue);
      }, delayMs);
    });
  }

  createPromiseWithState(delayMs, resolveValue, stateObject) {
    return new Cypress.Promise((resolve, reject) => {
      setTimeout(() => {
        stateObject.waited = true;
        resolve(resolveValue);
      }, delayMs);
    });
  }
}

export default UtilitiesPage;