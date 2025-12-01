import { NavigationPage } from '../../page-object-model/index';

describe('Navigation with Page Objects', () => {
  let navigationPage: NavigationPage;

  beforeEach(() => {
    navigationPage = new NavigationPage();
    navigationPage.visitNavigationPage();
  });

  it('cy.go() - go back or forward in the browser\'s history', () => {
    // https://on.cypress.io/go
    navigationPage
      .getLocation('pathname')
      .should('include', 'navigation');
    navigationPage
      .goBack()
      .getLocation('pathname')
      .should('not.include', 'navigation');
    navigationPage
      .goForward()
      .getLocation('pathname')
      .should('include', 'navigation');
    navigationPage
      .goBackSteps(-1)
      .getLocation('pathname')
      .should('not.include', 'navigation');
    navigationPage
      .goForwardSteps(1)
      .getLocation('pathname')
      .should('include', 'navigation');
  });

  it('cy.reload() - reload the page', () => {
    // https://on.cypress.io/reload
    navigationPage
      .reloadPage()
      .reloadPageWithoutCache();
  });

  it('cy.visit() - visit a remote url', () => {
    // https://on.cypress.io/visit
    navigationPage.visitWithOptions('https://example.cypress.io/commands/navigation', {
      timeout: 50000, // increase total time for the visit to resolve
      onBeforeLoad(contentWindow: any) {
        // contentWindow is the remote page's window object
        expect(typeof contentWindow === 'object').to.be.true;
      },
      onLoad(contentWindow: any) {
        // contentWindow is the remote page's window object
        expect(typeof contentWindow === 'object').to.be.true;
      },
    });
  });
});