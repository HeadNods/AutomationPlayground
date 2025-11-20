import { AliasingPage } from '../../page-object-model/index.js';

describe('Aliasing with Page Objects', () => {
  let aliasingPage = new AliasingPage();

  beforeEach(() => {
    aliasingPage = new AliasingPage();
    aliasingPage.visitAliasingPage();
  });

  it('.as() - alias a DOM element for later use', () => {
    // https://on.cypress.io/as

    // Alias a DOM element for use later
    // We don't have to traverse to the element
    // later in our code, we reference it with @
    aliasingPage.aliasFirstButton('firstBtn')
      .clickAliasedElement('firstBtn')
      .getAliasedElement('firstBtn')
      .should('have.class', 'btn-success')
      .should('have.text', 'Changed');
  });

  it('.as() - alias a route for later use', () => {
    // Alias the route to wait for its response
    aliasingPage.aliasGetCommentRequest('getComment')
      .clickNetworkButton()
      .waitForAliasedRequest('getComment')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
  });
});