import { ConnectorsPage } from '../../page-object-model/index.js';

describe('Connectors with Page Objects', () => {
  let connectorsPage = new ConnectorsPage();

  beforeEach(() => {
    connectorsPage = new ConnectorsPage();
    connectorsPage.visitConnectorsPage();
  });

  it('.each() - iterate over an array of elements', () => {
    // https://on.cypress.io/each
    connectorsPage.iterateWithLogging();
  });

  it('.its() - get properties on the current subject', () => {
    // https://on.cypress.io/its
    connectorsPage.getListLength().should('be.gt', 2);
  });

  it('.invoke() - invoke a function on the current subject', () => {
    // our div is hidden in our script.js
    // $('.connectors-div').hide()
    connectorsPage
      .getConnectorsDiv()
      .should('be.hidden');
    connectorsPage
      .showDiv()
      .getConnectorsDiv()
      .should('be.visible');
  });

  it('.spread() - spread an array as individual args to callback function', () => {
    // https://on.cypress.io/spread
    const arr = ['foo', 'bar', 'baz'];
    connectorsPage.performSpreadOperation(arr);
  });

  describe('.then()', () => {
    it('invokes a callback function with the current subject', () => {
      // https://on.cypress.io/then
      connectorsPage.getConnectorsList().then(($lis) => {
        expect($lis, '3 items').to.have.length(3);
        expect($lis.eq(0), 'first item').to.contain('Walk the dog');
        expect($lis.eq(1), 'second item').to.contain('Feed the cat');
        expect($lis.eq(2), 'third item').to.contain('Write JavaScript');
      });
    });

    it('yields the returned value to the next command', () => {
      connectorsPage.performThenWithReturnValue();
    });

    it('yields the original subject without return', () => {
      connectorsPage.performThenWithoutReturn();
    });

    it('yields the value yielded by the last Cypress command inside', () => {
      connectorsPage.performThenWithCypressCommand();
    });
  });
});