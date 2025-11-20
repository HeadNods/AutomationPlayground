import BasePage from '../BasePage.js';

/**
 * Page Object for the Connectors Demo Page
 * URL: https://example.cypress.io/commands/connectors
 */
class ConnectorsPage extends BasePage {
  constructor() {
    super();
    this.url = 'https://example.cypress.io/commands/connectors';
  }

  // Selectors
  get selectors() {
    return {
      connectorsEachUl: '.connectors-each-ul',
      connectorsEachLi: '.connectors-each-ul > li',
      connectorsItsUl: '.connectors-its-ul',
      connectorsItsLi: '.connectors-its-ul > li',
      connectorsDiv: '.connectors-div',
      connectorsList: '.connectors-list',
      connectorsListItems: '.connectors-list > li'
    };
  }

  // Navigation
  visitConnectorsPage() {
    return this.visit();
  }

  // .each() methods
  getEachListItems() {
    return this.getElement(this.selectors.connectorsEachLi);
  }

  iterateOverEachItem(callback) {
    this.getEachListItems().each(callback);
    return this;
  }

  iterateWithLogging() {
    this.getEachListItems().each(($el, index, $list) => {
      console.log($el, index, $list);
    });
    return this;
  }

  // .its() methods
  getItsListItems() {
    return this.getElement(this.selectors.connectorsItsLi);
  }

  getListLength() {
    return this.getItsListItems().its('length');
  }

  // .invoke() methods
  getConnectorsDiv() {
    return this.getElement(this.selectors.connectorsDiv);
  }

  showDiv() {
    this.getConnectorsDiv().invoke('show');
    return this;
  }

  // .spread() methods
  performSpreadOperation(array) {
    cy.wrap(array).spread((foo, bar, baz) => {
      expect(foo).to.eq('foo');
      expect(bar).to.eq('bar');
      expect(baz).to.eq('baz');
    });
    return this;
  }

  // .then() methods
  getConnectorsList() {
    return this.getElement(this.selectors.connectorsListItems);
  }

  performThenWithCallback() {
    this.getConnectorsList().then(($lis) => {
      expect($lis, '3 items').to.have.length(3);
      expect($lis.eq(0), 'first item').to.contain('Walk the dog');
      expect($lis.eq(1), 'second item').to.contain('Feed the cat');
      expect($lis.eq(2), 'third item').to.contain('Write JavaScript');
    });
    return this;
  }

  performThenWithReturnValue() {
    cy.wrap(1)
      .then((num) => {
        expect(num).to.equal(1);
        return 2;
      })
      .then((num) => {
        expect(num).to.equal(2);
      });
    return this;
  }

  performThenWithoutReturn() {
    cy.wrap(1)
      .then((num) => {
        expect(num).to.equal(1);
        // note that nothing is returned from this callback
      })
      .then((num) => {
        // this callback receives the original unchanged value 1
        expect(num).to.equal(1);
      });
    return this;
  }

  performThenWithCypressCommand() {
    cy.wrap(1)
      .then((num) => {
        expect(num).to.equal(1);
        // note how we run a Cypress command
        // the result yielded by this Cypress command
        // will be passed to the second ".then"
        cy.wrap(2);
      })
      .then((num) => {
        // this callback receives the value yielded by "cy.wrap(2)"
        expect(num).to.equal(2);
      });
    return this;
  }
}

export default ConnectorsPage;