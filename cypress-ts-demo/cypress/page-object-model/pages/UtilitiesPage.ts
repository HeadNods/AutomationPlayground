import BasePage from '../BasePage.js';

/**
 * Page Object for the Utilities Demo Page
 * URL: https://example.cypress.io/utilities
 * In reality we should separate many of these methods that aren't page specific into a utilities helper class, 
 * but for demo purposes we include it here.
 */
class UtilitiesPage extends BasePage {
  private readonly selectors = {
    utilityJquery: '.utility-jquery',
    utilityJqueryLi: '.utility-jquery li:first',
    utilityBlob: '.utility-blob',
    utilityBlobImg: '.utility-blob img'
  };

  constructor() {
    super();
    this.url = 'https://example.cypress.io/utilities';
  };

  // ========================================
  // ACTIONS - Return 'this' for chaining
  // ========================================
  visitUtilitiesPage() {
    return this.visit();
  }

  // ========================================
  // Cypress.request Methods
  // ========================================
  requestUsers() {
    return cy.request('https://jsonplaceholder.cypress.io/users');
  }

  // ========================================
  // Cypress._ (Lodash) Methods
  // ========================================
  extractUserIds(users: any[]) {
    return Cypress._.chain(users).map('id').take(3).value();
  }
  performLodashChaining(users: any[]) {
    return Cypress._.chain(users).map('id').take(3).value();
  }
  getLodashUserNames(users: any[]) {
    return Cypress._.map(users, 'name');
  }
  takeFirstItems(array: any[], count: number) {
    return Cypress._.take(array, count);
  }
  sortArray(array: any[]) {
    return Cypress._.sortBy(array);
  }

  // ========================================
  // Cypress.$ (jQuery) Methods
  // ========================================
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
  hasJqueryClass($element: JQuery<HTMLElement>, className: string) {
    return $element.hasClass(className);
  }
  getJqueryElementText($element: JQuery<HTMLElement>) {
    return $element.text();
  }
  getJqueryElementSiblings($element: JQuery<HTMLElement>) {
    return $element.siblings();
  }

  // ========================================
  // Cypress.Blob Methods
  // ========================================
  getBlobDiv() {
    return this.getElement(this.selectors.utilityBlob);
  }
  convertImageToDataUrl(imageUrl: string) {
    return Cypress.Blob.imgSrcToDataURL(imageUrl, undefined, 'anonymous');
  }
  createImageElement(dataUrl: string) {
    return Cypress.$('<img />', { src: dataUrl });
  }
  appendImageToDiv($div: JQuery<HTMLElement>, $img: JQuery<HTMLElement>) {
    $div.append($img);
    return this;
  }
  clickBlobImage() {
    return this.clickElement(this.selectors.utilityBlobImg);
  }
  getBlobImageElement() {
    return this.getElement(this.selectors.utilityBlobImg);
  }

  // ========================================
  // Cypress.minimatch Methods
  // ========================================
  matchPath(path: string, pattern: string, options: any = {}) {
    return Cypress.minimatch(path, pattern, options);
  }

  matchPathWithBase(path: string, pattern: string) {
    return Cypress.minimatch(path, pattern, { matchBase: true });
  }

  matchPathWithoutBase(path: string, pattern: string) {
    return Cypress.minimatch(path, pattern, { matchBase: false });
  }

  // ========================================
  // Cypress.Promise Methods
  // ========================================
  createPromise(delayMs: number, resolveValue: any) {
    return new Cypress.Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(resolveValue);
      }, delayMs);
    });
  }
  createPromiseWithState(delayMs: number, resolveValue: any, stateObject: any) {
    return new Cypress.Promise((resolve, reject) => {
      setTimeout(() => {
        stateObject.waited = true;
        resolve(resolveValue);
      }, delayMs);
    });
  }
}

export default UtilitiesPage;