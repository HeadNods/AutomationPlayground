import { SpiesStubsClocksPage } from '../../page-object-model/index';

describe('Spies, Stubs, and Clock with Page Objects', () => {
  let spiesStubsClocksPage: SpiesStubsClocksPage;

  beforeEach(() => {
    spiesStubsClocksPage = new SpiesStubsClocksPage();
    spiesStubsClocksPage.visitSpiesStubsClocksPage();
  });

  it('cy.spy() - wrap a method in a spy', () => {
    // https://on.cypress.io/spy
    const obj = spiesStubsClocksPage.createTestObject();
    const spy = spiesStubsClocksPage.createSpy(obj, 'foo', 'anyArgs');

    obj.foo();

    expect(spy).to.be.called;
  });

  it('cy.spy() retries until assertions pass', () => {
    const obj = {
      /**
       * Prints the argument passed
      */
      foo(x: string) {
        console.log('obj.foo called with', x);
      },
    };

    spiesStubsClocksPage.createSpy(obj, 'foo', 'foo');

    setTimeout(() => {
      obj.foo('first');
    }, 500);

    setTimeout(() => {
      obj.foo('second');
    }, 2500);

    cy.get('@foo').should('have.been.calledTwice');
  });

  it('cy.stub() - create a stub and/or replace a function with stub', () => {
    // https://on.cypress.io/stub
    const obj = {
      /**
       * prints both arguments to the console
      */
      foo(a: string, b: string) {
        console.log('a', a, 'b', b);
      },
    };

    const stub = spiesStubsClocksPage.createStub(obj, 'foo', 'foo');

    obj.foo('foo', 'bar');

    expect(stub).to.be.called;
  });

  it('cy.clock() - control time in the browser', () => {
    // https://on.cypress.io/clock

    // create the date in UTC so it's always the same
    // no matter what local timezone the browser is running in
    const now = spiesStubsClocksPage.createTimestamp(2017, 2, 14);

    spiesStubsClocksPage.performClockWorkflow(now);
    
    spiesStubsClocksPage.getClockDiv()
      .should('have.text', '1489449600');
  });

  it('cy.tick() - move time in the browser', () => {
    // https://on.cypress.io/tick

    // create the date in UTC so it's always the same
    // no matter what local timezone the browser is running in
    const now = spiesStubsClocksPage.createTimestamp(2017, 2, 14);

    spiesStubsClocksPage.performTickWorkflow(now, 10000);
    
    spiesStubsClocksPage.getTickDiv()
      .should('have.text', '1489449610');
  });

  it('cy.stub() matches depending on arguments', () => {
    // see all possible matchers at
    // https://sinonjs.org/releases/latest/matchers/
    const greeter = spiesStubsClocksPage.createGreeterObject();

    const stub = spiesStubsClocksPage.createStubWithMatchers(greeter, 'greet')
      .withArgs(spiesStubsClocksPage.getStringMatcher()).returns('Hi')
      .withArgs(spiesStubsClocksPage.getNumberMatcher()).throws(new Error('Invalid name'));

    expect(greeter.greet('World')).to.equal('Hi');
    expect(() => greeter.greet(42)).to.throw('Invalid name');
    expect(greeter.greet).to.have.been.calledTwice;

    // non-matched calls goes the actual method
    expect(greeter.greet()).to.equal('Hello, undefined!');
  });

  it('matches call arguments using Sinon matchers', () => {
    // see all possible matchers at
    // https://sinonjs.org/releases/latest/matchers/
    const calculator = spiesStubsClocksPage.createCalculatorObject();
    const spy = spiesStubsClocksPage.createSpy(calculator, 'add', 'add');

    expect(calculator.add(2, 3)).to.equal(5);

    // if we want to assert the exact values used during the call
    expect(spy).to.be.calledWith(2, 3);

    // let's confirm "add" method was called with two numbers
    expect(spy).to.be.calledWith(
      spiesStubsClocksPage.getNumberMatcher(), 
      spiesStubsClocksPage.getNumberMatcher()
    );

    // alternatively, provide the value to match
    const match = spiesStubsClocksPage.getSinonMatchers();
    expect(spy).to.be.calledWith(match(2), match(3));

    // match any value
    expect(spy).to.be.calledWith(spiesStubsClocksPage.getAnyMatcher(), 3);

    // match any value from a list
    expect(spy).to.be.calledWith(spiesStubsClocksPage.getInMatcher([1, 2, 3]), 3);

    /**
     * Returns true if the given number is even
     */
    const isEven = (x: number) => x % 2 === 0;

    // expect the value to pass a custom predicate function
    // the second argument to "sinon.match(predicate, message)" is
    // shown if the predicate does not pass and assertion fails
    expect(spy).to.be.calledWith(
      spiesStubsClocksPage.getCustomMatcher(isEven, 'isEven'), 
      3
    );

    /**
     * Returns a function that checks if a given number is larger than the limit
     */
    const isGreaterThan = (limit: number) => (x: number) => x > limit;

    /**
     * Returns a function that checks if a given number is less than the limit
     */
    const isLessThan = (limit: number) => (x: number) => x < limit;

    // you can combine several matchers using "and", "or"
    expect(spy).to.be.calledWith(
      spiesStubsClocksPage.getNumberMatcher(),
      spiesStubsClocksPage.getCustomMatcher(isGreaterThan(2), '> 2')
        .and(spiesStubsClocksPage.getCustomMatcher(isLessThan(4), '< 4')),
    );

    expect(spy).to.be.calledWith(
      spiesStubsClocksPage.getNumberMatcher(),
      spiesStubsClocksPage.getCustomMatcher(isGreaterThan(200), '> 200')
        .or(match(3)),
    );

    // matchers can be used from BDD assertions
    cy.get('@add').should('have.been.calledWith',
      spiesStubsClocksPage.getNumberMatcher(), 
      match(3)
    );

    // you can alias matchers for shorter test code
    const { match: M } = Cypress.sinon;

    cy.get('@add').should('have.been.calledWith', M.number, M(3));
  });
});