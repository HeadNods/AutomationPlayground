/**
 * Base Page Object class containing common methods and utilities
 * that all page objects can inherit from
 */
class BasePage {
  constructor() {
    this.url = '';
  }

  /**
   * Visit the page
   * @param {string} url - Optional URL override
   */
  visit(url = this.url) {
    cy.visit(url);
    return this;
  }

  /**
   * Get element by selector with optional timeout
   * @param {string} selector - CSS selector
   * @param {number} timeout - Optional timeout in milliseconds
   */
  getElement(selector, timeout = 10000) {
    return cy.get(selector, { timeout });
  }

  /**
   * Get element by data-test attribute
   * @param {string} testId - data-test attribute value
   */
  getByTestId(testId) {
    return cy.get(`[data-test="${testId}"]`);
  }

  /**
   * Get element by data-cy attribute (Cypress best practice)
   * @param {string} cyId - data-cy attribute value
   */
  getByCy(cyId) {
    return cy.get(`[data-cy="${cyId}"]`);
  }

  /**
   * Get element containing specific text
   * @param {string} text - Text content to search for
   * @param {string} selector - Optional selector to scope the search
   */
  getByText(text, selector = null) {
    if (selector) {
      return cy.get(selector).contains(text);
    }
    return cy.contains(text);
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - CSS selector
   * @param {number} timeout - Optional timeout in milliseconds
   */
  waitForVisible(selector, timeout = 10000) {
    return cy.get(selector, { timeout }).should('be.visible');
  }

  /**
   * Wait for element to not exist
   * @param {string} selector - CSS selector
   * @param {number} timeout - Optional timeout in milliseconds
   */
  waitForNotExist(selector, timeout = 10000) {
    return cy.get(selector, { timeout }).should('not.exist');
  }

  /**
   * Click element with retry logic
   * @param {string} selector - CSS selector
   * @param {object} options - Cypress click options
   */
  clickElement(selector, options = {}) {
    return cy.get(selector).click(options);
  }

  /**
   * Type text into input field
   * @param {string} selector - CSS selector
   * @param {string} text - Text to type
   * @param {object} options - Cypress type options
   */
  typeText(selector, text, options = {}) {
    return cy.get(selector).clear().type(text, options);
  }

  /**
   * Select option from dropdown
   * @param {string} selector - CSS selector
   * @param {string} value - Value to select
   */
  selectOption(selector, value) {
    return cy.get(selector).select(value);
  }

  /**
   * Check checkbox or radio button
   * @param {string} selector - CSS selector
   * @param {object} options - Cypress check options
   */
  checkElement(selector, options = {}) {
    return cy.get(selector).check(options);
  }

  /**
   * Uncheck checkbox
   * @param {string} selector - CSS selector
   * @param {object} options - Cypress uncheck options
   */
  uncheckElement(selector, options = {}) {
    return cy.get(selector).uncheck(options);
  }

  /**
   * Assert element has specific text
   * @param {string} selector - CSS selector
   * @param {string} expectedText - Expected text content
   */
  shouldHaveText(selector, expectedText) {
    return cy.get(selector).should('have.text', expectedText);
  }

  /**
   * Assert element contains specific text
   * @param {string} selector - CSS selector
   * @param {string} expectedText - Expected text content
   */
  shouldContainText(selector, expectedText) {
    return cy.get(selector).should('contain.text', expectedText);
  }

  /**
   * Assert element has specific attribute value
   * @param {string} selector - CSS selector
   * @param {string} attribute - Attribute name
   * @param {string} value - Expected attribute value
   */
  shouldHaveAttribute(selector, attribute, value) {
    return cy.get(selector).should('have.attr', attribute, value);
  }

  /**
   * Assert element has specific class
   * @param {string} selector - CSS selector
   * @param {string} className - Expected class name
   */
  shouldHaveClass(selector, className) {
    return cy.get(selector).should('have.class', className);
  }

  /**
   * Assert element is visible
   * @param {string} selector - CSS selector
   */
  shouldBeVisible(selector) {
    return cy.get(selector).should('be.visible');
  }

  /**
   * Assert element is not visible
   * @param {string} selector - CSS selector
   */
  shouldNotBeVisible(selector) {
    return cy.get(selector).should('not.be.visible');
  }

  /**
   * Assert element exists
   * @param {string} selector - CSS selector
   */
  shouldExist(selector) {
    return cy.get(selector).should('exist');
  }

  /**
   * Assert element does not exist
   * @param {string} selector - CSS selector
   */
  shouldNotExist(selector) {
    return cy.get(selector).should('not.exist');
  }

  /**
   * Scroll element into view
   * @param {string} selector - CSS selector
   */
  scrollIntoView(selector) {
    return cy.get(selector).scrollIntoView();
  }

  /**
   * Get current URL
   */
  getCurrentUrl() {
    return cy.url();
  }

  /**
   * Assert current URL
   * @param {string} expectedUrl - Expected URL
   */
  shouldHaveUrl(expectedUrl) {
    return cy.url().should('eq', expectedUrl);
  }

  /**
   * Assert URL contains specific path
   * @param {string} path - Expected path
   */
  shouldHaveUrlPath(path) {
    return cy.url().should('include', path);
  }
}

export default BasePage;