import BasePage from '../BasePage.js';

/**
 * Page Object for the Spies, Stubs, and Clocks Demo Page
 * URL: https://example.cypress.io/commands/spies-stubs-clocks
 * 
 * This page contains only ACTIONS and DATA RETRIEVAL methods.
 * All test logic and assertions should be in the test files.
 */
class SpiesStubsClocksPage extends BasePage {
  private readonly selectors = {
    clockDiv: '#clock-div',
    tickDiv: '#tick-div'
  }

  constructor() {
    super();
    this.url = 'https://example.cypress.io/commands/spies-stubs-clocks';
  }

  // ========================================
  // ACTIONS - Return 'this' for chaining
  // ========================================
  visitSpiesStubsClocksPage() {
    return this.visit();
  }
  clickClockDiv() {
    return this.clickElement(this.selectors.clockDiv);
  }
  clickTickDiv() {
    return this.clickElement(this.selectors.tickDiv);
  }

  // ========================================
  // DATA RETRIEVAL - Return Chainable for .should()
  // ========================================
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
  createSpy(object: any, methodName: string, alias: string | null = null) {
    const spy = cy.spy(object, methodName);
    if (alias) {
      spy.as(alias);
    }
    return spy;
  }
  createStub(object: any, methodName: string, alias: string | null = null) {
    const stub = cy.stub(object, methodName);
    if (alias) {
      stub.as(alias);
    }
    return stub;
  }
  createStubWithReturn(object: any, methodName: string, returnValue: any, alias: string | null = null) {
    const stub = cy.stub(object, methodName).returns(returnValue);
    if (alias) {
      cy.wrap(stub).as(alias);
    }
    return stub;
  }
  createStubWithThrow(object: any, methodName: string, error: any, alias: string | null = null) {
    const stub = cy.stub(object, methodName).throws(error);
    if (alias) {
      cy.wrap(stub).as(alias);
    }
    return stub;
  }
  createStubWithMatchers(object: any, methodName: string) {
    return cy.stub(object, methodName).callThrough();
  }
  // Clock Helpers (Setup only)
  setClock(timestamp: number | Date) {
    return cy.clock(timestamp);
  }

  tickClock(milliseconds: number) {
    return cy.tick(milliseconds);
  }
  createTimestamp(year: number, month: number, day: number) {
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

  getInMatcher(values: any[]) {
    return Cypress.sinon.match.in(values);
  }

  getCustomMatcher(predicate: (value: any) => boolean, message: string) {
    return Cypress.sinon.match(predicate, message);
  }

  // Helper to create test objects (for use in tests)
  createTestObject() {
    return {
      foo() {},
      greet(name: string) {
        return `Hello, ${name}!`;
      },
      add(a: number, b: number) {
        return a + b;
      }
    };
  }

  createCalculatorObject() {
    return {
      add(a: number, b: number) {
        return a + b;
      }
    };
  }

  createGreeterObject() {
    return {
      greet(name?: string | number | undefined) {
        return `Hello, ${name}!`;
      }
    };
  }

  // Workflow methods (actions only, no assertions)
  performClockWorkflow(timestamp: number | Date) {
    this.setClock(timestamp);
    this.clickClockDiv();
    return this;
  }

  performTickWorkflow(timestamp: number | Date, tickAmount: number) {
    this.setClock(timestamp);
    this.clickTickDiv();
    this.tickClock(tickAmount);
    this.clickTickDiv();
    return this;
  }
}

export default SpiesStubsClocksPage;