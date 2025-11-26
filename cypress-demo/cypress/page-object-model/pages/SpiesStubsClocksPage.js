import BasePage from '../BasePage.js';

/**
 * Page Object for the Spies, Stubs, and Clocks Demo Page
 * URL: https://example.cypress.io/commands/spies-stubs-clocks
 * 
 * This page contains only ACTIONS and DATA RETRIEVAL methods.
 * All test logic and assertions should be in the test files.
 */
class SpiesStubsClocksPage extends BasePage {
  constructor() {
    super();
    this.url = 'https://example.cypress.io/commands/spies-stubs-clocks';
  }

  // Selectors
  get selectors() {
    return {
      // Clock elements
      clockDiv: '#clock-div',
      tickDiv: '#tick-div'
    };
  }

  // Navigation
  visitSpiesStubsClocksPage() {
    return this.visit();
  }

  // Element Actions
  clickClockDiv() {
    return this.clickElement(this.selectors.clockDiv);
  }

  clickTickDiv() {
    return this.clickElement(this.selectors.tickDiv);
  }

  // Data Retrieval
  getClockDiv() {
    return this.getElement(this.selectors.clockDiv);
  }

  getTickDiv() {
    return this.getElement(this.selectors.tickDiv);
  }

  getClockDivText() {
    return this.getClockDiv().invoke('text');
  }

  getTickDivText() {
    return this.getTickDiv().invoke('text');
  }

  // Spy/Stub Helpers (Setup only, no assertions)
  createSpy(object, methodName, alias = null) {
    const spy = cy.spy(object, methodName);
    if (alias) {
      spy.as(alias);
    }
    return spy;
  }

  createStub(object, methodName, alias = null) {
    const stub = cy.stub(object, methodName);
    if (alias) {
      stub.as(alias);
    }
    return stub;
  }

  createStubWithReturn(object, methodName, returnValue, alias = null) {
    const stub = cy.stub(object, methodName).returns(returnValue);
    if (alias) {
      cy.wrap(stub).as(alias);
    }
    return stub;
  }

  createStubWithThrow(object, methodName, error, alias = null) {
    const stub = cy.stub(object, methodName).throws(error);
    if (alias) {
      cy.wrap(stub).as(alias);
    }
    return stub;
  }

  createStubWithMatchers(object, methodName) {
    return cy.stub(object, methodName).callThrough();
  }

  // Clock Helpers (Setup only)
  setClock(timestamp) {
    return cy.clock(timestamp);
  }

  tickClock(milliseconds) {
    return cy.tick(milliseconds);
  }

  createTimestamp(year, month, day) {
    return new Date(Date.UTC(year, month, day)).getTime();
  }

  // Sinon Matcher Helpers
  getSinonMatchers() {
    return Cypress.sinon.match;
  }

  getStringMatcher() {
    return Cypress.sinon.match.string;
  }

  getNumberMatcher() {
    return Cypress.sinon.match.number;
  }

  getAnyMatcher() {
    return Cypress.sinon.match.any;
  }

  getInMatcher(values) {
    return Cypress.sinon.match.in(values);
  }

  getCustomMatcher(predicate, message) {
    return Cypress.sinon.match(predicate, message);
  }

  // Helper to create test objects (for use in tests)
  createTestObject() {
    return {
      foo() {},
      greet(name) {
        return `Hello, ${name}!`;
      },
      add(a, b) {
        return a + b;
      }
    };
  }

  createCalculatorObject() {
    return {
      add(a, b) {
        return a + b;
      }
    };
  }

  createGreeterObject() {
    return {
      greet(name) {
        return `Hello, ${name}!`;
      }
    };
  }

  // Workflow methods (actions only, no assertions)
  performClockWorkflow(timestamp) {
    this.setClock(timestamp);
    this.clickClockDiv();
    return this;
  }

  performTickWorkflow(timestamp, tickAmount) {
    this.setClock(timestamp);
    this.clickTickDiv();
    this.tickClock(tickAmount);
    this.clickTickDiv();
    return this;
  }
}

export default SpiesStubsClocksPage;