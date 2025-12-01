/**
 * Base Page Object class containing common methods and utilities
 * that all page objects can inherit from
 */
class BasePage {
  protected url: string;

  constructor() {
    this.url = '';
  }

  /**
   * Visit the page
   * @param {string} url - Optional URL override
   */
  visit(url: string = this.url) {
    cy.visit(url);
    return this;
  }

  /**
   * Get element by selector with optional timeout
   * @param {string} selector - CSS selector
   * @param {number} timeout - Optional timeout in milliseconds
   */
  getElement(selector: string, timeout = 10000) {
    return cy.get(selector, { timeout });
  }

  /**
   * Get element by data-test attribute
   * @param {string} testId - data-test attribute value
   */
  getByTestId(testId: string) {
    return cy.get(`[data-test="${testId}"]`);
  }

  /**
   * Get element by data-cy attribute (Cypress best practice)
   * @param {string} cyId - data-cy attribute value
   */
  getByCy(cyId: string) {
    return cy.get(`[data-cy="${cyId}"]`);
  }

  /**
   * Get element containing specific text
   * @param {string} text - Text content to search for
   * @param {string} selector - Optional selector to scope the search
   */
  getByText(text: string, selector: string | null = null) {
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
  waitForVisible(selector: string, timeout = 10000) {
    return cy.get(selector, { timeout }).should('be.visible');
  }

  /**
   * Wait for element to not exist
   * @param {string} selector - CSS selector
   * @param {number} timeout - Optional timeout in milliseconds
   */
  waitForNotExist(selector: string, timeout = 10000) {
    return cy.get(selector, { timeout }).should('not.exist');
  }

  /**
   * Click element with retry logic
   * @param {string} selector - CSS selector
   * @param {object} options - Cypress click options
   */
  clickElement(selector: string, options = {}) {
    return cy.get(selector).click(options);
  }

  /**
   * Type text into input field
   * @param {string} selector - CSS selector
   * @param {string} text - Text to type
   * @param {object} options - Cypress type options
   */
  typeText(selector: string, text: string, options = {}) {
    return cy.get(selector).clear().type(text, options);
  }

  /**
   * Select option from dropdown
   * @param {string} selector - CSS selector
   * @param {string} value - Value to select
   */
  selectOption(selector: string, value: string) {
    return cy.get(selector).select(value);
  }

  /**
   * Check checkbox or radio button
   * @param {string} selector - CSS selector
   * @param {object} options - Cypress check options
   */
  checkElement(selector: string, options = {}) {
    return cy.get(selector).check(options);
  }

  /**
   * Uncheck checkbox
   * @param {string} selector - CSS selector
   * @param {object} options - Cypress uncheck options
   */
  uncheckElement(selector: string, options = {}) {
    return cy.get(selector).uncheck(options);
  }

  /**
   * Assert element has specific text
   * @param {string} selector - CSS selector
   * @param {string} expectedText - Expected text content
   */
  shouldHaveText(selector: string, expectedText: string) {
    return cy.get(selector).should('have.text', expectedText);
  }

  /**
   * Assert element contains specific text
   * @param {string} selector - CSS selector
   * @param {string} expectedText - Expected text content
   */
  shouldContainText(selector: string, expectedText: string) {
    return cy.get(selector).should('contain.text', expectedText);
  }

  /**
   * Assert element has specific attribute value
   * @param {string} selector - CSS selector
   * @param {string} attribute - Attribute name
   * @param {string} value - Expected attribute value
   */
  shouldHaveAttribute(selector: string, attribute: string, value: string) {
    return cy.get(selector).should('have.attr', attribute, value);
  }

  /**
   * Assert element has specific class
   * @param {string} selector - CSS selector
   * @param {string} className - Expected class name
   */
  shouldHaveClass(selector: string, className: string) {
    return cy.get(selector).should('have.class', className);
  }

  /**
   * Assert element is visible
   * @param {string} selector - CSS selector
   */
  shouldBeVisible(selector: string) {
    return cy.get(selector).should('be.visible');
  }

  /**
   * Assert element is not visible
   * @param {string} selector - CSS selector
   */
  shouldNotBeVisible(selector: string) {
    return cy.get(selector).should('not.be.visible');
  }

  /**
   * Assert element exists
   * @param {string} selector - CSS selector
   */
  shouldExist(selector: string) {
    return cy.get(selector).should('exist');
  }

  /**
   * Assert element does not exist
   * @param {string} selector - CSS selector
   */
  shouldNotExist(selector: string) {
    return cy.get(selector).should('not.exist');
  }

  /**
   * Scroll element into view
   * @param {string} selector - CSS selector
   */
  scrollIntoView(selector: string) {
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
  shouldHaveUrl(expectedUrl: string) {
    return cy.url().should('eq', expectedUrl);
  }

  /**
   * Assert URL contains specific path
   * @param {string} path - Expected path
   */
  shouldHaveUrlPath(path: string) {
    return cy.url().should('include', path);
  }
}

export default BasePage;